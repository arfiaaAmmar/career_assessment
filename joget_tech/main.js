let numbers = [];

for (let i = 0; i < 10; i++) {
  numbers.push(Math.floor(Math.random() * 1000) + 1);
}

console.log("Random numbers: ", numbers);
console.log("Sum: ", numbers.reduce((a, b) => a + b, 0));


const navbar = document.getElementsByClassName("unite-header").style.visibility = 'hidden'