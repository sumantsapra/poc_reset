function plain(el) {
  return (el?.textContent || '').replace(/\s+/g, ' ').trim();
}

function buildHero(row) {
  const cell = row.querySelector(':scope > div') || row;
  cell.className = 'set-hero';
  const picture = [...cell.children].find((el) => el.querySelector('img'));
  if (picture) picture.className = 'set-photo';
  const title = cell.querySelector('h1');
  if (title) title.className = 'set-title';
  const paragraphs = [...cell.querySelectorAll(':scope > p')].filter((p) => !p.querySelector('img'));
  if (paragraphs[0]) paragraphs[0].className = 'set-line';
  if (paragraphs[1]) paragraphs[1].className = 'set-kicker';
  paragraphs.slice(2).forEach((p) => p.classList.add('set-intro'));
  return cell;
}

function buildGame(row, index) {
  const cell = row.querySelector(':scope > div') || row;
  cell.className = 'set-game';
  cell.id = `game${index + 1}`;
  const picture = [...cell.children].find((el) => el.querySelector('img'));
  if (picture) picture.className = 'set-photo';
  const label = [...cell.querySelectorAll('p')].find((p) => /^game\s/i.test(plain(p)));
  if (label) label.className = 'set-label';
  const title = cell.querySelector('h2');
  if (title) title.className = 'set-game-title';
  const body = [...cell.querySelectorAll(':scope > p')].filter((p) => p !== label && !p.querySelector('img'));
  const move = body.pop();
  body.forEach((p) => p.classList.add('set-body'));
  if (move) {
    move.className = 'set-move';
    const kicker = document.createElement('span');
    kicker.textContent = 'Your move';
    move.prepend(kicker);
  }
  return { id: cell.id, title: title ? plain(title) : '', cell };
}

function buildClose(row) {
  const cell = row.querySelector(':scope > div') || row;
  cell.className = 'set-close';
  const link = cell.querySelector('a');
  if (link) link.classList.add('set-more');
  return cell;
}

function buildIndex(games) {
  const nav = document.createElement('nav');
  nav.className = 'set-index';
  nav.setAttribute('aria-label', "The Champion's Set");
  const heading = document.createElement('p');
  heading.className = 'set-index-label';
  heading.textContent = "The Champion's Set — 6 Games";
  const list = document.createElement('ol');
  games.forEach((game, index) => {
    const item = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${game.id}`;
    const num = document.createElement('span');
    num.textContent = String(index + 1);
    const label = document.createElement('span');
    label.textContent = game.title.replace(/\.$/, '');
    a.append(num, label);
    item.append(a);
    list.append(item);
  });
  nav.append(heading, list);
  return nav;
}

/**
 * Champion's Set: hero, six-game index, and a chapter for each game.
 * @param {Element} block Set block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const hero = buildHero(rows[0]);
  const close = buildClose(rows[rows.length - 1]);
  const games = rows.slice(1, -1).map((row, index) => buildGame(row, index));
  block.replaceChildren(hero, buildIndex(games), ...games.map((game) => game.cell), close);
}
