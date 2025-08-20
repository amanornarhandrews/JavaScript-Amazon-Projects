export const cart =[
    {
        productsId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productsId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 4
    },
    {
        productsId: "e4f64a65-1377-42bc-89a5-e572d19252e2",
        quantity: 12
    }
];

export function cartQuantity(productsId, quantity, price){
      let productPricePerQuantity = Number((quantity * price).toFixed(2));

      let sameItem = cart.find(alreadyInCart=>alreadyInCart.productsId === productsId);

      if(sameItem){
          sameItem.quantity += quantity;
          sameItem.timesCart ++;
          sameItem.productPricePerQuantity += productPricePerQuantity;
      }else{
          cart.push(
          {
            productsId,
            quantity,
            timesCart: 1,
            productPricePerQuantity
          }
        );
      } 
}