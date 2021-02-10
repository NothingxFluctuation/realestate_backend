const first = document.getElementById('first');
const second = document.getElementById('second');
const third = document.getElementById('third');
const fourth = document.getElementById('fourth');

first.addEventListener('focus', () => {
    first.placeholder = '';
})
first.addEventListener('blur', () => {
    first.placeholder = '0';
})
second.addEventListener('focus', () => {
    second.placeholder = '';
})
second.addEventListener('blur', () => {
    second.placeholder = '0';
})
third.addEventListener('focus', () => {
    third.placeholder = '';
})
third.addEventListener('blur', () => {
    third.placeholder = '0';
})
fourth.addEventListener('focus', () => {
    fourth.placeholder = '';
})
fourth.addEventListener('blur', () => {
    fourth.placeholder = '0';
})