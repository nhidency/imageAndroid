var currentPage = window.location.pathname;
var menuLinks = [
    { id: "product-link", href: "/product/" },
];
menuLinks.forEach(function(link) {
    if (currentPage === link.href) {
        document.getElementById(link.id).classList.add("active");
    } else {
        document.getElementById(link.id).classList.remove("active");
    }
});
const productListSearch = document.querySelector(".list-product-search")
requestBody = {
    productName: "",
    priceFrom: 0,
    priceTo: 1000000,
    categoryName: ""
};
idUser = localStorage.getItem('idUser');
displayProducts(requestBody);
getInputFromURL();
function getInputFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('nameProduct');
}

function displayProducts(tempRequestBody) {
    productListSearch.innerHTML = ''; // Xóa các sản phẩm hiện tại để hiển thị sản phẩm mới
    var url = url_nhi + "/api/v1/Products/roleUser/filter?page=0&size=15";
    console.log("url + requestBody ", url, tempRequestBody);
    fetch(url, {
        method: 'POST',
        headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tempRequestBody)
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
                        <div class="price">${product.formattedDiscountedPrice} <span>${product.formattedPrice}</span></div>
                    </div>
                    </div>
                `;
                productListSearch.innerHTML += productHTML; // Thêm sản phẩm vào container
            }) 
            });
    }) // Gọi hàm hiển thị sản phẩm
    .catch(error => console.error('Error:', error));
}


$(document).ready(function() {
    $(document).on('click', '.box', function() {
        var productId = $(this).find('.idProduct').text();
        window.location.href = "/itemproduct?id=" + productId;
    });
});


function showFailed(information) {
    Swal.fire({
        title: information,
        icon: 'error',
        showCancelButton: false
    })
}

$(document).ready(function() {
    $(".input-group .form-outline input").val(getInputFromURL());
    console.log("input ", getInputFromURL(), $(".input-group .form-outline input").val());
    console.log("aa aa ", localStorage.getItem('total_Quantity_Product_In_SC'), localStorage.getItem('total_Quantity_Product_Like'));

    if (idUser) {
        $("#loginButton").hide();
        $("#logoutButton").show();
    } else {
        $("#loginButton").show();
        $("#logoutButton").hide();
    }

    $("#logoutButton").click(function() {
        localStorage.removeItem('idUser');
        localStorage.removeItem('total_Quantity_Product_In_SC');
        localStorage.removeItem('total_Quantity_Product_Like');
        $("#iconCartSpan").text(0);
        $("#iconProductLikeSpan").text(0);
        $("#loginButton").show();
        $("#logoutButton").hide();
    });

    $('#price-start').on('input', function() {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
    $('#price-end').on('input', function() {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
});


$(".execute-delete").click(function(event) {
    $(this).closest(".colProduct").find('input[type="text"]').val("");
    $(this).closest(".colProduct").find('input[type="radio"]').prop("checked", false);
});

$(document).ready(function(){
    $(".execute-filter").click(function(){
        var brand = $("input[name='brand']:checked").val();
        var type = $("input[name='options']:checked").val();
        var priceStart = $("input[name='price-start']").val();
        var priceEnd = $("input[name='price-end']").val();
        
        if(brand === null || brand === undefined){
            brand = "";
        }

        if(type === null || type === undefined){
            type = "";
        }

        if(priceStart === null){
            priceStart = 0;
        }

        if(priceEnd === null){
            priceEnd = 1000000;
        }

        if(priceEnd < priceStart){
            showFailed("Giá tối đa bạn đang để nhỏ hơn giá tối thiểu. Hãy sửa lại cho đúng nha!")
        }

        searchRequestBody = {
            productName: "",
            priceFrom: priceStart,
            priceTo: priceEnd,
            categoryName: type,
            // brand: "Việt Nam"
        };
        productListSearch.innerHTML = `
        `;
        displayProducts(searchRequestBody)
        // Hiển thị giá trị đã lấy được để kiểm tra
        console.log("Thương hiệu: " + brand);
        console.log("Loại giày dép: " + type);
        console.log("Giá bắt đầu: " + priceStart);
        console.log("Giá kết thúc: " + priceEnd);
        
        // Tiếp theo, bạn có thể thực hiện các thao tác khác với các giá trị này ở đây
    });
});