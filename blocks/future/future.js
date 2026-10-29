/**
 * Future Champions landing: programme copy, nominate action, and the playbook link.
 * @param {Element} block Future block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const hero = rows[0].querySelector(':scope > div') || rows[0];
  hero.className = 'future-hero';
  const picture = [...hero.children].find((el) => el.querySelector('img'));
  if (picture) picture.className = 'future-photo';
  const title = hero.querySelector('h1');
  if (title) title.className = 'future-title';
  const paragraphs = [...hero.querySelectorAll(':scope > p')].filter((p) => !p.querySelector('img') && !p.querySelector('a'));
  if (paragraphs[0]) paragraphs[0].className = 'future-line';
  if (paragraphs[1]) paragraphs[1].className = 'future-ask';
  paragraphs.slice(2).forEach((p) => p.classList.add('future-body'));
  const nominate = hero.querySelector('a[href*="typeform"]');
  if (nominate) nominate.classList.add('future-cta');
  const how = hero.querySelector('a[href*="how-does-it-work"]');
  if (how) how.classList.add('future-how');

  const more = rows[1].querySelector(':scope > div') || rows[1];
  more.className = 'future-more';
  const read = more.querySelector('a');
  if (read) read.classList.add('future-read');
  block.replaceChildren(hero, more);
}
