
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
// let userCategory = [
//     {   id:Date.now(),
//         productName: "apple",
//         quantity: "100",
//         price: "1000$",
//     }, { id:Date.now(),
//         productName: "samsung",
//         quantity: "150",
//         price: "800$",
//     }
// ]
// localStorage.setItem("userCategory",JSON.stringify(userCategory))
//xuất dữ liệu danh mục
function renderCategory(userCategory) {
    let categoryStr = ``;
    for (let i = 0; i < userCategory.length; i++) {
        categoryStr += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${userCategory[i].productName}</td>
                 <td>${userCategory[i].quantity}</td>
                <td>${userCategory[i].price}</td>
                <td><button onclick="deleteCategory(${userCategory[i].id})" class="btn btn-danger">Xoá</button></td>
            </tr>
        `
    }
    document.querySelector("#category_box").innerHTML = categoryStr;
}
//đổi danh mục bằng id
function changeCategory(userId) {
    let userCategory = JSON.parse(localStorage.getItem("userCategory"));
    for (let i = 0; i < userCategory.length; i++) {
        if (userCategory[i].id == userId) {
            userCategory[i].status = !userCategory[i].status;
            break
        }
    }
    localStorage.setItem("userCategory", JSON.stringify(userCategory))
    renderCategory(JSON.parse(localStorage.getItem("userCategory")))
}

renderCategory(JSON.parse(localStorage.getItem("userCategory")))
//thêm danh mục
function addCategory() {
    let newCategory = {
        id: Date.now(),
        productName: window.prompt("Nhập sản phẩm"),
        quantity: window.prompt("Nhập số lượng"),
        price: window.prompt("Nhập giá tiền"),
    }
    if (newCategory.price.includes(" ")) {
        alert(" vui lòng không nhập có khoảng rỗng")
        return;
    }

    let userCategory = JSON.parse(localStorage.getItem("userCategory"));
    userCategory.push(newCategory);
    localStorage.setItem("userCategory", JSON.stringify(userCategory))
    renderCategory(JSON.parse(localStorage.getItem("userCategory")))
    pageNext()
}
//xoá danh mục
function deleteCategory(arr) {
    let userCategory = JSON.parse(localStorage.getItem("userCategory"));
    for (let i = 0; i <= userCategory.length; i++) {
        if (userCategory[i].id == arr) {
            userCategory.splice(i, 1);
            break
        }
    }
    localStorage.setItem("userCategory", JSON.stringify(userCategory))
    renderCategory(JSON.parse(localStorage.getItem("userCategory")))
}
//tìm kiếm
function searchList(event) {
    let searchInput = event.target.value;
    let userCategory = JSON.parse(localStorage.getItem("userCategory"));
    let newInput = [];
    for (let i in userCategory) {
        if ((userCategory[i].productName.toLowerCase()).includes(searchInput.toLowerCase()) == true) {
            newInput.push(userCategory[i]);
        }
    }
    renderCategory(newInput)
}
let pageJump = 3;
let pageStart = 0;
//thêm 1 button cho 1 trang
function pageNext() {
    let userCategory = JSON.parse(localStorage.getItem("userCategory"));
    let nextPage = Math.ceil(userCategory.length / pageJump);
    let nowPage = ``;
    for (let i = 0; i < nextPage; i++) {
        nowPage += `
        <button onclick="change(${i})" style="color: ${pageStart == i ? "red" : "blue"}">${i}</button>
        `
    }
    document.querySelector(".page_box").innerHTML = nowPage;
}
pageNext()
//thêm trang
function loadPage() {
    let userCategory = JSON.parse(localStorage.getItem("userCategory"));
    let star = pageStart * pageJump;
    let end = star + pageJump;
    let pageList = [];
    for (let i = star; i < end; i++) {
        if (userCategory[i]) {
            pageList.push(userCategory[i])
        } else {
            break;
        }
    }
    renderCategory(pageList)
}
loadPage()
//chuyển trang
function change(pageData) {
    pageStart = pageData;
    pageNext()
    loadPage()
}
