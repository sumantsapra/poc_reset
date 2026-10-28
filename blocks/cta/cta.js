/**
 * Closing line and contact button.
 * @param {Element} block CTA block
 */
export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block;
  cell.classList.add('cta-inner');
}
