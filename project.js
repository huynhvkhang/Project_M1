 
let  userList = [
    {
        userName: "admin",
        password: "123",
    },
    {
        userName: "menber",
        password: "1234",
    }
]
localStorage.setItem("userList",JSON.stringify(userList))
function login(event) {
    event.preventDefault();
    let userName = event.target.userName.value;
    let password = event.target.password.value;
    let userList = JSON.parse(localStorage.getItem("userList"));
        let userExit = null;
        for (let i = 0; i <userList.length; i++) {
            if(userList[i].userName == userName){
                userExit =  userList[i];
                break;
            }   
        }
        if(!userExit){
            alert("user not found")
            return;
        }
        if(userExit.password != password){
            alert("password incorrect")
            return;
        }
        alert("login successfully ")
       
        localStorage.setItem("userLogin",JSON.stringify(userExit))
        window.location.href = "/webproject.html"
    }
    

