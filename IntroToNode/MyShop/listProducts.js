let faker = require("faker");

function intro() {
  console.log("==========\n",
    "WELCOME TO MY SHOP\n",
    "==========")
}

function fakeProducts(num) {
  for (var i = 0; i < num; i++) {
    let product = faker.commerce.productName();
    let price = faker.commerce.price();
    console.log(product + " - $" + price);
  }
}

intro();
fakeProducts(10);
