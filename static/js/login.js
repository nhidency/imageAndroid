localStorage.setItem('url_nhi', 'http://192.168.60.4:8080');
const url_nhi = localStorage.getItem('url_nhi');
console.log("url_nhi", localStorage.getItem('url_nhi'))
var idUser = '';
var rolesUser = 'ROLE';
var closeLoginBox = document.querySelector(".bodyLogin .login-box .fa-circle-xmark");
let checkProductLike = 'false';
let list = document.querySelector('.slider .list-slider');
let items = document.querySelectorAll('.slider .list-slider .item-slider');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let day = document.querySelector('.d');
let hour = document.querySelector('.h');
let minute = document.querySelector('.m');
let second = document.querySelector('.s');
const container = document.querySelector('.products .box-container');
const listCartHTML = document.querySelector(".cartTab .listCart");
const listProductLikeHTML = document.querySelector(".productLikeTab .listProductLike");
const loginButton = document.querySelector('.buttonLogin');
const logoutButton = document.querySelector('.buttonLogout');

if (window.location.pathname.endsWith('/login/')) {
    if (overAll) {
        overAll.style.opacity = "1";
        overAll.style.visibility = "visible";
    }
}


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const data = {
        password: formData.get('password'),
        username: formData.get('username')
    };
    console.log("json Signup ", data)
    // Gửi yêu cầu POST đến API
    fetch(url_nhi + '/api/v2/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        var status = data.status;
        var user = data.data;
        if(status === "true"){
            localStorage.setItem('idUser', user.idUser);
            localStorage.setItem('rolesUser', user.roles);
            idUser = localStorage.getItem('idUser');
            rolesUser = localStorage.getItem('rolesUser');
            console.log('Success:', data);
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công!',
                showConfirmButton: false,
                timer: 2000
            });

            if(localStorage.getItem('rolesUser') === "ROLE_USER"){
                window.location.href = '/';
            }else if(rolesUser === "ROLE_ADMIN"){

            }
            
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Tên đăng nhập hoặc mật khẩu không hợp lệ'
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

closeLoginBox.addEventListener("click", function(){
    window.location.href = '/';
})