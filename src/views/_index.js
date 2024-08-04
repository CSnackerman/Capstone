import { default as about } from './about';
import { default as compose } from './compose';
import { default as contact } from './contact';
import { default as home } from './home';
import { default as poems } from './poems';

const views = {
  about,
  compose,
  contact,
  home,
  poems,
};

export default views;
export { poemHooks } from './poems';
