function getSum(total, num) {
  return total + num;
}

function average(arr) {
  let total = arr.reduce(getSum);
  return (total / arr.length).toFixed(0);
}

console.log(average([90, 98, 89, 100, 100, 86, 94]));
