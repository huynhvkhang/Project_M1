
function logout() {
    localStorage.removeItem("userLogin");
    window.location.href = '/authen'
}
let userLogin=JSON.parse(localStorage.getItem("userLogin"));
function renderHeader() {
    document.querySelector("header").innerHTML = `
        <span onclick="window.location.href='/'">Trang chủ Shopee</span>
        <div class="user_box">
            <span>Xin chào: ${userLogin.userName}!</span>
            <button onclick="logout()" class="btn btn-danger">Đăng xuất</button>
        </div>
    `
}

renderHeader()

function renderData(){
    let userList = JSON.parse(localStorage.getItem("userList"));

    let htmlStr = ``;
    for(let i = 0; i < userList.length; i++) {
        htmlStr += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${userList[i].userName}</td>
                 <td>${userList[i].password}</td>
                <td>${userList[i].status ? "Thành viên Vip" : "Thành viên thường"}</td>
                <td>
                    <button onclick="changeStatusUser(${userList[i].id})">Vip / Bình thường</button>
                </td>
                <td><button onclick="deleteTable(${userList[i].id})" class="btn btn-danger">Xoá</button></td>
            </tr>
        `
    }
    document.querySelector("#user_box").innerHTML = htmlStr;
}
renderData()
function changeStatusUser(userId) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    for(let i = 0; i < userList.length; i++) {
        if(userList[i].id == userId) {
            userList[i].status = !userList[i].status;
            break 
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData()
}

function addUser() {
    let newUser = {
        id: Date.now(),
        userName: window.prompt("Nhập tên người dùng"),
        password:window.prompt("Nhập mậy khẩu"),
        status: true
    }
    if (newUser. userName.includes(" ")){
        alert(" vui lòng không nhập có khoảng rỗng")
        return;
    }

    let userList = JSON.parse(localStorage.getItem("userList"));
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData()
}   
function deleteTable(index){
let userList = JSON.parse(localStorage.getItem("userList"));
for(let i = 0; i < userList.length; i++) {
    if(userList[i].id == index) {
        userList.splice(i,1) ;
        break 
    }
}
localStorage.setItem("userList", JSON.stringify(userList))
    renderData()
}