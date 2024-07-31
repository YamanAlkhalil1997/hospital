
let mainColor = localStorage.getItem("main-color");

if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color",mainColor);
    document.querySelectorAll(".color-list li").forEach(eles => {
        eles.classList.remove("active");
        if (eles.dataset.color === mainColor) {
            eles.classList.add("active")
        }
    })
    
}

let imgTurn = false;

//=======================================================================
let mainImg = localStorage.getItem("main-img") // creat space to store in local storage 
if (mainImg !== null) { // cheak if the local have item
    if (mainImg === 'true') {
        imgTurn = true
    } else {
        imgTurn = false;
    }
    // remove class active from all element
    document.querySelectorAll(".img-option li").forEach(el => {
        el.classList.remove("active")
    });
    if (mainImg === 'true') {
        document.querySelector(".yes").classList.add("active");
    } else {
        
        document.querySelector(".no").classList.add("active");
    }
}

//=======================================================================
document.querySelector('.setting-icon .fa-gear').onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting").classList.toggle("open")
}
//=======================================================================

let landingPage = document.querySelector(".landing");
let imges = ["1.JPG","3.png","5.JPG"];  

let interval;
function random () {
    if (imgTurn === true) {
        interval = setInterval(() =>{
            let counter = Math.floor(Math.random() * imges.length);
            landingPage.style.backgroundImage = 'url("img/' + imges[counter] + '")';
        },1000) 
    }
}
random ()
//=======================================================================
let colorLi = document.querySelectorAll(".color-list li");
colorLi.forEach(li => {
    li.addEventListener("click",(e)=> {
        // هون عملنا انو لمن اضغط عل عنصر رح يبدل لون من الروت
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        // set color on local storage
        localStorage.setItem("main-color",e.target.dataset.color);
        handleActive(e);
    });
});

//=======================================================================
let imgOption = document.querySelectorAll(".img-option li");
imgOption.forEach(li => {
    li.addEventListener("click", (e) => {
        handleActive(e)
       if (e.target.dataset.background === 'yes') {
        imgTurn = true;
        random()
        localStorage.setItem("main-img", true)
    }
    else{
        imgTurn = false;
        clearInterval(interval);
        localStorage.setItem("main-img", false)
    }
})
})
//=======================================================================

// start service animation
let services = document.querySelector(".service div");
function scrollForService () {
    window.onscroll = () => {
        let offsetTop = services.offsetTop;
        let ofssetHeight = services.offsetHeight;
        let windowHeight = this.innerHeight;
        let scrollTop = this.scrollY;
        if (scrollTop > (offsetTop + ofssetHeight - windowHeight)) {
            let allServices = document.querySelectorAll(".service div");
            allServices.forEach(serv => {
                serv.style.left = "0";
            serv.style.opacity = "1";
            
        })
        }
    } 
}
scrollForService();
//=======================================================================


// doctors

let doctors = document.querySelectorAll(".doctors img");
doctors.forEach(img => {
    img.addEventListener("click", (e) => {
        let overLay = document.createElement("div");
        overLay.className = "overLay";
        document.body.appendChild(overLay);
        let pop = document.createElement("div");
        pop.className = "pop-box";
        let popImg = document.createElement("img");
        popImg.src = img.src;
        pop.appendChild(popImg);
        document.body.appendChild(pop)
        let head_img = document.createElement("h1");
        let text_img = document.createTextNode(img.dataset.name);
        head_img.appendChild(text_img); 
        pop.appendChild(head_img);
        let close_buttun = document.createElement("span");
        let close = document.createTextNode("X");
        close_buttun.appendChild(close);
        close_buttun.className = "closeButtun";
        pop.appendChild(close_buttun)
        close_buttun.addEventListener("click", () => {
            pop.remove();
            overLay.remove();
        })
        
    })
})
//=======================================================================


// start bullets

const linksAside = document.querySelectorAll(".up-bullets a")
const links = document.querySelectorAll(".navbar-nav a");
const footer = document.querySelectorAll(".links-footer a");

function linksNav(ele) {
    ele.forEach (link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth',
            })
        })
    })
}
linksNav(links)
linksNav(linksAside)
linksNav(footer)
//=======================================================================

function handleActive (ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(eles => {
        eles.classList.remove("active");
    })
    ev.target.classList.add("active");
}




let bullet = document.querySelectorAll(".bullet-option li");
let bullets = document.querySelector(".up-bullets");
bullet.forEach(li => {
    li.addEventListener("click", (e) => {
        if (li.dataset.display === 'show') {
            bullets.style.display = 'block'
        } else {
            bullets.style.display = 'none'
        }
    })
})





//=======================================================================
// reset all element
document.querySelector(".reset").onclick = function () {
    localStorage.removeItem("main-color")
    localStorage.removeItem("main-img")
    window.location.reload()
}
