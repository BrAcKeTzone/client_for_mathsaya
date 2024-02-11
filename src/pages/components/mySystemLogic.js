export function preventRightClickAndHighlight() {
  // Prevent right-clicking
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Disable object highlighting
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });
}
