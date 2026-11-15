---
title: "Build an ASP.NET Core Minimal API"
description: "Create and test a small local JSON API with typed data and explicit response statuses."
tags: ["ASP.NET Core","C#"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Create and test a small local JSON API with typed data and explicit response statuses.

<!--more-->

**Prerequisites** — .NET 10 SDK and curl. On Windows, use `curl.exe`. Run `dotnet new web -n WorkshopApi` and enter the project directory.

## Map URLs to resources

Replace `Program.cs` with this file. The route parameter is an integer and the handler finds the matching workshop using its ID.

```csharp
var app = WebApplication.Create(args);

Workshop[] workshops = [new(1, "Bike repair"), new(2, "Basic sewing")];

app.MapGet("/workshops", () => workshops);
app.MapGet("/workshops/{id:int}", (int id) =>
{
    var workshop = Array.Find(workshops, item => item.Id == id);
    return workshop is null
        ? Results.NotFound()
        : Results.Ok(workshop);
});

app.Run();

record Workshop(int Id, string Name);
```

## Compare successful and missing resources

Run `dotnet run --no-launch-profile --urls http://127.0.0.1:5080`. In a second terminal request `http://127.0.0.1:5080/workshops` using `curl -i`. Expect a JSON array with two records. Request `/workshops/2` and expect 200 with Basic sewing. Request `/workshops/9` and expect 404.

## Notice where routing ends and the handler begins

The route constraint filters out paths such as `/workshops/abc`. A path with a valid integer reaches the handler, even when the ID does not exist. The two cases can both produce 404 for different reasons.

## Practice and check

Add a Boolean field named `HasOpenSeats`. Add a GET endpoint at `/workshops/open` returning only workshops with seats. Seed a row for each Boolean value and verify the original detail route still returns the closed workshop.

## Sources

Original lesson text and examples. The following references informed this course.

- Microsoft and contributors, [ASP.NET Core Minimal APIs quick reference](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-10.0) · [ASP.NET Core documentation license](https://github.com/dotnet/AspNetCore.Docs/blob/main/LICENSE).
