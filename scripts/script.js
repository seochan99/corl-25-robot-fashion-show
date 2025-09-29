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
    let sections = [];
    let sectionTops = [];
    let isInitialized = false;

    // DOM elements
    let carousel, carouselTrack, indicators, prevBtn, nextBtn;

    // Google Analytics Event Tracking
    function trackEvent(category, action, label = null, value = null) {
        if (typeof gtag !== "undefined") {
            gtag("event", action, {
                event_category: category,
                event_label: label,
                value: value,
            });
        }
    }

    // Track button clicks and interactions
    function initEventTracking() {
        // Track CTA button clicks with specific tracking for Submit Proposal buttons
        const ctaButtons = document.querySelectorAll(
            ".hero-cta-primary, .hero-cta-secondary, .participation-button"
        );
        ctaButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const buttonText = this.textContent.trim();
                const href = this.getAttribute("href");
                const buttonClass = this.className;

                // Specific tracking for Submit Proposal buttons
                if (
                    buttonText.includes("Submit") ||
                    buttonText.includes("Proposal")
                ) {
                    if (buttonClass.includes("hero-cta-primary")) {
                        trackEvent(
                            "Submit_Proposal",
                            "click",
                            "Hero Section - Primary CTA"
                        );
                    } else if (buttonClass.includes("participation-button")) {
                        trackEvent(
                            "Submit_Proposal",
                            "click",
                            "Participation Section - Secondary CTA"
                        );
                    } else {
                        trackEvent(
                            "Submit_Proposal",
                            "click",
                            "Other Location"
                        );
                    }
                } else {
                    trackEvent("CTA", "click", `${buttonText} - ${href}`);
                }
            });
        });

        // Track navigation clicks
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
            link.addEventListener("click", function () {
                const linkText = this.textContent.trim();
                const href = this.getAttribute("href");

                // Specific tracking for Call for Participation link
                if (
                    linkText.includes("Call for Participation") ||
                    href.includes("call-for-participation")
                ) {
                    trackEvent(
                        "Navigation",
                        "click",
                        "Call for Participation Link"
                    );
                } else {
                    trackEvent("Navigation", "click", `${linkText} - ${href}`);
                }
            });
        });

        // Track artist profile clicks
        const profileLinks = document.querySelectorAll(
            ".profile-icon-btn, .youtube-icon-btn, .instagram-icon-btn"
        );
        profileLinks.forEach((link) => {
            link.addEventListener("click", function () {
                const linkType = this.classList.contains("profile-icon-btn")
                    ? "Profile"
                    : this.classList.contains("youtube-icon-btn")
                    ? "YouTube"
                    : "Instagram";
                const href = this.getAttribute("href");
                const artistSection = this.closest(".artist-showcase");
                const artistName = artistSection
                    ? artistSection.querySelector(".artist-name span")
                          .textContent
                    : "Unknown";
                trackEvent(
                    "Artist",
                    "click",
                    `${linkType} - ${artistName} - ${href}`
                );
            });
        });

        // Track image slider interactions
        const imageNavButtons = document.querySelectorAll(".image-nav-btn");
        imageNavButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const direction = this.classList.contains("prev")
                    ? "Previous"
                    : "Next";
                const artistSection = this.closest(".artist-showcase");
                const artistName = artistSection
                    ? artistSection.querySelector(".artist-name span")
                          .textContent
                    : "Unknown";
                trackEvent(
                    "ImageSlider",
                    "click",
                    `${direction} - ${artistName}`
                );
            });
        });

        // Track image indicator clicks
        const imageIndicators = document.querySelectorAll(".image-indicator");
        imageIndicators.forEach((indicator) => {
            indicator.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                const artistSection = this.closest(".artist-showcase");
                const artistName = artistSection
                    ? artistSection.querySelector(".artist-name span")
                          .textContent
                    : "Unknown";
                trackEvent(
                    "ImageSlider",
                    "indicator",
                    `${artistName} - Image ${parseInt(index) + 1}`
                );
            });
        });

        // Track sponsor link clicks
        const sponsorLinks = document.querySelectorAll(".sponsor-item a");
        sponsorLinks.forEach((link) => {
            link.addEventListener("click", function () {
                const sponsorName =
                    this.querySelector("img")?.alt || "Unknown Sponsor";
                const href = this.getAttribute("href");
                trackEvent("Sponsor", "click", `${sponsorName} - ${href}`);
            });
        });

        // Track contact email clicks
        const contactEmail = document.querySelector(".contact-email");
        if (contactEmail) {
            contactEmail.addEventListener("click", function () {
                trackEvent("Contact", "click", "Email - hpark3@andrew.cmu.edu");
            });
        }

        // Track humanoids badge clicks
        const humanoidsBadge = document.querySelector(".humanoids-badge");
        if (humanoidsBadge) {
            humanoidsBadge.addEventListener("click", function () {
                trackEvent("External", "click", "Humanoids 2025 Badge");
            });
        }

        // Track timeline item clicks (if they become clickable)
        const timelineItems = document.querySelectorAll(".timeline-item");
        timelineItems.forEach((item) => {
            item.addEventListener("click", function () {
                const date =
                    this.querySelector(".timeline-date")?.textContent ||
                    "Unknown Date";
                const label =
                    this.querySelector(".timeline-label")?.textContent ||
                    "Unknown Label";
                trackEvent("Timeline", "click", `${date} - ${label}`);
            });
        });

        // Track participation highlights clicks (if they become interactive)
        const highlightItems = document.querySelectorAll(".highlight-item");
        highlightItems.forEach((item) => {
            item.addEventListener("click", function () {
                const title =
                    this.querySelector("h4")?.textContent ||
                    "Unknown Highlight";
                trackEvent("Participation", "click", `Highlight - ${title}`);
            });
        });

        // Track scroll depth (optimized - reduced frequency)
        let maxScrollDepth = 0;
        let scrollDepthTimeout;
        window.addEventListener(
            "scroll",
            () => {
                if (scrollDepthTimeout) return;

                scrollDepthTimeout = setTimeout(() => {
                    const scrollPercent = Math.round(
                        (window.scrollY /
                            (document.body.scrollHeight - window.innerHeight)) *
                            100
                    );
                    if (
                        scrollPercent > maxScrollDepth &&
                        scrollPercent % 25 === 0
                    ) {
                        maxScrollDepth = scrollPercent;
                        trackEvent(
                            "Engagement",
                            "scroll_depth",
                            `${scrollPercent}%`
                        );
                    }
                    scrollDepthTimeout = null;
                }, 2000); // Reduced frequency
            },
            { passive: true }
        );

        // Track time on page (every 60 seconds instead of 30)
        let timeOnPage = 0;
        setInterval(() => {
            timeOnPage += 60;
            trackEvent("Engagement", "time_on_page", `${timeOnPage} seconds`);
        }, 60000);
    }

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

        // Initialize sections data
        initSectionsData();

        // Initialize components
        initNavigation();
        initScrollEffects();
        initArtistShowcase();
        initHeroVideo();
        initArtistAnimations();
        initImageSliders();
        initEventTracking();

        console.log("Robot Fashion Show 2025 initialized");
    }

    // Initialize sections data for better performance
    function initSectionsData() {
        sections = document.querySelectorAll("section");
        sectionTops = Array.from(sections).map((section) => section.offsetTop);
        isInitialized = true;
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

        // Optimized active nav link update
        window.addEventListener("scroll", updateActiveNavLink, {
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

    // Optimized active nav link update
    function updateActiveNavLink() {
        if (!isInitialized) return;

        const scrollPosition = window.scrollY + 100;
        let activeSection = 0;

        // Binary search for better performance
        let left = 0;
        let right = sectionTops.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (sectionTops[mid] <= scrollPosition) {
                activeSection = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        // Update navigation
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
            link.classList.remove("active");
        });

        const currentSectionElement = sections[activeSection];
        if (currentSectionElement) {
            const sectionId = currentSectionElement.getAttribute("id");
            const activeLink = document.querySelector(`[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
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
        sections.forEach((section) => observer.observe(section));
    }

    // Utility functions
    function throttle(func, wait) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), wait);
            }
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
            // Recalculate section positions after resize
            if (isInitialized) {
                sectionTops = Array.from(sections).map(
                    (section) => section.offsetTop
                );
            }
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
    // function initNavbarScroll() {
    //     const navbar = document.querySelector(".nav");
    //     if (!navbar) return;

    //     // Add transition for smooth animation
    //     navbar.style.transition = "transform 0.3s ease-in-out";

    //     window.addEventListener(
    //         "scroll",
    //         throttle(() => {
    //             const currentScrollY = window.scrollY;

    //             // Don't hide navbar if at top of page
    //             if (currentScrollY < 100) {
    //                 showNavbar(navbar);
    //                 return;
    //             }

    //             // Hide navbar when scrolling down, show when scrolling up
    //             if (currentScrollY > lastScrollY && !navbarHidden) {
    //                 hideNavbar(navbar);
    //             } else if (currentScrollY < lastScrollY && navbarHidden) {
    //                 showNavbar(navbar);
    //             }

    //             lastScrollY = currentScrollY;
    //         }, 16), // ~60fps for smoother performance
    //         { passive: true }
    //     );
    // }

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

        // Single Intersection Observer for all animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        // Observe all artist sections
        const artistSections = document.querySelectorAll(".artist-showcase");
        artistSections.forEach((section) => observer.observe(section));
    }

    // Hero video functionality
    function initHeroVideo() {
        const video = document.querySelector(".hero-video");
        if (!video) return;

        // Force high quality and continuous playback
        video.setAttribute("webkit-playsinline", "true");
        video.setAttribute("x-webkit-airplay", "allow");

        // Ensure loop and autoplay
        video.loop = true;
        video.muted = true;
        video.autoplay = true;

        // Force start playback
        video.addEventListener("loadeddata", () => {
            video.play().catch(() => {
                console.log("Autoplay blocked - user interaction required");
            });
        });

        // Simplified video observer - always keep playing when visible
        const videoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Always play when visible
                        if (video.paused) {
                            video.play().catch(() => {
                                // Handle autoplay restrictions
                            });
                        }
                    }
                    // Never pause - let it loop continuously
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px",
            }
        );

        videoObserver.observe(video);

        // Force play on any user interaction
        document.addEventListener(
            "click",
            () => {
                if (video.paused) {
                    video.play();
                }
            },
            { once: true }
        );
    }

    // Simple section snapping functionality
    function initSectionSnapping() {
        // Disabled complex section snapping to prevent scroll bugs
        console.log("Section snapping disabled for better scroll experience");
    }

    // Optimized artist animations initialization
    function initArtistAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -10% 0px",
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

        // Observe all sections for animations
        sections.forEach((section) => observer.observe(section));

        // Intro animation observer
        const introSection = document.querySelector(".hero");
        if (introSection) {
            const introObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("in-view");
                        }
                    });
                },
                { threshold: 0.1 }
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

    // Toggle Participation Details Function
    function toggleParticipationDetails() {
        const details = document.getElementById("participation-details");
        const toggleBtn = document.querySelector(".details-toggle");
        const toggleText = toggleBtn.querySelector(".toggle-text");
        const toggleIcon = toggleBtn.querySelector(".toggle-icon");

        if (details.classList.contains("collapsed")) {
            // Expand details
            details.classList.remove("collapsed");
            details.classList.add("expanded");
            toggleText.textContent = "Hide Details";
            toggleIcon.textContent = "▲";

            // Track event
            trackEvent("Participation", "toggle", "expanded");
        } else {
            // Collapse details
            details.classList.remove("expanded");
            details.classList.add("collapsed");
            toggleText.textContent = "Show Details";
            toggleIcon.textContent = "▼";

            // Track event
            trackEvent("Participation", "toggle", "collapsed");
        }
    }

    // Export functions for external use
    window.RobotFashionShow = {
        goToSlide,
        pauseAutoSlide,
        resumeAutoSlide,
        initImageSliders,
    };

    // Mobile Menu Functions
    function toggleMobileMenu() {
        const overlay = document.getElementById("mobile-menu-overlay");
        const hamburgerBtn = document.querySelector(".mobile-menu-btn");

        if (overlay.classList.contains("active")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        const overlay = document.getElementById("mobile-menu-overlay");
        const hamburgerBtn = document.querySelector(".mobile-menu-btn");

        overlay.classList.add("active");
        hamburgerBtn.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent body scroll

        // Track event
        trackEvent("Navigation", "mobile_menu", "opened");
    }

    function closeMobileMenu() {
        const overlay = document.getElementById("mobile-menu-overlay");
        const hamburgerBtn = document.querySelector(".mobile-menu-btn");

        overlay.classList.remove("active");
        hamburgerBtn.classList.remove("active");
        document.body.style.overflow = ""; // Restore body scroll

        // Track event
        trackEvent("Navigation", "mobile_menu", "closed");
    }

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
        const overlay = document.getElementById("mobile-menu-overlay");
        const hamburgerBtn = document.querySelector(".mobile-menu-btn");

        if (
            overlay &&
            overlay.classList.contains("active") &&
            !overlay.contains(e.target) &&
            !hamburgerBtn.contains(e.target)
        ) {
            closeMobileMenu();
        }
    });

    // Export functions globally
    window.toggleParticipationDetails = toggleParticipationDetails;
    window.toggleMobileMenu = toggleMobileMenu;
    window.closeMobileMenu = closeMobileMenu;
})();
