using Microsoft.Extensions.AI;

// you can test with the models "phi4-mini" or "llama3.2"
// to test other models you can download them with the command "ollama pull <modelId>"
// in example: "ollama pull deepseek-r1" or "ollama pull phi3.5"
IChatClient client =
    new OllamaChatClient(new Uri("http://localhost:11434/"), "phi4-mini");

var response = client.GetStreamingResponseAsync("What is AI?");
await foreach (var item in response)
{
    Console.Write(item);
}