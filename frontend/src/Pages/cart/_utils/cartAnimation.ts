export const animateProductToCart = (
  imageUrl: string,
  sourceElement?: HTMLElement | null,
) => {
  const cartElement = document.getElementById("header-cart");

  if (!cartElement) {
    return;
  }

  const cartRect = cartElement.getBoundingClientRect();

  const sourceRect = sourceElement?.getBoundingClientRect();

  const startX = sourceRect
    ? sourceRect.left + sourceRect.width / 2
    : window.innerWidth / 2;

  const startY = sourceRect
    ? sourceRect.top + sourceRect.height / 2
    : window.innerHeight / 2;

  const endX = cartRect.left + cartRect.width / 2;

  const endY = cartRect.top + cartRect.height / 2;

  const image = document.createElement("img");

  image.src = imageUrl;
  image.alt = "";
  image.setAttribute("aria-hidden", "true");

  Object.assign(image.style, {
    position: "fixed",
    left: `${startX}px`,
    top: `${startY}px`,
    width: "90px",
    height: "90px",
    objectFit: "contain",
    padding: "8px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    zIndex: "99999",
    pointerEvents: "none",
    transform: "translate(-50%, -50%) scale(1)",
    transition:
      "left 650ms cubic-bezier(0.4, 0, 0.2, 1), " +
      "top 650ms cubic-bezier(0.4, 0, 0.2, 1), " +
      "transform 650ms cubic-bezier(0.4, 0, 0.2, 1), " +
      "opacity 650ms ease",
  });

  document.body.appendChild(image);

  requestAnimationFrame(() => {
    image.style.left = `${endX}px`;
    image.style.top = `${endY}px`;

    image.style.transform = "translate(-50%, -50%) scale(0.15)";

    image.style.opacity = "0";
  });

  setTimeout(() => {
    image.remove();

    cartElement.classList.remove("cart-bounce");

    void cartElement.offsetWidth;

    cartElement.classList.add("cart-bounce");

    setTimeout(() => {
      cartElement.classList.remove("cart-bounce");
    }, 500);
  }, 650);
};
