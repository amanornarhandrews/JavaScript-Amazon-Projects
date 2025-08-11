/*
The Main Idea of JavaScript to
1. Save the data
2. Generate the HTML
3. Make it interactive
*/

//This is a data structure (using ARRAYS and OBJECTS)
/*
//We used the file from products.js 
const products =[
    {
        image:'images/products/athletic-cotton-socks-6-pairs.jpg',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        rating:{
            stars: 4.5,
            counts: 87
        },
        priceInCents:1090 //Js has problem with floats so let's always save in cents or pesewas
    },
    {
        image:'images/products/intermediate-composite-basketball.jpg',
        name: 'Intermediate Size Basketball',
        rating:{
            stars:4,
            counts:127
        },
        priceInCents:2095
    },
    {
        image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        name:'Adults Plain Cotton T-Shirt - 2 Pack',
        rating:{
            stars:4.5,
            counts:56
        },
        priceInCents:799
    },
    {
        image:'images/products/6-piece-non-stick-baking-set.webp',
        name:'6-Piece Non-stick, Carbon Steel Oven Bakeware Baking Set',
        rating:{
            stars:4.5,
            counts:175
        },
        priceInCents:3499
    }
];
*/

/*
It is better to always generate the HTML in Javascript
to make it easier to add more products instead of all-the-time
manually generating it in the HTML file
*/

let generatedHTML = ``; //this is to combine all the html together

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

          <div class="product-price">
            ${(product.priceInCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
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

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name = "${product.name}"> 
            Add to Cart
          </button>
        </div>`;

    });

let addingToThePageContainer = document.querySelector('.js-product-grid');
addingToThePageContainer.innerHTML = generatedHTML;

//And we introduced the data Attribute syntax: data-name = ${whatever};
let addToCart = document.querySelectorAll('.js-add-to-cart');
addToCart.forEach(function(button){
    button.addEventListener('click', function(){
        const productName = button.dataset.productName;
        cart.push({
            productName:productName,
            quantity:1
        });
        console.log(cart);
    });
});

//the next thing now is to put it on the webpage (using the DOM)