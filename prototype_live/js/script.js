document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      const productId = event.target.parentElement.getAttribute("data-id");
      const productTitle =
        event.target.parentElement.querySelector("h2").innerText;
      const productPrice = parseInt(
        event.target.parentElement.querySelector("span").innerText.split(" ")[1]
      );

      const product = {
        id: productId,
        title: productTitle,
        price: productPrice,
        quantity: 1,
      };

      const existingProduct = shoppingCart.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        shoppingCart.push(product);
      }

      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      console.log("Handlekurv:", shoppingCart);
    });
  });

  const cartItems = document.getElementById("cart-items");
  if (cartItems) {
    shoppingCart.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = `${item.title} - ${item.price} kr - Antall: ${item.quantity}`;
      cartItems.appendChild(li);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ... (ingen endring i første del av koden)

  const orderReceivedModal = document.getElementById("order-received-modal");
  const closeModal = document.querySelector(".close");

  if (cartItems) {
    updateCart();

    cartItems.addEventListener("click", function (event) {
      // ... (ingen endring her)
    });

    if (checkoutButton) {
      checkoutButton.addEventListener("click", function () {
        orderReceivedModal.style.display = "block";
        shoppingCart = [];
        updateCart();
      });
    }

    if (closeModal) {
      closeModal.addEventListener("click", function () {
        orderReceivedModal.style.display = "none";
      });
    }

    window.addEventListener("click", function (event) {
      if (event.target === orderReceivedModal) {
        orderReceivedModal.style.display = "none";
      }
    });
  }
});
