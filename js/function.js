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




// gallery 



document.addEventListener('DOMContentLoaded', function() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            const lightboxClose = document.getElementById('lightbox-close');

            console.log('Gallery items found:', galleryItems.length);

            // Open lightbox
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('Gallery item clicked:', index);
                    
                    const imageSrc = this.getAttribute('data-src');
                    const imageAlt = this.querySelector('img').getAttribute('alt');
                    
                    console.log('Opening lightbox with image:', imageSrc);
                    
                    // Set image source
                    lightboxImage.src = imageSrc;
                    lightboxImage.alt = imageAlt;
                    
                    // Show lightbox
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    console.log('Lightbox should be visible now');
                });
            });

            // Close lightbox function
            function closeLightbox() {
                console.log('Closing lightbox');
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                setTimeout(() => {
                    lightboxImage.src = '';
                }, 300);
            }

            // Close button event
            lightboxClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                closeLightbox();
            });
            
            // Click outside to close
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    console.log('Clicked outside image');
                    closeLightbox();
                }
            });

            // ESC key to close
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    console.log('ESC key pressed');
                    closeLightbox();
                }
            });

            // Test button to manually open lightbox (for debugging)
            document.addEventListener('keydown', function(e) {
                if (e.key === 'T' || e.key === 't') {
                    console.log('Test key pressed - opening lightbox');
                    lightboxImage.src = 'images/FAF/who-we-are-1.jpg';
                    lightbox.classList.add('active');
                }
            });
        });


 const overlayBlock = document.querySelector(".overlay-block");
        
        window.addEventListener("scroll", () => {
            const scrollTop = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            const bannerWrapper = document.querySelector('.banner-wrapper');
            
            // Calculate progress based on scroll position
            let progress = Math.max(0, scrollTop / viewportHeight);
            progress = Math.min(progress, 1);
            
            // Interpolate border-radius and scale for overlay animation
            const radius = 960 - (959 * progress); // 960 → 1
            const scale = 0.65 + (0.35 * progress); // 0.65 → 1
            
            overlayBlock.style.borderRadius = `${radius}px ${radius}px 0 0`;
            overlayBlock.style.transform = `scale(${scale})`;
            
            // Hide banner when overlay animation is complete (progress = 1)
            if (progress >= 1) {
                bannerWrapper.style.display = 'none';
            } else {
                bannerWrapper.style.display = 'block';
            }
        });


		
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});




document.addEventListener('DOMContentLoaded', function() {
    const servicesItems = document.querySelectorAll('.page-services .services-item');
    
    // Initial animation on page load
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all service items
    servicesItems.forEach(item => {
        observer.observe(item);
    });
    
    // For scroll-triggered animations (if items are below viewport)
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
                entry.target.classList.add('scroll-animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });
    
    servicesItems.forEach(item => {
        scrollObserver.observe(item);
    });
});