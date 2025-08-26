import {cart, deleting, navBarCartQuantity, saveToStorage} from "../data/cart.js";
import { products, priceCentConversion } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";
import {deliveryOptions} from "./delivery options.js";

let todaydate = dayjs();
let sevenDays = todaydate.add(7, "days");
let threeDays = todaydate.add(3, "days")
console.log(todaydate);
console.log(sevenDays);
console.log(threeDays);

let checkout2HTML = ``;
cart.forEach(function(insideCart){
  const productsId = insideCart.productsId;

  let sameProduct = products.find(item=>item.id ===productsId);

checkout2HTML += `
  <div class="cart-item-container js-cart-item-container js-update-making js-shipping-making">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${sameProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${sameProduct.name}
        </div>
        <div class="product-price" data-product-price="${priceCentConversion(sameProduct)}">
          $${priceCentConversion(sameProduct)}
        </div>
        <div class="product-quantity">
          Quantity:
          <span class="numUpdate" data-quantity-id = "${sameProduct.id}">
            <span>
              <span class="quantity-label quantity-Change">${insideCart.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update"
            data-update-id ="${sameProduct.id}">
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
          data-delete-cart = "${sameProduct.id}">
            Delete
          </span>
        </div>
    </div>

    <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
      ${deliveryOptionsHTML()}
      </div>
    </div>
  </div>`;
});
        
document.querySelector(".js-order-summary").innerHTML = checkout2HTML;

function deliveryOptionsHTML(){
let delivery = ``;
  deliveryOptions.forEach(option=>{
    let deliveryoptionID = option.deliveryoptionID;
    
    let matchDelivery = cart.find(item=> deliveryoptionID === item.deliveryoptionID);
    delivery += `
    
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>`;
  });
  return delivery;
}

/*
function prints(){
  let summary = document.querySelector(".shipping-option");
  let tob = document.querySelector(".tob");
  let tax10 = document.querySelector(".tax10");
  let orderTot = document.querySelector(".orderTot");

  
  summary.innerHTML = `$${shippingAndHandling()}`;
  tob.innerHTML = `$${totalBeforeTax()}`;
  tax10.innerHTML = `$${estimated10PercentTax()}`;
  orderTot.innerHTML = `$${grandOrderTotal()}`;
}

function shipping(){
  let ship = document.querySelectorAll(".delivery-option");
  
  ship.forEach(shipItem=>{
    shipItem.addEventListener("click", ()=>{
      
      let shipfee = shipItem.dataset.shippingFee;
      let shipID = shipItem.dataset.shippingId;
      
      let catchMatch = cart.find(item=>item.productsId === shipID);
      if(catchMatch){
        catchMatch.shippingDelivery = Number(shipfee);
      }

      prints();
      saveToStorage();
    });
  });
}
shipping();

function shippingAndHandling(){
  let handlingShipping = 0;
    cart.forEach(item=>{
      handlingShipping += (item.shippingDelivery || 0);
    });
    saveToStorage();
    return handlingShipping.toFixed(2);
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
*/
let update = document.querySelectorAll(".js-update");
update.forEach(function(updatebtn){
  updatebtn.addEventListener("click", function(){

  });
  saveToStorage();
});
