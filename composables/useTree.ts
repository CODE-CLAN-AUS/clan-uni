import type { ParsedContent } from '@nuxt/content';
import type { ITreeNode } from '../types/ITreeNode';
import type { DataNode } from 'ant-design-vue/es/tree';

export function createTree(allContent: ParsedContent[] | null): ITreeNode[] {
  if (!allContent) {
    return [] as ITreeNode[];
  }

  const tree: ITreeNode[] = []
  const allPaths: string[] = allContent.map(x => x._path).filter(x => !!x) as string[]

  allPaths.forEach((path) => {
    const pathParts = path.split('/').filter((part) => part !== '') // Split path into parts

    let currentNode = tree
    let currentPath = ''

    pathParts.forEach((part) => {
      currentPath += `/${part}`

      // Check if current path exists in the tree
      const existingNode = currentNode.find((node: ITreeNode) => node._path === currentPath)

      if (!existingNode) {
        const newNode = {
          title: part,
          _id: currentPath,
          _path: currentPath,
          body: null,
          children: [] as ITreeNode[],
        }

        currentNode.push(newNode)
        currentNode = newNode.children
      } else if (existingNode.children) {
        currentNode = existingNode.children
      }
    })
  })

  return tree
}

export function createFilesArray(allContent: ParsedContent[] | null): string[] {
  if (!allContent) {
    return [] as string[];
  }

  return allContent.map(x => x._path).filter(x => !!x) as string[]
}

export function ITreeNodesToDataNodes(treeNodes: ITreeNode[]): DataNode[] {
  return treeNodes.map((node) => {
    const output: DataNode = {
      title: node.title,
      key: node._path ? node._path : node._id,
    }

    if (node.children) {
      output.children = ITreeNodesToDataNodes(node.children)
    }

    return output
  })
}