using Azure;
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Extensions.Configuration;

// Create Agent Client
var config = new ConfigurationBuilder().AddUserSecrets<Program>().Build();
var options = new DefaultAzureCredentialOptions
{
    ExcludeEnvironmentCredential = true,
    ExcludeWorkloadIdentityCredential = true,
    TenantId = config["tenantid"]
};
var connectionString = config["connectionString"];
AgentsClient client = new AgentsClient(connectionString, new DefaultAzureCredential(options));

var parksInfoSpec = File.ReadAllText(@"./specs/parksinformationopenapi.json");
OpenApiAnonymousAuthDetails oaiAuth = new();

OpenApiToolDefinition parksinformationOpenApiTool = new(
    name: "get_park_information",
    description: "Retrieve parks information for a location",
    spec: BinaryData.FromString(parksInfoSpec), 
    auth: oaiAuth
);


// create Agent
Response<Agent> agentResponse = await client.CreateAgentAsync(
    model: "gpt-4o-mini",
    name: "SDK Test Agent - Vacation",
    instructions: @"You are a travel assistant. Use the provided functions to help answer questions. 
Customize your responses to the user's preferences as much as possible. Write and run code to answer user questions.",
    tools: new List<ToolDefinition> { parksinformationOpenApiTool }
    );
Agent agentTravelAssistant = agentResponse.Value;
Response<AgentThread> threadResponse = await client.CreateThreadAsync();
AgentThread thread = threadResponse.Value;

// user question
Response<ThreadMessage> userMessageResponse = await client.CreateMessageAsync(
    thread.Id,
    MessageRole.User,
    "My name is Bruno, I want to know the weather in Seattle, and also information from the parks in the city");
ThreadMessage userMessage = userMessageResponse.Value;

// agent task to answer the question
Response<ThreadMessage> agentMessageResponse = await client.CreateMessageAsync(
    thread.Id,
    MessageRole.Agent,
    "Please address the user as their name and answer the user questions.");
ThreadMessage agentMessage = agentMessageResponse.Value;

// run the agent thread
Response<ThreadRun> runResponse = await client.CreateRunAsync(
    thread.Id,
    assistantId: agentTravelAssistant.Id);
ThreadRun run = runResponse.Value;

// wait for the response
do
{
    await Task.Delay(TimeSpan.FromMilliseconds(500));
    runResponse = await client.GetRunAsync(thread.Id, runResponse.Value.Id);
    Console.WriteLine($"Run status: {runResponse.Value.Status}");

    if (runResponse.Value.Status == RunStatus.Failed)
    {
        Console.WriteLine($"Error Message: {runResponse.Value.LastError.Message}");
        Console.WriteLine($"Error Code: {runResponse.Value.LastError.Code}");
        Console.WriteLine($"Error ToString: {runResponse.Value.LastError.ToString()}");
    }
}
while (runResponse.Value.Status == RunStatus.Queued
    || runResponse.Value.Status == RunStatus.InProgress);

// show the response
Response<PageableList<ThreadMessage>> afterRunMessagesResponse = await client.GetMessagesAsync(thread.Id);
IReadOnlyList<ThreadMessage> messages = afterRunMessagesResponse.Value.Data;

// sort the messages by creation date
messages = messages.OrderBy(m => m.CreatedAt).ToList();

// Note: messages iterate from newest to oldest, with the messages[0] being the most recent
foreach (ThreadMessage threadMessage in messages)
{
    Console.Write($"{threadMessage.CreatedAt:yyyy-MM-dd HH:mm:ss} - {threadMessage.Role,10}: ");
    foreach (MessageContent contentItem in threadMessage.ContentItems)
    {
        if (contentItem is MessageTextContent textItem)
        {
            Console.Write(textItem.Text);
        }
        else if (contentItem is MessageImageFileContent imageFileItem)
        {
            Console.Write($"<image from ID: {imageFileItem.FileId}");
        }
        Console.WriteLine();
    }
}

