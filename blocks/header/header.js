const EXCHANGE = 'https://tennispartner.com.au/ao-exchange';

const LINKS = [
  { href: EXCHANGE, label: 'Home' },
  { href: `${EXCHANGE}/agenda`, label: 'Agenda' },
  { href: `${EXCHANGE}/speakers`, label: 'Speakers' },
];

/**
 * Builds the fixed pill navigation. Links match the live Reset page,
 * which points Home, Agenda, Speakers and Register now at AO Exchange.
 * @param {Element} block Header block
 */
export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.className = 'nav-pill';
  nav.setAttribute('aria-label', 'Australian Open');

  const brand = document.createElement('a');
  brand.className = 'nav-brand';
  brand.href = EXCHANGE;
  brand.innerHTML = '<img src="/media/ao-logo.png" alt="Australian Open">';

  const links = document.createElement('div');
  links.className = 'nav-links';
  LINKS.forEach((item, index) => {
    if (index > 0) {
      const dot = document.createElement('span');
      dot.className = 'nav-dot';
      dot.setAttribute('aria-hidden', 'true');
      links.append(dot);
    }
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    links.append(a);
  });

  const cta = document.createElement('a');
  cta.className = 'nav-cta';
  cta.href = `${EXCHANGE}#form`;
  cta.textContent = 'Register now';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.innerHTML = '<span></span><span></span>';
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  nav.append(brand, links, cta, toggle);
  block.replaceChildren(nav);
}
