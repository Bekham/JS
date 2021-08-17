function incrNums (a, b) {
    return a + b
}
function decrNums (a, b) {
    return a - b
}
function mulNums (a, b) {
    return a * b
}
function delNums (a, b) {
    return a / b
}
function mathOperation (a, b, oper){
    switch (oper){
        case '+':
            return incrNums(a, b)
        case '-':
            return decrNums(a, b)
        case '*':
            return mulNums(a, b)
        case '/':
            return delNums(a, b)
        default:
            return 'Неверно ввеедена арифметическая операция'
    }
}
console.log(incrNums(2,2))
console.log(decrNums(2,2))
console.log(mulNums(2,2))
console.log(delNums(2,2))
console.log(mathOperation(3,3,'+'))
console.log(mathOperation(3,3,'-'))
console.log(mathOperation(3,3,'*'))
console.log(mathOperation(3,3,'/'))
console.log(mathOperation(3,3,'bla'))