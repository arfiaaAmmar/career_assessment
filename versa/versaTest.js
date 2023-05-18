
const fs = require('fs')

let result = []

for (let i = 1; i <= 100;  i++) {
    if(i % 3 === 0 && i % 5 === 0) {
        result.push("BIG BANG");
    } 
    if (i % 3 === 0){
        result.push("BIG");
    }
    if (i % 5 === 0){
        result.push("BANG");
    }
    else {
        result.push(i);
    }
}

fs.writeFile('result.json', JSON.stringify(result), function(err){
    if (err) throw err;
    console.log('Result saved to result.json')
});