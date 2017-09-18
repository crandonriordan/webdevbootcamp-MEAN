let googleFinance = require("google-finance");

let data = {};

let stockList = [
  //"VMRGX",
  "NYSE:MDT",
  "NYSE:JNJ",
  "NYSE:OHI",
  "NYSE:DIS"
];
console.log("step 1");

googleFinance.historical({
  symbols: stockList,
  from: "2017-08-28",
  to: "2017-09-01"
}, function(err, result) {
  if (err) {
    throw err;
  }
  console.log("step 2");
  let resultKeys = Object.keys(result);
  for (var i = 0; i < resultKeys.length; i++) {
    let arrayOfObjs = result[resultKeys[i]];
    let symbol = arrayOfObjs[0].symbol;
    let last = arrayOfObjs.length - 1;
    let openVal = (parseFloat(arrayOfObjs[0].open)).toFixed(2);
    let closeVal = (parseFloat(arrayOfObjs[last].close)).toFixed(2);
    // changeOverWeek = (close - open) / open * 100
    let changeOverWeek = (((closeVal - openVal) / openVal) * 100).toFixed(2);
    // log information then send it to do an object
    data[symbol] = {
      open: openVal,
      close: closeVal,
      changeOverWeek: changeOverWeek
    };
  }
});
