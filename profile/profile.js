import { getAuth, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { app } from '../firebase.js'

const auth = getAuth()

//---------- LẤY THÔNG TIN NGƯỜI DÙNG HIỆN TẠI ----------
const email = document.getElementById('email')
const displayName = document.getElementById('display-name')
const phone = document.getElementById('phone')
const avatar = document.getElementById('avatar')
const avatarUrl = document.getElementById('avatar-url')

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
        if (user) {
            email.value = user.email
            displayName.value = user.displayName
            phone.value = user.phoneNumber
            avatarUrl.value = user.photoURL


            // Hiện avatar
            const photoUrl = user.photoURL || '../main imgs/default-avatar.jpg'
            avatar.setAttribute('src', photoUrl)
        }
    }
    else {

        console.log('không có user')
    }

})