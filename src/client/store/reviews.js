import poems from './poems.js';

export default {
  userReviews: {},
  userRatings: {},
  setRatingByTitle(title, rating) {
    this.userRatings[title] = rating;
  },
  setReviewByTitle(title, review) {
    this.userReviews[title] = review;
  },
  getRatingByTitle(title) {
    return this.userRatings[title];
  },
  getReviewByTitle(title) {
    return this.userReviews[title];
  },
  setCurrentPoemRating(rating) {
    this.setRatingByTitle(poems.getTitle(), rating);
  },
  setCurrentPoemReview(review) {
    this.setReviewByTitle(poems.getTitle(), review);
  },
  getCurrentPoemRating() {
    return this.getRatingByTitle(poems.getTitle());
  },
  getCurrentPoemReview() {
    return this.getReviewByTitle(poems.getTitle());
  },
};
