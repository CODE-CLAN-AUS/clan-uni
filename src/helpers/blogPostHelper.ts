/**
 * Maps input strings to their corresponding outputs.
 * @param input The input string
 * @returns The corresponding output string
 */
export function subpathToTitle(input: string): string {
  // Split the input by hyphens and capitalize each word
  const words = input.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
}

interface Element {
  type: "root" | "element";
  tag: string;
  props?: any;
  children: Node[];
}

interface TextNode {
  type: "text";
  value: string;
}

type Node = Element | TextNode;

/**
 * Calculates amount of time it takes to read input markdown.
 * @param tree Markdown content
 * @returns Amount of time in minutes to read the content
 */
export function calculateReadTime(tree?: Element): number {
  if (!tree) {
    return 0;
  }

  let wordCount = 0;

  function traverse(node: Node) { // Changed parameter type to Node
    if (node.type === "text") {
      // Extract text content from text nodes
      wordCount += node.value.split(/\s+/).length;
    } else {
      // Recursively traverse child nodes for elements
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(tree);

  const wordsPerMinute = 183;
  return Math.ceil(wordCount / wordsPerMinute);
}
