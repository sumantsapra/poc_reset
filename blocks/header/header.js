const SITES = {
  'ao-exchange': {
    label: 'AO Exchange',
    brand: '/ao-exchange',
    links: [
      { href: '/ao-exchange', label: 'Home' },
      { href: '/ao-exchange/agenda', label: 'Agenda' },
      { href: '/ao-exchange/speakers', label: 'Speakers' },
    ],
    cta: { href: '/ao-exchange#form', label: 'Register now' },
  },
  reset: {
    label: 'Find your play',
    brand: '/reset',
    links: [
      { href: '/reset', label: 'Home' },
      { href: '/reset/agenda', label: 'Agenda' },
      { href: '/reset/speakers', label: 'Speakers' },
    ],
    cta: { href: '/reset#form', label: 'Register now' },
  },
  'champions-set': {
    label: "The Champion's Set",
    brand: 'https://ausopen.com/',
    links: [],
    cta: null,
  },
  'future-champions': {
    label: 'Future Champions',
    brand: 'https://ausopen.com/',
    compact: true,
    links: [
      { href: '/ao-exchange', label: 'Home' },
      { href: '/ao-exchange/agenda', label: 'Agenda' },
      { href: '/ao-exchange/speakers', label: 'Speakers' },
    ],
    cta: { href: '/ao-exchange#form', label: 'Nominate now' },
  },
  hub: {
    label: 'Tennis Partner',
    brand: '/',
    links: [
      { href: '/ao-exchange', label: 'AO Exchange' },
      { href: '/reset', label: 'Reset' },
      { href: '/champions-set', label: "Champion's Set" },
      { href: '/future-champions', label: 'Future Champions' },
    ],
    cta: null,
  },
};

function currentPath() {
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path || '/';
}

function siteConfig() {
  const [first] = window.location.pathname.split('/').filter(Boolean);
  return SITES[first] || SITES.hub;
}

/**
 * Builds the fixed pill navigation. Links follow the microsite in the URL.
 * @param {Element} block Header block
 */
export default function decorate(block) {
  const site = siteConfig();
  const path = currentPath();
  const nav = document.createElement('nav');
  nav.className = 'nav-pill';
  if (site.compact) nav.classList.add('is-compact');
  nav.setAttribute('aria-label', site.label);

  const brand = document.createElement('a');
  brand.className = 'nav-brand';
  brand.href = site.brand;
  brand.innerHTML = '<img src="/media/ao-logo.png" alt="Australian Open">';
  nav.append(brand);

  if (site.links.length) {
    const links = document.createElement('div');
    links.className = 'nav-links';
    site.links.forEach((item, index) => {
      if (index > 0) {
        const dot = document.createElement('span');
        dot.className = 'nav-dot';
        dot.setAttribute('aria-hidden', 'true');
        links.append(dot);
      }
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      if (item.href === path) a.setAttribute('aria-current', 'page');
      links.append(a);
    });
    nav.append(links);

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
    nav.append(toggle);
  }

  if (site.cta) {
    const cta = document.createElement('a');
    cta.className = 'nav-cta';
    cta.href = site.cta.href;
    cta.textContent = site.cta.label;
    nav.append(cta);
  }

  block.replaceChildren(nav);
}
