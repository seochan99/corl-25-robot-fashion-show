// Robot Fashion Show 2025 - Main JavaScript (English Only)
(function () {
    "use strict";

    // State management
    let currentSlide = 0;
    let autoSlideInterval;
    let isAutoSliding = true;
    let lastScrollY = 0;
    let navbarHidden = false;
    let currentSection = 0;
    let isScrolling = false;
    let scrollTimeout;

    // DOM elements
    let carousel, carouselTrack, indicators, prevBtn, nextBtn;

    // Initialize application
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initApp);
        } else {
            initApp();
        }
    }

    function initApp() {
        // Get DOM elements
        carousel = document.querySelector(".carousel");
        carouselTrack = document.querySelector(".carousel-track");
        indicators = document.querySelectorAll(".indicator");
        prevBtn = document.querySelector(".carousel-prev");
        nextBtn = document.querySelector(".carousel-next");

        // Initialize components
        initNavigation();
        initScrollEffects();
        initNavbarScroll();
        initArtistShowcase();
        initHeroVideo();
        initSectionSnapping();
        initArtistAnimations();
        initImageSliders();

        console.log("Robot Fashion Show 2025 initialized");
    }

    // Navigation functionality
    function initNavigation() {
        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                const target = this.getAttribute("href");

                // Handle external links, .html files, and absolute paths - let browser handle normally
                if (
                    target.startsWith("http") ||
                    target.includes(".html") ||
                    target.startsWith("/") ||
                    target.includes("://") ||
                    !target.startsWith("#")
                ) {
                    // Don't prevent default for external navigation
                    return;
                }

                // Only prevent default for internal hash links (starting with #)
                e.preventDefault();
                smoothScrollTo(target);
            });
        });

        // Highlight active section on scroll with optimized performance
        window.addEventListener("scroll", throttle(updateActiveNavLink, 50), {
            passive: true,
        });
    }

    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const navHeight = document.querySelector(".nav")?.offsetHeight || 0;
            const elementPosition = element.offsetTop - navHeight;

            // Enhanced smooth scrolling with better performance
            if ("scrollBehavior" in document.documentElement.style) {
                window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth",
                });
            } else {
                // Fallback for older browsers
                const startPosition = window.pageYOffset;
                const distance = elementPosition - startPosition;
                const duration = 800;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(
                        timeElapsed,
                        startPosition,
                        distance,
                        duration
                    );
                    window.scrollTo(0, run);
                    if (timeElapsed < duration)
                        requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return (c / 2) * t * t + b;
                    t--;
                    return (-c / 2) * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        }
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-link");
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    // Carousel functionality
    function initCarousel() {
        if (!carousel || !carouselTrack) return;

        // Add event listeners
        if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
        if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));

        // Indicator listeners
        indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => goToSlide(index));
        });

        // Touch/swipe support
        initTouchSupport();

        // Keyboard navigation
        initKeyboardNavigation();

        // Auto-slide functionality
        startAutoSlide();

        // Pause auto-slide on hover
        carousel.addEventListener("mouseenter", pauseAutoSlide);
        carousel.addEventListener("mouseleave", resumeAutoSlide);

        // Pause auto-slide on focus
        carousel.addEventListener("focusin", pauseAutoSlide);
        carousel.addEventListener("focusout", resumeAutoSlide);
    }

    function changeSlide(direction) {
        const totalSlides = indicators.length;
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function updateCarousel() {
        if (!carouselTrack) return;

        const slideWidth = carouselTrack.children[0].offsetWidth;
        const gap = 30; // CSS gap value
        const offset = -(currentSlide * (slideWidth + gap));

        carouselTrack.style.transform = `translateX(${offset}px)`;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentSlide);
        });

        // Update aria-labels for accessibility
        indicators.forEach((indicator, index) => {
            const isActive = index === currentSlide;
            indicator.setAttribute("aria-pressed", isActive.toString());
        });
    }

    function startAutoSlide() {
        if (!isAutoSliding) return;

        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 6000); // 6 seconds as specified
    }

    function pauseAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    function resumeAutoSlide() {
        if (isAutoSliding) {
            startAutoSlide();
        }
    }

    // Touch/swipe support
    function initTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        carousel.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            pauseAutoSlide();
        });

        carousel.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            e.preventDefault();
        });

        carousel.addEventListener("touchend", () => {
            if (!isDragging) return;

            const diffX = startX - currentX;
            const threshold = 50;

            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    changeSlide(1); // Swipe left, next slide
                } else {
                    changeSlide(-1); // Swipe right, previous slide
                }
            }

            isDragging = false;
            resumeAutoSlide();
        });
    }

    // Keyboard navigation
    function initKeyboardNavigation() {
        carousel.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    e.preventDefault();
                    changeSlide(-1);
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    changeSlide(1);
                    break;
                case "Home":
                    e.preventDefault();
                    goToSlide(0);
                    break;
                case "End":
                    e.preventDefault();
                    goToSlide(indicators.length - 1);
                    break;
            }
        });
    }

    // Scroll effects
    function initScrollEffects() {
        // Smooth scroll for anchor links
        document.addEventListener("click", (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = e.target.getAttribute("href");
                smoothScrollTo(target);
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in");
                }
            });
        }, observerOptions);

        // Observe sections for animations
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => observer.observe(section));
    }

    // Utility functions
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle window resize
    window.addEventListener(
        "resize",
        debounce(() => {
            updateCarousel();
        }, 250)
    );

    // Handle visibility change (pause auto-slide when tab is not visible)
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            pauseAutoSlide();
        } else {
            resumeAutoSlide();
        }
    });

    // Navbar scroll behavior
    function initNavbarScroll() {
        const navbar = document.querySelector(".nav");
        if (!navbar) return;

        // Add transition for smooth animation
        navbar.style.transition = "transform 0.3s ease-in-out";

        window.addEventListener(
            "scroll",
            throttle(() => {
                const currentScrollY = window.scrollY;

                // Don't hide navbar if at top of page
                if (currentScrollY < 100) {
                    showNavbar(navbar);
                    return;
                }

                // Hide navbar when scrolling down, show when scrolling up
                if (currentScrollY > lastScrollY && !navbarHidden) {
                    hideNavbar(navbar);
                } else if (currentScrollY < lastScrollY && navbarHidden) {
                    showNavbar(navbar);
                }

                lastScrollY = currentScrollY;
            }, 16), // ~60fps for smoother performance
            { passive: true }
        );
    }

    function hideNavbar(navbar) {
        navbar.style.transform = "translateY(-100%)";
        navbarHidden = true;
    }

    function showNavbar(navbar) {
        navbar.style.transform = "translateY(0)";
        navbarHidden = false;
    }

    // Artist Showcase functionality
    function initArtistShowcase() {
        const showcaseContainer = document.querySelector(".artists-showcase");
        if (!showcaseContainer) return;

        // Intersection Observer for animations
        const showcaseObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        // Observe all artist showcase sections
        const artistSections = document.querySelectorAll(".artist-showcase");
        artistSections.forEach((section) => {
            showcaseObserver.observe(section);
        });

        console.log(
            "Artist Showcase initialized with",
            artistSections.length,
            "sections"
        );
    }

    // Hero video functionality
    function initHeroVideo() {
        const heroVideo = document.querySelector(".hero-video");
        if (heroVideo) {
            // Loop the video
            heroVideo.loop = true;

            // Ensure video plays on mobile
            heroVideo.addEventListener("loadeddata", () => {
                heroVideo.play().catch((e) => {
                    console.log("Video autoplay failed:", e);
                });
            });

            // Handle video errors
            heroVideo.addEventListener("error", (e) => {
                console.log("Video error:", e);
                // Fallback to background gradient if video fails
                const hero = document.querySelector(".hero");
                if (hero) {
                    hero.style.background =
                        "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)";
                }
            });
        }
    }

    // Section snapping functionality for enhanced scroll behavior
    function initSectionSnapping() {
        const sections = document.querySelectorAll("section");
        if (sections.length === 0) return;

        let isSnapping = false;
        let scrollTimer;
        let wheelEventCount = 0;
        let lastWheelTime = 0;

        // Track current section
        function getCurrentSectionIndex() {
            const scrollPosition = window.scrollY + 100;
            let closestSection = 0;
            let closestDistance = Infinity;

            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                const sectionTop = section.offsetTop;
                const distance = Math.abs(scrollPosition - sectionTop);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = i;
                }
            }

            return closestSection;
        }

        // Smooth scroll to specific section
        function scrollToSection(index) {
            if (index < 0 || index >= sections.length) return;

            isSnapping = true;
            const targetSection = sections[index];

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth",
            });

            // Reset snapping flag after animation
            setTimeout(() => {
                isSnapping = false;
                currentSection = index;
            }, 1000);
        }

        // Enhanced wheel event handling for section-by-section scrolling
        function handleWheel(e) {
            const currentIndex = getCurrentSectionIndex();
            const currentSection = sections[currentIndex];

            // Info section and participation-info section allow free scrolling
            if (
                currentSection &&
                (currentSection.classList.contains("info-section") ||
                    currentSection.classList.contains(
                        "participation-info-section"
                    ))
            ) {
                return;
            }

            if (isSnapping) {
                e.preventDefault();
                return;
            }

            const now = Date.now();
            const timeDiff = now - lastWheelTime;

            // Reset wheel count if too much time has passed
            if (timeDiff > 200) {
                wheelEventCount = 0;
            }

            wheelEventCount++;
            lastWheelTime = now;

            // Only trigger section change after multiple wheel events
            if (wheelEventCount < 3) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            wheelEventCount = 0;

            const direction = e.deltaY > 0 ? 1 : -1;
            const nextIndex = currentIndex + direction;

            // Handle info section specially
            if (nextIndex >= 0 && nextIndex < sections.length) {
                const nextSection = sections[nextIndex];
                if (
                    nextSection &&
                    nextSection.classList.contains("info-section")
                ) {
                    window.scrollTo({
                        top: nextSection.offsetTop,
                        behavior: "smooth",
                    });
                } else {
                    scrollToSection(nextIndex);
                }
            }
        }

        // Touch handling for mobile section snapping
        let touchStartY = 0;
        let touchEndY = 0;
        let isTouching = false;

        function handleTouchStart(e) {
            if (isSnapping) return;
            touchStartY = e.touches[0].clientY;
            isTouching = true;
        }

        function handleTouchEnd(e) {
            if (!isTouching || isSnapping) return;

            const currentIndex = getCurrentSectionIndex();
            const currentSection = sections[currentIndex];

            // Allow free scrolling in participation-info section
            if (
                currentSection &&
                currentSection.classList.contains("participation-info-section")
            ) {
                isTouching = false;
                return;
            }

            touchEndY = e.changedTouches[0].clientY;
            const touchDiff = touchStartY - touchEndY;
            const minSwipeDistance = 50;

            if (Math.abs(touchDiff) > minSwipeDistance) {
                const direction = touchDiff > 0 ? 1 : -1;
                const nextIndex = currentIndex + direction;

                if (nextIndex >= 0 && nextIndex < sections.length) {
                    const nextSection = sections[nextIndex];
                    if (
                        nextSection &&
                        nextSection.classList.contains("info-section")
                    ) {
                        window.scrollTo({
                            top: nextSection.offsetTop,
                            behavior: "smooth",
                        });
                    } else {
                        scrollToSection(nextIndex);
                    }
                }
            }

            isTouching = false;
        }

        // Keyboard navigation enhancement
        function handleKeydown(e) {
            if (isSnapping) return;

            const currentIndex = getCurrentSectionIndex();
            const currentSection = sections[currentIndex];

            // Allow free scrolling in participation-info section
            if (
                currentSection &&
                currentSection.classList.contains("participation-info-section")
            ) {
                return;
            }

            let nextIndex = currentIndex;

            switch (e.key) {
                case "ArrowDown":
                case "PageDown":
                case " ": // Space key
                    e.preventDefault();
                    nextIndex = currentIndex + 1;
                    break;
                case "ArrowUp":
                case "PageUp":
                    e.preventDefault();
                    nextIndex = currentIndex - 1;
                    break;
                case "Home":
                    e.preventDefault();
                    nextIndex = 0;
                    break;
                case "End":
                    e.preventDefault();
                    nextIndex = sections.length - 1;
                    break;
            }

            if (
                nextIndex !== currentIndex &&
                nextIndex >= 0 &&
                nextIndex < sections.length
            ) {
                const nextSection = sections[nextIndex];
                if (
                    nextSection &&
                    nextSection.classList.contains("info-section")
                ) {
                    window.scrollTo({
                        top: nextSection.offsetTop,
                        behavior: "smooth",
                    });
                } else {
                    scrollToSection(nextIndex);
                }
            }
        }

        // Initialize current section
        currentSection = getCurrentSectionIndex();

        // Add event listeners
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, {
            passive: true,
        });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("keydown", handleKeydown, { passive: false });

        // Handle browser back/forward navigation
        window.addEventListener("popstate", () => {
            currentSection = getCurrentSectionIndex();
        });

        console.log(
            "Section snapping initialized with",
            sections.length,
            "sections"
        );
    }

    // Artist animations initialization
    function initArtistAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const section = entry.target;

                if (entry.isIntersecting) {
                    section.classList.add("in-view");
                } else {
                    section.classList.remove("in-view");
                }
            });
        }, observerOptions);

        // Observe all artist sections
        const artistSections = document.querySelectorAll(".artist-showcase");
        artistSections.forEach((section) => {
            observer.observe(section);
        });

        // Artist intro section
        const introSection = document.querySelector(".artists-intro");
        if (introSection) {
            const introObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("animate-intro");
                        } else {
                            entry.target.classList.remove("animate-intro");
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: "0px",
                    threshold: 0.1,
                }
            );

            introObserver.observe(introSection);
        }
    }

    // Image sliders initialization
    function initImageSliders() {
        const sliders = document.querySelectorAll(".work-images-slider");

        sliders.forEach((slider, sliderIndex) => {
            const images = slider.querySelectorAll(".work-image");
            const indicators =
                slider.parentElement.querySelectorAll(".image-indicator");
            const prevBtn = slider.parentElement.querySelector(
                ".image-nav-btn.prev"
            );
            const nextBtn = slider.parentElement.querySelector(
                ".image-nav-btn.next"
            );

            let currentImageIndex = 0;

            // Hide navigation if only one image
            if (images.length <= 1) {
                if (prevBtn) prevBtn.style.display = "none";
                if (nextBtn) nextBtn.style.display = "none";
                return;
            }

            // Update slider function
            function updateSlider() {
                const translateX = -currentImageIndex * 100;
                slider.style.transform = `translateX(${translateX}%)`;

                // Update indicators
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle(
                        "active",
                        index === currentImageIndex
                    );
                });

                // Store current image index
                slider.setAttribute("data-current-image", currentImageIndex);
            }

            // Next image
            function nextImage() {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateSlider();
            }

            // Previous image
            function prevImage() {
                currentImageIndex =
                    currentImageIndex === 0
                        ? images.length - 1
                        : currentImageIndex - 1;
                updateSlider();
            }

            // Go to specific image
            function goToImage(index) {
                currentImageIndex = index;
                updateSlider();
            }

            // Event listeners
            if (prevBtn) {
                prevBtn.addEventListener("click", prevImage);
            }

            if (nextBtn) {
                nextBtn.addEventListener("click", nextImage);
            }

            // Indicator click events
            indicators.forEach((indicator, index) => {
                indicator.addEventListener("click", () => goToImage(index));
            });

            // Touch support
            let touchStartX = 0;
            let touchEndX = 0;

            slider.addEventListener(
                "touchstart",
                (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                },
                { passive: true }
            );

            slider.addEventListener(
                "touchend",
                (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    const touchDiff = touchStartX - touchEndX;
                    const minSwipeDistance = 50;

                    if (Math.abs(touchDiff) > minSwipeDistance) {
                        if (touchDiff > 0) {
                            nextImage();
                        } else {
                            prevImage();
                        }
                    }
                },
                { passive: true }
            );

            // Keyboard support
            slider.addEventListener("keydown", (e) => {
                if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    prevImage();
                } else if (e.key === "ArrowRight") {
                    e.preventDefault();
                    nextImage();
                }
            });

            // Make slider focusable
            slider.setAttribute("tabindex", "0");

            // Auto-slide for 3+ images
            if (images.length > 2) {
                let autoSlideInterval;

                function startAutoSlide() {
                    autoSlideInterval = setInterval(nextImage, 5000);
                }

                function stopAutoSlide() {
                    clearInterval(autoSlideInterval);
                }

                // Pause auto-slide on hover
                slider.parentElement.addEventListener(
                    "mouseenter",
                    stopAutoSlide
                );
                slider.parentElement.addEventListener(
                    "mouseleave",
                    startAutoSlide
                );

                // Start auto-slide
                startAutoSlide();
            }

            // Initialize slider
            updateSlider();
        });
    }

    // Initialize the application
    init();

    // DOM loaded image slider initialization
    document.addEventListener("DOMContentLoaded", initImageSliders);

    // Initialize if already loaded
    if (document.readyState !== "loading") {
        initImageSliders();
    }

    // Export functions for external use
    window.RobotFashionShow = {
        goToSlide,
        pauseAutoSlide,
        resumeAutoSlide,
        initImageSliders,
    };
})();
