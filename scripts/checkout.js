import {cart, deleting, navBarCartQuantity, saveToStorage} from "../data/cart.js";
import { products, priceCentConversion } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";
import { deliveryOptions } from "./delivery options.js";


let checkoutHTML = ``;
cart.forEach(function(insideCart){
    const productsId = insideCart.productsId;
    const cartDeliveryOptionId = insideCart.deliveryoptionID;

let matchingProducts = products.find(similar => productsId === similar.id);
let matchingDelivery = deliveryOptions.find(same=>same.deliveryoptionID === cartDeliveryOptionId );

checkoutHTML += `
  <div class="cart-item-container js-cart-item-container js-update-making js-shipping-making">
      <div class="delivery-date">
        Delivery Date: <span class="radioInput">${deliveryDateCalulate(matchingDelivery.deliveryDays).format("dddd, MMMM D")}</span>
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProducts.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProducts.name}
          </div>
          <div class="product-price" data-product-price="${priceCentConversion(matchingProducts)}">
            $${priceCentConversion(matchingProducts)}
          </div>
          <div class="product-quantity">
            Quantity:
            <span class="numUpdate" data-quantity-id = "${matchingProducts.id}">
              <span>
                <span class="quantity-label quantity-Change">${insideCart.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update"
              data-update-id ="${matchingProducts.id}">
                Update
              </span>
              </span>

              <span class="save-input updateClicked">
                <input type="Number" class="quantity-input" placeholder = "${insideCart.quantity}"> 
                <span class="link-primary save">
                Save
              </span>
            </span>

            <span class="delete-quantity-link link-primary js-delete-link"
            data-delete-cart = "${matchingProducts.id}">
              Delete
            </span>
          </div>
          
          <div style="margin-top: 5px"" class="product-price" data-product-price="${priceCentConversion(matchingProducts)}">
            Total: <span class="quantity-price-total">$${(matchingProducts.priceInCents/100 * insideCart.quantity).toFixed(2)}</span>
          </div>
        </div>
        

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${handlingOption(matchingProducts, insideCart)}
        </div>
      </div>
    </div>`;
});


function handlingOption(matchingProducts, insideCart){
let handlingDelivery = ``;

deliveryOptions.forEach(deliver=>{
  const deliveryoptionID = deliver.deliveryoptionID;

  let showFree = (deliver.deliveryFee === 0) ? "Free Shipping" : `$${(deliver.deliveryFee/100).toFixed(2)}`;

  let isChecked = (deliveryoptionID === insideCart.deliveryoptionID) ? `checked` : ``;

  handlingDelivery +=`
  <div class="delivery-option">
    <input type="radio" ${isChecked}
      class="delivery-option-input"
      name="delivery-option-${matchingProducts.id}"
      data-delivery-fee = "${deliver.deliveryFee/100}"
      data-delivery-day = "${deliveryDateCalulate(deliver.deliveryDays).format("dddd, MMMM D")}"
      data-deliveryInCart-id = "${insideCart.productsId}"
      data-delivery-id = "${deliver.deliveryoptionID}">
    <div>
      <div class="delivery-option-date">
      ${deliveryDateCalulate(deliver.deliveryDays).format("dddd, MMMM D")}
      </div>
        <div class="delivery-option-price">
        ${showFree}
      </div>
    </div>
  </div>`;
});
return handlingDelivery;  
}

let orderSummary = `  
  <div class="delivery-choices">
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items <span class="items-span">(${quantityInSummary()}):</span></div>
      <div class="payment-summary-money">$${orderTotalSummarySide()}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money shipping-summary-option">$${shippingAndHandling()}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money tob">$${totalBeforeTax()}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money tax10">$${estimated10PercentTax()}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money orderTot">$${grandOrderTotal()}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  </div>`;
        
document.querySelector(".js-order-summary").innerHTML = checkoutHTML;
document.querySelector(".payment-summary").innerHTML = orderSummary;


function eachItemsDeliveryDate(){
let grab = document.querySelectorAll(".delivery-option-input");
grab.forEach(input=>{
  input.addEventListener("click",()=>{
    let feeDelivery = input.dataset.deliveryFee;
    let dayDelivery = input.dataset.deliveryDay;
    let idDeliveryCart = input.dataset.deliveryincartId;
    let idDelivery = input.dataset.deliveryId;

    console.log(dayDelivery);
    let matched = cart.find(item=>item.productsId === idDeliveryCart);
    if(matched){
      matched.shippingDelivery = Number(feeDelivery);
      matched.deliveryoptionID = idDelivery;
    }
    
    let biggerContainer = input.closest(".js-shipping-making");
    let radioInput = biggerContainer.querySelector(".radioInput");
    radioInput.innerHTML = dayDelivery;
    prints();
    saveToStorage();
  });
});
}
eachItemsDeliveryDate();

function shippingAndHandling(){
  let handlingShipping = 0;
  cart.forEach(item=>{
    handlingShipping += item.shippingDelivery;
  });
  return handlingShipping;
}

function prints(){
  let summary = document.querySelector(".shipping-summary-option");
  let tob = document.querySelector(".tob");
  let tax10 = document.querySelector(".tax10");
  let orderTot = document.querySelector(".orderTot");


    
  summary.innerHTML = `$${shippingAndHandling()}`;
  tob.innerHTML = `$${totalBeforeTax()}`;
  tax10.innerHTML = `$${estimated10PercentTax()}`;
  orderTot.innerHTML = `$${grandOrderTotal()}`;
  saveToStorage();
}

function deliveryDateCalulate(item){
  let todaydate = dayjs();
  let deliveryCalulate = todaydate.add(item, "day");
  return deliveryCalulate;
}



function orderTotalSummarySide(){
  let tot = 0;
  cart.forEach(item=>{
    tot += item.productPricePerQuantity;
  });
  return tot.toFixed(2);
}

function quantityInSummary(){
  let itemCart = 0;
  cart.forEach(item=>{    
    itemCart += item.timesCart;
  });
  return itemCart;
}

function totalBeforeTax(){
  let itemsOrderedTotal = Number(orderTotalSummarySide());
  let allShippingAndHandling = Number(shippingAndHandling());

  let totBeforeTax = itemsOrderedTotal + allShippingAndHandling;
  return totBeforeTax.toFixed(2);
}

function estimated10PercentTax(){
  let convertTotalBeforeTax = Number(totalBeforeTax());
  let estimatedTax = (convertTotalBeforeTax * 10)/100;
  return estimatedTax.toFixed(2);
}

function grandOrderTotal(){
  let tax10 = Number(estimated10PercentTax());
  let totalBefore10tax = Number(totalBeforeTax());
  let grandTotal = totalBefore10tax + tax10;
  return grandTotal.toFixed(2);
}


function headerCartCount(){
  let totalQuan = navBarCartQuantity();  
  if(totalQuan>0){
    document.querySelector('.js-cart-count').innerHTML = totalQuan; 
  }else{
    document.querySelector('.js-cart-count').innerHTML = ``;  
  }
}
headerCartCount()


let deletes = document.querySelectorAll(".js-delete-link");
deletes.forEach(function(del){
  del.addEventListener("click", ()=>{
    let productsId = del.dataset.deleteCart;
    deleting(productsId);

    del.closest(".js-cart-item-container").remove();
    prints();
    headerCartCount();
    document.querySelector(".items-span").innerHTML = `(${quantityInSummary()}):`;
  });
});

let update = document.querySelectorAll(".js-update");
update.forEach(function(updatebtn){
  updatebtn.addEventListener("click", function(){
    let updateID = updatebtn.dataset.updateId;
    let bigUpdate = updatebtn.closest(".js-update-making");

    let price = bigUpdate.querySelector(".product-price").dataset.productPrice;
    let quantityPriceTotal = bigUpdate.querySelector(".quantity-price-total");

    let numUpdate = bigUpdate.querySelector(".numUpdate");
    let autoQuantity = bigUpdate.querySelector(".quantity-Change");

    let inputSave = bigUpdate.querySelector(".save-input");
    let onlyInput = inputSave.querySelector(".quantity-input");
    let save = inputSave.querySelector(".save");

    numUpdate.classList.add("updateClicked");
    inputSave.classList.remove("updateClicked");

    save.addEventListener("click", function(){
      numUpdate.classList.remove("updateClicked");
      inputSave.classList.add("updateClicked");

      let newQuantity = 0;
      if(onlyInput.value > 0){
        newQuantity = onlyInput.value || autoQuantity.innerHTML;
      }else{
        newQuantity = autoQuantity.innerHTML;    
      }
      autoQuantity.innerHTML = Number(newQuantity);
      quantityPriceTotal.innerHTML = (price * newQuantity).toFixed(2);

      cart.forEach(item=>{
        if(updateID === item.productsId){
          item.quantity = Number(newQuantity);
          item.productPricePerQuantity = item.quantity * price;
        }
      });
      prints();
    });
  });
  saveToStorage();
});