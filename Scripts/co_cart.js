"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: Christian Bollinger
   Date:   3/20/25
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/ 

window.addEventListener("load", function() {
   var cart = document.forms.cart;

   calcCart();

   //Event handler for the web form
   cart.elements.modelQty.onchange = calcCart;
   
   var shippingOptions = document.querySelectorAll('input[name="shipping"]');
   for (var i=0; i < shippingOptions.length; i++) {
      shippingOptions[i].onclick = calcCart;
   }
});


function calcCart() {
   var cart = document.forms.cart;

   //Calculate initial cost
   var mCost = cart.elements.modelCost.value;
   var qIndex = cart.elements.modelQty.selectedIndex;
   var quantity = cart.elements.modelQty[qIndex].value;


   //Initial cost = model cost * qty
   var orderCost = mCost * quantity;
   cart.elements.orderCost.value = formatUSCurrency(orderCost);

   //Retrieve the cost of shipping
   var shipCost = document.querySelector('input[name="shipping"]:checked').value*quantity;
   cart.elements.shippingCost.value = formatNumber(shipCost, 2);

   //calculate the subtotal
   cart.elements.subTotal.value = formatNumber(orderCost + shipCost, 2);

   //calculate the cost of salestax
   var salesTax = 0.05*(orderCost + shipCost);
   cart.elements.salesTax.value = formatNumber(salesTax, 2);

   //calculate total cost
   var cartTotal = orderCost + shipCost + salesTax;
   cart.elements.cartTotal.value = formatUSCurrency(cartTotal);

   //store the order details
   cart.elements.shippingType.value = document.querySelector('input[name="shipping"]:checked').nextSibling.nodeValue;
}






function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}
