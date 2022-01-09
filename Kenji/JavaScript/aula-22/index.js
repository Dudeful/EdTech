let story = document.getElementById('story');

const zoomInOut = (initialRem) => {
  let rem = initialRem;

  function zoomIn() {
    rem *= 1.05;
    rerender(rem);
  }
  function zoomOut() {
    rem *= 0.95;
    rerender(rem);
  }

  return { zoomIn, zoomOut };
};

const rerender = (rem) => {
  story.setAttribute(
    'style',
    `font-size: ${rem}rem; line-height: ${rem * 1.5}rem;`
  );
};

const z = zoomInOut(1.2);

document
  .getElementById('zoomIn')
  .addEventListener('click', () => z.zoomIn());
document
  .getElementById('zoomOut')
  .addEventListener('click', () => z.zoomOut());
