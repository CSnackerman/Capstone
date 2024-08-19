import html from 'html-literal';
import { reload } from '../../../router';
import starEmptySvg from '/src/client/assets/images/star_empty.svg';
import starFilledSvg from '/src/client/assets/images/star_filled.svg';
import store from '/src/client/store/_index';

const { stars, poems } = store;

export default (id) => {
  const starWidth = '23px';

  return html`
    <div id="${id}-stars" class="stars">
      <img
        id="star-1"
        class="star"
        src=${getStarSrc(1)}
        alt="${getStarAlt(1)}"
        width="${starWidth}"
      />
      <img
        id="star-2"
        class="star"
        src=${getStarSrc(2)}
        alt="${getStarAlt(2)}"
        width="${starWidth}"
      />
      <img
        id="star-3"
        class="star"
        src=${getStarSrc(3)}
        alt="${getStarAlt(3)}"
        width="${starWidth}"
      />
      <img
        id="star-4"
        class="star"
        src=${getStarSrc(4)}
        alt="${getStarAlt(4)}"
        width="${starWidth}"
      />
      <img
        id="star-5"
        class="star"
        src=${getStarSrc(5)}
        alt="${getStarAlt(5)}"
        width="${starWidth}"
      />
    </div>
  `;
};

export function addStarListeners() {
  const starElements = document.querySelectorAll('.star');
  const currentRating = stars.getRatingByTitle(poems.getTitle());

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
        assignStarAttributes(star, currentRating);
      }
    });
    // click
    star.addEventListener('click', (e) => {
      const newRating = getStarNumber(e.target);
      const poemTitle = poems.getTitle();
      stars.setRating(poemTitle, newRating);
      poems.setReviewsContext();
      reload();
    });
  });
}

// helper funcs

function getStarNumber(star) {
  return parseInt(star.id.split('-').slice(-1));
}

function assignStarAttributes(star, threshold) {
  const starNumber = getStarNumber(star);
  if (starNumber <= threshold) {
    star.src = starFilledSvg;
    star.alt = 'star-filled';
  } else {
    star.src = starEmptySvg;
    star.alt = 'star-empty';
  }
}

function getStarSrc(starId) {
  const currentRating = stars.getRatingByTitle(poems.getTitle());
  return starId <= currentRating ? starFilledSvg : starEmptySvg;
}

function getStarAlt(starId) {
  const currentRating = stars.getRatingByTitle(poems.getTitle());
  return starId <= currentRating ? 'star-filled' : 'star-empty';
}
