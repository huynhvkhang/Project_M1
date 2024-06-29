// let userList = [
//     {
//         id: "2323",
//         userName: "admin",
//         password: "123",
//         status: true
//     },
// ]
// localStorage.setItem("userList", JSON.stringify(userList))

let userLogin = JSON.parse(localStorage.getItem("userLogin"));

function logout() {
    localStorage.removeItem("userLogin");
    window.location.href = '/authen'
}

function renderHeader() {
    document.querySelector("header").innerHTML = `
        <span onclick="window.location.href='/'">Trang chủ Shoppe</span>
        <div class="user_box">
            <span>Xin chào: ${userLogin.userName}!</span>
            <button onclick="logout()" class="btn btn-danger">Đăng xuất</button>
        </div>
    `
}

renderHeader()
