const messages = document.getElementById('message');

if (messages == null || messages == '' || messages == 'unknown' || messages == '(unknown)') {

} else {

    setTimeout(function() {
        messages.style.display = "none";
    }, 4000);


}


// modal start

let Mod_btn = document.getElementById('link');
let Mod_bg = document.querySelector('.mod-bg');
let Mod_close = document.querySelector('.mod-close');
let login_firm = document.getElementsByClassName('login_red')[0];
let login_indi = document.getElementsByClassName('login_red')[1];


Mod_btn.addEventListener('click', function() {
    Mod_bg.classList.toggle('active');


})
Mod_close.addEventListener('click', function() {
    Mod_bg.classList.remove('active');

})

login_firm.addEventListener('click', () => {
    window.location = '/login';
})
login_indi.addEventListener('click', () => {

    window.location = '/login_indi';
})