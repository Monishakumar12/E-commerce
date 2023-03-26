const products = [
  {
    image: "../E-commerce Assignment/briyani ratio.jpg",
    title: "Chicken Briyani",
    price: 250,
    inCart: 0,
  },
  {
    image: "../E-commerce Assignment/gulab1.png",
    title: "Gulab Jamun",
    price: 180,
    inCart: 0,
  },
  {
    image: "../E-commerce Assignment/paneer ratio.jpg",
    title: "Fried Rice",
    price: 220,
    inCart: 0,
  },
  {
    image: "../E-commerce Assignment/Dragon-paneer.jpg",
    title: "Paneer Gravey",
    price: 200,
    inCart: 0,
  },
  {
    image: "../E-commerce Assignment/fish (2).jpg",
    title: "Combo",
    price: 500,
    inCart: 0,
  },
  {
    image: "../E-commerce Assignment/parota ratio.jpg",
    title: "Parota",
    price: 100,
    inCart: 0,
  },
  {
    image: "../E-commerce Assignment/pizza ratio.jpg",
    title: "Pizza",
    price: 450,
    inCart: 0,
  },
  {
    image: "../E-commerce Assignment/pongal ratio.jpg",
    title: "Pongal",
    price: 120,
    inCart: 0,
  },
];

const addCart = document.querySelectorAll(".add_cart");
const cart = document.querySelector(".cart span");

for (let i = 0; i < addCart.length; i++) {
  addCart[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadingCart() {
  var productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    cart.textContent = productNumbers;
  }
}

function cartNumbers(product) {
  var productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  localStorage.setItem("cartNumbers", 1);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    cart.textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    cart.textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.title] == undefined) {
      cartItems = {
        ...cartItems,
        [product.title]: product,
      };
    }

    cartItems[product.title].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.title]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// total cost section
function totalCost(product) {
  var cartCost = localStorage.getItem("totalCost");

  console.log(cartCost);
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

// display in the cart
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".cart_products");
  let totalCostContainer = document.querySelector(".total_cost");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item, index) => {
      const productContainerInnerHtml = `<tr>
             <td class="align-middle">
              <img
               class="cart_img"
               src="${item.image}"
               alt="No Image" /> 
             </td>
             <td class="align-middle">${item.title}</td>
             <td class="align-middle">₹${item.price}</td>
             <td class="align-middle">${item.inCart}</td>
             <td class="align-middle">₹${item.inCart * item.price}</td>
        </tr>`;

        productContainer.innerHTML += productContainerInnerHtml;

    });

    totalCostContainer.innerHTML += `
        <div class="row total_cost">
            <h5 class="card-title">Total Amount : ₹ ${cartCost}</h5>
        </div>
        `;
  }
}

const placeOrderButton = document.querySelector(".place_order");
placeOrderButton.addEventListener("click", () => {
  alert("Your order has been confirmed.");
});

onLoadingCart();
displayCart();
