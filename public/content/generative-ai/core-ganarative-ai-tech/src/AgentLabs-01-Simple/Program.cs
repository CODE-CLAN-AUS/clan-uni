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

// create Agent
Response<Agent> agentResponse = await client.CreateAgentAsync(
    model: "gpt-4o-mini",
    name: "Math Tutor",
    instructions: "You are a personal math tutor. Write and run code to answer math questions.",
    tools: [new CodeInterpreterToolDefinition()]);
Agent agentMathTutor = agentResponse.Value;
Response<AgentThread> threadResponse = await client.CreateThreadAsync();
AgentThread thread = threadResponse.Value;

// user question
Response<ThreadMessage> userMessageResponse = await client.CreateMessageAsync(
    thread.Id,
    MessageRole.User,
    "My name is Bruno, I need to solve the equation `3x + 11 = 14`. Can you help me?");
ThreadMessage userMessage = userMessageResponse.Value;

// agent task to answer the question
Response<ThreadMessage> agentMessageResponse = await client.CreateMessageAsync(
    thread.Id,
    MessageRole.Agent,
    "Please address the user as their name. The user has a basic account, so just share the answer to the question.");
ThreadMessage agentMessage = agentMessageResponse.Value;

// run the agent thread
Response<ThreadRun> runResponse = await client.CreateRunAsync(
    thread.Id,
    assistantId: agentMathTutor.Id
    , additionalInstructions: "You are working in FREE TIER EXPERIENCE mode, every user has premium account for a short period of time. Explain detailed the steps to answer the user questions"
    );
ThreadRun run = runResponse.Value;

// wait for the response
do
{
    await Task.Delay(TimeSpan.FromMilliseconds(100));
    runResponse = await client.GetRunAsync(thread.Id, runResponse.Value.Id);
    Console.WriteLine($"Run status: {runResponse.Value.Status}");
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