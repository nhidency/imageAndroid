let iconTrash = document.querySelector(".cartTab .fa-trash");
let iconTrashProductLike = document.querySelector(".productLikeTab .fa-trash");
let iconCheckBox = document.querySelector(".cartTab .listCart .item .col .checkbox");
let iconAllCheckBox = document.querySelector(".cartTab .allCheckBox .item-allcheckbox");
let iconAllCheckBoxProductLike = document.querySelector(".productLikeTab .allCheckBoxPL .item-allcheckboxLike");
let iconCartSpan = document.querySelector(".icons .icon-cart span");
let iconProductLikeSpan = document.querySelector(".icons .icon-heart span");
const listProductBestSeller = document.querySelector(".content .product .product_list")
idUser = localStorage.getItem('idUser');
console.log("url_nhi", localStorage.getItem('url_nhi'))
// const url_nhi = localStorage.getItem('url_nhi');
var requestBody = {
    productName: "",
    priceFrom: 0,
    priceTo: 1000000,
    categoryName: "",
    coupons: false
};

var currentPage = window.location.pathname;
var menuLinks = [
    { id: "home-link", href: "/" },
];
menuLinks.forEach(function(link) {
    if (currentPage === link.href) {
        document.getElementById(link.id).classList.add("active");
    } else {
        document.getElementById(link.id).classList.remove("active");
    }
});


let active = 0;
let lengthItems = items.length - 1;

next.onclick = function(){
    if(active + 1 > lengthItems){
        active = 0;
    }else{
        active = active + 1;
    }
    reloadSlider();
}

prev.onclick = function(){
    if(active - 1 < 0){
        active = lengthItems;
    }else{
        active = active - 1;
    }
    reloadSlider();
}

let refreshSlider = setInterval (()=>{next.click()}, 5000);

function showConfirmation(callback) {
    Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Mục đã được xóa.");
            callback(true);  // Gọi callback với giá trị true nếu người dùng chọn "Có"
        } else if (result.isDismissed) {
            console.log("Thao tác xóa đã được hủy.");
            callback(false); // Gọi callback với giá trị false nếu người dùng chọn "Không" hoặc đóng cửa sổ
        }
    });
}

function showSuccess(information) {
    Swal.fire({
        title: information,
        icon: 'success',
        showCancelButton: false
    })
}

function showFailed(information) {
    Swal.fire({
        title: information,
        icon: 'error',
        showCancelButton: false
    })
}


function reloadSlider(){
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + 'px';

    let lastActiveDot = document.querySelector('.slider .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');
    clearInterval(refreshSlider);
    refreshSlider = setInterval (()=>{next.click()}, 3000);
}

dots.forEach((li, key) =>{
    li.addEventListener('click', function(){
        active = key;
        reloadSlider();
    })
    
})

function startCountdown() {
    var duration = 86400000; // 1 day in milliseconds
    var endTime = localStorage.getItem('endTime');
    if (!endTime || currentTime() > parseInt(endTime)) {
        endTime = currentTime() + duration;
        localStorage.setItem('endTime', endTime);
    }

    function updateCountdown() {
        var timeRemaining = parseInt(endTime) - currentTime();

        if (timeRemaining < 0) {
            endTime = currentTime() + duration;
            localStorage.setItem('endTime', endTime);
            timeRemaining = duration;
        }

        var seconds = Math.floor((timeRemaining / 1000) % 60);
        var minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        var hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

        day.textContent = days;
        hour.textContent = hours;
        minute.textContent = minutes;
        second.textContent = seconds;

        setTimeout(updateCountdown, 1000);
    }
    updateCountdown();
}

function currentTime() {
    return Date.now();
}

startCountdown();
displayProductBestSeller()

function displayProductBestSeller(){
    var url = url_nhi + "/api/v1/Products/roleUser/filter?page=0&size=4";
    console.log("url + requestBody ", url, requestBody);
    fetch(url, {
        method: 'POST',
        headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        var products = data.content;
        console.log("11111 ", data)
        listProductBestSeller.innerHTML='';
        products.forEach(product =>{
            const itemProductBestSeller=`
                <div class="product_item ">
                    <div class="discount-code"><span>-${product.coupons}%</span></div>
                    <a class="like_product" onclick="addProductLike(${product.idProd})">
                        <i class="fa-regular fa-heart"></i>
                    </a>
                    <img src="${localStorage.getItem('url_nhi')}/${product.imageAvatar}" width="100%" height="300px">
                    <div class="product-detail">
                        <h3> ${product.productName} </h3>
                        <div class="price">${product.formattedDiscountedPrice} VND</div>
                        <span>${product.formattedPrice} VND</span>
                        <span class = "idProduct" style="display: none;">${product.idProd}</span>
                        <button class="btn-product-detail btnn" onclick="addProductCart(${product.idProd})"> Thêm vào giỏ hàng </button>
                    </div>
                </div>
            `

            listProductBestSeller.innerHTML += itemProductBestSeller
        })
        
    })
}

// display product
function displayProducts() {
    container.innerHTML = ''; // Xóa các sản phẩm hiện tại để hiển thị sản phẩm mới
    var url = url_nhi + "/api/v1/Products/roleUser/filter?page=0&size=15";
    console.log("url + requestBody ", url, requestBody);
    fetch(url, {
        method: 'POST',
        headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        var products = data.content;
        console.log(products);
        products.forEach(product => {
            var urlCheckProductLike = url_nhi + `/api/v6/ProdLike/check?idUser=${idUser}&idProd=${product.idProd}`;
            fetch(urlCheckProductLike, {
                method: 'GET',
                headers: {
                    // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('data ', data);
                const heartClass = data ? 'fa-heart liked' : 'fa-heart';
                let discountedPrice = product.retailPrice * (100 - product.coupons) / 100.0;
                const productHTML = `
                    <div class="box">
                    <span class="discount">-${product.coupons}%</span> <!-- Giả sử mức giảm giá cố định -->
                        <div class="image">
                            <img src="${localStorage.getItem('url_nhi')}/${product.imageAvatar}" alt="${product.productName}">
                            <div class="icons">
                            <a class="fa-solid ${heartClass}"></a>
                            <a class="cart-btn">Thêm vào giỏ</a>
                            <a class="fa-solid fa-share"></a>
                            <span class = "idProduct" style="display: none;">${product.idProd}</span>
                            <span class = "discountedPrice" style="display: none;">${discountedPrice.toFixed(3)}
                            </span>
                        </div>
                    </div>
                    <div class="content">
                        <h3>${product.productName}</h3>
                        <div class="price">${product.formattedDiscountedPrice} vnd <span>${product.formattedPrice} vnd</span></div>
                    </div>
                    </div>
                `;
                container.innerHTML += productHTML; // Thêm sản phẩm vào container
            }) 
            });
    }) // Gọi hàm hiển thị sản phẩm
    .catch(error => console.error('Error:', error));
}

displayProducts();

container.addEventListener("click", (event) => {
    console.log("even ", event)
    let positionClick = event.target;
    let parentDiv = positionClick.closest(".box");
    let productIdElement = parentDiv.querySelector(".idProduct");
    let productDiscountPriceElement = parentDiv.querySelector(".discountedPrice");
    let productId = productIdElement.textContent;
    let productDiscountPrice = productDiscountPriceElement.textContent;
    let urlCheckHeart = url_nhi + `/api/v6/ProdLike/check?idUser=${idUser}&idProd=${productId}`;
    let urlLike = url_nhi + `/api/v6/ProdLike?idUser=${idUser}&idProd=${productId}`;
    let urlUnLike = url_nhi + `/api/v6/ProdLike?idUser=${idUser}&idProd=${productId}`;
    let urlCheckProductInShoppingCart = url_nhi +`/api/v4/shoppingCart/check?idUser=${idUser}&idProd=${productId}`;
    let urlAddCart =url_nhi + `/api/v4/shoppingCart?idUser=${idUser}&idProd=${productId}&price=${productDiscountPrice}&size=35`;
    let urlSearchNumberProductSC = url_nhi +`/api/v4/shoppingCart/user/searchProduct?idUser=${idUser}&idProd=${productId}`;
    
    if (positionClick.classList.contains("fa-heart")) {
        console.log("box" , positionClick.classList.contains("fa-heart"))
        fetch(urlCheckHeart, {
            method: 'GET',
            headers: {
                // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then (data => {
            console.log("response ", data);
            var check =  String(data).toLowerCase();
            if(check === "true"){
                execute(urlUnLike, "DELETE", "heart");
            }else if(check === "false"){
                console.log("urlLike ", urlLike);
                execute(urlLike, "POST", "heart");
            }
        })

    }else if(positionClick.classList.contains("cart-btn")){
        fetch(urlCheckProductInShoppingCart, {
            method: 'GET',
            headers: {
                // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then (data => {
            var check = String(data).toLowerCase();
            if(check === "true"){
                fetch(urlSearchNumberProductSC, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                .then(response => response.json())
                .then(data => {
                    let numberProductSC = data.quantityProd + 1;
                    let urlPutProductInShoppingCart = url_nhi + `/api/v4/shoppingCart?idUser=${idUser}&idProd=${productId}&quantityProd=${numberProductSC}&price=${productDiscountPrice}&size=35`;
                    execute(urlPutProductInShoppingCart, "PUT", "addCart");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                
            }else if(check === "false"){
                execute(urlAddCart, "POST", "addCart");
            }
        })
    }else{
        window.location.href = "itemproduct?id=" + productId;
    }
})

function execute(url, method, type){
    console.log(url);
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if(type === "addCart"){
            addCartToHTML();
        }else if(type === "heart"){
            addProductLikeToHTML();
            displayProducts();
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function addCartToHTML(){
    if(idUser){
        let totalAmount = 0;
        listCartHTML.innerHTML = '';
        var urlGetCartSC = url_nhi + `/api/v4/shoppingCart/user/${idUser}`;
        console.log("url urlGetCartSC ", urlGetCartSC)
        fetch(urlGetCartSC, {
            method: 'GET',
            headers: {
                // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("data sc " + data)
            var productInCarts = data;
            let totalQuantity = 0;
            console.log(productInCarts);
            productInCarts.forEach(productInCart => {
                totalQuantity = totalQuantity + productInCart.quantityProd;
                console.log("quantity ", totalQuantity)
                var urlGetProduct = url_nhi + `/api/v1/Products/roleUser/${productInCart.idProd}`;
                fetch(urlGetProduct, {
                    method: "GET",
                    headers: {
                        // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => response.json())
                .then(data => {
                    var product = data;
                    totalAmount += productInCart.totalPrice;
                    console.log("productInCart.totalPrice ", productInCart.totalPrice);
                    console.log("totalAmount ", totalAmount);
                    const productInCartHTML = `
                    <div class="item">
                        <div class="col">
                            <input type="checkbox" id="myCheckbox" name="myCheckbox" class="item-checkbox">
                        </div>
                        <div class="col">
                            <div class="image">
                                <img src="${url_nhi}/${product.imageAvatar}" width="90" height="90">
                            </div>
                        </div>
                        <div class="col col2">
                            <div class="name">
                                ${product.productName}
                            </div>
                            <div class="price">
                                ${product.formattedDiscountedPrice} VND
                            </div>
                            <div class="quantity">
                                <span class="minus">-</span>
                                <span class = "numberProduct">${productInCart.quantityProd}</span>
                                <span class = "idProduct" style="display: none;">${productInCart.idProd}</span>
                                <span class="plus">+</span>
                                <span class="totalPrice">
                                    ${(productInCart.totalPrice).toLocaleString()}
                                </span>
                                <span class="totalTitle">VND</span>
                            </div>
                        </div>
                    </div>
                `;
                listCartHTML.innerHTML += productInCartHTML;
                iconCartSpan.innerText = totalQuantity;
                localStorage.setItem('total_Quantity_Product_In_SC', totalQuantity);
                document.querySelector('.checkOut').textContent = `Đặt hàng ${totalAmount.toLocaleString()} VND`; // Cập nhật nút thanh toán
                })
            });
            
        })
        .catch(error => console.error('Error:', error));
    }
    
}

function addProductLikeToHTML(){
    if(idUser){
        listProductLikeHTML.innerHTML = '';
        var urlGetProductLike = url_nhi + `/api/v6/ProdLike/user/${idUser}`;
        console.log("url urlGetProductLike ", urlGetProductLike)
        fetch(urlGetProductLike, {
            method: 'GET',
            headers: {
                // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("data sc " + data)
            var productLikes = data;
            let totalQuantity = 0;
            console.log(productLikes);
            productLikes.forEach(productLike => {
                totalQuantity = totalQuantity + 1;
                console.log("quantity ", totalQuantity)
                var urlGetProduct = url_nhi + `/api/v1/Products/roleUser/${productLike.idProd}`;
                fetch(urlGetProduct, {
                    method: "GET",
                    headers: {
                        // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => response.json())
                .then(data => {
                    var product = data;
                    const productLikeHTML = `
                    <div class="item">
                        <div class="col">
                            <input type="checkbox" id="myCheckbox" name="myCheckbox" class="item-checkboxPL">
                        </div>
                        <div class="col">
                            <div class="image">
                                <img src="${url_nhi}/${product.imageAvatar}" width="120" height="120">
                            </div>
                        </div>
                        <div class="col">
                            <div class="name">
                                ${product.productName}
                            </div>
                            <div class="price">
                                ${product.formattedDiscountedPrice} VND
                                <span class = "idProduct" style="display: none;">${productLike.idProd}</span>
                            </div>
                        </div>
                        
                    </div>
                `;
                listProductLikeHTML.innerHTML += productLikeHTML;
                iconProductLikeSpan.innerText = totalQuantity;
                console.log("iconProductLikeSpan.innerText", totalQuantity)
                localStorage.setItem('total_Quantity_Product_Like', totalQuantity);
                console.log("quantity ", totalQuantity)
                })
            });
        })
        .catch(error => console.error('Error:', error));
    }
    
}

listCartHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains("minus") || positionClick.classList.contains("plus")){
        let parentDiv = positionClick.closest(".quantity");
        let productIdElement = parentDiv.querySelector(".idProduct");
        let productId = productIdElement.textContent;
        let type = "minus";
        if(positionClick.classList.contains("plus")){
            type = "plus";
        }
        changeQuantity(productId, type);
        updateTrashIconVisibility();
    }else if(positionClick.classList.contains("item-checkbox")){
        updateTrashIconVisibility();
    }
})

listProductLikeHTML.addEventListener("click", (event) => {
    console.log("click checkbox")
    let positionClick = event.target;
    if(positionClick.classList.contains("item-checkboxPL")){
        console.log("click2")
        updateTrashPLIconVisibility();
    }
})

function updateTrashIconVisibility() {
    const anyChecked = document.querySelectorAll('.item-checkbox:checked').length > 0;
    iconTrash.style.display = anyChecked ? 'flex' : 'none';
}

function updateTrashPLIconVisibility() {
    const anyChecked = document.querySelectorAll('.item-checkboxPL:checked').length > 0;
    iconTrashProductLike.style.display = anyChecked ? 'flex' : 'none';
}

// xử lý khi click vào check box chọn tất cả trong giỏ hàng
iconAllCheckBox.addEventListener('click', function() {
    const productCheckboxes = document.querySelectorAll('.item-checkbox');
    iconAllCheckBox.addEventListener('change', function() {
        productCheckboxes.forEach(checkbox => {
            checkbox.checked = iconAllCheckBox.checked;
        });
        updateTrashIconVisibility();
    });
});

// xử lý khi click vào check box chọn tất cả trong danh sách sản phẩm yêu thích
iconAllCheckBoxProductLike.addEventListener('click', function() {
    console.log("click all pl")
    const productCheckboxes = document.querySelectorAll('.item-checkboxPL');
    iconAllCheckBoxProductLike.addEventListener('change', function() {
        productCheckboxes.forEach(checkbox => {
            checkbox.checked = iconAllCheckBoxProductLike.checked;
        });
        updateTrashPLIconVisibility()
    });
});

// chức năng xóa trong giỏ hàng
iconTrash.addEventListener("click", function(){
    showConfirmation(function(confirmed) {
        if (confirmed) {
            const productCheckboxes = document.querySelectorAll('.item-checkbox');
            productCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    let parentDiv = checkbox.closest('.item');
                    let productIdElement = parentDiv.querySelector('.idProduct');
                    let productId = productIdElement.textContent;
                    console.log("ID Sản phẩm cần xóa: ", productId);
                    var urlDeleteProductInCart = url_nhi + `/api/v4/shoppingCart?idUser=${idUser}&idProd=${productId}`;
                    fetch(urlDeleteProductInCart, {
                        method: 'DELETE',
                        headers: {
                            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("data", data)
                        if(data){
                            showSuccess("Bạn đã xóa thành công!");
                            addCartToHTML();
                        }else{
                            showFailed("Bạn đã không xóa thành công!");
                        }
                    })
                }
            });
        } else {
            console.log("Không xóa.");
        }
    });
})

// chức năng xóa trong danh sách sản phẩm yêu thích
iconTrashProductLike.addEventListener("click", function(){
    showConfirmation(function(confirmed) {
        if (confirmed) {
            const productCheckboxes = document.querySelectorAll('.item-checkboxPL');
            productCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    let parentDiv = checkbox.closest('.item');
                    let productIdElement = parentDiv.querySelector('.idProduct');
                    let productId = productIdElement.textContent;
                    console.log("ID Sản phẩm cần xóa: ", productId);
                    var urlDeleteProductInCart = url_nhi + `/api/v6/ProdLike?idUser=${idUser}&idProd=${productId}`;
                    fetch(urlDeleteProductInCart, {
                        method: 'DELETE',
                        headers: {
                            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("data", data)
                        if(data.status === 'ok'){
                            showSuccess("Bạn đã xóa thành công!");
                            addProductLikeToHTML();
                        }else{
                            showFailed("Bạn đã không xóa thành công!");
                        }
                    })
                }
            });
        } else {
            console.log("Không xóa.");
        }
    });
})

addCartToHTML();
addProductLikeToHTML();
async function changeQuantity(productId, type) {
    try {
        console.log("click  ", productId, type)
        const urlGetCartSC = `${url_nhi}/api/v4/shoppingCart/user/${idUser}`;
        console.log("url urlGetCartSC ", urlGetCartSC)
        const response = await fetch(urlGetCartSC, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            },
        });
        const productInCarts = await response.json();

        for (let productInCart of productInCarts) {
            if (productInCart.idProd === productId) {
                if (type === "minus" && productInCart.quantityProd > 1) {
                    let currentQuantity = productInCart.quantityProd - 1;
                    console.log("currentQuantity ", currentQuantity);
                    const urlUpdateCart = `${url_nhi}/api/v4/shoppingCart?idUser=${idUser}&idProd=${productId}&quantityProd=${currentQuantity}&price=${productInCart.price}&size=${35}`;
                    await fetch(urlUpdateCart, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        },
                    });
                    addCartToHTML(); // Cập nhật giỏ hàng ngay lập tức
                } else if (type === "minus" && productInCart.quantityProd === 1) {
                    await fetch(`${url_nhi}/api/v4/shoppingCart?idUser=${idUser}&idProd=${productId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        },
                    });
                    addCartToHTML(); // Cập nhật giỏ hàng ngay lập tức
                } else if(type === "plus"){
                    let currentQuantity = productInCart.quantityProd + 1;
                    console.log("currentQuantity ", currentQuantity);
                    const urlUpdateCart = `${url_nhi}/api/v4/shoppingCart?idUser=${idUser}&idProd=${productId}&quantityProd=${currentQuantity}&price=${productInCart.price}&size=35`;
                    await fetch(urlUpdateCart, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        },
                    });
                    addCartToHTML(); // Cập nhật giỏ hàng ngay lập tức
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("aa aa ", localStorage.getItem('total_Quantity_Product_In_SC'), localStorage.getItem('total_Quantity_Product_Like'))
    if (idUser) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    } else {
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    }
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('idUser'); // Xóa idUser khỏi localStorage khi nhấn Đăng xuất
        localStorage.removeItem('total_Quantity_Product_In_SC');
        localStorage.removeItem('total_Quantity_Product_Like');
        iconCartSpan.innerText = 0;
        iconProductLikeSpan.innerText = 0;
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    });
});
