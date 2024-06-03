const statusItems = document.querySelectorAll('.status-item');
const detailBillHTML = document.querySelector(".bodyBill .modal-body .detail-bill");
let listBillHTML1 = document.querySelector(".listBill");

idUser = localStorage.getItem('idUser');
// console.log('ss ', idUser, statusItems, itemBills)
var statusBill = 'Pending';
displayNumberBillStatus()
getBillHTML()
console.log('id ', statusBill);
console.log(localStorage.getItem('url_nhi'))

var currentPage = window.location.pathname;
console.log('currentPage ', currentPage);
var menuLinks = [
    { id: "bill-link", href: "/bill/" },
];
menuLinks.forEach(function(link) {
    if (currentPage === link.href) {
        console.log('currentPage ', menuLinks);
        document.getElementById(link.id).classList.add("active");
    } else {
        document.getElementById(link.id).classList.remove("active");
    }
    document.getElementById("home-link").classList.remove("active")
});

function displayNumberBillStatus(){
    var urlGetNumberBillStatus = url_nhi + `/api/v5/Bill/getNumberBillByStatus`
    fetch(urlGetNumberBillStatus, {
        method: "GET",
        headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        var listStatus = data;
        listStatus.forEach(status => {
            if(status.quantity > 0){
                console.log("data number ", status.status)
                const quantitySpan = document.querySelector(`.${status.status}1 span`)
                console.log("data number ", status.status)
                quantitySpan.style.display = "block"
                quantitySpan.textContent = status.quantity;
            }
        })
    })
}

function handleEyeClick(billId) {
    console.log("Clicked on eye icon for bill ID:", billId);
    var urlGetDetailBill = url_nhi + `/api/v5/Bill/search?idBill=${billId}&idUser=US000002`;
    fetch(urlGetDetailBill, {
        method: "GET", 
        headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        var bill = data[0]
        var productBills = data[0].productBillDTOS
        let stt = 0
        console.log("jjj", productBills)
        detailBillHTML.innerHTML = '';
        productBills.forEach(productBill => {
            stt ++;
            detailBillHTML.innerHTML += `
                <div class="item-product-bill">
                    <span class="stt">${stt}</span>
                    <span class="idProductBill">${productBill.productId}</span>
                    <span class="nameProductBill">${productBill.productName}</span>
                    <span class="sizeProductBill">${productBill.size}</span>
                    <span class="priceProductBill">${productBill.retailPrice} VND</span>
                    <span class="quantityProductBill">${productBill.quantity}</span>
                    <span class="totalPriceProductBill">${productBill.totalPriceProd} VND</span>
                </div>
            `;
        })
        const totalPriceBillHTML = document.createElement('div');
            totalPriceBillHTML.innerHTML +=`
                <div class="total-price-product-bill">
                    <div class="col-title-total-price-product-bill title">
                        <span>Tổng cộng:</span>
                        <span>Phí vận chuyển:</span>
                        <span>Thành tiền:</span>
                    </div>
                    <div class="col-title-total-price-product-bill price1">
                        <span>${bill.payableAmount} VND</span>
                        <span>${bill.shippingFee} VND</span>
                        <span>${bill.totalPayment} VND</span>
                    </div>
                    
                </div>
            `;
            detailBillHTML.innerHTML += totalPriceBillHTML.innerHTML;
    })
}


function getBillHTML() {
    var urlSearchBillStatus = url_nhi + `/api/v5/Bill/search?status=${statusBill}`;
    fetch(urlSearchBillStatus, {
        method: "GET",
        headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {

        listBillHTML1.innerHTML = '';

        console.log("data ", data)
        data.forEach(bill => {
            const itemBillHTML = `
                <div class="item-bill">
                    <div class="over-view-bill">
                        <span>${bill.idBill}</span>
                        <span>${bill.idUser}</span>
                        <span>${bill.payableAmount} VND</span>
                        <span>${bill.totalPayment} VND</span>
                        <span>${bill.dateTimeOrder}</span>
                        <span class="action-bill"> <i  data-toggle="modal" data-target="#myModal" class="fa-solid fa-eye" onclick="handleEyeClick(${bill.idBill})"></i></span>
                    </div>
                </div>
            `;
            listBillHTML1.innerHTML += itemBillHTML;
        })
        
    });
    
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
