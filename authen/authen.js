
// let userList = [
//     {
//         userName: "admin",
//         password: "123",
//         id: Date.now(),
//         status: true
//     },
//     {
//         userName: "menber",
//         password: "1234",
//         id: Date.now(),
//         status: true

//     },
    
// ]
// localStorage.setItem("userList", JSON.stringify(userList))
function login(event) {
    event.preventDefault();
    let userName = event.target.userName.value;
    let password = event.target.password.value;
    let userList = JSON.parse(localStorage.getItem("userList"));
    let userExit = null;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].userName == userName) {
            userExit = userList[i];
            break;
        }
    }
    if (!userExit) {
        alert("Tài khoản không đúng")
        return;
    }
    if (userExit.password != password) {
        alert("Mật khẩu không đúng")
        return;
    }
    alert("Bạn đã đăng nhập thành công ")

    localStorage.setItem("userLogin", JSON.stringify(userExit))
    window.location.href = "/"
}


