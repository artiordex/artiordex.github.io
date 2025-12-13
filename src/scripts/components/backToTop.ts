export function initBackToTop(): void {
  const button = document.getElementById("backToTop");
  if (!button) return;

  const toggle = () => {
    window.scrollY > window.innerHeight
      ? button.classList.add("visible")
      : button.classList.remove("visible");
  };

  window.addEventListener("scroll", toggle);
  toggle();

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}