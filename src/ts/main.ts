// main.ts
import "@/ts/components/header";
import "@/ts/components/scrollActive";
import "@/ts/components/anchorNav";
import "@/ts/components/carousel";
import "@/ts/components/modal";

// styles
import "@/scss/main.scss"

// sections
import { renderAbout } from "@/ts/sections/about";
import { renderPortfolio } from "@/ts/sections/portfolio";
import { renderConsulting } from "@/ts/sections/consulting";
import { renderCompany } from "@/ts/sections/company";
import { renderLinks } from "@/ts/sections/links";
import { renderContact } from "@/ts/sections/contact";

// utils
import { attachRevealObserver } from "@/ts/utils/revealObserver";
import { updateActiveNav } from "@/ts/components/scrollActive";

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
