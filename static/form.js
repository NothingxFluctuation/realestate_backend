const first_name = document.getElementById('First');
const last = document.getElementById('Last');
const Company = document.getElementById('Company');
const Cr = document.getElementById('Cr');
const profile = document.getElementById('profile');
const profile_indi = document.getElementById('profile_indi');
const Email = document.getElementById('Email');
const password = document.getElementById('password');
const numer = document.getElementById('numer');
const error = document.querySelector('.error');
const number_error = document.querySelector('.number_error');
const file_error = document.querySelector('.file_error');




var infoArea = document.getElementById('file-upload-filename');
var infoArea_pr = document.getElementById('file-upload');
var infoArea_profile = document.getElementById('file-upload-profile');



const slidepage = document.querySelector('.slidepage');
const First_btn = document.querySelector('.firbtn');
const next_btnSec = document.querySelector('.next-1');
// const next_btnThird = document.querySelector('.next-2');

const prev_1 = document.querySelector('.prev-1');
const prev_2 = document.querySelector('.prev-2');
// const prev_3 = document.querySelector('.prev-3');

const submit = document.querySelector('.submit');
const progressText = document.querySelectorAll('p');
const progressCheck = document.querySelectorAll('.check');
const bullet = document.querySelectorAll('.bullets');
const form = document.getElementById('form_sign');
let max = 4;
let current = 1;

var d = 111;
const messages = document.getElementById('message');
try {
    setTimeout(function() {
        messages.style.display = "none";
    }, 4000);
} finally {

}


const first = document.getElementById('first');
const second = document.getElementById('second');
const third = document.getElementById('third');
const fourth = document.getElementById('fourth');



First_btn.addEventListener('click', function() {
    if (window.location.href.includes('firm')) {



        if (first_name.value == '' || first_name.value == null || last.value == '' || last.value == null || Company.value == '' || Company.value == null || Cr == '' || Cr == null) {

            error.classList.add('active');
            window.setTimeout(function() { error.classList.remove('active'); }, 2000)



        } else {
            let Z = Cr.value;
            Z.split(/(\\|\/)/g).pop()

            let A = Z.replace(/^.*\./, '');
            if (A == 'pdf') {
                infoArea.style.display = 'none';
                infoArea_pr.style.display = 'none';


                slidepage.style.marginRight = '-100%';
                bullet[current - 1].classList.add("active");
                progressText[current - 1].classList.add("active");
                progressCheck[current - 1].classList.add("active");
                current += 1;
            } else {
                file_error.classList.add('active');
                window.setTimeout(function() { file_error.classList.remove('active'); }, 2000)

            }

        }
    }
    if (window.location.href.includes('indi')) {


        if (first_name.value == '' || first_name.value == null || last.value == '' || last.value == null) {
            error.classList.add('active');
            window.setTimeout(function() { error.classList.remove('active'); }, 2000)


        } else {
            infoArea_profile.style.display = 'none';
            slidepage.style.marginRight = '-100%';
            bullet[current - 1].classList.add("active");
            progressText[current - 1].classList.add("active");
            progressCheck[current - 1].classList.add("active");
            current += 1;

        }
    }


})

next_btnSec.addEventListener('click', () => {
        if (Email.value == '' || Email.value == null, password.value == '' || password.value == null) {
            error.classList.add('active');
            window.setTimeout(function() { error.classList.remove('active'); }, 2000)


        } else {

            slidepage.style.marginRight = '-200%';
            bullet[current - 1].classList.add("active");
            progressText[current - 1].classList.add("active");
            progressCheck[current - 1].classList.add("active");
            current += 1;
        }
    })
    // next_btnThird.addEventListener('click', () => {
    //     if (numer.value == '' || numer.value == null) {
    //         error.classList.add('active');
    //         window.setTimeout(function() { error.classList.remove('active'); }, 2000)


//     } else if (numer.value.includes('-')) {

//         number_error.classList.add('active');
//         window.setTimeout(function() { number_error.classList.remove('active'); }, 2000)

//     } else {
//         slidepage.style.marginRight = '-300%';
//         bullet[current - 1].classList.add("active");
//         progressText[current - 1].classList.add("active");
//         progressCheck[current - 1].classList.add("active");
//         current += 1;

//     }
// })
submit.addEventListener('click', () => {

    bullet[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    current += 1;
    setTimeout(() => {


        form.submit();
    }, 800)
})

prev_1.addEventListener('click', function() {
    slidepage.style.marginRight = '0%';
    if (window.location.href.includes('indi')) {

        infoArea_profile.style.display = 'block';
    } else if (window.location.href.includes('firm')) {

        infoArea.style.display = 'block';
        infoArea_pr.style.display = 'block';
    }
    bullet[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    current -= 1;
})
prev_2.addEventListener('click', function() {
        slidepage.style.marginRight = '-100%';
        bullet[current - 2].classList.remove("active");
        progressText[current - 2].classList.remove("active");
        progressCheck[current - 2].classList.remove("active");
        current -= 1;

    })
    // prev_3.addEventListener('click', function() {
    //     slidepage.style.marginRight = '-200%';
    //     bullet[current - 2].classList.remove("active");
    //     progressText[current - 2].classList.remove("active");
    //     progressCheck[current - 2].classList.remove("active");
    //     current -= 1;
    // })


// first.addEventListener('focus', () => {
//     first.placeholder = '';
// })
// first.addEventListener('blur', () => {
//     first.placeholder = '0';
// })
// second.addEventListener('focus', () => {
//     second.placeholder = '';
// })
// second.addEventListener('blur', () => {
//     second.placeholder = '0';
// })
// third.addEventListener('focus', () => {
//     third.placeholder = '';
// })
// third.addEventListener('blur', () => {
//     third.placeholder = '0';
// })
// fourth.addEventListener('focus', () => {
//     fourth.placeholder = '';
// })
// fourth.addEventListener('blur', () => {
//     fourth.placeholder = '0';
// })
var input = document.getElementById('Cr');
var input_pr = document.getElementById('profile');
var input_profile = document.getElementById('profile_indi');

if (input != null) {

    input.addEventListener('change', showFileName);

    function showFileName(event) {

        // the change event gives us the input it occurred in 
        var input = event.srcElement;

        infoArea.style.zIndex = 6;


        // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
        var fileName = input.files[0].name;


        // use fileName however fits your app best, i.e. add it into a div
        infoArea.textContent = 'Uploaded: ' + fileName;
    }
}
if (input_pr != null) {


    input_pr.addEventListener('change', showFileName);

    function showFileName(event) {

        // the change event gives us the input it occurred in 


        infoArea_pr.style.zIndex = 6;
        // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
        var fileName_pr = input_pr.files[0].name;


        // use fileName however fits your app best, i.e. add it into a div
        infoArea_pr.textContent = 'Uploaded: ' + fileName_pr;
    }
}
if (input_profile != null) {
    console.log(typeof(input_profile));
    input_profile.addEventListener('change', showFileName);

    function showFileName(event) {

        // the change event gives us the input it occurred in 


        infoArea_profile.style.zIndex = 6;
        // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
        var fileName_profile = input_profile.files[0].name;


        // use fileName however fits your app best, i.e. add it into a div
        infoArea_profile.textContent = 'Uploaded: ' + fileName_profile;
    }
}
// function submitFormAjax() {
//     let xmlhttp= window.XMLHttpRequest ?
//         new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState === 4 && this.status === 200)
//             alert(this.responseText); // Here is the response
//     }

//     let name = document.getElementById('name').innerHTML;
//     let email = document.getElementById('email').innerHTML;

//     xmlhttp.open("POST","your_url.php",true);
// xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// xmlhttp.send("name=" + name + "&email=" + email);
// }