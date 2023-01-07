const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});

/*var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("menu").style.top = "0";
  } else {
    document.getElementById("menu").style.top = "-100px";
  }
 prevScrollpos = currentScrollPos;
}*/

/*document.addEventListener("DOMContentLoaded", function(){

  el_autohide = document.querySelector('.autohide');

  navbar_height = document.querySelector('.navbar').offsetHeight;
  document.body.style.paddingTop = navbar_height + 'px';

  if(el_autohide){
    var last_scroll_top = 0;
    window.addEventListener('scroll', function() {
          let scroll_top = window.scrollY;
         if(scroll_top < last_scroll_top) {
              el_autohide.classList.remove('scrolled-down');
              el_autohide.classList.add('scrolled-up');
          }
          else {
              el_autohide.classList.remove('scrolled-up');
              el_autohide.classList.add('scrolled-down');
          }
          last_scroll_top = scroll_top;
    }); 
    // window.addEventListener
  }
  // if

}); */

var lastScrollTop;

navbar = document.getElementById('navbar');

window.addEventListener('scroll',function(){
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop){
      navbar.style.top='-100px';
    }
    else{
    navbar.style.top='0';
    }
  lastScrollTop = scrollTop;
});

/*$(document).ready(function() {
  onScroll();
});

function onScroll() {   
  var lastScrollTop, $bar = $('#navbar') , height = $bar.height(), 
      $window = $(window), offset = 10;

  $window.on('scroll',function()  {       
      var scrollTop = $window.scrollTop();
      $bar.css({ top: scrollTop > lastScrollTop && scrollTop > offset ? -height : 0 });
      lastScrollTop = scrollTop; 
  });     
}*/


$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".collapse").hasClass("in");
        if (!$(event.target).closest('.navbar').length && _opened === true && !clickover.hasClass("navbar-toggle")) {
            $(".collapse").collapse('toggle');
        }
    });
});
