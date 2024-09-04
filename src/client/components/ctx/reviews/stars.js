import html from 'html-literal';
import { reload } from '../../../router';
import store from '../../../store/_index.js';
import starEmptySvg from '/src/client/assets/images/star_empty.svg';
import starFilledSvg from '/src/client/assets/images/star_filled.svg';
import starLightEmptySvg from '/src/client/assets/images/star_light_empty.svg';
import starLightFilledSvg from '/src/client/assets/images/star_light_filled.svg';

// star types
export const READONLY = 'readonly';
export const INTERACTABLE = 'interactable';
export const AVERAGE = 'average';

// star modes/themes
export const DARK = 'dark';
export const LIGHT = 'light';

const { reviews, poems } = store;

export default (id, options) => {
  const {
    type = READONLY,
    mode = DARK,
    scale = 23,
    getRatingFunc = () => 0,
  } = options;

  const starWidth = `${scale}px`;

  const starCssClasses = [
    'star',
    mode,
    Array.isArray(type) ? type.join(' ') : type,
  ].join(' ');

  const rating = getRatingFunc();

  return html`
    <div id="${id}-stars" class="stars">
      <img
        id="star-1"
        class="${starCssClasses}"
        src=${getStarSrc(1, mode, rating)}
        alt="${getStarAlt(1)}"
        width="${starWidth}"
      />
      <img
        id="star-2"
        class="${starCssClasses}"
        src=${getStarSrc(2, mode, rating)}
        alt="${getStarAlt(2)}"
        width="${starWidth}"
      />
      <img
        id="star-3"
        class="${starCssClasses}"
        src=${getStarSrc(3, mode, rating)}
        alt="${getStarAlt(3)}"
        width="${starWidth}"
      />
      <img
        id="star-4"
        class="${starCssClasses}"
        src=${getStarSrc(4, mode, rating)}
        alt="${getStarAlt(4)}"
        width="${starWidth}"
      />
      <img
        id="star-5"
        class="${starCssClasses}"
        src=${getStarSrc(5, mode, rating)}
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
      // prettier-ignore
      for (const star of starElements) {
        assignStarAttributes(star, reviews.getRating());
      }
    });
    // click
    star.addEventListener('click', (e) => {
      const newRating = getStarNumber(e.target);
      reviews.setRating(newRating);
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
  return star.classList.contains(LIGHT);
}

function isReadonly(star) {
  return star.classList.contains(READONLY) || star.classList.contains(AVERAGE);
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

function getStarSrc(starId, mode, rating) {
  if (mode === LIGHT) {
    return starId <= rating ? starLightFilledSvg : starLightEmptySvg;
  } else {
    return starId <= rating ? starFilledSvg : starEmptySvg;
  }
}

function getStarAlt(starId) {
  return starId <= reviews.getRating() ? 'star-filled' : 'star-empty';
}
