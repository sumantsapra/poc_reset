/**
 * Two-column brand cards: photograph, logo, caption.
 * @param {Element} block Plays block
 */
export default function decorate(block) {
  const grid = document.createElement('div');
  grid.className = 'plays-grid';

  [...block.querySelectorAll(':scope > div > div')].forEach((cell) => {
    cell.className = 'play-card';
    const images = [...cell.querySelectorAll('img')];
    if (images[0]) images[0].classList.add('play-photo');
    if (images[1]) {
      images[1].classList.add('play-logo');
      const markTall = () => {
        if (images[1].naturalHeight > images[1].naturalWidth * 0.45) {
          images[1].classList.add('is-tall');
        }
      };
      if (images[1].complete) markTall();
      else images[1].addEventListener('load', markTall);
    }
    const caption = [...cell.querySelectorAll('p')].find((p) => !p.querySelector('img'));
    if (caption) caption.classList.add('play-caption');
    grid.append(cell);
  });

  block.replaceChildren(grid);
}
