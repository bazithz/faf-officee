(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 

	/* Preloader Effect */
	$window.on('load', function(){
		$(".preloader").fadeOut(600);
	});

	/* Sticky Header */	
	if($('.active-sticky-header').length){
		$window.on('resize', function(){
			setHeaderHeight();
		});

		function setHeaderHeight(){
	 		$("header.main-header").css("height", $('header .header-sticky').outerHeight());
		}	
	
		$window.on("scroll", function() {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header .header-sticky').outerHeight()
			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}	
	
	/* Slick Menu JS */
	$('#menu').slicknav({
		label : '',
		prependTo : '.responsive-menu'
	});

	if($("a[href='#top']").length){
		$(document).on("click", "a[href='#top']", function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Hero Company Slider JS */
	if ($('.hero-company-slider').length) {
		const hero_company_slider = new Swiper('.hero-company-slider .swiper', {
			slidesPerView : 2,
			centeredSlides: true,
			speed: 2000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				768:{
				  	slidesPerView: 5,
				},
				991:{
				  	slidesPerView: 5,
				}
			}
		});
	}

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next',
				prevEl: '.testimonial-button-prev',
			},
			breakpoints: {
				768:{
					slidesPerView: 2,
				},
				991:{
					slidesPerView: 2,
				}
			}
		});
	}

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function() {
			$('.skillbar').each(function() {
				$(this).find('.count-bar').animate({
				width:$(this).attr('data-percent')
				},2000);
			});
		},{
			offset: '70%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 991))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
			  return element.find('img');
			}
		}
	});

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		/* Ajax call to submit form */
		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: $contactform.serialize(),
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Animated Wow Js */	
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	/* Work Steps Item Active Start */
	var $work_step_list = $('.work-step-list');
	if ($work_step_list.length) {
		var $work_step_item = $work_step_list.find('.work-step-item');

		if ($work_step_item.length) {
			$work_step_item.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$work_step_item.removeClass('active'); 
						$(this).addClass('active'); 
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/* Work Steps Item Active End */
	
})(jQuery);



document.addEventListener("DOMContentLoaded", function () {
  // Initialize Slick Carousel on gallery-slider
  $('.gallery-slider').slick({
      slidesToShow: 4,          // Show 4 at a time
      slidesToScroll: 1,        // Scroll 1 at a time
      autoplay: true,           // Enable auto scroll
      autoplaySpeed: 2500,      // 2.5s interval
      speed: 800,               // Slide animation speed
      infinite: true,           // Loop infinitely
      arrows: true,             // Show next/prev arrows (set false if not needed)
      dots: false,              // Disable dots (set true if you want dots)
      pauseOnHover: true,
      pauseOnFocus: false,
      responsive: [
          { breakpoint: 992, settings: { slidesToShow: 2 } },  // 2 slides on tablet
          { breakpoint: 576, settings: { slidesToShow: 1 } }   // 1 slide on mobile
      ]
  });

  // Lightbox options
  lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
      disableScrolling: true,
      fadeDuration: 200,
      imageFadeDuration: 200
  });

  // Pause carousel when lightbox opens
  $(document).on('click', '[data-lightbox]', function () {
      $('.gallery-slider').slick('slickPause');
  });
});




// window.addEventListener("load", () => {
//     const tl = gsap.timeline();

//     tl.from(".slide-bg", {
//       y: -200,          
//       opacity: 0,
//       duration: 1.5,
//       ease: "bounce.out"
//     })

//     .from(".banner-content h1", {
//       scale: 0.8,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out"
//     }, "-=0.5");

//     // Register ScrollTrigger
//     gsap.registerPlugin(ScrollTrigger);


//     gsap.to(".banner-wrapper", {
//       yPercent: -50,   
//       opacity: 0.6, 
//       scale: 0.9,
//       ease: "power2.inOut",
//       scrollTrigger: {
//         trigger: ".about-us",
//         start: "top bottom",
//         end: "top 5%",  
//         scrub: 1.5
//       }
//     });


//     gsap.from(".about-us-images", {
//       opacity: 0,
//       y: 100,
//       duration: 1.2,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".about-us-images",
//         start: "top 85%",
//         toggleActions: "play none none reverse"
//       }
//     });

//     gsap.from(".about-us-content", {
//       opacity: 0,
//       y: 100,
//       duration: 1.2,
//       delay: 0.3, 
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".about-us-content",
//         start: "top 85%",
//         toggleActions: "play none none reverse"
//       }
//     });


//     gsap.from(".about-image img", {
//       scale: 0.8,
//       opacity: 0,
//       rotation: -10,
//       duration: 1.5,
//       ease: "elastic.out(1, 0.8)",
//       scrollTrigger: {
//         trigger: ".about-image",
//         start: "top 80%",
//         toggleActions: "play none none reverse"
//       }
//     });

//     gsap.from(".about-skill-box", {
//       x: 200,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".about-skill-box",
//         start: "top 80%",
//         toggleActions: "play none none reverse"
//       }
//     });


//     gsap.from(".satisfy-client-image", {
//       scale: 0,
//       rotation: 360,
//       opacity: 0,
//       duration: 0.8,
//       stagger: {
//         amount: 1.5,
//         from: "start"
//       },
//       ease: "back.out(2)",
//       scrollTrigger: {
//         trigger: ".expert-team-box",
//         start: "top 85%",
//         toggleActions: "play none none reverse"
//       }
//     });


//     gsap.from(".section-title h3", {
//       opacity: 0,
//       x: -50,
//       duration: 0.8,
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: ".section-title h3",
//         start: "top 85%",
//         toggleActions: "play none none reverse"
//       }
//     });

//     gsap.from(".section-title h2", {
//       opacity: 0,
//       y: 50,
//       duration: 1,
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: ".section-title h2",
//         start: "top 80%",
//         toggleActions: "play none none reverse"
//       }
//     });

//     gsap.from(".section-title p", {
//       clipPath: "inset(0 100% 0 0)",
//       duration: 2,
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: ".section-title p",
//         start: "top 75%",
//         toggleActions: "play none none reverse"
//       }
//     });


//     gsap.from(".about-us-btn", {
//       scale: 0,
//       opacity: 0,
//       y: 30,
//       duration: 0.8,
//       ease: "bounce.out",
//       scrollTrigger: {
//         trigger: ".about-us-btn",
//         start: "top 85%",
//         toggleActions: "play none none reverse"
//       }
//     });

//     gsap.from(".about-skill-title h3", {
//       opacity: 0,
//       scale: 0.8,
//       duration: 1,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: ".about-skill-title",
//         start: "top 80%",
//         toggleActions: "play none none reverse"
//       }
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     $(".banner-carousel").owlCarousel({
//       items: 1,
//       loop: true,
//       autoplay: true,
//       autoplayTimeout: 5000,
//       smartSpeed: 800
//     });
// });




const overlayBlock = document.querySelector(".overlay-block");

window.addEventListener("scroll", () => {
  const rect = overlayBlock.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // progress: 0 = overlay bottom is at viewport bottom, 1 = overlay top reaches top
  let progress = (viewportHeight - rect.top) / viewportHeight;
  progress = Math.min(Math.max(progress, 0), 1);

  // interpolate border-radius and scale
  const radius = 960 - (959 * progress); // 960 → 1
  const scale = 0.65 + (0.35 * progress); // 0.65 → 1

  overlayBlock.style.borderRadius = `${radius}px ${radius}px 0 0`;
  overlayBlock.style.transform = `scale(${scale})`;
});