---
title: What are Web Components?
author: Masoud Alemi
github: iMasoud
tags: web components, front end
cover: /media/web-components/images/what-are-web-components.jpeg
---

In 2004, Gmail revolutionized the web platform — could we be on the cusp of another major shift? Perhaps this time, it will be a transformation that relies on less JavaScript.
<!--more-->
### The Dawn of AJAX and SPAs

The landscape of web development has undergone a seismic shift over the past two decades, with the advent of AJAX and the proliferation of JavaScript libraries fundamentally altering how we interact with the web. This evolution can be traced back to a pivotal moment in the early 2000s when Gmail was launched, utilizing AJAX to create a user experience that felt more like an application than a series of web pages. This marked the beginning of what we now refer to as Single Page Applications (SPAs).

Gmail's use of AJAX was revolutionary for its time. It allowed for asynchronous data fetching, which meant that the page didn't need to be reloaded to update the content. This approach not only improved the user experience by making it smoother and more responsive but also set the stage for the web 2.0 era, characterized by interactive, dynamic websites that could update content without a full page reload.

The success of Gmail's AJAX-based interface inspired a wave of innovation, leading to the development of more complex web applications. Developers began to see the potential of AJAX to create rich, engaging user experiences, and this led to the widespread adoption of the technology in web development.

### The Rise of JavaScript Libraries

As web applications grew in complexity, so did the need for more structured ways to manage the growing codebase. This need gave rise to JavaScript libraries like React, which provided developers with a way to build user interfaces using reusable components. React, in particular, gained popularity for its virtual DOM, which optimized performance by minimizing the number of updates to the actual DOM.

The introduction of these libraries marked a significant shift in web development practices. They allowed for the creation of SPAs that were not only fast and efficient but also easier to maintain and scale. The component-based architecture of libraries like React made code more reusable and paved the way for a more modular approach to building web applications.

### The Case for Web Components

Despite the advantages of SPAs and JavaScript libraries, there are inherent issues that developers face, such as SEO challenges, increased complexity, and potential performance bottlenecks. These challenges have led some in the developer community to advocate for a "correction of course" towards web components.

Web components offer a standards-based way of creating reusable custom elements, independent of any specific JavaScript library or framework. They provide encapsulation and interoperability, which means they can work across different browsers and can be used with any JavaScript library or even with vanilla JavaScript.

One of the key advantages of web components over SPAs based on JavaScript libraries is their lightweight nature. Without the overhead of a framework, web components can lead to faster load times and better performance, especially on mobile devices where resources are more limited.

Moreover, web components align closely with the web's native APIs, making them a more future-proof choice as they are less likely to be affected by the shifting trends in JavaScript library popularity. They also offer better compatibility with SEO practices, as they can be rendered server-side, and their content is more easily indexed by search engines.

### Adoption by Industry Leaders

Perhaps GitHub and Microsoft have been at the forefront of embracing Web Components to enhance performance and user experience. Microsoft's FAST initiative showcases this commitment.

The FAST library offers a lightweight solution for building performant, memory-efficient, and standards-compliant Web Components that function seamlessly across all major browsers. It enables developers to create reusable UI components with `@microsoft/fast-element`, which can be integrated with any library or framework, or even used without one.

The 2023 State of Web Components report highlights the adoption of these standards by industry giants, including Microsoft, which has seen a 30%-50% performance improvement in MSN by switching from React to Fluent UI Web Components based on FAST. This is a testament to the potential of Web Components in delivering faster and more responsive web applications.

GitHub's adoption of Web Components, as detailed in their blog, further underscores the advantages they offer over traditional JavaScript behaviors. The encapsulation and portability provided by Web Components have allowed GitHub to create more modular and maintainable codebases.

For developers accustomed to libraries like React or Vue.js, the transition to Web Components may seem daunting. However, the benefits of improved performance, standards compliance, and the ability to work across different frameworks make it a worthwhile endeavor. As the web continues to mature, the shift towards Web Components is a clear step towards a more open and interoperable web ecosystem.

### Conclusion

The journey from Gmail's AJAX-based interface to the modern landscape of web components highlights the constant evolution of web development. While SPAs and JavaScript libraries like React have played a crucial role in shaping the web, the move towards web components represents a shift towards more sustainable, standards-based development practices.

For developers, the choice between continuing with SPAs or embracing web components will depend on the specific needs of their projects. However, the trend towards web components suggests a growing recognition of the need for more lightweight, interoperable, and maintainable approaches to building web applications.

**Intrigued? Then stay tuned!** As in the next chapter we'll dive into the building blocks of a web component that empowers you to build your own!