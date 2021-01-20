//Glide text carousel//
var pausebetweenmsg=10
var glidespeed=50 

var curobjindex=0

function actualstyle(el, cssproperty){
if (el.currentStyle)
return el.currentStyle[cssproperty]
else if (window.getComputedStyle){
var elstyle=window.getComputedStyle(el, "")
return elstyle.getPropertyValue(cssproperty)
}
}

function collectElementbyClass(){
var classname="glidetext"
glidearray=new Array()
var inc=0
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++){
if (alltags[i].className==classname)
glidearray[inc++]=alltags[i]
}
if (glidearray.length>0)
onebyoneglide()
}

function onebyoneglide(){
if (curobjindex<glidearray.length)
glidetimer=setInterval("glideroutine()",50)
}

function glideroutine(){
if (parseInt(actualstyle(glidearray[curobjindex], "left"))<0)
glidearray[curobjindex].style.left=parseInt(actualstyle(glidearray[curobjindex], "left"))+50+"px"
else{
glidearray[curobjindex].style.left=0
curobjindex++
clearInterval(glidetimer)
setTimeout("onebyoneglide()", pausebetweenmsg)
}
}

//Carousel//

if (window.addEventListener)
window.addEventListener("load", collectElementbyClass, false)
else if (window.attachEvent)
window.attachEvent("onload", collectElementbyClass)
else if (document.getElementById)
window.onload=collectElementbyClass

const carousel = document.querySelector(".c-carousel");
const nextButton = document.querySelector(".c-carousel-control-next");
const prevButton = document.querySelector(".c-carousel-control-prev");
const carouselItems = document.querySelectorAll(".c-carousel-item");
const carouselImages = document.querySelectorAll(".c-carousel-item img");
const indicatorLi = document.querySelectorAll(".c-carousel-indicator-li");
const indicatorUl = document.querySelector(".c-carousel-indicators ul");
var itemCount = carouselItems.length;
var timeCount = 0;
var autoTimer ="0";
var indicatorUlWidth = indicatorUl.offsetWidth;
var tempUrl = "0";
var imgCounter = 0;
var timeInterval = 0;
var imgUrls = ["0"];
carouselImages.forEach((item, i) => {
  imgUrls[i] = item.src;
});
function autoNext(){
  var itemIndex = 0;
  carouselItems.forEach((item, i) => {
    if(item.classList.contains("active"))
    {
      itemIndex = i;
    }
  });
  removeActiveStatus();
  itemIndex++;
  if(itemIndex >= itemCount)
  {
    itemIndex = 0;
  }
  addActiveStatus(itemIndex);
}
if(carousel.hasAttribute('data-interval')){
  timeInterval = carousel.getAttribute('data-interval');
  autoTimer = setInterval(autoNext,timeInterval);
}
var indicatorWidth = indicatorUlWidth/(itemCount+1.5);
window.addEventListener('resize',()=>{
  indicatorUlWidth = indicatorUl.offsetWidth;
  indicatorWidth = indicatorUlWidth/(itemCount+1.5);
  indicatorLi.forEach((item, i) => {
    item.style.width = indicatorWidth+"px";
    item.style.height = (indicatorWidth/1.777)+"px";
  });
});
indicatorLi.forEach((item, i) => {
  item.style.width = indicatorWidth+"px";
  item.style.height = (indicatorWidth/1.777)+"px";
  tempUrl = imgUrls[i];
  item.style.backgroundImage = "url('" + tempUrl + "')";
  item.addEventListener('click',()=>{
    removeActiveStatus();
    addActiveStatus(i);
    clearInterval(autoTimer);
    autoTimer = setInterval(autoNext,5000);
  })
});
nextButton.addEventListener('click',() =>{
  var itemIndex = 0;
  carouselItems.forEach((item, i) => {
    if(item.classList.contains("active"))
    {
      itemIndex = i;
    }
  });
  removeActiveStatus();
  itemIndex++;
  if(itemIndex >= itemCount)
  {
    itemIndex = 0;
  }
  addActiveStatus(itemIndex);
  clearInterval(autoTimer);
  autoTimer = setInterval(autoNext,5000);
});

prevButton.addEventListener('click',()=> {
  carouselItems.forEach((item, i) => {
    if(item.classList.contains("active"))
    {
      itemIndex = i;
    }
  });
  removeActiveStatus();
  itemIndex--;
  if(itemIndex < 0){
    itemIndex = itemCount-1;
  }
  addActiveStatus(itemIndex);
  clearInterval(autoTimer);
  autoTimer = setInterval(autoNext,5000);
});
function removeActiveStatus(){
  carouselItems.forEach((item, i) => {
    item.classList.remove("active");
    indicatorLi[i].classList.remove("active");
  });
}
function addActiveStatus(target){
  carouselItems[target].classList.add("active");
  indicatorLi[target].classList.add("active");
}

//Video Gallery//



