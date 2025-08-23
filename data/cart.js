export let cart = JSON.parse(localStorage.getItem("cart")) || [
];

export function cartQuantity(productsId, quantity, price){
      let productPricePerQuantity = Number((quantity * price).toFixed(2));

      let sameItem = cart.find(alreadyInCart=>alreadyInCart.productsId === productsId);

      if(sameItem){
          sameItem.quantity += quantity;
          sameItem.productPricePerQuantity = sameItem.quantity * price;
      }else{
          cart.push(
          {
            productsId,
            quantity,
            timesCart: 1,
            shippingDelivery:0,
            productPricePerQuantity
          }
        );
    } 
    saveToStorage();
}
console.log(cart);

export function deleting(productsId){
    let atIndex = cart.findIndex(item=>item.productsId === productsId);
    if(atIndex !== -1){
        cart.splice(atIndex, 1);
    }
    saveToStorage();
}

export let totalCartQuantity = 0;
export function navBarCartQuantity(){
  cart.forEach(totalCarts =>{
    totalCartQuantity += totalCarts.timesCart;
  });
}

export function saveToStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}