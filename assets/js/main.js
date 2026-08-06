/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () =>{
   const header = document.getElementById('header')
   // Add the .scroll-header class if the bottom scroll of the viewport is greater than 50
   this.scrollY >= 50 ? header.classList.add('bg-header') 
                      : header.classList.remove('bg-header')
}
window.addEventListener('scroll', bgHeader)
bgHeader()

/*=============== SWIPER SERVICES ===============*/
if(document.querySelector('.services__swiper')){
   const swiperServices = new Swiper('.services__swiper', {
      loop: true,
      grabCursor: true,
      spaceBetween: 24,
      slidesPerView: 'auto',
      speed: 1000,

      autoplay: {
         delay: 2000,
         disableOnInteraction: false,
         pauseOnMouseEnter: true,
         reverseDirection: true,
      },

      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
   });
}

/*=============== SWIPER TESTIMONIALS ===============*/
if(document.querySelector('.testimonials__swiper')){
   const swiperTestimonials = new Swiper('.testimonials__swiper', {
      loop: true,
      grabCursor: true,
      spaceBetween: 24,
      slidesPerView: 1,

      breakpoints: {
         576: {
            slidesPerView: 2,
         },
      },

      navigation: {
         nextEl: '.testimonials__button-next',
         prevEl: '.testimonials__button-prev',
      },

      pagination: {
         el: '.testimonials__progress',
         type: 'progressbar',
      },
   });
}

/*=============== SWIPER KNOWLEDGE ===============*/
if(document.querySelector('.knowledge__swiper')){
   const knowledgeSpotlight = document.querySelector('.knowledge__spotlight')
   const knowledgeSpotlightTitle = document.querySelector('.knowledge__spotlight-title')
   const knowledgeSpotlightText = document.querySelector('.knowledge__spotlight-text')

   const updateKnowledgeSpotlight = (swiperInstance) => {
      const activeSlide = swiperInstance.slides[swiperInstance.activeIndex]
      if(!activeSlide || !knowledgeSpotlight) return

      knowledgeSpotlight.classList.add('is-updating')

      setTimeout(() => {
         knowledgeSpotlightTitle.textContent = activeSlide.dataset.title
         knowledgeSpotlightText.textContent = activeSlide.dataset.text
         knowledgeSpotlight.classList.remove('is-updating')
      }, 200)
   }

   const swiperKnowledge = new Swiper('.knowledge__swiper', {
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      spaceBetween: 24,
      slidesPerView: 'auto',
      speed: 800,

      autoplay: {
         delay: 3000,
         disableOnInteraction: false,
         pauseOnMouseEnter: true,
         reverseDirection: true,
      },

      navigation: {
         nextEl: '.knowledge__button-next',
         prevEl: '.knowledge__button-prev',
      },

      pagination: {
         el: '.knowledge__pagination',
         clickable: true,
      },

      on: {
         init: updateKnowledgeSpotlight,
         slideChange: updateKnowledgeSpotlight,
      },
   });
}

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
   // Add the .scroll-header class if the bottom scroll of the viewport is greater than 350
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						     : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
scrollUp()

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

// Link the ID of each section (section id="home") to each link (a href="#home") 
// and activate the link with the class .active-link
const scrollActive = () => {
   // We get the position by scrolling down
   const scrollY = window.scrollY

   sections.forEach(section => {
      const id = section.id, // id of each section
            top = section.offsetTop - 50, // Distance from the top edge
            height = section.offsetHeight, // Element height
            link = document.querySelector('.nav__menu a[href*=' + id + ']') // id nav link

      if(!link) return

      link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== HOME STATS COUNTER ===============*/
const statTitles = document.querySelectorAll('.home__info-title[data-target]')

const animateCount = (el) => {
   const target = parseInt(el.dataset.target, 10)
   const duration = 1800
   const startDelay = 300

   setTimeout(() => {
      const startTime = performance.now()

      const step = (now) => {
         const progress = Math.min((now - startTime) / duration, 1)
         const value = Math.floor(progress * target)
         el.textContent = `${value}+`

         if(progress < 1){
            requestAnimationFrame(step)
         } else {
            el.textContent = `${target}+`
         }
      }
      requestAnimationFrame(step)
   }, startDelay)
}

if(statTitles.length){
   const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
         if(entry.isIntersecting){
            animateCount(entry.target)
            observer.unobserve(entry.target)
         }
      })
   }, { threshold: 0.6 })

   statTitles.forEach(title => statsObserver.observe(title))
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'top',
   distance: '100px',
   duration: 2500,
   delay: 400, 
   //reset: true,
})

sr.reveal(`.home__content, .services__data, .services__swiper, .footer__container` )
sr.reveal(`.home__images`, {origin: 'bottom', delay: 1000})
sr.reveal(`.quote__card`, {origin: 'bottom'})
sr.reveal(`.about__images, .contact__img, .choose__data, .testimonials__info`, {origin: 'left'})
sr.reveal(`.about__data, .contact__data, .choose__images, .testimonials__panel`, {origin: 'right'})
sr.reveal(`.projects__card`, {interval: 100})
sr.reveal(`.careers-hero__container`, {origin: 'bottom', delay: 200})
sr.reveal(`.knowledge__header, .knowledge__swiper, .knowledge__spotlight`, {interval: 100})
sr.reveal(`.faq__info`, {origin: 'left'})
sr.reveal(`.faq__list`, {origin: 'right'})
sr.reveal(`.careers__openings`, {origin: 'left'})
sr.reveal(`.careers__form-card`, {origin: 'right'})

/*=============== FAQ ACCORDION ===============*/
const faqItems = document.querySelectorAll('.faq__item')

faqItems.forEach(item => {
   const question = item.querySelector('.faq__question')
   const answerWrap = item.querySelector('.faq__answer-wrap')

   question.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active')

      faqItems.forEach(other => {
         other.classList.remove('is-active')
         other.querySelector('.faq__question').setAttribute('aria-expanded', 'false')
         other.querySelector('.faq__answer-wrap').style.maxHeight = null
      })

      if(!isActive){
         item.classList.add('is-active')
         question.setAttribute('aria-expanded', 'true')
         answerWrap.style.maxHeight = answerWrap.scrollHeight + 'px'
      }
   })
})

/*=============== CAREERS RESUME FILE NAME ===============*/
const careersFileInput = document.querySelector('.careers__file-input')

if(careersFileInput){
   const careersFileLabel = document.querySelector('.careers__file span')

   careersFileInput.addEventListener('change', () => {
      careersFileLabel.textContent = careersFileInput.files.length
         ? careersFileInput.files[0].name
         : 'Attach Resume'
   })
}
