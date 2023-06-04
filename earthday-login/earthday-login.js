import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { app } from "../firebase.js";
import { showToast } from "../utils/showToast.js"
const auth = getAuth();

const userList = JSON.parse(localStorage.getItem('userList')) || []

const form = document.getElementById('form')
const email = document.getElementById('email')
const password = document.getElementById('password')

form.onsubmit = function (event) {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            showToast('Successfully signed in')
            // ...
            window.location.href = '../'
        })
        .catch((error) => {
            const errorMessage = error.message;
            showToast(errorMessage, 'error')
        });
}



// const userList = JSON.parse(localStorage.getItem('userList')) || []

// const form = document.getElementById('form')
// const email = document.getElementById('email')
// const password = document.getElementById('password')
// const message = document.getElementById('message')

// form.onsubmit = function (event) {
//     event.preventDefault()

//     const loginUser = {
//         email: email.value,
//         password: password.value,
//     }

//     let flag = false

//     // Biến 2 object thành 2 chuỗi rồi so sánh
//     for (let user of userList) {
//         if ((loginUser.email == user.email) && (loginUser.password == user.password)) {
//             flag = true
//             break
//         }
//         else if (loginUser.email != user.email) {
//             message.textContent = 'This account does not exist.'
//         }
//         else if (loginUser.password != user.password) {
//             message.textContent = 'Please enter the valid password.'
//             console.log(loginUser.password, user.password)
//         }
//     }

//     if (flag) {
//         // User ton tai (email va password chinh xac)
//         localStorage.setItem('user', JSON.stringify(loginUser))

//         email.value = ''
//         password.value = ''

//         // Chuyen den trang dang nhap
//         window.location.href = '../index.html'
//     }
// }
