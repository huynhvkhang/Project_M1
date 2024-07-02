
function logout() {
    localStorage.removeItem("userLogin");
    window.location.href = '/authen'
}
let userLogin = JSON.parse(localStorage.getItem("userLogin"));
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
//xuất dữ liệu
function renderData(userList) {
    let htmlStr = ``;
    for (let i = 0; i < userList.length; i++) {
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
renderData(JSON.parse(localStorage.getItem("userList")))
//đổi trạng thái id
function changeStatusUser(userId) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == userId) {
            userList[i].status = !userList[i].status;
            break
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData(JSON.parse(localStorage.getItem("userList")))
}
//thêm người dùng
function addUser() {
    let newUser = {
        id: Date.now(),
        userName: window.prompt("Nhập tên người dùng"),
        password: window.prompt("Nhập mậy khẩu"),
        status: true
    }
    if (newUser.password == "" || newUser.password.includes(" ")) {
        alert(" vui lòng nhập mật khẩu và không có khoảng cách")
        return;
    }
    if (newUser.userName.includes(" ")) {
        alert(" vui lòng không nhập có khoảng rỗng")
        return;
    }

    let userList = JSON.parse(localStorage.getItem("userList"));
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData(userList)
    pageNext()
}
//xoá người dùng
function deleteTable(index) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    for (let i = 0; i <= userList.length; i++) {
        if (userList[i].id == index) {
            userList.splice(i, 1);
        {
            alert("Bạn có chắc muốn xoá không?")
        }
            break
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData(JSON.parse(localStorage.getItem("userList")))
}
//tìm kiếm
function searchList(event) {
    let searchInput = event.target.value;
    let userList = JSON.parse(localStorage.getItem("userList"));
    let newInput = [];
    for (let i in userList) {
        if ((userList[i].userName.toLowerCase()).includes(searchInput.toLowerCase()) == true) {
            newInput.push(userList[i]);
        }
    }
    renderData(newInput);
}
//phân trang
let pageJump = 3;//1 trang có 3 name
let pageStart = 0;//trang bắt đầu
function pageNext() {
    let userList = JSON.parse(localStorage.getItem("userList"));
    let nextPage = Math.ceil(userList.length / pageJump);
    let nowPage = ``;
    for (let i = 0; i < nextPage; i++) {
        nowPage += `
        <button onclick="change(${i})" style="color:${pageStart == i ? "red" : "blue"}">${i}</button>
        `
    }
    document.querySelector(".page_box").innerHTML = nowPage;
}
pageNext()

function loadPage() {
    let userList = JSON.parse(localStorage.getItem("userList"));
    let star = pageStart * pageJump;//vị trí bắt đầu lấy và nhân vị trí kết thúc
    let end = star + pageJump;
    let pageList = [];
    for (let i = star; i < end; i++) {
        if (userList[i]) {
            pageList.push(userList[i])
        } else {
            break;
        }
    }
    renderData(pageList)
}
loadPage()
//chuyển trang dữ liệu
function change(pageData) {
    pageStart = pageData;
    pageNext()
    loadPage()
}
