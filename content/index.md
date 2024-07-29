---
title: Welcome to CODE CLAN University
author: Pouria Rabeti
tags: Internal
---
# Welcome to CODE CLAN University
Imagine a world where anyone, regardless of their financial means or location, can access quality coding courses and education material.  This project embodies the true spirit of collaboration and is a shining example of the power of open source to drive positive change in the world of programming. 

If you want to share an educational material that is related to programming by any means, we encourage and appreciate your contribution to this project.

## What type of material is suitable
Any educational material that is somehow related to the world of computer software or hardware.

## How to Contribute

We welcome contributions in the form of articles, tutorials, and more. Follow the steps below to get started:

### 1. Fork the Repository

1. Navigate to our [GitHub repository](https://github.com/CODE-CLAN-AUS/clan-uni).
2. Click the **Fork** button in the top right corner to create your own copy of the repository.

### 2. Clone Your Fork

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/your-repo-name.git
```

### 3. Create a New Branch

Create a new branch for your content. It’s good practice to name your branch based on the content you are adding, e.g., `add-python-course`.

```bash
cd your-repo-name
git checkout -b add-python-course
```

### 4. Write Your Content

Add your content in the appropriate directory. Our content is organized using the Nuxt Content module. Here’s a basic structure:

```
content/
└── course-name/
    └── index.md
    └── lesson-one-name.md
    └── lesson-two-name.md
```

Create a new directory or new Markdown files anywhere in the `content/` directory.

#### Markdown Guide

- Use `#` for headings.
- Use `**bold**` or `*italic*` for emphasis.
- Create lists using `-` or `1.` for ordered lists.
- Embed code blocks using triple backticks (```) for syntax highlighting.

Here’s an example Markdown template:

```markdown
---
title: "Your Article Title"
description: "A brief description of your article"
tags: ["tag1", "tag2"]
---

# Your Article Title

Introduction paragraph.

## Subheading

Your content here.
```

### 5. Preview Your Changes

To preview your changes locally, follow these steps:

1. Install dependencies if you haven't already:

    ```bash
    npm install
    ```

2. Start the development server:

    ```bash
    npm run dev
    ```

3. Open your browser and go to `http://localhost:3000` to see your changes.

### 6. Commit Your Changes

Once you are satisfied with your content, commit your changes:

```bash
git add .
git commit -m "Add article on [your topic]"
```

### 7. Push Your Changes

Push your changes to your forked repository:

```bash
git push origin add-python-course
```

### 8. Create a Pull Request

Navigate to your forked repository on GitHub and click the **New pull request** button. Compare your branch with the original repository's `main` branch. Submit the pull request with a descriptive message about your content.

### 9. Netlify Deployment Preview

Once you submit your pull request, our CI/CD pipeline managed by Netlify will automatically kick in. Netlify bot will:

- Check the proposed changes.
- If everything is fine, deploy the changes to a preview environment.
- Post a link to the preview deployment in the pull request.

You can use this preview link to review your changes. If you are not satisfied, you can make additional commits to your branch. Netlify will keep checking and redeploying the changes until you are happy with the results.

### 10. Review and Merge

After you are satisfied with your changes in the preview deployment, our team will review your pull request. We may suggest some changes or improvements. Once everything is approved, we will merge your changes into the main branch and they will be live on the website.

## Community Guidelines

- Ensure your content is original and well-written.
- Provide clear and concise information.
- Respect all contributors and community members.

Thank you for your contribution! Your effort helps create a valuable resource for the community.

If you have any questions, feel free to reach out to us at [contact@codeclan.org](mailto:contact@codeclan.org) or open an issue in the repository.

Happy contributing!
