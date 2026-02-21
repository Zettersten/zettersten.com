import { statSync } from 'node:fs';
import { resolve } from 'node:path';

function getPostMtimeMs(id?: string) {
  if (!id) return 0;
  try {
    return statSync(resolve(process.cwd(), 'src/content/blog', id)).mtimeMs;
  } catch {
    return 0;
  }
}

export function compareBlogPostsByDateThenTitle(
  a: { id?: string; data: { date: Date; title: string } },
  b: { id?: string; data: { date: Date; title: string } },
) {
  const byDate = b.data.date.getTime() - a.data.date.getTime();
  if (byDate !== 0) return byDate;

  const byMtime = getPostMtimeMs(b.id) - getPostMtimeMs(a.id);
  if (byMtime !== 0) return byMtime;

  return a.data.title.localeCompare(b.data.title);
}
