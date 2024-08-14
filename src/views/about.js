import html from 'html-literal';
import selfie from '../assets/images/selfie.jpg?as=webp&width=256';

export default () => {
  return html`
    <div id="about-view">
      <div>Hey there. I'm Colby :)</div>
      <div>I sometimes go by Col.</div>
      <img src=${selfie} alt="selfie.jpg" width="256" />
      <div>I'm from and live in St. Louis, Missouri.</div>
      <div>
        In 2019 I graduated with a bachelors degree in computer science at the
        University of Missouri - St. Louis (UMSL)
      </div>
      <div>
        I've worked in the industry for a couple of years at a few companies as
        an Android developer, PHP Symfony backend developer, Typescript React
        frontend developer, and Microsoft SQL Server database developer.
      </div>
      <div>
        I enjoy playing video games, board games, and creating fun web
        experiences.
      </div>
      <div>Lately I've been playing...</div>
      <ul>
        <li>
          <div class="play-item">
            <div>Elden Ring</div>
            <div class="play-category">🎮</div>
          </div>
        </li>
        <li>
          <div class="play-item">
            <div>Cocoon</div>
            <div class="play-category">🎮</div>
          </div>
        </li>
        <li>
          <div class="play-item">
            <div>Play Nine</div>
            <div class="play-category">🎲</div>
          </div>
        </li>
        <li>
          <div class="play-item">
            <div>Yahtzee!</div>
            <div class="play-category">🎲</div>
          </div>
        </li>
        <li>
          <div class="play-item">
            <div>Here to Slay</div>
            <div class="play-category">🎲</div>
          </div>
        </li>
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
