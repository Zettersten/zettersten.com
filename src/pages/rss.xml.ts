import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { compareBlogPostsByDateThenTitle } from '../utils/blog';

export async function GET(context: { site?: string }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    compareBlogPostsByDateThenTitle,
  );

  return rss({
    title: 'Erik Zettersten — Blog',
    description: 'Thoughts on AI engineering, product strategy, and leadership.',
    site: context.site ?? 'https://zettersten.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id.replace(/\.mdx?$/, '')}/`,
    })),
  });
}
