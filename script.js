//Design & Development by yk.dev | https://github.com/ykdotdev/N'mE

import sheetURL from "./config.js";
/* #region  RESET URL ON MENU ITEM CLICK */
function resetUrl(classNameString) {
  document.querySelectorAll(classNameString).forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const href = item.getAttribute("href");
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      history.replaceState(null, null, " ");
    });
  });
}
/* #endregion */


/* #region  GSAP */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".bento-card").forEach((card) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
});
/* #endregion */


/* #region  Waitlist Functionality */
function showToast(message) {
  const toast = document.querySelector("#toast");

  if (message === "success") {
    toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#28a745" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                </svg>
                <span>Successfully added to waitlist!</span>`;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  } else if (message === "exists") {
    toast.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#efefef" class="bi bi-person-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
                <span>You're already on the waitlist.</span>`;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  } else if (message === "failure") {
    toast.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#dc3545" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                <span>Something went wrong. Please try again.</span>`;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }
}

const waitlistForm = document.querySelector(".waitlist-ctn");
waitlistForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailCtn = document.querySelector("#email-ctn");
  const email = emailCtn.value;
  const btn = document.querySelector(".join-btn");
  const payload = `${window.location.origin}|${email}`;
  const btnOldHTML = btn.innerHTML;
  async function appendEmail() {
    emailCtn.disabled = true;
    btn.disabled = true;
    btn.classList.add("disabled");
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="spinner " viewBox="0 0 16 16">
                      <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z"/>
                    </svg>`;
    try {
      const result = await fetch(sheetURL,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain; charset=UTF-8",
          },
          body: payload,
        }
      );
      const text = await result.text();
      if (text === "EXISTS") {
        showToast("exists");
      } else if (text === "OK") {
        showToast("success");
      } else {
        showToast("failure");
      }
    } catch (err) {
      showToast("failure");
    } finally {
      btn.innerHTML = btnOldHTML;
      emailCtn.disabled = false;
      btn.disabled = false;
      btn.classList.remove("disabled");
    }
  }
  appendEmail();
});
/* #endregion */


/* #region  MOBILE DEVICES MEDIA QUERY (<768px) */
const mediaQuery = window.matchMedia("(max-width: 768px)");

function handleMediaQuery(e) {
  const waitlist = document.getElementById("waitlist");
  const btn = document.querySelector(".join-btn");
  const nav = document.querySelector(".navigation-menu");
  waitlist.style.visibility = "visible";
  nav.style.visibility = "visible";
  if (e.matches) {
    // WAITLIST JOIN BTN UPDATE
    btn.innerHTML = `<img src="/images/arrow.svg" alt="" role="presentation">`;
    waitlist.classList.add("arrow");

    // NAV UPDATE (MOBILE + DESKTOP)
    nav.innerHTML = `<div class="mobile-menu-items">
                        <div class="mobile-menu-item mobile-menu-item-01"><a class="menu-item-txt" href="#feature-section">Features</a></div>
                        <div class="mobile-menu-item mobile-menu-item-02"><a class="menu-item-txt" href="#waitlist">Waitlist</a></div>
                        <div class="mobile-menu-item mobile-menu-item-03"><a class="menu-item-txt" href="#footer-section">Contact</a></div>
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="nav-arrow" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>`;
    nav.classList.add("arrow");
    const navArrow = document.querySelector(".nav-arrow");
    const navMenu = document.querySelector(".navigation-menu.arrow");
    if (window.Headroom) {
      const headroom = new window.Headroom(navMenu);
      headroom.init();
    }

    let menuOpen = false;
    if (navArrow && nav) {
      navArrow.addEventListener("click", () => {
        navArrow.classList.toggle("click");
        nav.classList.toggle("click");
        menuOpen = !menuOpen;
      });
    }
    document.querySelectorAll(".mobile-menu-item").forEach((item) => {
      item.addEventListener("click", () => {
        if (navArrow && nav) {
          navArrow.classList.remove("click");
          nav.classList.remove("click");
          menuOpen = false;
        }
      });
    });
    resetUrl(".menu-item-txt");
  } else {
    btn.innerHTML = "Join the Waitlist";
    waitlist.classList.remove("arrow");
    nav.classList.remove("arrow");
    nav.innerHTML = `<div class="logo-ctn">N'mE</div>
                     <div class="menu-items">
                        <div class="menu-item menu-item-01"><a class="menu-item-txt" href="#feature-section">Features</a></div>
                        <div class="menu-item menu-item-02"><a class="menu-item-txt" href="#waitlist">Waitlist</a></div>
                        <div class="menu-item menu-item-03"><a class="menu-item-txt" href="#footer-section">Contact</a></div>
                     </div>`;
    resetUrl(".menu-item-txt");
  }
}

mediaQuery.addEventListener("change", handleMediaQuery);
handleMediaQuery(mediaQuery);

/* #endregion */
