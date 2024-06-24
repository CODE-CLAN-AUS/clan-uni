import { defineStore } from 'pinia';
import { createFilesArray, createTree, ITreeNodesToDataNodes } from '~/src/helpers/treeMaker';
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
import type { ITreeNode } from '~/src/interfaces/ITreeNode';
import type { DataNode } from 'ant-design-vue/es/tree';

export const useContentData = defineStore('contentData', {
  state: () => ({
    coursesTree: [] as DataNode[],
    treeData: [] as ITreeNode[],
    filesArray: [] as string[],
  }),
  actions: {
    set(allContent: ParsedContent[] | null) {
      const treeData = createTree(allContent)
      this.filesArray = createFilesArray(allContent)
      this.coursesTree = ITreeNodesToDataNodes(treeData)
      this.treeData = treeData
    },
  },
});
