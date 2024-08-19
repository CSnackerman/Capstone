export default {
  userRatings: {},
  setRating(title, rating) {
    this.userRatings[title] = rating;
  },
  getRatingByTitle(title) {
    return this.userRatings[title];
  },
};
