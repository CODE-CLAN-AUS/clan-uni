import { defineNuxtModule } from '@nuxt/kit';
import fs from 'fs/promises';
import path from 'path';

async function listFilesInDirectory(directory: string, prefix = '') {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  // Use map() to perform the following actions for each entry in the directory
  const files: any = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.join(prefix, entry.name);

    if (entry.isDirectory()) {
      // If the entry is a directory, recursively list the files in it
      return listFilesInDirectory(fullPath, relativePath);
    } else {
      // If the entry is a file, remove the extension, prepend a slash, and remove number and dot prefix
      const ext = path.extname(entry.name);
      const nameWithoutExtension = path.basename(entry.name, ext);
      const nameWithoutNumberPrefix = nameWithoutExtension.replace(/^\d+\.\s/, '');

      // Check if the name ends with 'index', if so, replace it with '/'
      if (nameWithoutNumberPrefix === 'index') {
        if (prefix.length) {
          return path.join('/', prefix).replace(/\\/g, '/');
        } else {
          return path.join('/', prefix, '/').replace(/\\/g, '/');
        }
      }

      return '/' + path.join(prefix, nameWithoutNumberPrefix).replace(/\\/g, '/');
    }
  }));

  // Flatten the array and return it
  return Array.prototype.concat(...files);
}

export default defineNuxtModule({
  async setup(_moduleOptions, nuxt) {
    const paths = await listFilesInDirectory('./content');
    nuxt.hook('nitro:config', (nitroConfig) => {
      if (nitroConfig && nitroConfig.prerender) {
        nitroConfig.prerender.routes = nitroConfig.prerender.routes || [];
        nitroConfig.prerender.routes?.push(...paths);
      }
    });
  }
});
