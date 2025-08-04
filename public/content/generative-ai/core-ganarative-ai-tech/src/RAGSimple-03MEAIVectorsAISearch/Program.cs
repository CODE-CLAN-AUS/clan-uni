﻿using Microsoft.Extensions.AI;
using Microsoft.Extensions.VectorData;
using Azure;
using Azure.Search.Documents.Indexes;
using Microsoft.SemanticKernel.Connectors.AzureAISearch;
using Microsoft.Extensions.Configuration;
using Azure.Identity;

// get the search index client using Azure Default Credentials or Azure Key Credential with the service secret
var client = GetSearchIndexClient();
var vectorStore = new AzureAISearchVectorStore(searchIndexClient: client);

// get movie list
var movies = vectorStore.GetCollection<string, MovieVector<string>>("movies");
await movies.CreateCollectionIfNotExistsAsync();
var movieData = MovieFactory<string>.GetMovieVectorList();

// get embeddings generator and generate embeddings for movies
IEmbeddingGenerator<string, Embedding<float>> generator =
    new OllamaEmbeddingGenerator(new Uri("http://localhost:11434/"), "all-minilm");
foreach (var movie in movieData)
{
    movie.Vector = await generator.GenerateEmbeddingVectorAsync(movie.Description);
    await movies.UpsertAsync(movie);
}

// creates a list of questions
var questions = new List<(string Question, int ResultCount)>
{
    ("A family friendly movie that includes ogres and dragons", 1),
    ("Movie released in year 1999 and 2003", 3),
    ("Una pelicula de ciencia ficcion", 1)
};

foreach (var question in questions)
{
    await SearchMovieAsync(question.Question, question.ResultCount);
}
async Task SearchMovieAsync(string question, int resultCount) 
{
    Console.WriteLine($"====================================================");
    Console.WriteLine($"Searching for: {question}");
    Console.WriteLine();

    // perform the search
    var queryEmbedding = await generator.GenerateEmbeddingVectorAsync(question);

    var searchOptions = new VectorSearchOptions()
    {
        Top = resultCount,
        VectorPropertyName = "Vector"
    };

    var results = await movies.VectorizedSearchAsync(queryEmbedding, searchOptions);
    await foreach (var result in results.Results)
    {
        Console.WriteLine($">> Title: {result.Record.Title}");
        Console.WriteLine($">> Year: {result.Record.Year}");
        Console.WriteLine($">> Description: {result.Record.Description}");
        Console.WriteLine($">> Score: {result.Score}");
        Console.WriteLine();
    }
    Console.WriteLine($"====================================================");
    Console.WriteLine();
}
SearchIndexClient GetSearchIndexClient()
{
    var config = new ConfigurationBuilder().AddUserSecrets<Program>().Build();
    var azureAISearchUri = config["AZURE_AISEARCH_URI"];

    var credential = new DefaultAzureCredential();
    var client = new SearchIndexClient(new Uri(azureAISearchUri), credential);
    var secret = config["AZURE_AISEARCH_SECRET"];

    if (!string.IsNullOrEmpty(secret))
    {
        client = new SearchIndexClient(new Uri(azureAISearchUri), new AzureKeyCredential(secret));
    }
    
    return client;
}
