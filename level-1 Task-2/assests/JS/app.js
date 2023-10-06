// ============================ NAVBAR ON MOBILES ============================
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
// ============================ NAVBAR ACTIVE LINK ============================
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  // ============================ NAVBAR ============================
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  // ======================= WHEN ONE LINK CLICK REMOVE NAVBAR =======================
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// ============================ SCROLL ANIMATION ============================
ScrollReveal({
  //   reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .projects-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });


// =============== ABOUT SECTION READMORE BUTTON ====================
const aboutBtn = document.getElementById('aboutBtn');
const moreText = document.querySelector('.moreText');

aboutBtn.addEventListener('click', () => {
  moreText.classList.toggle('show');
  aboutBtn.textContent = moreText.classList.contains('show') ? 'Read Less' : 'Read More';
});

// ============== SETRVICES SECTION READMORE BUTTON ====================
const servicesBtn1 = document.getElementById('serviceBtn1');
const servicesText1 = document.querySelector('.services-box p .moreText1');

servicesBtn1.addEventListener('click', () => {
  servicesText1.classList.toggle('show');
  servicesBtn1.textContent = servicesText1.classList.contains('show') ? 'Read Less' : 'Read More';
});

const servicesBtn2 = document.getElementById('serviceBtn2');
const servicesText2 = document.querySelector('.services-box p .moreText2');

servicesBtn2.addEventListener('click', () => {
  servicesText2.classList.toggle('show');
  servicesBtn2.textContent = servicesText2.classList.contains('show') ? 'Read Less' : 'Read More';
});

const servicesBtn3 = document.getElementById('serviceBtn3');
const servicesText3 = document.querySelector('.services-box p .moreText3');

servicesBtn3.addEventListener('click', () => {
  servicesText3.classList.toggle('show');
  servicesBtn3.textContent = servicesText3.classList.contains('show') ? 'Read Less' : 'Read More';
});
