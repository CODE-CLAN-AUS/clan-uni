using Microsoft.Extensions.Configuration;
using OpenCvSharp;
using Azure.AI.OpenAI;
using System.ClientModel;
using Microsoft.Extensions.AI;
using System;



var config = new ConfigurationBuilder().AddUserSecrets<Program>().Build();
var endpoint = config["AZURE_OPENAI_ENDPOINT"];
var modelId = config["AZURE_OPENAI_MODEL"];

// create client using API Keys
var apiKey = config["AZURE_OPENAI_APIKEY"];
var credential = new ApiKeyCredential(apiKey);

IChatClient chatClient =
    new AzureOpenAIClient(new Uri(endpoint),credential)
            .AsChatClient(modelId: modelId);

List<ChatMessage> messages =
[
    new ChatMessage(ChatRole.System, PromptsHelper.SystemPrompt),
    new ChatMessage(ChatRole.User, PromptsHelper.UserPromptDescribeVideo),
];


// create the OpenAI files that represent the video frames
int step = (int)Math.Ceiling((double)frames.Count / PromptsHelper.NumberOfFrames);

// show in the console the total number of frames and the step that neeeds to be taken to get the desired number of frames for the video analysis
Console.WriteLine($"Video total number of frames: {frames.Count}");
Console.WriteLine($"Get 1 frame every [{step}] to get the [{PromptsHelper.NumberOfFrames}] frames for analysis");

for (int i = 0; i < frames.Count; i += step)
{
    // save the frame to the "data/frames" folder
    string framePath = Path.Combine(dataFolderPath, "frames", $"{i}.jpg");
    Cv2.ImWrite(framePath, frames[i]);

    // read the image bytes, create a new image content part and add it to the messages
    AIContent aic = new DataContent(File.ReadAllBytes(framePath), "image/jpeg");
    var message = new ChatMessage(ChatRole.User, [aic]);
    messages.Add(message);
}

// send the messages to the chat client
var completionUpdates = chatClient.GetStreamingResponseAsync(chatMessages: messages);

// print the assistant responses
Console.WriteLine($"\n[Azure OpenAI Services response using Microsoft Extensions for AI]: ");
await foreach (var completionUpdate in completionUpdates)
{
    if (completionUpdate.Contents.Count > 0)
    {
        Console.Write(completionUpdate.Contents[0]);
    }
}