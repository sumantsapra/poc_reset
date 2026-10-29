/**
 * Entry list for the four Tennis Partner microsites.
 * @param {Element} block Hub block
 */
export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block;
  cell.className = 'hub-sheet';
  const title = cell.querySelector('h1');
  if (title) title.className = 'hub-title';
  const links = document.createElement('div');
  links.className = 'hub-list';
  cell.querySelectorAll('a').forEach((a) => links.append(a));
  cell.querySelectorAll('p').forEach((p) => {
    if (!p.textContent.trim() && !p.querySelector('a')) p.remove();
  });
  cell.append(links);
  block.replaceChildren(cell);
}
