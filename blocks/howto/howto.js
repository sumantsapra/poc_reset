/**
 * Future Champions eligibility and trip details.
 * @param {Element} block How-to block
 */
export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block;
  cell.className = 'howto-sheet';
  const title = cell.querySelector('h1');
  if (title) title.className = 'howto-title';
  const heading = cell.querySelector('h2');
  if (heading) heading.className = 'howto-heading';
  block.replaceChildren(cell);
}
