let  userList = [
    {
        userName: "admin",
        password: "123",
        productName:"apple",
        id:Date.now(),
        codeproduct:"s212",
        status: true
    },
    {
        userName: "menber",
        password: "1234",
        productName:"apple",
        id:Date.now(),
        codeproduct:"s212",
        status: true

    }
]
localStorage.setItem("userList",JSON.stringify(userList))
let userLogin = JSON.parse(localStorage.getItem("userLogin"));

function logout() {
    localStorage.removeItem("userLogin");
    window.location.href = '/authen'
}

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
                <td>${userList[i].codeproduct}</td>
                <td>${userList[i].productName}</td>
                <td>${userList[i].status ? "Còn hàng" : "Hết hàng"}</td>
                <td>
                    <button onclick="changeStatusUser(${userList[i].id})">Còn / Hết</button>
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
        codeproduct: window.prompt("Nhập mã sản phẩm"),
        productName: window.prompt("Nhập tên sản phẩm"),
        status: true
    }

    let userList = JSON.parse(localStorage.getItem("userList"));
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData()
}   
function searchList() {
    let searchUser=document.getElementById("search").value;
    let userSearch = userList.filter(value=>{
        return value.userName.toUpperCase().includes(searchUser.toUpperCase())
    })
    renderData(userSearch) 
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