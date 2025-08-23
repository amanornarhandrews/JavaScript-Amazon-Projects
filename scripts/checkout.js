import {cart, deleting, navBarCartQuantity, totalCartQuantity, saveToStorage} from "../data/cart.js";
import { products, priceCentConversion } from "../data/products.js";

let checkoutHTML = ``;
// let orderSummary = ``;
cart.forEach(function(insideCart){
    const productsId = insideCart.productsId;

let matchingProducts = products.find(similar => productsId === similar.id);

    checkoutHTML += `
        <div class="cart-item-container js-cart-item-container js-update-making js-shipping-making">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProducts.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProducts.name}
                </div>
                <div class="product-price" data-product-price="${priceCentConversion(matchingProducts)}">
                  ${priceCentConversion(matchingProducts)}
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
                    <input type="Number" class="quantity-input"> 
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
                  Total: <span class="quantity-price-total">${(matchingProducts.priceInCents/100 * insideCart.quantity).toFixed(2)}</span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option" data-shipping-fee="${0.00}" data-shipping-id="${matchingProducts.id}">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProducts.id}">
                  <div>
                    <div class="delivery-option-date">
                    Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                    FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option" data-shipping-fee="${4.99}" data-shipping-id="${matchingProducts.id}">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProducts.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option"  data-shipping-fee="${9.99}" data-shipping-id="${matchingProducts.id}">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProducts.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price ">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;


        });

let orderSummary = `  
      <div class="delivery-choices">
        <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
          <div>Items (${quant()}):</div>
          <div class="payment-summary-money">$${orderTotal()}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money shipping-option">$0.00</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$543.43</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$4.77</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$612.63</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
      </div>`;
        
document.querySelector(".js-order-summary").innerHTML = checkoutHTML;
document.querySelector(".payment-summary").innerHTML = orderSummary;


function shipping(){
  let ship = document.querySelectorAll(".delivery-option");
  let summary = document.querySelector(".shipping-option");
  
  let orderShipSummary = 0;
  ship.forEach(shipItem=>{
    shipItem.addEventListener("click", ()=>{
      let shipfee = shipItem.dataset.shippingFee;
      let shipID = shipItem.dataset.shippingId;
      // console.log(shipID);

      let devRadioParent = shipItem.closest(".delivery-options"); 
      let rd = devRadioParent.querySelector(".delivery-option-input").value;
      rd = Number(shipfee).toFixed(2);

      let catchMatch = cart.find(item=>item.productsId === shipID);
      let shipDeliverUpdate = 0; 
      if(catchMatch){
        catchMatch.shippingDelivery = +rd;
        shipDeliverUpdate = catchMatch.shippingDelivery;
        orderShipSummary += shipDeliverUpdate;
      }
      console.log(shipID + shipDeliverUpdate);

      summary.innerHTML = `${orderShipSummary}`;
      
    });

  });
}
shipping();

function orderTotal(){
  let tot = 0;
  cart.forEach(item=>{
    tot += item.productPricePerQuantity;
  });
  return tot.toFixed(2);
}

function quant(){
  let itemCart = 0;
  cart.forEach(item=>{    
    itemCart += item.timesCart;
  });
  return itemCart;
}

function headerCartCount(){
  navBarCartQuantity();  
  if(totalCartQuantity>0){
    document.querySelector('.js-cart-count').innerHTML = totalCartQuantity; 
  }else{
    document.querySelector('.js-cart-count').innerHTML = ``;  
  }
}
headerCartCount()


let deletes = document.querySelectorAll(".js-delete-link");
deletes.forEach(function(del){
    del.addEventListener("click", ()=>{
      console.log("Deletes");
        let productsId = del.dataset.deleteCart;
        deleting(productsId);

        del.closest(".js-cart-item-container").remove();
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
          saveToStorage();
        }
      });
    });
  });
}); 