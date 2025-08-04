import type { ParsedContentv2 } from '@nuxt/content';

export interface ITreeNode extends ParsedContentv2 {
  children?: ITreeNode[];
}