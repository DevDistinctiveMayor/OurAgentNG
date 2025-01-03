const phoneIcon = document.querySelector('.phone-icon')
const favoriteIcon = document.querySelector('.heart-icon')
const messageIcon = document.querySelector('.message-icon')
const scrollContainer = document.querySelector('.house-card-container')
const leftAngle = document.querySelector('.left-angle')
const rightAngle = document.querySelector('.right-angle')
const btns = document.querySelectorAll('.btn')
const saleBtn = document.querySelector('.sale-btn')
const rentBtn = document.querySelector('.rent-btn')
const nums = document.querySelectorAll('.num')
let activeBtn = 0
let activeNum = 0

leftAngle.addEventListener('click', (e) => {
    if(scrollContainer.scrollLeft === 0) return
    scrollContainer.scrollLeft -= 300
})

rightAngle.addEventListener('click', (e) => {
    if(scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) return
    scrollContainer.scrollLeft += 300
})

btns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        btns[activeBtn].classList.remove('active');
        btn.classList.add('active');
        activeBtn = index;
    });
});

nums.forEach((num, index) => {
    num.addEventListener('click', ()=> {
        nums[activeNum].classList.remove('num-active')
        num.classList.add('num-active')
        activeNum = index
    })
})

//For Nav
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const content = document.querySelector(".content"); // Target content-wrapper

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  menu.classList.toggle("active");
  content.classList.toggle("content-blur"); // Add blur effect to the content
  document.body.classList.toggle("disable-scroll"); // Prevent scrolling on the whole page
});
