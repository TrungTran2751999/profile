let pathVi = "assets/i18n/vi.json";
let pathEn = "assets/i18n/en.json";
let hrefCV = {
  en:"https://drive.google.com/file/d/1i_1K02aCUx1mYbKEwBT_yFL46KNzRzQ7/view?usp=sharing",
  vi:"https://drive.google.com/file/d/1O0R1Gfyh-Ip1ZwD5k9N2Enit7Z0gcFet/view?usp=sharing"
}
let isVI = false; isEN = false;
function translate(path){
  $.ajax({
      url: path,
      type: "GET",
      async: false
  })
  .done((result)=>{
      renderJson(result)
      $("#portpolio").css("display","block")
  })
}
function renderJson(json){
  let valueTotal = Object.values(json);
  valueTotal.map(value=>{
      let valueChildrenArr = Object.values(value);
      let keyChildrenArr = Object.keys(value);
      if(!keyChildrenArr.includes("prop")){
          $(valueChildrenArr[0]).html(valueChildrenArr[1]);
      }else{
          $(valueChildrenArr[0]).attr(valueChildrenArr[2], valueChildrenArr[1]);
      }
  })
}
function handle(){
  (function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos,
        behavior: 'smooth'
      })
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('body').classList.toggle('mobile-nav-active')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let body = select('body')
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Hero type effect
     */
    const vi = select('#vi')
    if (vi) {
      // let typed_strings = typed.getAttribute('data-typed-items')
      // typed_strings = typed_strings.split(',')
      let typed_strings = ["Lập trình viên JAVA"];
      new Typed('#vi', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }

    const en = select('#en')
    if (en) {
      // let typed_strings = typed.getAttribute('data-typed-items')
      // typed_strings = typed_strings.split(',')
      let typed_strings = ["JAVA Developer"];
      new Typed('#en', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  
    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
      new Waypoint({
        element: skilsContent,
        offset: '80%',
        handler: function(direction) {
          let progress = select('.progress .progress-bar', true);
          progress.forEach((el) => {
            el.style.width = el.getAttribute('aria-valuenow') + '%'
          });
        }
      })
    }
  
    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        });
  
        let portfolioFilters = select('#portfolio-flters li', true);
  
        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          portfolioIsotope.on('arrangeComplete', function() {
            AOS.refresh()
          });
        }, true);
      }
  
    });
  
    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });
  
    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  
    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
  
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
  
    /**
     * Initiate Pure Counter 
     */
    new PureCounter();
  
  })();
}
$(document).ready(()=>{
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const lg = urlParam.get("lg");
    let param = {};
    if(lg=="vi"){
      param=pathVi;
      isVI=true;
      $("#vi").removeAttr("style");
      $("#en").css("display","none");
      sttPointer(0);
    }else{
      param=pathEn;
      isEN=true;
      $("#vi").css("display","none");
      $("#en").removeAttr("style");
      sttPointer(1)
    }
    translate(param);
    $("#dowload-cv").prop("href",hrefCV[lg]);
    handle();
});
$("#translate").click(()=>{
  $("#portpolio").css("display","none");
  if(isVI){
    isEN = true; isVI = false;
    translate(pathVi);
    $("#vi").removeAttr("style");
    $("#en").css("display","none");
    $("#dowload-cv").prop("href",hrefCV["vi"]);
    $("#translate").html("VI");
    sttPointer(0);
  }else if(isEN){
    isEN = false; isVI = true;
    translate(pathEn);
    $("#vi").css("display","none");
    $("#en").removeAttr("style");
    $("#dowload-cv").prop("href",hrefCV["en"]);
    $("#translate").html("EN");
    sttPointer(1);
  }
});
$("#translate").mouseover(()=>{
  $("#translate").css("animation","none");
  let lg = "";
  isVI ? lg="VI" : lg="EN"
  $("#translate").html(lg);
});
$("#translate").mouseleave(()=>{
  $("#translate").css("animation","sparkling 900ms ease infinite")
  $("#translate").html(`<i class="bx bi-exclamation-circle"></i>`)
});
function sttPointer(index){
  let loopPointer = setInterval(()=>{
    let arrTyped = $(".typed-cursor");
    if(arrTyped.length > 1){
      $(arrTyped[index]).removeAttr("style");
      for(let i=0; i<arrTyped.length; i++){
        if(i!=index) $(arrTyped[i]).css("display","none");
      }
      clearInterval(loopPointer);
    }
  })
}
