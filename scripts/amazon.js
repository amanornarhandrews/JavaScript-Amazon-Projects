import { cart, cartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

let generatedHTML = ``; 

//sourcing the products from the products.js
products.forEach(function(product){
    generatedHTML += `    
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.counts}
            </div>
          </div>

          <div class="product-price js-product-price" data-product-price = "${(product.priceInCents/100).toFixed(2)}">
            ${(product.priceInCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-products-Id = "${product.id}"> 
            Add to Cart
          </button>
        </div>`;
    });

document.querySelector('.js-product-grid')
.innerHTML = generatedHTML;

function navBarCartQuantity(){
  let totalCartQuantity = 0;
  cart.forEach(totalCarts =>{
    totalCartQuantity += totalCarts.timesCart;
  });
  document.querySelector('.js-cart-quantity').innerHTML = totalCartQuantity;
}

let notifMap = new Map;
function addedNotifFunction(closeItems, addedNotif){
  addedNotif.classList.add("js-added-to-cart");

  if(notifMap.has(closeItems)){
  clearTimeout(notifMap.get(closeItems));
  }

  let notifTimeoutId = setTimeout(()=>{
    addedNotif.classList.remove("js-added-to-cart");
    notifMap.clear()
  }, 2000);

  notifMap.set(closeItems, notifTimeoutId);
}

document.querySelectorAll('.js-add-to-cart').
forEach(button=>{
  button.addEventListener('click', function(){
    let productsId = button.dataset.productsId;
    
    let closeItems = button.closest(".product-container");
    let quantity = Number(closeItems.querySelector(".js-select-quantity").value) || 1;     
    let price = Number(closeItems.querySelector(".js-product-price").dataset.productPrice);
    let addedNotif = closeItems.querySelector(".added-to-cart");

    cartQuantity(productsId, quantity, price);

    navBarCartQuantity();

    addedNotifFunction(closeItems, addedNotif)

    console.log(cart);
  });
});
