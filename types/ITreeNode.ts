import type { ParsedContent } from '@nuxt/content';

export interface ITreeNode extends ParsedContent {
  children?: ITreeNode[];
}