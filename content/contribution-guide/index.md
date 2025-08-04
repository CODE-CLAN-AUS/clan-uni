---
title: Markdown Guide for Contributors
description: A markdown and content authoring guide for people who want to contribute to CLAN UNI!
tags: ["markdown", "CLAN UNI", "Intenral"]
author: Masoud Alemi
github: iMasoud 
---

## 1. Front-matter
Every Markdown file should start with a Front-matter section. This is where you provide meta-data for the page, such as the title, description, tags, author name, and GitHub username. The Front-matter is written in YAML syntax with key-value pairs.

### Example:

```yaml
---
title: Your Article Title
description: A brief description of your article
tags: ["tag1", "tag2"]
author: Your Name
github: YourGitHubUsername
---
Markdown content here...
```

### Keys Explained:
- **title**: The title of your article.
- **description**: A brief description of your article.
- **tags**: A string array of the tags relevant to the content.
- **author**: The name of the author of the content.
- **github**: The GitHub username of author of the content.
- **cover**: Path of an image you've placed in a subdirectory within `public/media` of the repository to use as article cover photo. It should start with `/media/`.

## 2. Content Excerpt
It's recommended that your content includes an excerpt or summary. You can create an excerpt by using `<!--more-->` as a divider within your content. The excerpt is the content before the `<!--more-->` tag.

### Example:

```markdown
# Your Article Title

Learn how to use...
<!--more-->
Full amount of content beyond the more divider.
```

## 3. Headings
Use the `#` symbol to create headings. The number of `#` symbols represents the heading level.

```markdown
# Heading 1
## Heading 2
### Heading 3
```

## 4. Bold and Italic Text
To make text **bold**, wrap it with `**` or `__`.

```markdown
**Bold Text**
__Bold Text__
```

To make text *italic*, wrap it with `*` or `_`.

```markdown
*Italic Text*
_Italic Text_
```

You can also combine both for ***bold and italic*** text.

```markdown
***Bold and Italic Text***
```

## 5. Lists
### 5.1 Unordered Lists
Create unordered lists using `*`, `+`, or `-` followed by a space.

```markdown
* Item 1
* Item 2
  * Subitem 2.1
  * Subitem 2.2
```

### 5.2 Ordered Lists
Create ordered lists using numbers followed by a period and a space.

```markdown
1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2
```

## 6. Links
To create a link, wrap the link text in `[ ]` and the URL in `( )`.

```markdown
[Link Text](https://example.com)
```

## 7. Images
To add images, place them in a subdirectory within `public/media` of the repository and use the following format:

```markdown
![Alt Text](/path/to/image.png)
```

Example:

```markdown
![My Image](/media/course-title/my-image.png)
```

## 8. Code Blocks
To include code in your content, use triple backticks (&#96;&#96;&#96;) before and after the code block. Specify the language for syntax highlighting.
For example, you should put &#96;&#96;&#96;javascript before your javascript code starts and put &#96;&#96;&#96; after it ends.

## 9. Tables
Create tables using pipes `|` and hyphens `-`. Align the text by placing colons `:` in the header row.

```markdown
| Header 1 | Header 2 | Header 3 |
|:-------- |:--------:| --------:|
| Left     | Center   | Right    |
| Content  | Content  | Content  |
```

## 10. Custom Components
### 10.1 Video Player
To include a video in your content, upload it to a subdirectory within `public/media` and use the following component:

```html
<video-player src="/media/course-title/my-lesson.mp4"></video-player>
```

### 10.2 YouTube Videos
To embed a YouTube video, use the following component:

```html
<youtube src="https://www.youtube.com/watch?v=Z0dvAy1puIE"></youtube>
```


Feel free to refer to this guide whenever you need help formatting your content. Happy contributing!