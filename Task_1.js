'use strict';
let arr = [2]
let i = 3
while (i < 100) {
    let count = 0
    for (let t = 3; t < i; t = t + 2) {
        if (i % t === 0) {
            count++;
            t = i
        }
    }
    if (count === 0) {
        arr.push(i)
    }
    i = i + 2
}
console.log(arr, arr.length)