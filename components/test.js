let arr = ["fish", "cow", "goat", "dog", "donkey", "cat", "mice", "mouse"];

arr
  .filter((_, i) => i % 2 === 0)
  .map((item, index) => console.log(index === 1 ? "$" : item));

arr.filter((_, i) => i % 2 !== 0).map((item) => console.log(item));
