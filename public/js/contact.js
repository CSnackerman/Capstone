const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(e.target);

  data.forEach((value, key) => {
    console.log(key, value);
  });
});
