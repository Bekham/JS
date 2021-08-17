function power(val, pow) {
    if (pow === 1) {
        return val
    }
    else {
        return power(val, pow-1) * val
    }
}

console.log(power(2,4))