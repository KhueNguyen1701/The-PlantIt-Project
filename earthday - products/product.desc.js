// -----HIỂN THỊ CHI TIẾT SẢN PHẨM RA MÀN HÌNH---

import products from "./earthday.data.js"
// console.log(products)
// URL Search Params
const searchString = window.location.search
const searchParams = new URLSearchParams(searchString)
// Các phương thức như get/ getAll là hàm nên phía cuối phải có ngoặc tròn, trong ngoặc chèn tham số là phần đầu của params, sẽ trả về giá trị phía sau
// console.log(searchParams.get('id'))
// Kiểm tra xem có param đó hay không, nếu có trả về 'true', không thì trả về 'false'
// console.log(searchParams.has('id'))


// Duyệt qua toàn bộ sp xem cái nào có id giống cái được tìm kiếm
if (searchParams.has('id')) {
    // Hai chữ product không bị trùng nhau vì product trong for chỉ hđong trong phạm vi for
    let product = null
    for (const item of products.data) {
        // Cách 2: if (item.id.toString === searchParams.get('id')) --> chặt chẽ hơn
        if (item.id == searchParams.get('id')) {
            product = item
            break
        }
    }

    // Nếu đúng (tức là khác null, là đã có id sau khi đã được gán ở trên), thì hiển thị sản phẩm
    if (product) {
        const image = document.getElementById('image')
        const name = document.getElementById('name')
        const rate = document.getElementById('rate')
        const price = document.getElementById('price')
        const desc = document.getElementById('description')

        image.setAttribute('src', product.image[0])
        name.innerHTML = product.name
        price.innerHTML = product.price
    }
}
