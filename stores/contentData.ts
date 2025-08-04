import { defineStore } from 'pinia';
import { createFilesArray, createTree, ITreeNodesToDataNodes } from '../composables/useTree';
import type { ITreeNode } from '../types/ITreeNode';
import type { DataNode } from 'ant-design-vue/es/tree';
import type { ContentItem } from "../types/contentItem";

export const useContentData = defineStore('contentData', {
  state: () => ({
    coursesTree: [] as DataNode[],
    treeData: [] as ITreeNode[],
    filesArray: [] as string[],
    contents: [] as ContentItem[],
  }),
  actions: {
    set(allContent: ContentItem[] | null) {

      this.contents = allContent || [];
      const treeData = createTree(allContent)
      this.filesArray = createFilesArray(allContent)
      this.coursesTree = ITreeNodesToDataNodes(treeData)
      this.treeData = treeData
    },
  },
});
