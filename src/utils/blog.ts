export function compareBlogPostsByDateThenTitle(
  a: { data: { date: Date; title: string } },
  b: { data: { date: Date; title: string } },
) {
  const byDate = b.data.date.getTime() - a.data.date.getTime();
  if (byDate !== 0) return byDate;
  return a.data.title.localeCompare(b.data.title);
}
