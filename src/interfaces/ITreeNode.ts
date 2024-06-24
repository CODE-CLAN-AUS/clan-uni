import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

export interface ITreeNode extends ParsedContent {
  children?: ITreeNode[];
}