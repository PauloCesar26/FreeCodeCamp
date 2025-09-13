const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");

const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");

const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");

const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;
const products = [
    {
        id: 1,
        name: "Vanilla Cupcakes (6 Pack)",
        price: 12.99,
        category: "Cupcake"
    },
    {
        id: 2,
        name: "French Macaron",
        price: 3.99,
        category: "Macaron"
    },
    {
        id: 3,
        name: "Pumpkin Cupcake",
        price: 3.99,
        category: "Cupcake"
    },
    {
        id: 4,
        name: "Chocolate Cupcake",
        price: 5.99,
        category: "Cupcake"
    },
    {
        id: 5,
        name: "Chocolate Pretzels (4 Pack)",
        price: 10.99,
        category: "Pretzel"
    },
    {
        id: 6,
        name: "Strawberry Ice Cream",
        price: 2.99,
        category: "Ice Cream"
    },
    {
        id: 7,
        name: "Chocolate Macarons (4 Pack)",
        price: 9.99,
        category: "Macaron"
    },
    {
        id: 8,
        name: "Strawberry Pretzel",
        price: 4.99,
        category: "Pretzel"
    },
    {
        id: 9,
        name: "Butter Pecan Ice Cream",
        price: 2.99,
        category: "Ice Cream"
    },
    {
        id: 10,
        name: "Rocky Road Ice Cream",
        price: 2.99,
        category: "Ice Cream"
    },
    {
        id: 11,
        name: "Vanilla Macarons (5 Pack)",
        price: 11.99,
        category: "Macaron"
    },
    {
        id: 12,
        name: "Lemon Cupcakes (4 Pack)",
        price: 12.99,
        category: "Cupcake"
    }
]; 

//destructure properties
products.forEach(({name, id, price, category}) => {
    dessertCards.innerHTML += `
        <div class="dessert-card">
            <h2>${name}</h2>
            <p class="dessert-price">$${price}</p>
            <p class="product-category">Category: ${category}</p>
            <button id=${id} class="btn add-to-cart-btn">Add to cart</button>
        </div>
    `;
});

class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.taxRate = 8.25;
    }

    //method to add item
        //first argument "id", is the id of the product the user has added to their cart
        //second argument "products", is an array of product objects
            //by using a parameter instead of directly referencing your existing "products" array
    addItem(id, products){
        //to find the product that the user is adding to the cart
        const product = products.find((item) => {
            return item.id === id;
        });
        //destructuring to extract name and price from product
        const {name, price} = product;
        //add the product into the cart's
        this.items.push(product);

        const totalCountPerProduct = {};
        this.items.forEach((dessert) => {
            totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
        });

        const currentProductCount = totalCountPerProduct[product.id];
        //if a product has already been added to the user's cart, matching element which you'II need
        const currentProductCountSpan = document.getElementById(`product-count-for-id${product.id}`);
        //checks if the current product is already in the cart
        currentProductCount > 1 ? 
            currentProductCountSpan.textContent = `${currentProductCount}x` 
            : 
            productsContainer.innerHTML += 
            `<div class="product" id="dessert${id}">
                <p><span class="product-count" id="product-count-for-id${id}"></span>${name}</p>
                <p>${price}</p>
            </div>`;
    }

    getCounts(){
        return this.items.length;
    }

    calculateTotal(){
        const subTotal = this.items.reduce((total, item) => total + item.price, 0);
        const tax = this.calculateTaxes(subTotal);
        this.total = subTotal + tax;

        cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
        cartTaxes.textContent = `$${tax.toFixed(2)}`;
        cartTotal.textContent = `$${this.total.toFixed(2)}`;

        return this.total;
    }

    calculateTaxes(amount){
        //.toFixed() method used to format a number by converting it into a string and rounding it to a specified number of decimal places
            //the issue with .toFixed() returnning a string is that you want to be able to perfom calculations with the tax rate
            //To fix this, use parseFloat() function, this will convert the fixed string back into a number
        return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }

    clearCart(){
        if(!this.items.length){
            alert("Your shopping cart is already empty");
            return;
        }

        //Browse have a built-in confirm() function which displays a confirmation prompt to the user.
            //it accepts a string, whicl is the message displayed to the user
            //it return true if the user confirms and false if the user calcels
        let isCartCleared = confirm("Are you sure you want to clear all items from your shopping cart?");

        if(isCartCleared){
            this.items = [];
            this.total = 0;
            productsContainer.innerHTML = "";
            totalNumberOfItems.textContent = 0;
            cartSubTotal.textContent = 0;
            cartTaxes.textContent = 0;
            cartTotal.textContent = 0;
        }
    }
};
//instantiate a new ShoppingCart object 
 //new keyword used when instantiating the object
const cart = new ShoppingCart();

const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach((btn) => {
    btn.addEventListener("click", (event) => {
        //call .addItem method of cart object 
        cart.addItem(Number(event.target.id), products);
        totalNumberOfItems.textContent = cart.getCounts();
        cart.calculateTotal();
    });
});

cartBtn.addEventListener("click", () => {
    isCartShowing = !isCartShowing;

    showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
    cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));