function plain(el) {
  return (el?.textContent || '').replace(/\s+/g, ' ').trim();
}

/**
 * Document Authoring stores each line in its own cell. Local preview keeps
 * them together in one cell. Both shapes have to yield the same pieces.
 * @param {Element} row Block row
 * @returns {Element[]}
 */
function itemsOf(row) {
  const cells = [...row.children];
  if (cells.length === 1 && cells[0].children.length) return [...cells[0].children];
  return cells.length ? cells : [row];
}

function imageOf(item) {
  if (item.tagName === 'IMG') return item;
  return item.querySelector('img');
}

function wordsOf(item) {
  if (imageOf(item)) return '';
  return plain(item);
}

function buildHero(row) {
  const hero = document.createElement('div');
  hero.className = 'set-hero';
  const copy = document.createElement('div');
  copy.className = 'set-hero-copy';
  const intro = document.createElement('div');
  intro.className = 'set-intro-band';
  const texts = [];

  itemsOf(row).forEach((item) => {
    const img = imageOf(item);
    if (img && !hero.querySelector('.set-photo')) {
      const photo = document.createElement('div');
      photo.className = 'set-photo';
      photo.append(img.closest('picture') || img);
      hero.append(photo);
      return;
    }
    const heading = item.matches('h1') ? item : item.querySelector('h1');
    if (heading) {
      heading.className = 'set-title';
      copy.append(heading);
      return;
    }
    const text = wordsOf(item);
    if (!text) return;
    const p = document.createElement('p');
    p.textContent = text;
    texts.push(p);
  });

  if (texts[0]) {
    texts[0].className = 'set-line';
    copy.append(texts[0]);
  }
  if (texts[1]) {
    texts[1].className = 'set-kicker';
    copy.append(texts[1]);
  }
  texts.slice(2).forEach((p) => {
    p.className = 'set-intro';
    intro.append(p);
  });
  hero.append(copy);
  return { hero, intro };
}

function buildGame(row, index) {
  const game = document.createElement('article');
  game.className = 'set-game';
  if (index % 2) game.classList.add('is-flip');
  game.id = `game${index + 1}`;

  const copy = document.createElement('div');
  copy.className = 'set-copy';
  const photos = document.createElement('div');
  photos.className = 'set-photos';
  const texts = [];
  let title = '';

  itemsOf(row).forEach((item) => {
    const img = imageOf(item);
    if (img && !wordsOf(item)) {
      photos.append(img.closest('picture') || img);
      return;
    }
    const heading = item.matches('h2') ? item : item.querySelector('h2');
    if (heading) {
      heading.className = 'set-game-title';
      title = plain(heading);
      copy.append(heading);
      return;
    }
    const text = wordsOf(item);
    if (!text) return;
    const p = document.createElement('p');
    p.textContent = text;
    texts.push(p);
  });

  const label = texts.find((p) => /^game\s/i.test(p.textContent));
  const rest = texts.filter((p) => p !== label);
  const move = rest.pop();
  if (label) {
    label.className = 'set-label';
    copy.prepend(label);
  }
  rest.forEach((p) => {
    p.className = 'set-body';
    copy.append(p);
  });
  if (move) {
    move.className = 'set-move';
    const kicker = document.createElement('span');
    kicker.textContent = 'Your move';
    move.prepend(kicker);
    copy.append(move);
  }

  const layout = document.createElement('div');
  layout.className = 'set-layout';
  if (photos.childElementCount) layout.append(photos);
  layout.append(copy);
  game.append(layout);

  const card = photos.querySelector('img');
  return {
    id: game.id,
    title,
    cell: game,
    image: card ? card.getAttribute('src') : '',
  };
}

function buildClose(row) {
  const close = document.createElement('div');
  close.className = 'set-close';
  itemsOf(row).forEach((item) => {
    const heading = item.matches('h2') ? item : item.querySelector('h2');
    if (heading) {
      heading.className = 'set-close-title';
      close.append(heading);
      return;
    }
    const link = item.querySelector('a');
    if (link && plain(link) && plain(item) === plain(link)) {
      link.classList.add('set-more');
      close.append(link);
      return;
    }
    const text = wordsOf(item);
    if (!text) return;
    const p = document.createElement('p');
    p.textContent = text;
    close.append(p);
  });
  const kicker = close.querySelector('p');
  if (kicker) kicker.className = 'set-close-kicker';
  return close;
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
    if (game.image) {
      a.style.backgroundImage = `linear-gradient(180deg, rgba(0, 12, 60, 0.15), rgba(0, 12, 60, 0.72)), url("${game.image}")`;
    }
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
 * Champion's Set: full-bleed hero, six-game index, and a chapter for each game.
 * @param {Element} block Set block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const { hero, intro } = buildHero(rows[0]);
  const close = buildClose(rows[rows.length - 1]);
  const games = rows.slice(1, -1).map((row, index) => buildGame(row, index));
  const index = buildIndex(games);
  block.replaceChildren(hero, intro, index, ...games.map((game) => game.cell), close);
}
