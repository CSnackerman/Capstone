import html from 'html-literal';
import selfie from '../assets/images/selfie.jpg';

export default () => {
  return html`
    <div id="about-view">
      <div>Hey there. I'm Colby :)</div>
      <div>I sometimes go by Col.</div>
      <img src=${selfie} alt="selfie.jpg" width="256" />
      <div>I live in St. Louis, Missouri.</div>
      <div>
        In 2019, I graduated with my bachelors in computer science at the
        University of Missouri - St. Louis (UMSL)
      </div>
      <div>
        I enjoy playing video games and creating fun web experiences.
      </div>
      <div>Lately I've been playing</div>
      <ul>
        <li>Elden Ring</li>
        <li>Cocoon</li>
      </ul>
      <div>
        I'm also working on a fishing game that runs in the browser. <br />
        It's still a work in progress, but feel free to check it out!
      </div>
      <a href="https://resume-fishing.web.app/" target="_blank">
        🎣 Gone Fishin' 🐟
      </a>
      <iframe
        title="Gone Fishin'"
        src="https://resume-fishing.web.app/"
      ></iframe>
    </div>
  `;
};
