const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbot = document.querySelector(".chatbot");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");
const chatbotExpandBtn = document.querySelector(".expand-btn");
const overAll = document.querySelector(".overAll");
const homeLink = document.querySelector(".navbar .home")
const listSearchInput = document.querySelector(".list-search-input");
const inputSearch = document.getElementById('form1');
let iconCart = document.querySelector(".icon-cart");
let sectionCart = document.getElementById("shoppingCart");
let closeCart = document.querySelector(".cartTab .fa-circle-xmark");
let checkOutCart = document.querySelector(".cartTab .btn");
let closeProductLike = document.querySelector(".productLikeTab .fa-circle-xmark");
let iconProductLike = document.querySelector(".icon-heart");
let sectionProductLike = document.getElementById("productLike");
let lastMessageDate = null;
let showInputSearch = false;
let userMessage;
const inputInitHeight = chatInput.scrollHeight;
idUser = localStorage.getItem('idUser');
url_nhi = localStorage.getItem('url_nhi');
const abbreviations = {
    "ko": "không",
    "k": "không",
    "ng": "người",
    "nch": "nói chuyện",
    "nc": "nói chuyện",
    "ntn": "như thế nào",
    "v": "vậy",
    "đc": "được",
    "h": "giờ",
    "t": "tôi",
    "m": "mày",
    "bjo": "bao giờ",
    "cg": "cũng",
    "đthoai": "điện thoại",
    "hqua": "hôm qua",
    "mn": "mọi người", 
    "ib": "nhắn tin",
    "order": "đặt"
};

let names = [
    "Tôi cần tìm kiếm sản phẩm", "tôi cần tìm kiếm giày dép", "tôi cần tìm kiếm giày", "tôi cần tìm kiếm một đôi giày", 
    "tôi cần tìm kiếm dép", "tôi cần tìm kiếm một đôi dép", "Tôi cần mua sản phẩm", "tôi cần mua giày dép", "tôi cần mua giày", 
    "tôi cần mua một đôi giày", "tôi cần mua dép", "tôi cần mua một đôi dép", "Tôi cần mua cho mình sản phẩm", 
    "tôi cần mua cho mình giày dép", "tôi cần mua cho mình giày", "tôi cần mua cho mình một đôi giày", "tôi cần mua cho mình dép", 
    "tôi cần mua cho mình một đôi dép", "Tôi cần đặt sản phẩm", "tôi cần đặt giày dép", "tôi cần đặt giày", "tôi cần đặt một đôi giày", 
    "tôi cần đặt dép", "tôi cần đặt một đôi dép", "Tôi cần đặt cho mình sản phẩm", "tôi cần đặt cho mình giày dép", 
    "tôi cần đặt cho mình giày", "tôi cần đặt cho mình một đôi giày", "tôi cần đặt cho mình dép", "tôi cần đặt cho mình một đôi dép", 
    "Tôi cần sắm sản phẩm", "tôi cần sắm giày dép", "tôi cần sắm một đôi dép", "tôi cần sắm giày", "tôi cần sắm một đôi giày", 
    "tôi cần sắm dép", "Tôi cần sắm cho mình sản phẩm", "tôi cần sắm cho mình giày dép", "tôi cần sắm cho mình một đôi dép", 
    "tôi cần sắm cho mình giày", "tôi cần sắm cho mình một đôi giày", "tôi cần sắm cho mình dép", "tôi cần xem giày dép", "tôi cần xem giày", "tôi cần xem một đôi giày", "tôi cần xem dép", "tôi cần xem một đôi dép", "tôi cần xem cho mình giày dép", "tôi cần xem cho mình giày", "tôi cần xem cho mình một đôi giày", "tôi cần xem cho mình dép", "tôi cần xem cho mình một đôi dép", "tôi cần lựa giày dép", "tôi cần lựa giày", "tôi cần lựa một đôi giày", "tôi cần lựa dép", "tôi cần lựa một đôi dép", "tôi cần lựa chọn giày dép", "tôi cần lựa chọn giày", "tôi cần lựa chọn một đôi giày", "tôi cần lựa chọn dép", "tôi cần lựa chọn một đôi dép", "tôi cần lựa giày dép cho mình", "tôi cần lựa cho mình giày", "tôi cần lựa cho mình một đôi giày", "tôi cần lựa cho mình dép", "tôi cần lựa cho mình một đôi dép", "tôi cần lựa chọn cho mình giày dép", "tôi cần lựa chọn cho mình giày", "tôi cần lựa chọn cho mình một đôi giày", "tôi cần lựa chọn cho mình dép", "tôi cần lựa chọn cho mình một đôi dép", "tôi cần chọn giày dép", "tôi cần chọn giày", "tôi cần chọn một đôi giày", "tôi cần chọn dép", "tôi cần chọn một đôi dép", "tôi đang cần tìm kiếm giày dép", "tôi đang cần tìm kiếm giày", "tôi đang cần tìm kiếm một đôi giày", "tôi đang cần tìm kiếm dép", "tôi đang cần tìm kiếm một đôi dép", "tôi đang cần xem giày dép", "tôi đang cần xem giày", "tôi đang cần xem một đôi giày", "tôi đang cần xem dép", "tôi đang cần xem một đôi dép", "tôi đang cần lựa giày dép", "tôi đang cần lựa giày", "tôi đang cần lựa một đôi giày", "tôi đang cần lựa dép", "tôi đang cần lựa một đôi dép", "tôi đang cần lựa chọn giày dép", "tôi đang cần lựa chọn giày", "tôi đang cần lựa chọn một đôi giày", "tôi đang cần lựa chọn dép", "tôi đang cần lựa chọn một đôi dép", "tôi đang cần chọn giày dép", "tôi đang cần chọn giày", "tôi đang cần chọn một đôi giày", "tôi đang cần chọn dép", "tôi đang cần chọn một đôi dép", "tôi đang cần tìm kiếm sản phẩm", "tôi muốn xem giày dép", "tôi muốn xem một đôi giày", "tôi muốn xem giày", "tôi muốn xem một đôi dép", "tôi muốn xem dép", "tôi muốn tìm kiếm giày dép", "tôi muốn tìm kiếm giày", "tôi muốn tìm kiếm một đôi giày", "tôi muốn tìm kiếm một đôi dép", "tôi muốn tìm kiếm dép", "tôi muốn lựa giày dép", "tôi muốn lựa giày", "tôi muốn lựa một đôi giày", "tôi muốn lựa dép", "tôi muốn lựa một đôi dép", "tôi muốn chọn giày dép", "tôi muốn chọn một đôi giày", "tôi muốn chọn giày", "tôi muốn chọn một đôi dép", "tôi muốn chọn dép", "tôi muốn lựa chọn giày dép", "tôi muốn lựa chọn một đôi giày", "tôi muốn lựa chọn giày", "tôi muốn lựa chọn một đôi dép", "tôi muốn lựa chọn dép", "tôi muốn xem sản phẩm bên bạn", "tôi đang muốn xem giày dép", "tôi đang muốn xem một đôi giày", "tôi đang muốn xem giày", "tôi đang muốn xem một đôi dép", "tôi đang muốn xem dép", "tôi đang muốn tìm kiếm giày dép", "tôi đang muốn tìm kiếm một đôi giày", "tôi đang muốn tìm kiếm giày", "tôi đang muốn tìm kiếm một đôi dép", "tôi đang muốn tìm kiếm dép", "tôi đang muốn lựa giày dép", "tôi đang muốn lựa một đôi giày", "tôi đang muốn lựa giày", "tôi đang muốn lựa một đôi dép", "tôi đang muốn lựa dép", "tôi đang muốn chọn giày dép", "tôi đang muốn chọn một đôi giày", "tôi đang muốn chọn giày", "tôi đang muốn chọn một đôi dép", "tôi đang muốn chọn dép", "tôi đang muốn lựa chọn giày dép", "tôi đang muốn lựa chọn một đôi giày", "tôi đang muốn lựa chọn giày", "tôi đang muốn lựa chọn một đôi dép", "tôi đang muốn lựa chọn dép", "tôi đang muốn xem sản phẩm bên bạn", "tôi mong muốn xem giày dép", "tôi mong muốn xem một đôi giày", "tôi mong muốn xem giày", "tôi mong muốn xem một đôi dép", "tôi mong muốn xem dép", "tôi mong muốn tìm kiếm giày dép", "tôi mong muốn tìm kiếm một đôi giày", "tôi mong muốn tìm kiếm giày", "tôi mong muốn tìm kiếm một đôi dép", "tôi mong muốn tìm kiếm dép", "tôi mong muốn lựa giày dép", "tôi mong muốn lựa một đôi giày", "tôi mong muốn lựa giày", "tôi mong muốn lựa một đôi dép", "tôi mong muốn lựa dép", "tôi mong muốn chọn giày dép", "tôi mong muốn chọn một đôi giày", "tôi mong muốn chọn giày", "tôi mong muốn chọn một đôi dép", "tôi mong muốn chọn dép", "tôi mong muốn lựa chọn giày dép", "tôi mong muốn lựa chọn một đôi giày", "tôi mong muốn lựa chọn giày", "tôi mong muốn lựa chọn một đôi dép", "tôi mong muốn lựa chọn dép", "tôi mong muốn xem sản phẩm bên bạn", "tôi đang mong muốn xem giày dép", "tôi đang mong muốn xem một đôi giày", "tôi đang mong muốn xem giày", "tôi đang mong muốn xem một đôi dép", "tôi đang mong muốn xem dép", "tôi đang mong muốn tìm kiếm giày dép", "tôi đang mong muốn tìm kiếm một đôi giày", "tôi đang mong muốn tìm kiếm giày", "tôi đang mong muốn tìm kiếm một đôi dép", "tôi đang mong muốn tìm kiếm dép", "tôi đang mong muốn lựa giày dép", "tôi đang mong muốn lựa một đôi giày", "tôi đang mong muốn lựa giày", "tôi đang mong muốn lựa một đôi dép", "tôi đang mong muốn lựa dép", "tôi đang mong muốn chọn giày dép", "tôi đang mong muốn chọn một đôi giày", "tôi đang mong muốn chọn giày", "tôi đang mong muốn chọn một đôi dép", "tôi đang mong muốn chọn dép", "tôi đang mong muốn lựa chọn giày dép", "tôi đang mong muốn lựa chọn một đôi giày", "tôi đang mong muốn lựa chọn giày", "tôi đang mong muốn lựa chọn một đôi dép", "tôi đang mong muốn lựa chọn dép", "tôi đang mong muốn xem sản phẩm bên bạn", "tôi cần tìm kiếm giày dép", "tôi đang có nhu cầu tìm kiếm giày dép", "tôi đang có nhu cầu tìm kiếm dép", "tôi đang có nhu cầu tìm kiếm một đôi dép", "tôi đang có nhu cầu tìm kiếm giày", "tôi đang có nhu cầu tìm kiếm một đôi giày", "tôi đang cần lựa chọn giày dép", "tôi đang cần đặt giày dép", "tôi đang cần đặt một đôi giày", "tôi đang cần đặt giày", "tôi đang cần đặt một đôi dép", "tôi đang cần đặt dép", "tôi đang cần mua giày dép", "tôi đang cần mua một đôi giày", "tôi đang cần mua giày", "tôi đang cần mua một đôi dép", "tôi đang cần mua dép", "tôi đang rất cần lựa chọn giày dép", "tôi đang rất cần đặt giày dép", "tôi đang rất cần đặt một đôi giày", "tôi đang rất cần đặt giày", "tôi đang rất cần đặt một đôi dép", "tôi đang rất cần đặt dép", "tôi đang rất cần mua giày dép", "tôi đang rất cần mua một đôi giày", "tôi đang rất cần mua giày", "tôi đang rất cần mua một đôi dép", "tôi đang rất cần mua dép", "tôi mong muốn đặt giày dép", "tôi mong muốn đặt một đôi giày", "tôi mong muốn đặt giày", "tôi mong muốn đặt một đôi dép", "tôi mong muốn đặt dép", "tôi mong muốn mua giày dép", "tôi mong muốn mua một đôi giày", "tôi mong muốn mua giày", "tôi mong muốn mua một đôi dép", "tôi mong muốn mua dép", "tôi đang muốn mua giày dép", "tôi đang muốn mua một đôi giày", "tôi đang muốn mua giày", "tôi đang muốn mua một đôi dép", "tôi đang muốn mua dép", "tôi đang muốn đặt giày dép", "tôi đang muốn đặt một đôi giày", "tôi đang muốn đặt giày", "tôi đang muốn đặt một đôi dép", "tôi đang muốn đặt dép"
];

function showSearchInput(){
    listSearchInput.style.display = 'block';
}

function hideSearchInput() {
    // Kiểm tra xem con trỏ chuột có trên input hoặc item-search-input không
    const isCursorOnInput = inputSearch.contains(document.activeElement);
    const isCursorOnListInput = listSearchInput.contains(document.activeElement);

    if (!isCursorOnInput && !isCursorOnListInput) {
        listSearchInput.style.display = 'none';
    }
}

function displayProductSearch(products) {
    var listSearchInput = $("header .navbar .input-group .list-search-input");
    console.log("click ", listSearchInput);
    
    showSearchInput();
    listSearchInput.empty();

    products.forEach(function(product) {
        var productName = product.productName;
        
        // Tạo phần tử div chứa ảnh và tên sản phẩm
        var itemSearchInput = $("<div>").addClass("item-search-input");
        var img = $("<img>").attr("src", `${localStorage.getItem('url_nhi')}/${product.imageAvatar}`).addClass("product-image");
        var name = $("<span>").text(productName).addClass("product-name");
        var idProd = $("<span>").text(product.idProd).addClass("product-id");
        console.log("id    ", product.idProd)
        // Đặt kích thước của ảnh
        img.css('width', '50px');
        img.css('height', '50px');
        idProd.css("display", "none");
        // Thêm sự kiện click cho mỗi phần tử div.item-search-input
        itemSearchInput.on('click', function() {
            $('#form1').val(productName);
        });
        
        // Thêm ảnh và tên sản phẩm vào phần tử div.item-search-input
        itemSearchInput.append(img).append(name).append(idProd);
        // Thêm phần tử vào listSearchInput
        listSearchInput.append(itemSearchInput);
        listSearchInput.css('display', 'none');
    });
}

$(document).ready(function() {
    $('.list-search-input').on('click', '.item-search-input', function() {
        var idProd1 = $(this).find('span.product-id').text();
        console.log("id    ", idProd1);
        window.location.href = "/itemproduct?id=" + idProd1;
    });
});



// function displayProductSearch(products) {
//     let listSearchInput = document.querySelector("header .navbar .input-group .list-search-input");
//     console.log("click ", listSearchInput)
//     showSearchInput()
//     listSearchInput.innerHTML = "";

//     products.forEach(product => {
//         let productName = product.productName;
//         let itemSearchInput = document.createElement('div');
//         itemSearchInput.classList.add('item-search-input');
//         itemSearchInput.textContent = productName;
        
//         itemSearchInput.addEventListener('click', function() {
//             document.getElementById('form1').value = productName;
//         });
        
//         listSearchInput.appendChild(itemSearchInput);
//         listSearchInput.style.display = 'none';
//     });
// }

document.getElementById("form1").addEventListener("input", function() {
    let productName = document.getElementById("form1").value;
    let apiUrl = url_nhi +  `/api/v1/Products/roleUser/filter?page=0&size=15`;
    console.log("data search ", apiUrl)
    let body = {
        "productName": productName,
        "brand": "Việt Nam",
        "size": 35,
        "priceFrom": 0,
        "priceTo": 1000000,
        "categoryName": ""
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        console.log("data search ", data)
        showInputSearch = true;
        displayProductSearch(data.content);
    })
    .catch(error =>{
        console.error('Error:', error);
        showInputSearch = false;
    } );
    
});

// sort names in ascending order
let sortedNames = names.sort();
chatInput.addEventListener("keyup", (e) =>{
    removeElements();
    for (const i of sortedNames){
        // console.log(i);
        if(i.toLocaleLowerCase().startsWith(chatInput.value.toLowerCase()) && chatInput.value != ""){
            let listItem = document.createElement("li");
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayNames('" + i + "')");
            let word = "<b>" + i.substr(0, chatInput.value.length) + "</b>";
            word += i.substr(chatInput.value.length);
            // console.log(word);
            listItem.innerHTML = word;
            document.querySelector(".list").appendChild(listItem);
        }
    }
});

function displayNames(value){
    chatInput.value = value;
    removeElements();
}

function removeElements(){
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) =>{
        item.remove();
    })
}

const createChatLi = (message, className) => {
    var date = '';
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const todayDate = now.toISOString().slice(0, 10);
    if (lastMessageDate !== todayDate) {
        const chatbox = document.querySelector('.chatbox');
        const dateDivider = document.createElement('li');
        dateDivider.className = 'date-divider';
        dateDivider.textContent = now.toLocaleDateString();
        date = now.toLocaleDateString();
        chatbox.appendChild(dateDivider);
    }
    lastMessageDate = todayDate;

    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    // Xác định sender
    const sender = className === "outgoing" ? "user" : "bot";

    // Kiểm tra nếu className là 'outgoing', bỏ qua ảnh
    let chatContent;
    if (className === "outgoing") {
        chatContent = `
            <p>${message}</p>
            <span class="timestamp">${formattedTime}</span>
        `;
    } else {
        // Nếu không phải là 'outgoing', hiển thị ảnh
        chatContent = `
            <div class="message-container">
                <span class="material-symbols-outlined">
                    <img src="/static/images/iconchat.png" width="50" height="50">
                </span>
                <p>${message}</p>
            </div>
            <span class="timestamp">${formattedTime}</span>
        `;
    }
    chatLi.innerHTML = chatContent;
    // Lưu chat vào database
    setTimeout(() => {
        if(idUser){
            saveChatToDatabase( message, sender, date, formattedTime, "", "", 0, 0, 0, "", true, false ); 
        }
    }, 600);
    return chatLi;
}

function saveChatToDatabase(content, sender, date, time, url, productName, brand, size, priceFrom, priceTo, categoryName, coupons, display) {
    const data = {
        content: content,
        sender: sender,
        timestamp: date,
        time: time,
        url: url,
        productName: productName,
        brand: brand,
        size: size,
        priceFrom: priceFrom,
        priceTo: priceTo,
        categoryName: categoryName,
        coupons: coupons,
        display: display
    };
    var urlSaveChat = url_nhi + `/api/v1/ChatBot?idUser=${idUser}`;
    console.log("urlSaveChat ", urlSaveChat);
    console.log("data ", data)
    fetch(urlSaveChat, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => {
        console.error('Error:', error);
    });
}

function normalizeText(text) {
    // Chuyển đổi ký tự thành chữ thường
    text = text.toLowerCase();

    // Loại bỏ dấu câu (tùy chọn)
    text = text.replace(/[~!@#$%^&*()\-+=/><?]+/g, "");

    // Thay thế từ viết tắt và slang
    text = text.split(" ").map(word => abbreviations[word] || word).join(" ");

    return text;
}

let incomingChatLi;
var requestBody = {
    productName: "",
    priceFrom: 0,
    priceTo: 1000000,
    categoryName: "",
    coupons: false
};
const generateResponse = () => {
    const API_URL = "http://localhost:5005/webhooks/rest/webhook";
    var url = url_nhi + "/api/v1/Products/roleUser/filter?page=0&size=15";
    console.log("user" + userMessage);
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(requestBody)
        body: JSON.stringify({ message: userMessage })
    }

    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(datalist => {
            console.log("data list ", datalist.content);
            if (datalist.length === 0) {
                const messageElement = incomingChatLi.querySelector("p");
                messageElement.textContent = 'Rất xin lỗi bạn vì sự bất tiện này! Nếu bạn có bất kỳ thắc mắc gì cần hỗ trợ ngay xin hãy liên hệ với số hotline: 0654357689 để được shop giải đáp nhanh nhất có thể nhé. Cảm ơn bạn rất nhiều.';
                chatbox.scrollTo(0, chatbox.scrollHeight);
            } else {
                for (const data of datalist) {
                    if (!data.text) {
                        const customer = data.custom;
                        console.log("prod ", customer)
                        if (customer.products) {
                            const products = customer.products.content;
                            if(products.length === 0){
                                let incomingChatLi1 = createChatLi("Hiện tại bên mình không có sản phẩm nào đáp ứng ứng được toàn bộ yêu cầu bạn đề ra, bạn có thể tham khảo các mẫu khác bên mình còn nhiều mẫu rất xinh xắn nha", "incoming");
                                chatbox.appendChild(incomingChatLi1);
                                break;
                            }
                            let chatLii1 = document.createElement("li");
                            chatLii1.classList.add("chat", "incoming");
                            let boxContainer = document.createElement("div");
                            boxContainer.classList.add("box-container");
                            for(let i = 0; i < products.length; i++){
                                var product = products[i];        
                                let list = `
                                    <div class="box">
                                        <span class="discount">-${product.coupons}%</span> <!-- Giả sử mức giảm giá cố định -->
                                            <div class="image">
                                                <img src="${localStorage.getItem('url_nhi')}/${product.imageAvatar}" alt="">
                                                <div class="icons">
                                                    <a class="fa-solid fa-heart"></a>
                                                    <a class="cart-btn">Thêm vào giỏ</a>
                                                    <a class="fa-solid fa-share"></a>
                                                    <span class="idProduct" style="display: none;">${product.idProd}</span>
                                                </div>
                                            </div>
                                            <div class="content">
                                                <h3>${product.productName}</h3>
                                                <div class="price">${product.formattedDiscountedPrice} vnd <span>${product.formattedPrice} vnd</span></div>
                                            </div>
                                    </div>
                                `;
                                boxContainer.innerHTML += list
                                // console.log("box ", boxContainer.innerHTML)
                            }
                            chatLii1.appendChild(boxContainer);
                            chatbox.appendChild(chatLii1);
                            console.log("box ", chatLii1.innerHTML)
                        }
                        
                    } else {
                        if (incomingChatLi) {
                            incomingChatLi.remove();
                        }
                        let incomingChatLi1 = createChatLi(data.text, "incoming");
                        chatbox.appendChild(incomingChatLi1);
                    }
                }
                chatbox.scrollTo(0, chatbox.scrollHeight);
            }
        })
        .catch((error) => {
            const messageElement = incomingChatLi.querySelector("p");
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again";
            chatbox.scrollTo(0, chatbox.scrollHeight);
        });
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    
    
    if(!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        // Chuẩn hóa văn bản đầu vào
        userMessage = normalizeText(userMessage);
        generateResponse();
    }, 600);
}

chatInput.addEventListener("input", function() {
    // Reset chiều cao về mặc định để có thể tính toán chiều cao mới nếu nội dung đã bị xóa
    this.style.height = 'auto';
    // Thiết lập chiều cao mới dựa trên scrollHeight của textarea
    this.style.height = this.scrollHeight + 'px';
});

chatInput.addEventListener("keydown", (e) => {
    // if enter key is pressed without Shift key and the window
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

chatbotExpandBtn.addEventListener("click", () => {
    chatbot.classList.toggle('chatbot-expanded');
})

chatbotToggler.addEventListener("click", () =>{
    if(idUser){
        fetch(url_nhi + `/api/v1/ChatBot?idUser=${idUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${API_KEY}`
            }
        })
        .then(response => response.json())
        .then(data => {
            var listChat = data;
            listChat.forEach(chat =>{
                console.log("dataChatCSDL ", chat)
                if (chat.timestamp) {
                    const chatbox = document.querySelector('.chatbox');
                    const dateDivider = document.createElement('li');
                    dateDivider.className = 'date-divider';
                    dateDivider.textContent = chat.timestamp;
                    chatbox.appendChild(dateDivider);
                }
                const getClassName = chat.sender === 'user' ? 'outgoing' : 'incoming';
                const chatLi = document.createElement("li");
                chatLi.classList.add("chat", getClassName);
                console.log("data.sender ", chat.sender)
                let chatContent;
                console.log("className ", getClassName);
    
                if (getClassName === "outgoing") {
                    chatContent = `
                        <p>${chat.content}</p>
                        <span class="timestamp">${chat.time}</span>
                    `;
                } else {
                    // Nếu không phải là 'outgoing', hiển thị ảnh
                    chatContent = `
                        <div class="message-container">
                            <span class="material-symbols-outlined">
                                <img src="/static/images/iconchat.png" width="50" height="50">
                            </span>
                            <p>${chat.content}</p>
                        </div>
                        <span class="timestamp">${chat.time}</span>
                    `;
                }
                chatLi.innerHTML = chatContent;
                chatbox.appendChild(chatLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
            })
        })
    }
    
    const incomingChatLi = createChatLi("Chào bạn! Cảm ơn bạn đã quan tâm đến shop của chúng tôi. Tôi có thể giúp gì cho bạn!", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    document.body.classList.toggle("show-chatbot");
})
iconCart.addEventListener("click", () =>{
    sectionCart.classList.toggle("showCart")
    overAll.style.opacity = "1";
    overAll.style.visibility = "visible";
})
closeCart.addEventListener("click", () => {
    sectionCart.classList.toggle("showCart")
    overAll.style.opacity = "0";
    overAll.style.visibility = "hidden";
})
iconProductLike.addEventListener("click", () =>{
    sectionProductLike.classList.toggle("showProductLike")
    overAll.style.opacity = "1";
    overAll.style.visibility = "visible";
})
closeProductLike.addEventListener("click", () => {
    sectionProductLike.classList.toggle("showProductLike")
    overAll.style.opacity = "0";
    overAll.style.visibility = "hidden";
})
checkOutCart.addEventListener("click", () => {
    window.location.href = '/cart';
})
document.querySelector('.buttonLogin').addEventListener('click', function() {
    window.location.href = '/login';
});

// const createChatLi = (message, className) => {
//     const chatLi = document.createElement("li");
//     chatLi.classList.add("chat", className);
//     addTimestamp();
//     checkDateChange();
//     let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"><img src="/static/images/iconchat.png" width="50" height="50"></span><p></p><span class="timestamp"></span>`;
//     chatLi.innerHTML = chatContent;
//     chatLi.querySelector("p").textContent = message;
//     return chatLi;
// }



