let a = prompt("Введите значение а:");
a = parseInt(a)
let b = prompt("Введите значение b:");
b = parseInt(b)
if (Number.isInteger(a) && Number.isInteger(b)) {
    if (a > 0 && b > 0) {
        alert(a - b)
    } else if (a < 0 && b < 0) {
        alert(a * b)
    } else {
        alert(a + b)
    }
} else {
    alert('Необходимо ввести число!')
}