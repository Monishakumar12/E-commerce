
const products = [
  {
    id:"food_0",
    image: "../E-commerce-main/Images/briyani.jpg",
    title: "Chicken Briyani",
    price: 250,
    inCart: 0,
  },
  {
    id:"food_1",
    image: "../E-commerce-main/Images/gulab.png",
    title: "Gulab Jamun",
    price: 80,
    inCart: 0,
  },
  {
    id:"food_2",
    image: "../E-commerce-main/Images/paneer.jpg",
    title: "Fried Rice",
    price: 220,
    inCart: 0,
  },
  {
    id:"food_3",
    image: "../E-commerce-main/Images/dragon_paneer.jpg",
    title: "Paneer Gravey",
    price: 200,
    inCart: 0,
  },
  {
    id:"food_4",
    image: "../E-commerce-main/Images/fish.jpg",
    title: "Combo",
    price: 500,
    inCart: 0,
  },
  {
    id:"food_5",
    image: "../E-commerce-main/Images/parota.jpg",
    title: "Parota",
    price: 100,
    inCart: 0,
  },
  {
    id:"food_6",
    image: "../E-commerce-main/Images/pizza.jpg",
    title: "Pizza",
    price: 450,
    inCart: 0,
  },
  {
    id:"food_7",
    image: "../E-commerce-main/Images/pongal.jpg",
    title: "Pongal",
    price: 120,
    inCart: 0,
  },
];

const addCart = document.querySelectorAll(".add_cart");
const cart = document.querySelector(".cartbag"); 

for (let i = 0; i < addCart.length; i++) {
  addCart[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i])
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
    totalCostContainer.innerHTML = "";
    Object.values(cartItems).map((item, id) => {
      const productContainerInnerHtml = `<tr>
             <td class="align-middle">
              <img
               class="cart_img"
               src="${item.image}"
               alt="No Image" /> 
             </td>
             <td class="align-middle">${item.title}</td>
             <td class="align-middle">₹${item.price}</td>
             <td class="align-middle ">
             <div class="d-flex ">
                <h5 class="px-2">
                  <i class="bi bi-plus-square" onclick="increment(${id})"></i>
                </h5>
                ${item.inCart} 
                <h5 class="px-2">
                  <i class="bi bi-dash-square" onclick="decrement(${id})"></i>
                </h5>
             </div>
             </td>
             <td class="align-middle">₹${item.inCart * item.price}</td>
             <td class="align-middle">
              <div>
                <i class="bi bi-trash" onclick="deleteItem(${id})"></i>
              </div>
             </td>
        </tr>`;

        productContainer.innerHTML += productContainerInnerHtml;

    });

    const totalCostContainerInnerHTML = `
        <div class="row total_cost">
            <h5 class="card-title">Total Amount : ₹ ${cartCost}</h5>
        </div>
        `;

    totalCostContainer.innerHTML += totalCostContainerInnerHTML
  }
}
 
let increment = (id) => {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let item = Object.values(cartItems)[id]

  if (cartItems != null) {
      cartItems[item.title].inCart += 1;
      if (cartItems[item.title].inCart <= 0) {
        cartItems[item.title].inCart = 0;
      }
  } 
  
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  refreshTotalCost();
};

let decrement = (id) => {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let item = Object.values(cartItems)[id]

  console.log("cartItems", cartItems)
  console.log("cartItem", item)

  if (cartItems != null) {
      cartItems[item.title].inCart -= 1;
      if (cartItems[item.title].inCart <= 0) {
        cartItems[item.title].inCart = 0;
      }
  } 
  
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  refreshTotalCost();
};

let deleteItem = (id) => {

  if (confirm("Are you sure! want to delete?") == true) {

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    const arrayOfProducts = Object.values(cartItems)

    if (cartItems != null) {
      removeById(arrayOfProducts, Object.values(cartItems)[id])
    } 

    let nCartItems = JSON.stringify(arrayOfProducts);
    localStorage.setItem("productsInCart", JSON.stringify(JSON.parse(nCartItems)));

    refreshTotalCost();
  }
};

const removeById = (arrayOfProducts, deleteProduct) => {
  const requiredIndex = arrayOfProducts.findIndex(item => {
     return item.title === deleteProduct.title;
  });
  if(requiredIndex === -1){
     return false;
  };
  return !!arrayOfProducts.splice(requiredIndex, 1);
};

function refreshTotalCost() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  var totalCost = 0
  var totalCart = 0

  for (let i = 0; i < Object.values(cartItems).length; i++) {
    totalCart += Object.values(cartItems)[i].inCart
    totalCost += Object.values(cartItems)[i].inCart * Object.values(cartItems)[i].price
  }

  localStorage.setItem("totalCost", totalCost);
  localStorage.setItem("cartNumbers", totalCart);

  onLoadingCart();
  displayCart();
}
onLoadingCart();
displayCart();