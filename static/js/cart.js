const shoppingCartHTML = document.querySelector(".bodyCart .colCart1 .rowCart .listShoppingCart");
let totalAmount = 0;
let totalQuantity = 0;
if(totalQuantity > 0 ){
    document.querySelector(".rowCart1 .price span").textContent = `${totalAmount.toLocaleString()} VND`;
}

idUser = localStorage.getItem('idUser');
addShoppingCartToHTML();

console.log("aaaaa  ", localStorage.getItem('total_Quantity_Product_Like'), localStorage.getItem('total_Quantity_Product_In_SC'))

updateIconSpan();

var ProductBills = [];

var requestBodyPostBill = {};

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

function updateIconSpan(){
    document.querySelector(".icons .icon-cart span").innerText = 0;
    document.querySelector(".icons .icon-heart span").innerText = 0;
    if(localStorage.getItem('total_Quantity_Product_In_SC')){
        document.querySelector(".icons .icon-cart span").innerText = localStorage.getItem('total_Quantity_Product_In_SC');
    }
    if(localStorage.getItem('total_Quantity_Product_Like')){
        document.querySelector(".icons .icon-heart span").innerText = localStorage.getItem('total_Quantity_Product_Like');
    }
}

function updateTrashIconVisibility() {
    const anyChecked = document.querySelectorAll('.item-checkbox:checked').length > 0;
    iconTrash.style.display = anyChecked ? 'flex' : 'none';
}

function addShoppingCartToHTML(){
    if(idUser){
        totalAmount = 0;
        shoppingCartHTML.innerHTML = '';
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
            totalQuantity = 0;
            console.log(productInCarts);
            productInCarts.forEach(productInCart => {
                var productBillDTO = {
                    quantity: productInCart.quantityProd,
                    productId: productInCart.idProd,
                    size: 35
                };
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
                    <div class="itemSC">
                        <div class="colSC">
                            <div class="image">
                                <img src="${localStorage.getItem('url_nhi')}/${product.imageAvatar}" width="120" height="120">
                            </div>
                        </div>
                        <div class="colSC col2">
                            <div class="nameSC">
                                ${product.productName}
                            </div>
                            <div class="priceSC">
                                ${product.formattedDiscountedPrice} VND
                            </div>
                            <div class="quantitySC">
                                <span class="minusSC">-</span>
                                <span class = "numberProductSC">${productInCart.quantityProd}</span>
                                <span class = "idProductSC" style="display: none;">${productInCart.idProd}</span>
                                <span class="plusSC">+</span>
                                <span class="totalPriceSC1">
                                    ${(productInCart.totalPrice).toLocaleString()}
                                </span>
                                <span class="totalTitleSC">VND</span>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>
                    </div>
                `;
                ProductBills.push(productBillDTO);
                console.log(ProductBills);
                shoppingCartHTML.innerHTML += productInCartHTML;
                document.querySelector(".rowCart1 .price span").textContent = `${totalAmount.toLocaleString()} VND`;
                updateIconSpan();
                })
            });
            // document.querySelector('.colCart2 span').textContent = `Bạn đang có ${totalQuantity} sản phẩm trong giỏ hàng`; // Cập nhật nút thanh toán
            console.log("totalQuantity ", totalQuantity)
        })
        .catch(error => console.error('Error:', error));
    }
}
if(totalQuantity > 0){
    document.querySelector(".bodyCart .colCart2 .rowCart2 .order").addEventListener("click", (event) => {
        console.log("click order");
        const userName = document.querySelector('input[name="userName"]').value;
        const numberPhoneCustomer = document.querySelector('input[name="phoneNumber"]').value;
        const address = document.querySelector('input[name="address"]').value;
        const ward = document.querySelector('#ward').value;
        const district = document.querySelector('#district').value;
        const city = document.querySelector('#city').value;
        const totalPayment = totalAmount;
        // Xây dựng chuỗi địa chỉ đầy đủ
        const fullAddress = `${address}, ${ward}, ${district}, ${city}`;
        requestBodyPostBill = {
            idUser: `${idUser}`,
            userName: userName,
            numberPhoneCustomer: numberPhoneCustomer,
            addressCustomer: fullAddress,
            dateTimeOrder: "21:09:46 11/05/2024",
            status: "Pending",
            totalPayment: totalPayment,
            payableAmount: 0,
            shippingFee: 0,
            note: "",
            productBillDTOS: ProductBills
        }
        var url = url_nhi + `/api/v5/Bill/bills`
        fetch(url, {
            method: 'POST',
            headers: {
                // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBodyPostBill)
        })
        .then(response => {
            if (response.status === 201) {
                fetch(url_nhi + `/api/v4/shoppingCart/user/${idUser}`, {
                    method: 'DELETE',
                    headers: {
                        // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if(response.status === 200){
                        totalAmount = 0;
                        document.querySelector(".rowCart1 .price span").textContent = `${totalAmount.toLocaleString()} VND`;
                        localStorage.setItem('total_Quantity_Product_Like', 0);
                        localStorage.setItem('total_Quantity_Product_In_SC', 0);
                        addShoppingCartToHTML();
                        updateIconSpan();
                        showSuccess("Bạn đã đặt hàng thành công!");
                    }
                })
                console.log("Success");
            } else {
                showFailed("Đặt hàng không thành công");
            }
        })
        .catch(error => {
            showFailed("Đặt hàng không thành công");
        });
        console.log(requestBodyPostBill);
    })

    shoppingCartHTML.addEventListener("click", (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains("fa-trash")) {
            let productElement = positionClick.closest(".itemSC");
            if (productElement) {
                showConfirmation(function(confirmed) {
                    if (confirmed) {
                        let productIdElement = productElement.querySelector(".idProductSC");
                        let productId = productIdElement.textContent;
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
                            if (data) {
                                showSuccess("Bạn đã xóa thành công!");
                                updateIconSpan();
                                addShoppingCartToHTML();
                            } else {
                                showFailed("Bạn đã không xóa thành công!");
                            }
                        })
                        updateTrashIconVisibility();
                    }
                });
            }
        }
    });

    axios(Parameter).then(function (result) {
        renderCity(result.data);
    }).catch(function (error) {
        console.error("Error loading the data: ", error);
    });
    
}




document.addEventListener('DOMContentLoaded', function() {
    updateIconSpan();
    if (localStorage.getItem('idUser')) {
        document.querySelector('.buttonLogin').style.display = 'none';
        document.querySelector('.buttonLogout').style.display = 'block';
    } else {
        document.querySelector('.buttonLogin').style.display = 'block';
        document.querySelector('.buttonLogout').style.display = 'none';
    }
    document.querySelector('.buttonLogout').addEventListener('click', function() {
        localStorage.removeItem('idUser'); // Xóa idUser khỏi localStorage khi nhấn Đăng xuất
        document.querySelector('.buttonLogin').style.display = 'block';
        document.querySelector('.buttonLogout').style.display = 'none';
    });
});

var cities = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");

var Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
    method: "GET", 
    responseType: "json", // Đặt kiểu response là json
};


function renderCity(data) {
    console.log("data city ", data);
    data.forEach(function (x) {
        var opt = document.createElement('option');
        opt.value = x.Name;
        opt.text = x.Name;
        opt.setAttribute('data-id', x.Id);
        cities.options.add(opt);
    });

    cities.onchange = function () {
        districts.options.length = 0; // Xóa tất cả options cho select box
        wards.options.length = 0; // Xóa tất cả options cho select box
        var selectedCityId = this.options[this.selectedIndex].dataset.id;
        var result = data.filter(n => n.Id === selectedCityId)[0].Districts;
        
        result.forEach(function (k) {
            var opt = document.createElement('option');
            opt.value = k.Name;
            opt.text = k.Name;
            opt.setAttribute('data-id', k.Id);
            districts.options.add(opt);
        });
    };

    districts.onchange = function () {
        wards.options.length = 0; // Xóa tất cả options cho select box
        var selectedCityId = cities.options[cities.selectedIndex].dataset.id;
        var selectedDistrictId = this.options[this.selectedIndex].dataset.id;
        var dataCity = data.filter(n => n.Id === selectedCityId)[0];
        var dataWards = dataCity.Districts.filter(n => n.Id === selectedDistrictId)[0].Wards;
        
        dataWards.forEach(function (w) {
            var opt = document.createElement('option');
            opt.value = w.Name;
            opt.text = w.Name;
            opt.setAttribute('data-id', w.Id);
            wards.options.add(opt);
        });
    };
}
