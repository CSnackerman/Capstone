import html from 'html-literal';
import store from '../../../store/_index.js';
import { DRAFT, EDIT } from '../../../store/reviews.js';
import formEx, { addFormExEventListeners } from '../../formEx.js';
import stars, { INTERACTABLE, LIGHT } from './stars.js';

const { reviews } = store;

export default () => {
  let form = '';
  if (reviews.getStatus() === DRAFT) form = formEx('review');
  if (reviews.getStatus() === EDIT) form = formEx('reviewEdit', 'review');

  return html`
    <div id="review-draft-container">
      ${stars('review-draft', {
        type: INTERACTABLE,
        mode: LIGHT,
        getRatingFunc: () => reviews.getRating(),
      })}
      ${form}
    </div>
  `;
};

// prettier-ignore
export function addReviewDraftListeners() {
  if (reviews.getStatus() === DRAFT) addFormExEventListeners('review');
  if (reviews.getStatus() === EDIT)  addFormExEventListeners('reviewEdit', 'review');
}
