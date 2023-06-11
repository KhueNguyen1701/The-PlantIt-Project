import products from './earthday.data.js'

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { app, db } from '../firebase.js'

const auth = getAuth()

// Test
const querySnapshot = await getDocs(collection(db, "products",));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.data())
    renderProduct(doc.data())
});

// // Hien thi danh sach san pham
// for (let product of products.data) {
//     // Tao va them class cho element card
//     const card = document.createElement('div')
//     card.classList.add('card', 'w-100', 'h-100')

//     // Tao, them class cho img va gan gia tri cho thuoc tinh src
//     const image = document.createElement('img')
//     image.classList.add('card-img-top')
//     image.setAttribute('src', product.image[0])

//     // ------------------- HAM XU LY DOI HINH KHI RE CHUOT VAO --------------

//     image.onmouseover = function changeImage() {
//         image.setAttribute('src', product.image[1])
//     }

//     image.onmouseout = function changeImageBack() {
//         image.setAttribute('src', product.image[0])
//     }


//     // Tạo thẻ a
//     const imageWrapper = document.createElement('a')
//     imageWrapper.setAttribute('href', `./product.desc.html?id=${product.id}`)
//     imageWrapper.appendChild(image)

//     // Them img vao lam con cua card
//     card.appendChild(imageWrapper)

//     // Tao va them class cho element card body
//     const cardBody = document.createElement('div')
//     cardBody.classList.add('card-body', 'd-flex', 'flex-column')

//     // CHÈN ?ID SAU HREF
//     // Tao element name
//     const title = document.createElement('a')
//     title.setAttribute('href', `./product.desc.html?id=${product.id}`)
//     title.classList.add('card-title', 'mt-3', 'text-decoration-none', 'fs-5', 'fw-bold')
//     title.innerHTML = product.name

//     // Tao element price
//     const price = document.createElement('p')
//     price.classList.add('card-text', 'mt-auto')
//     price.innerHTML = product.price

//     // Tạo element rate
//     const rate = document.createElement('div')
//     rate.classList.add('small', 'mb-2')
//     for (let i = 1; i <= 5; i++) {
//         const rateStar = document.createElement('i')
//         rateStar.classList.add('fa-solid', 'fa-star')
//         rate.appendChild(rateStar)
//     }
//     const rateNumber = document.createElement('span')
//     rateNumber.innerHTML = ' (' + product.rate + ')'
//     rate.appendChild(rateNumber)

//     // Tao element button them vao gio
//     const addBtn = document.createElement('button')
//     addBtn.classList.add('btn', 'btn-success', 'w-100')
//     addBtn.innerHTML = 'Add to cart'

//     // Tham element title, price va button vao card body
//     cardBody.appendChild(title)
//     cardBody.appendChild(price)
//     cardBody.appendChild(rate)
//     cardBody.appendChild(addBtn)


//     // Tham element card body vao card
//     card.appendChild(cardBody)

//     // Tao element wrapper va them card vao
//     const wrapper = document.createElement('div')
//     wrapper.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mt-4')
//     wrapper.appendChild(card)

//     // Them wrapper vao list
//     const list = document.getElementById('list')
//     list.appendChild(wrapper)

//     // Xu ly khi nguoi dung bam vao nut "Add to cart"
//     addBtn.onclick = function () {
//         handleAddToCart(product)
//     }

// }

// ------------ XU LY KHI NGUOI DUNG DA DANG NHAP -------------------
const user = JSON.parse(localStorage.getItem('user')) || null

// Khai báo user
const greeting = document.getElementById('greeting')
// Khai báo nút Logout
const logoutBtn = document.getElementById('logout-btn')

// Khai báo icon user
const iconUser = document.getElementById('icon-user')

if (user) {
    greeting.innerHTML = user.email

    // Ẩn icon user
    iconUser.classList.add('d-none')

    // Hiện nút Logout
    logoutBtn.classList.remove('d-none')
}

// ------------ XU LY KHI NGUOI DUNG DA DANG XUAT -------------------

logoutBtn.onclick = function () {
    // Xoá user trong localStorage
    localStorage.removeItem('user')

    // Hiện icon user
    iconUser.classList.remove('d-none')

    // Ẩn logout
    logoutBtn.classList.add('d-none')

    // Xoá user
    greeting.innerHTML = ''
}


// --------------- XU LY GIO HANG ----------------------
const userList = JSON.parse(localStorage.getItem('userList')) || []
// const cartList = JSON.parse(localStorage.getItem('cartList')) || []

// Tạo 2 biến để lưu trữ vị trí user trong list
let userIndex
let currentUser

let cartList
if (user) {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email == user.email) {
            userIndex = i;
            currentUser = userList[i];
            cartList = currentUser.cartList;
            // console.log(userIndex, currentUser, cartList);
            renderCartItem()
            break
        }
    }
}
// renderCartItem()
function renderCartItem() {
    if (cartList.length > 0) {
        const cart = document.getElementById('cart')
        cart.innerHTML = ''
        const quantity = document.getElementById('quantity')
        quantity.innerHTML = cartList.length
    }

    // Render sản phẩm trong giỏ
    for (let item of cartList) {
        const wrapper = document.createElement('div')
        wrapper.classList.add('d-flex', 'align-items-center', 'border-bottom', 'mt-3', 'cart-canvas-item')


        const image = document.createElement('img')
        image.classList.add('cart-image')
        image.setAttribute('src', (item.product.image[0]))

        wrapper.appendChild(image)

        const info = document.createElement('div')
        info.classList.add('ms-3')

        const title = document.createElement('div')
        title.classList.add('fw-bold', 'mb-0')

        const name = document.createElement('span')
        name.innerHTML = item.product.name

        const quantity = document.createElement('span')
        quantity.classList.add('fw-normal', 'text-danger', 'ms-2')
        quantity.innerHTML = 'x' + item.quantity
        title.appendChild(name)
        title.appendChild(quantity)

        const price = document.createElement('small')
        price.classList.add('text-muted')
        price.innerHTML = 'x' + item.product.price

        // Thêm nút xoá sản phẩm
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('btn', 'btn-outline-dark', 'ms-auto')
        deleteBtn.innerHTML = 'X'

        info.appendChild(title)
        info.appendChild(price)

        wrapper.appendChild(info)
        wrapper.appendChild(deleteBtn)

        cart.appendChild(wrapper)


        // ------------------- HAM XU LY XOA SAN PHAM KHOI GIO --------------
        function deleteItem() {
            let deleteProduct = deleteBtn.parentElement
            deleteProduct.remove()
            // let productName = deleteProduct.children[1].name
            // deleteProduct.remove();

            // for (let i = 0; i < cartList.length; i++) {
            //     if (cartList[i][1].name === productName) {
            //         cartList.splice(i, 1);
            //     }
            // }

        }
        // Remove item trong cart
        deleteBtn.onclick = function () {
            deleteItem()
        }
    }
    // ------------------- HAM THANH TOAN, XOA TOAN BO SAN PHAM --------------
    function cartPurchase() {
        let emptyCart = document.querySelector(".offcanvas-body")
        // let emptyCart = purchaseBtn.parentElement.firstElementChild
        console.log(emptyCart)
        emptyCart.remove()
        cartList = []
        localStorage.setItem('userList', JSON.stringify(userList))
    }

    const purchaseBtn = document.getElementById('purchaseBtn')
    purchaseBtn.onclick = function () {
        cartPurchase()
        Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: 'You have successfully purchase!',
            showConfirmButton: true,
            timer: 3000,
        })
    }
}
// Thêm nút xoá sản phẩm
const deleteBtn = document.createElement('button')
deleteBtn.classList.add('btn', 'btn-outline-dark', 'ms-auto')
deleteBtn.innerHTML = 'X'

// ------------------- HAM XU LY THEM SAN PHAM VAO GIO --------------
function handleAddToCart(product) {
    // const index = products.data.indexOf(product)

    let duplicated = false

    // Kiem tra sp nguoi dung vua click da co trong gio chua
    if (cartList.length > 0) {
        for (let i in cartList) {
            if (JSON.stringify(cartList[i].product) === JSON.stringify(product)) {
                duplicated = true

                // Thay doi so luong
                cartList[i].quantity += 1

                // localStorage.setItem('cartList', JSON.stringify(cartList))
                // Cập nhật lại cartList trong currentUser trong userList
                currentUser.cartList = cartList
                userList[userIndex] = currentUser
                localStorage.setItem('userList', JSON.stringify(userList))
                break
            }
        }
    }

    if (!duplicated) {
        cartList.push({
            // product: product,
            product, // tuong tu dong tren
            quantity: 1,
        })

        // Cập nhật lại cartList trong currentUser trong userList
        currentUser.cartList = cartList
        userList[userIndex] = currentUser
        localStorage.setItem('userList', JSON.stringify(userList))
    }

    // Thay doi so luong sp trong gio
    renderCartItem()
}


// ------------------- NUT SCROLL TO TOP --------------
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


function renderProduct(product) {
    // Tao va them class cho element card
    const card = document.createElement('div')
    card.classList.add('card', 'w-100', 'h-100')

    // Tao, them class cho img va gan gia tri cho thuoc tinh src
    const image = document.createElement('img')
    image.classList.add('card-img-top')
    image.setAttribute('src', product.image[0])

    // ------------------- HAM XU LY DOI HINH KHI RE CHUOT VAO --------------

    image.onmouseover = function changeImage() {
        image.setAttribute('src', product.image[1])
    }

    image.onmouseout = function changeImageBack() {
        image.setAttribute('src', product.image[0])
    }


    // Tạo thẻ a
    const imageWrapper = document.createElement('a')
    imageWrapper.setAttribute('href', `./product.desc.html?id=${product.id}`)
    imageWrapper.appendChild(image)

    // Them img vao lam con cua card
    card.appendChild(imageWrapper)

    // Tao va them class cho element card body
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body', 'd-flex', 'flex-column')

    // CHÈN ?ID SAU HREF
    // Tao element name
    const title = document.createElement('a')
    title.setAttribute('href', `./product.desc.html?id=${product.id}`)
    title.classList.add('card-title', 'mt-3', 'text-decoration-none', 'fs-5', 'fw-bold')
    title.innerHTML = product.name

    // Tao element price
    const price = document.createElement('p')
    price.classList.add('card-text', 'mt-auto')
    price.innerHTML = product.price

    // Tạo element rate
    const rate = document.createElement('div')
    rate.classList.add('small', 'mb-2')
    for (let i = 1; i <= 5; i++) {
        const rateStar = document.createElement('i')
        rateStar.classList.add('fa-solid', 'fa-star')
        rate.appendChild(rateStar)
    }
    const rateNumber = document.createElement('span')
    rateNumber.innerHTML = ' (' + product.rate + ')'
    rate.appendChild(rateNumber)

    // Tao element button them vao gio
    const addBtn = document.createElement('button')
    addBtn.classList.add('btn', 'btn-success', 'w-100')
    addBtn.innerHTML = 'Add to cart'

    // Tham element title, price va button vao card body
    cardBody.appendChild(title)
    cardBody.appendChild(price)
    cardBody.appendChild(rate)
    cardBody.appendChild(addBtn)


    // Tham element card body vao card
    card.appendChild(cardBody)

    // Tao element wrapper va them card vao
    const wrapper = document.createElement('div')
    wrapper.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mt-4')
    wrapper.appendChild(card)

    // Them wrapper vao list
    const list = document.getElementById('list')
    list.appendChild(wrapper)

    // Xu ly khi nguoi dung bam vao nut "Add to cart"
    addBtn.onclick = function () {
        handleAddToCart(product)
    }

}