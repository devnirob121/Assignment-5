const products = document.getElementsByClassName("product");
let totalPrice = 0;
let totalPriceElement = document.getElementById("totalPrice");
let savedAmountElement = document.getElementById("productDiscount");
let itemCount = 0; // Initialize itemCount to 0 initially
let afterDiscountTotalElement = document.getElementById("total");

for (const product of products) {
  product.addEventListener("click", function () {
    console.log(itemCount);
    const addToCardOl = document.getElementById("card-prouct-list-ol");
    const productTitle = this.getAttribute("title");
    let productPrice = product
      .querySelector(".product-price")
      .innerText.replace(" TK", "");
    productPrice = parseFloat(productPrice);

    // Check if the product is already in the list
    const existingItem = Array.from(
      addToCardOl.getElementsByTagName("li")
    ).find((item) => item.innerText === productTitle);
    
    if (existingItem) {
      // Remove the existing item
      existingItem.remove();
      totalPrice -= productPrice;
      itemCount--; // Decrease itemCount when a product is removed
    } else {
      if (itemCount < 9) {
        const listItem = document.createElement("li");
        listItem.innerText = productTitle;
        addToCardOl.appendChild(listItem);
        totalPrice += productPrice;
        itemCount++; // Increase itemCount when a product is added
      }
    }

    // Enable or disable the purchase button based on selected products
    const purchaseButton = document.getElementById("makePurchaseBtn");
    const congrateParen = document.getElementById("congrateParen");

    if (itemCount > 0) { // Change the condition to itemCount > 0
      purchaseButton.removeAttribute("disabled");
      purchaseButton.addEventListener("click", function (e) {
        e.preventDefault();
        congrateParen.classList.remove("invisible");
        congrateParen.classList.remove("opacity-0");
      });
    } else {
      purchaseButton.setAttribute("disabled", "true");
    }

    // Update the price
    totalPriceElement.innerText = `${totalPrice.toFixed(2)} TK`;
  });
}

const couponApplyBtn = document.getElementById("couponApplyBtn");
couponApplyBtn.addEventListener("click", function () {
  const couponFieldVal = document.getElementById("couponField").value;
  const filteredCoupon = couponFieldVal.trim();
  const invalidCouponAlert = document.getElementById("invalidCouponAlert");
  if (filteredCoupon === "SELL200") {
    // Calculate discounted price (20% off)
    const discount = totalPrice * 0.2;
    const discountedTotal = totalPrice - discount;

    // Calculate the amount saved due to the discount
    const savedAmount = totalPrice - discountedTotal;
    savedAmountElement.innerText = `${savedAmount.toFixed(2)} TK`;
    // Total price after 20% off
    afterDiscountTotalElement.innerText = `${discountedTotal.toFixed(2)} TK`;
    invalidCouponAlert.classList.add("hidden");
  } else if (filteredCoupon === "") {
    invalidCouponAlert.classList.remove("hidden");
    invalidCouponAlert.innerText = `Please Enter Coupon Code for 20% off`;
  } else {
    invalidCouponAlert.classList.remove("hidden");
    invalidCouponAlert.innerText = `Your ${filteredCoupon} Coupon is Invalid`;
  }
});

// Reset function to clear values
const GoHomeBtn = document.getElementById("GoHomeBtn");
GoHomeBtn.addEventListener("click", function()  {
  totalPrice = 0;
  totalPriceElement.innerText = "";
  itemCount = 0;
  savedAmountElement.innerText = "";
  afterDiscountTotalElement.innerText = "";
  const purchaseButton = document.getElementById("makePurchaseBtn");
  purchaseButton.setAttribute("disabled", "true");
  const congrateParen = document.getElementById("congrateParen");
  congrateParen.classList.add("invisible");
  congrateParen.classList.add("opacity-0");

  // Remove all <li> elements from the card
  const addToCardOl = document.getElementById("card-prouct-list-ol");
  while (addToCardOl.firstChild) {
    addToCardOl.removeChild(addToCardOl.firstChild);
  }
});
