// Our Partners
tippy('#partner-1', {
    content: "Earthday.ca non-profit organization that inspires and supports people across Canada to connect with nature and build resilient communities. Their website provides information about their programs, initiatives, and events related to environmental education, conservation, and sustainability.",
    placement: 'bottom',
    followCursor: 'horizontal',

    // Chưa chạy
    animation: 'scale-subtle',
    theme: 'light',
});

tippy('#partner-2', {
    content: "Earthhero.com is an online marketplace that sells a wide range of sustainable products. It aims to help customers make eco-friendly choices and reduce their environmental impact.",
    placement: 'bottom',
    followCursor: 'horizontal',

    // Chưa chạy
    animation: 'scale-subtle',
    theme: 'light',
});

tippy('#partner-3', {
    content: "Ecosia is a search engine that plants trees while you search the web. They use the profit made from the searches to plant trees all over the world – particularly in Haiti, Brazil, Peru, Indonesia, Spain, Kenya, Ghana and more.",
    placement: 'bottom',
    followCursor: 'horizontal',

    // Chưa chạy
    animation: 'scale-subtle',
    theme: 'light',
});

// Footer
const guestList = JSON.parse(localStorage.getItem('guestList')) || []
const footerForm = document.getElementById('footer-form')
const guestName = document.getElementById('guest-name')
const guestEmail = document.getElementById('guest-email')
const message = document.getElementById('message')

footerForm.onsubmit = function (event) {

    if ((guestName.value != '') && (guestEmail.value != '') && (message.value != '')) {
        event.preventDefault()
        const newMessage = {
            guestName: guestName.value,
            guestEmail: guestEmail.value,
            message: message.value
        }
        guestList.push(newMessage)

        Swal.fire({
            title: 'Your message has been sent!',
            text: 'Please give us 1-2 days for response.',
            imageUrl: './main imgs/sweet-alert-pic.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })

        localStorage.setItem('guestList', JSON.stringify(guestList))
    }
    else {
        alert('Every box needs to be filled to submit.')
    }
}

// Scroll to top btn
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