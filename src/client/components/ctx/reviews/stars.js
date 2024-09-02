import html from 'html-literal';
import { reload } from '../../../router';
import store from '../../../store/_index.js';
import starEmptySvg from '/src/client/assets/images/star_empty.svg';
import starFilledSvg from '/src/client/assets/images/star_filled.svg';
import starLightEmptySvg from '/src/client/assets/images/star_light_empty.svg';
import starLightFilledSvg from '/src/client/assets/images/star_light_filled.svg';

const { reviews, poems } = store;

export default (
  id,
  mode = 'dark',
  readonlyRating = undefined,
  scale = 23,
  startRating = undefined
) => {
  const starWidth = `${scale}px`;

  const readonly = readonlyRating ? 'readonly' : 'star';

  return html`
    <div id="${id}-stars" class="stars">
      <img
        id="star-1"
        class="star ${mode} ${readonly}"
        src=${getStarSrc(1, mode, readonlyRating, startRating)}
        alt="${getStarAlt(1)}"
        width="${starWidth}"
      />
      <img
        id="star-2"
        class="star ${mode} ${readonly}"
        src=${getStarSrc(2, mode, readonlyRating, startRating)}
        alt="${getStarAlt(2)}"
        width="${starWidth}"
      />
      <img
        id="star-3"
        class="star ${mode} ${readonly}"
        src=${getStarSrc(3, mode, readonlyRating, startRating)}
        alt="${getStarAlt(3)}"
        width="${starWidth} ${readonly}"
      />
      <img
        id="star-4"
        class="star ${mode} ${readonly}"
        src=${getStarSrc(4, mode, readonlyRating, startRating)}
        alt="${getStarAlt(4)}"
        width="${starWidth}"
      />
      <img
        id="star-5"
        class="star ${mode} ${readonly}"
        src=${getStarSrc(5, mode, readonlyRating, startRating)}
        alt="${getStarAlt(5)}"
        width="${starWidth}"
      />
    </div>
  `;
};

export function addStarListeners() {
  const starElements = Array.from(document.querySelectorAll('.star')).filter(
    (star) => !isReadonly(star)
  );
  const currentRating = reviews.getActiveRating();

  starElements.forEach((star) => {
    // hover
    star.addEventListener('mouseover', (e) => {
      const targetStarNumber = getStarNumber(e.target);
      for (const star of starElements) {
        assignStarAttributes(star, targetStarNumber);
      }
    });
    // un-hover
    star.addEventListener('mouseout', () => {
      for (const star of starElements) {
        assignStarAttributes(star, currentRating ?? reviews.activeAvgRating);
      }
    });
    // click
    star.addEventListener('click', (e) => {
      const newRating = getStarNumber(e.target);
      reviews.setActiveRating(newRating);
      poems.setReviewsContext();
      reload();
    });
  });
}

// helper funcs

function getStarNumber(star) {
  return parseInt(star.id.split('-').slice(-1));
}

function isLightStar(star) {
  return star.classList.contains('light');
}

function isReadonly(star) {
  return star.classList.contains('readonly');
}

function assignStarAttributes(star, threshold) {
  const starNumber = getStarNumber(star);
  if (starNumber <= threshold) {
    star.src = isLightStar(star) ? starLightFilledSvg : starFilledSvg;
    star.alt = 'star-filled';
  } else {
    star.src = isLightStar(star) ? starLightEmptySvg : starEmptySvg;
    star.alt = 'star-empty';
  }
}

function getStarSrc(
  starId,
  mode,
  readonlyRating = undefined,
  startRating = undefined
) {
  const currentRating =
    readonlyRating ?? startRating ?? reviews.getActiveRating();

  if (mode === 'light') {
    return starId <= currentRating ? starLightFilledSvg : starLightEmptySvg;
  } else {
    return starId <= currentRating ? starFilledSvg : starEmptySvg;
  }
}

function getStarAlt(starId) {
  return starId <= reviews.getActiveRating() ? 'star-filled' : 'star-empty';
}
