idUser = localStorage.getItem('idUser');
var closeSignUpBox = document.querySelector(".bodySignUp .login-box .fa-circle-xmark");

if (window.location.pathname.endsWith('/signup/')) {
    if (overAll) {
        overAll.style.opacity = "1";
        overAll.style.visibility = "visible";
    }
}
function showSuccessMessage() {
    Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công!',
        showConfirmButton: false,
        timer: 2000
    });
}

function showFailedMessage() {
    Swal.fire({
        icon: 'error',
        title: 'Thông tin đăng ký đã tồn tại'
    });
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const data = {
        userName: formData.get('userName'),
        password: formData.get('password'),
        email: formData.get('email'),
        phoneNumber: formData.get('phoneNumber'),
        address: formData.get('address'),
        gender: formData.get('gender'),
        avatar: "",  
        background: "", 
        roles: "ROLE_USER"
    };
    console.log("json Signup ", data)
    // Gửi yêu cầu POST đến API
    fetch(url_nhi + '/api/v2/users/signupUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        var status = data.status;
        if(status === "true"){
            console.log('Success:', data);
            showSuccessMessage();
            window.location.href = '/login';
        }
        else{
            showFailedMessage()
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

closeSignUpBox.addEventListener("click", function(){
    window.location.href = '/';
})
