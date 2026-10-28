/**
 * Prize hero: wordmark, headline, entry copy, and the Typeform draw.
 * The second row is a link to the Typeform; it is replaced with the embed.
 * @param {Element} block Hero block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const copy = rows[0];
  if (copy) copy.className = 'hero-copy';
  const wordmark = copy?.querySelector('img');
  if (wordmark) wordmark.className = 'hero-wordmark';

  const formRow = rows[1];
  const link = formRow?.querySelector('a[href]');
  if (!formRow || !link) return;

  formRow.className = 'hero-form';
  const frame = document.createElement('iframe');
  frame.className = 'hero-typeform';
  frame.src = link.href;
  frame.title = 'Enter the AO prize draw';
  frame.loading = 'lazy';
  const cell = formRow.querySelector(':scope > div') || formRow;
  cell.replaceChildren(frame);
}
