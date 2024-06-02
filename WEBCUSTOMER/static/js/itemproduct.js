
const productListOther = document.querySelector(".other-product .other-product-list")
const itemProductImage = document.querySelector(".row-item-product1 .image")
const introItemProduct = document.querySelector(".intro-product-id .content")
const introDetailItemProduct = document.querySelector(".detail-product-id-content")
const detailContent = document.querySelector(".detail-product-id-content2");
let isFirstClick = true;
requestBody = {
    productName: "",
    priceFrom: 0,
    priceTo: 1000000,
    categoryName: ""
};
displayProducts();
displayImage();
displayDetailItemProduct();

function getIDFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

function displayImage(){
    itemProductImage.innerHTML = `
        <div class="image-large">
            <img class="image-product1" src="${localStorage.getItem('url_nhi')}/images\\${getIDFromURL()}_avatar.jpg" alt="">
        </div>
        <div class="list-image-small">
            <img class="image-product1" src="${localStorage.getItem('url_nhi')}/images\\${getIDFromURL()}_detail1.jpg" alt="">
            <img class="image-product1" src="${localStorage.getItem('url_nhi')}/images\\${getIDFromURL()}_detail2.jpg" alt="">
            <img class="image-product1" src="${localStorage.getItem('url_nhi')}/images\\${getIDFromURL()}_detail3.jpg" alt="">
        </div>
    `
}

function displayDetailItemProduct(){
    var urlGetInfoItemProduct = `${localStorage.getItem('url_nhi')}/api/v1/Products/roleUser/${getIDFromURL()}`
    console.log("item product ", urlGetInfoItemProduct)
    fetch(urlGetInfoItemProduct, {
        method: "GET",
        headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("item product ", data)
        introItemProduct.innerHTML=`
            <h1 class="content-title">${data.productName}</h1>
                <div class="content-solid">Đã bán <span>${data.quantitySold} </span></div>
                <div class="content-price">${data.formattedDiscountedPrice} VND <span>${data.formattedPrice} VND</span></div>
                <div class="content-size">
                    <div class="title-content-size">Kích cỡ: </div>
                    <div class="size-content-size">
                        <div class="size-content-size-row1">
                            <span>size 35</span>
                            <span>size 36</span>
                            <span>size 37</span>
                        </div>
                        <div class="size-content-size-row1">
                            <span>size 38</span>
                            <span>size 39</span>
                            <span>size 40</span>
                        </div>
                    </div>
                </div>
                <div class="content-quantity">
                    <div class="title-content-quantity">
                        <span>Số lượng</span>
                    </div>
                    <div class="quantity-content-quantity">
                        <span class="minus">-</span>
                        <input class = "numberProduct" placeholder = "1">
                        <span class = "idProduct" style="display: none;">${data.idProd}</span>
                        <span class="plus">+</span>
                    </div>
                    <div class="title-content-end">
                        <span>${data.quantity} </span>
                        <span>sản phẩm có sẵn</span>
                    </div>
                </div>
                <div class="content-button">
                    <button class="content-button-add">Thêm vào giỏ</button>
                    <button class="content-button-purchase">Mua ngay</button>
                </div>
            `
         // Thêm class 'on' cho các phần tử có text là 'size {data.size}'
        $('.size-content-size-row1 span').filter(function() {
            return $(this).text().trim() === `size ${data.size}`;
        }).addClass('on');

        $('.size-content-size-row1').on('click', '.on', function() {
            if (isFirstClick) {
                $('.size-content-size-row1 span').removeClass('active');
                $(this).addClass('active');
                isFirstClick = false;
            } else {
                $(this).removeClass('active');
                isFirstClick = true;
            }
        });
        introDetailItemProduct.innerHTML=`
            <div class="detail-product-id-content1">
                <span class="title">Thương hiệu </span>
                <span>${data.brand} </span>
            </div>
            <div class="detail-product-id-content1">
                <span class="title">Xuất xứ </span>
                <span>${data.origin}</span>
            </div>
            <div class="detail-product-id-content1">
                <span class="title">Gửi từ </span>
                <span>${data.supplierName}</span>
            </div>
        `
        detailContent.innerHTML=`
            <p><strong>💕 CHÍNH SÁCH ĐỔI HÀNG NHÀ ${data.brand} DESIGN :</strong></p>
            <ul>
                <li>Đổi miễn phí lần 1 cho đơn hàng trên 500k (Không áp dụng đơn hàng khi khách mua Flash Sale)</li>
                <li>Sản phẩm đổi còn nguyên nhãn mác,còn đầy đủ phụ kiện đi kèm như ban đầu và không bị lỗi do quá trình lưu giữ</li>
                <li>Khách Hàng hãy nhắn tin trực tiếp cho ${data.brand} DESIGN để được tư vấn rõ hơn về SIZE cũng như CHẤT LƯỢNG sản phẩm</li>
                <li>Khách hàng nhận được sản phẩm, vui lòng đánh giá giúp Shop để hưởng thêm nhiều ưu đãi hơn nhé</li>
            </ul>
            <p><strong>💕 Giới thiệu về ${data.brand} DESIGN</strong></p>
            <p>Sản phẩm được thiết kế độc quyền bởi thương hiệu thời trang ${data.brand} DESIGN - tiêu chuẩn châu Âu hàng đầu tại Việt Nam. ${data.brand} DESIGN là thương hiệu thời trang cao cấp chuyên sản xuất quần áo, với những thiết kế mang phong cách nhẹ nhàng đặc trưng hiện đại, sự thanh lịch kết hợp với màu sắc của tuổi trẻ sẽ luôn là sự lựa chọn dành cho phái nữ.</p>
            <p><strong>💕 THÔNG SỐ SẢN PHẨM :</strong></p>
            <ul>
                <li>Màu sắc: Đen - Da</li>
                <li>Size: A / B</li>
                <li>Đặc điểm:</li>
                <ul>
                    <li>Miếng Dán Ngực Bàn Tay có thể tái sử dụng nhiều lần, với thiết kế giúp nâng đỡ và định hình khuôn ngực, cho nàng tha hồ diện những bộ cánh hở lưng, trễ vai, maxi đầy cuốn hút.</li>
                    <li>Miếng Dán Ngực Bàn Tay mềm mại, thoáng mát, thoải mái, quyến rũ. Còn gì tuyệt vời hơn cho cô nàng hiện đại không muốn gò bó trong chiếc áo lót bình thường vào những ngày hè nóng!</li>
                </ul>
                <li>CÁCH DÙNG</li>
                <ul>
                    <li>Để đảm bảo cho miếng dán ngực tốt nhất độ bán dính trước tiên chị em phải vệ sinh sạch sẽ vùng ngực tiếp xúc với áo</li>
                    <li>Giữ lại miếng nilon bảo vệ lớp dính để tái sử dụng áo nhiều lần</li>
                    <li>Vệ sinh áo: Rửa sạch dưới vòi nước với xà phòng pha loãng hoặc nước giặt. Để bề mặt dính được khô tự nhiên, tuyệt đối không lau bằng khăn lông hoặc dùng các vật sắc nhọn cọ rửa. Sau khi khô, dán miếng nilon bảo vệ lại như ban đầu.</li>
                </ul>
                <li>Năm sản xuất: 2022</li>
                <li>Xuất xứ: ${data.origin}</li>
                <li>Địa chỉ: Số nhà 12, Liền Kề 6D Làng Việt Kiều Châu Âu, Phường Mộ Lao, Quận Hà Đông, Hà Nội</li>
            </ul>
        `
    })
    
}


function displayProducts() {
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
        productListOther.innerHTML = ''; 
        var products = data.content;
        console.log("prducts ", products);
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
                productListOther.innerHTML += productHTML; // Thêm sản phẩm vào container
            }) 
            });
    }) // Gọi hàm hiển thị sản phẩm
    .catch(error => console.error('Error:', error));
}
