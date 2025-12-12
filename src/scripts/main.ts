// main.ts

// components
import "@components/header";
import "@components/scrollActive";
import "@components/anchorNav";
import "@components/carousel";
import "@components/modal";

// styles
import "@/scss/main.scss";

// sections
import { renderAbout } from "@sections/about";
import { renderPortfolio } from "@sections/portfolio";
import { renderConsulting } from "@sections/consulting";
import { renderCompany } from "@sections/company";
import { renderLinks } from "@sections/links";
import { renderContact } from "@sections/contact";

// utils
import { attachRevealObserver } from "@utils/revealObserver";
import { updateActiveNav } from "@components/scrollActive";

document.addEventListener("DOMContentLoaded", () => {
  renderAbout();
  renderPortfolio();
  renderCompany();
  renderConsulting();
  renderLinks();
  renderContact();
  attachRevealObserver();
  updateActiveNav();
});
