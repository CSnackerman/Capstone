import device from './device.js';
import dictionary from './dictionary';
import forms from './forms.js';
import loadingSpinner from './loadingSpinner';
import navigation from './navigation.js';
import poems from './poems';
import remarks from './remarks';
import reviews from './reviews';
import search from './search.js';

const store = {
  poems,
  loadingSpinner,
  dictionary,
  reviews,
  remarks,
  search,
  device,
  navigation,
  forms,
};

export default store;
