// Main carousel
const mainSwiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper .swiper-button-next',
        prevEl: '.swiper .swiper-button-prev',
    },
});

// Testimonials carousel
const testimonialSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.testimonials-swiper .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.testimonials-swiper .swiper-button-next',
        prevEl: '.testimonials-swiper .swiper-button-prev',
    },
});

document.addEventListener('DOMContentLoaded', function() {
    // Update the button selection to include both buttons
    const getStartedBtns = document.querySelectorAll('.get-started-btn, .hero-content .cta-button');
    const revenueForm = document.getElementById('revenue-form');
    const bookingRedirect = document.getElementById('booking-redirect');
    const newsletterSignup = document.getElementById('newsletter-signup');
    
    // Add click event to all matching buttons
    getStartedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            revenueForm.classList.remove('hidden');
        });
    });

    // Handle revenue button clicks
    document.querySelectorAll('.revenue-btn').forEach(button => {
        button.addEventListener('click', () => {
            const revenue = button.dataset.revenue;
            revenueForm.classList.add('hidden');
            
            if (['200k-2m', '2m-20m', '20m+'].includes(revenue)) {
                // Show booking message and redirect
                bookingRedirect.classList.remove('hidden');
                setTimeout(() => {
                    window.location.href = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0PbUQYydwGG5Wo2AjLrZZhQuAFdbjyMlU-9d96c6rDXFatBC6cNFzKc1tqObeKtJiqDKVu5ghg';
                }, 2000);
            } else {
                // Show newsletter signup
                newsletterSignup.classList.remove('hidden');
            }
        });
    });

    // Close modals when clicking outside
    [revenueForm, bookingRedirect, newsletterSignup].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });

    // Exit popup functionality
    let hasShownExitPopup = false;
    
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !hasShownExitPopup) {  // User moving mouse up to close
            const exitPopup = document.getElementById('exit-popup');
            exitPopup.classList.remove('hidden');
            hasShownExitPopup = true;
        }
    });

    // Close button functionality
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.getElementById('exit-popup').classList.add('hidden');
    });

    // Close on outside click (like other modals)
    document.getElementById('exit-popup').addEventListener('click', (e) => {
        if (e.target === document.getElementById('exit-popup')) {
            e.target.classList.add('hidden');
        }
    });
});
