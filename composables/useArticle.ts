

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
  type: "root" | "element" | "minimal";
  body?: ContentNode;
}

interface TextNode {
  type: "text";
  value: string;
}
type ContentNode = [
  string, // Tag name (e.g., "h1", "p", "ul", "a")
  { [key: string]: any }, // Attributes (e.g., id, href, rel)
      string | ContentNode[] // Content (string or nested nodes)
];
type Node = Element | TextNode;
function countWordsInBody(content): number {
  function countWordsInNode(node: ContentNode): number {
    const [, , content] = node;

    if (typeof content === 'string') {
      // Split on whitespace and filter out empty strings
      return content.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    if (Array.isArray(content)) {
      // Recursively count words in nested nodes
      return content.reduce((total, childNode) => total + countWordsInNode(childNode), 0);
    }

    return 0;
  }

  // Sum words across all nodes in the body
  return content.reduce((total, node) =>{
    try {
      return total + countWordsInNode(node)
    } catch(e) {
      return total;
    }
  } , 0);
}
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

  function traverse(node: any) {

    if (node.type === "text") {
      // Extract text content from text nodes
      wordCount += node.value.split(/\s+/).length;
    } else if(node.type === 'minimal') {
      wordCount = countWordsInBody(node.value as any);
    }
  }


  traverse(tree);

  const wordsPerMinute = 183;
  return Math.ceil(wordCount / wordsPerMinute);
}
