// Robot Fashion Show 2025 - Main JavaScript
(function () {
    "use strict";

    // Language translations
    const translations = {
        en: {
            title: "Robot Fashion Show 2025 - Cross-Species Haute Couture",
            description:
                "Discover emerging cross-species fashion concepts at Robot Fashion Show 2025, staged during CoRL '25 & Humanoids '25 in Seoul.",
            "nav-home": "Home",
            "nav-artists": "Artists",
            "nav-info": "Info",
            "lang-toggle": "Language",
            "hero-title": "Robot Fashion Show 2025",
            "hero-tagline":
                "A cross-species haute couture experience bridging robotics and fashion",
            "scroll-hint": "Scroll to explore",
            "artists-title": "Featured Artists & Researchers",
            "artist-1-name": "Byungjun Kwon",
            "artist-1-achievement": "Korea Artist Prize 2023 Winner",
            "artist-1-education":
                "BA French Literature, Seoul National University / MA Art Science, Royal Conservatory of The Hague",
            "artist-1-career":
                "Hardware Engineer at STEIM (Netherlands Electronic Music Research Institute)",
            "artist-1-specialty":
                "Research on sound-related hardware, developing new musical instruments and stage devices to create dramatic scenes that encompass music, theater, and visual arts through new media performance",
            "work-1-title": "On the Birds' Day (2024)",
            "artist-2-name": "Hyun Parke",
            "artist-2-achievement":
                "Ars Electronica Museum Permanent Exhibition Artist",
            "artist-2-education":
                "BFA School of the Art Institute of Chicago, MS MIT",
            "artist-2-career":
                "Research Associate at Carnegie Mellon University",
            "artist-2-specialty":
                "Interdisciplinary artist exploring pneumatic structures, inflatable objects, and dimensional display systems. Known for innovative work in air-reinforced structures and additive manufacturing technologies",
            "work-2-title": "3D Structural Pneumatic Inflation Study (2020)",
            "artist-3-name": "Young Ah Seong",
            "artist-3-achievement":
                "ACM UIST/IEEE Robosoft Best Demonstration Award",
            "artist-3-education":
                "Ph.D in Interdisciplinary Informatics, University of Tokyo",
            "artist-3-career": "Associate Professor at Hosei University, Tokyo",
            "artist-3-specialty":
                "Director of Affective Design Lab, specializing in innovative technology and interaction design. Research focus on emotional interfaces and soft robotics for human-computer interaction",
            "work-3-title": "Puff Me Up! (2024)",
            "view-video": "Video →",
            "artist-4-name": "Deborah Won",
            "artist-4-achievement":
                "Featured in Vogue, i-D Magazine, 1 Granary, Marie Claire",
            "artist-4-education": "Founder of Pisces Rising, New York",
            "artist-4-career":
                "Creative Director at c.Vernoy, Senior Designer at Converse",
            "artist-4-specialty":
                "NYC-based fashion designer who conjures a tactile dialogue between body, fabric, and space. Specializing in zero-gravity environment fashion design",
            "work-4-title": "Rhododendrons (2024)",
            "view-instagram": "Instagram →",
            "artist-5-name": "Dennis Hong",
            "artist-5-achievement":
                '"Brilliant 10" by Popular Science, TED Alumnus',
            "artist-5-education":
                "Ph.D in Mechanical Engineering, Purdue University",
            "artist-5-career":
                "Professor & Founding Director of RoMeLa at UCLA",
            "artist-5-specialty":
                'Director of RoMeLa (Robotics & Mechanisms Laboratory). Research focuses on robot locomotion and manipulation, autonomous vehicles and humanoid robots. Called "the Leonardo da Vinci of robots" by Washington Post',
            "work-5-title": "BALLU: Buoyancy Assisted Lightweight Legged Unit",
            "view-more": "View More →",
            "hero-badge": "First Ever",
            "corl-badge": "CoRL '25",
            "humanoids-badge": "Humanoids '25",
            "info-title": "Event Information",
            "info-date-title": "Date",
            "info-date": "September 30, 2025",
            "info-date-detail": "CoRL: Sep 27-30 | Humanoids: Sep 30-Oct 2",
            "info-venue-title": "Venue",
            "info-venue": "COEX Convention & Exhibition Center",
            "info-venue-detail": "513 Yeongdong-daero, Gangnam District, Seoul",
            "info-organizer-title": "Organizers",
            "info-organizer": "CoRL '25 & Humanoids '25",
            "info-chairs-title": "Contact",
            "info-chairs": "Jean Oh (CMU)",
            "info-chairs-detail": "jeanoh@cmu.edu",
            "info-cta-title": "Call for Participation",
            "info-cta-button": "Submit Proposal",
            "info-cta-deadline": "Deadline: July 15, 2025",
            "footer-copyright":
                "© 2025 Robot Fashion Show. All rights reserved.",
            "footer-corl": "CoRL 2025",
            "footer-contact": "Contact",
            "footer-press": "Press",
            "footer-sponsors": "Sponsors",
            "info-contact-title": "Contact",
            "info-contact": "Jean Oh (CMU)",
            "info-contact-email": "jeanoh@cmu.edu",
            "info-contact-subject": "[RoboFashion25]",
        },
        ko: {
            title: "로봇 패션쇼 2025 - 종간 오뜨 꾸뛰르",
            description:
                "CoRL '25 & Humanoids '25 서울에서 개최되는 로봇 패션쇼 2025에서 새로운 종간 패션 개념을 발견해보세요.",
            "nav-home": "홈",
            "nav-artists": "아티스트",
            "nav-info": "정보",
            "lang-toggle": "언어",
            "hero-title": "로봇 패션쇼 2025",
            "hero-tagline": "로봇공학과 패션을 연결하는 종간 패션 쇼",
            "scroll-hint": "SCROLL TO EXPLORE",
            "artists-title": "주요 아티스트 & 연구자",
            "artist-1-name": "Byungjun Kwon",
            "artist-1-achievement": "올해의 작가상 2023 수상",
            "artist-1-education":
                "서울대 불문과 학사/ 헤이그 왕립 음악원 아트 사이언스 석사",
            "artist-1-career":
                "네덜란드 전자악기 연구개발 기관 STEIM 하드웨어 엔지니어",
            "artist-1-specialty":
                "소리와 관련한 하드웨어 연구, 새로운 악기 무대장치를 개발 활용한 극적 장면을 연출하여 음악, 연극, 미술을 아우르는 뉴미디어 퍼포먼스",
            "work-1-title": "On the Birds' Day (2024)",
            "artist-2-name": "Hyun Parke",
            "artist-2-achievement": "아르스 일렉트로니카 뮤지엄 상설전시 작가",
            "artist-2-education": "시카고 아트 인스티튜트 BFA, MIT MS",
            "artist-2-career": "카네기 멜론 대학교 연구원",
            "artist-2-specialty":
                "공압 구조물, 팽창 가능한 오브젝트, 차원적 디스플레이 시스템을 탐구하는 학제간 아티스트. 공기 강화 구조물과 적층 제조 기술 분야의 혁신적 작업으로 유명",
            "work-2-title": "3차원 구조적 공압 팽창 연구 (2020)",
            "artist-3-name": "Young Ah Seong",
            "artist-3-achievement": "ACM UIST/IEEE Robosoft 최우수 데모 상",
            "artist-3-education": "도쿄대학교 학제정보학 박사",
            "artist-3-career": "호세이대학교 부교수, 도쿄",
            "artist-3-specialty":
                "감정 디자인 연구실 디렉터, 혁신 기술과 인터랙션 디자인 전문. 감정적 인터페이스와 인간-컴퓨터 상호작용을 위한 소프트 로보틱스 연구에 집중",
            "work-3-title": "Puff Me Up! (2024)",
            "view-video": "영상 →",
            "artist-4-name": "Deborah Won",
            "artist-4-achievement":
                "보그, i-D 매거진, 1 Granary, 마리끌레르 피처드",
            "artist-4-education": "Pisces Rising 설립자, 뉴욕",
            "artist-4-career":
                "c.Vernoy 크리에이티브 디렉터, 컨버스 시니어 디자이너",
            "artist-4-specialty":
                "몸과 원단, 공간 사이의 촉각적 대화를 만들어내는 뉴욕 기반 패션 디자이너. 무중력 환경 패션 디자인 전문",
            "work-4-title": "Rhododendrons (2024)",
            "view-instagram": "인스타그램 →",
            "artist-5-name": "Dennis Hong",
            "artist-5-achievement": '팝퓰러 사이언스 "브릴리언트 10", TED 연사',
            "artist-5-education": "퍼듀대학교 기계공학 박사",
            "artist-5-career": "UCLA RoMeLa 연구실 교수 및 설립 디렉터",
            "artist-5-specialty":
                'RoMeLa(로보틱스 & 메커니즘 연구소) 디렉터. 로봇 보행 및 조작, 자율주행차, 휴머노이드 로봇 연구에 집중. 워싱턴 포스트에서 "로봇의 레오나르도 다 빈치"라고 불림',
            "work-5-title": "BALLU: 부력 보조 경량 다리 유닛",
            "view-more": "더 보기 →",
            "hero-badge": "첫 번째",
            "corl-badge": "CoRL '25",
            "humanoids-badge": "Humanoids '25",
            "info-title": "행사 정보",
            "info-date-title": "날짜",
            "info-date": "2025년 9월 30일",
            "info-date-detail":
                "CoRL: 9월 27-30일 | Humanoids: 9월 30일-10월 2일",
            "info-venue-title": "장소",
            "info-venue": "코엑스 컨벤션 & 전시센터",
            "info-venue-detail": "서울시 강남구 영동대로 513",
            "info-organizer-title": "주최",
            "info-organizer": "CoRL '25 & Humanoids '25",
            "info-chairs-title": "연락처",
            "info-chairs": "Jean Oh (CMU)",
            "info-chairs-detail": "jeanoh@cmu.edu",
            "info-cta-title": "참가 신청",
            "info-cta-button": "제안서 제출",
            "info-cta-deadline": "마감일: 2025년 7월 15일",
            "footer-copyright": "© 2025 Robot Fashion Show 2025.",
            "footer-corl": "CoRL 2025",
            "footer-contact": "Contact",
            "footer-press": "Press",
            "footer-sponsors": "Sponsors",
            "info-contact-title": "Contact",
            "info-contact": "Jean Oh (CMU)",
            "info-contact-email": "jeanoh@cmu.edu",
            "info-contact-subject": "[RoboFashion25]",
        },
    };

    // State management
    let currentLanguage = "en";
    let currentSlide = 0;
    let autoSlideInterval;
    let isAutoSliding = true;

    // DOM elements
    let carousel, carouselTrack, indicators, prevBtn, nextBtn, langToggle;

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
        langToggle = document.querySelector(".lang-toggle");

        // Detect initial language
        detectLanguage();

        // Initialize components
        initNavigation();
        initLanguageToggle();
        initScrollEffects();

        // Apply initial language
        applyLanguage();
        updateLanguageToggle();

        console.log("Robot Fashion Show 2025 initialized");
    }

    // Language detection and management
    function detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith("ko")) {
            currentLanguage = "ko";
        } else {
            currentLanguage = "en";
        }
    }

    function toggleLanguage() {
        currentLanguage = currentLanguage === "en" ? "ko" : "en";
        applyLanguage();
        updateLanguageToggle();
    }

    function updateLanguageToggle() {
        if (langToggle) {
            langToggle.innerHTML =
                currentLanguage === "en"
                    ? '<span class="lang-active">EN</span> / <span class="lang-inactive">KR</span>'
                    : '<span class="lang-inactive">EN</span> / <span class="lang-active">KR</span>';
        }
    }

    function applyLanguage() {
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach((element) => {
            const key = element.getAttribute("data-i18n");
            const translation = translations[currentLanguage][key];

            if (translation) {
                if (
                    element.tagName === "TITLE" ||
                    element.hasAttribute("content")
                ) {
                    element.setAttribute("content", translation);
                    if (element.tagName === "TITLE") {
                        element.textContent = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.setAttribute("lang", currentLanguage);
        document.documentElement.setAttribute("data-lang", currentLanguage);
    }

    // Navigation functionality
    function initNavigation() {
        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const target = this.getAttribute("href");
                smoothScrollTo(target);
            });
        });

        // Highlight active section on scroll
        window.addEventListener("scroll", throttle(updateActiveNavLink, 100));
    }

    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const navHeight = document.querySelector(".nav").offsetHeight;
            const elementPosition = element.offsetTop - navHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
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

    // Language toggle
    function initLanguageToggle() {
        if (langToggle) {
            langToggle.addEventListener("click", toggleLanguage);

            // Update initial display
            const langCurrent = document.querySelector(".lang-current");
            if (langCurrent) {
                langCurrent.textContent = currentLanguage.toUpperCase();
            }
        }
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

    // Accessibility enhancements
    function announceSlideChange() {
        const currentArtist = carouselTrack.children[currentSlide];
        const artistName =
            currentArtist.querySelector(".artist-name").textContent;

        // Create screen reader announcement
        const announcement = document.createElement("div");
        announcement.setAttribute("aria-live", "polite");
        announcement.setAttribute("aria-atomic", "true");
        announcement.className = "sr-only";
        announcement.style.position = "absolute";
        announcement.style.width = "1px";
        announcement.style.height = "1px";
        announcement.style.overflow = "hidden";
        announcement.style.clip = "rect(0, 0, 0, 0)";

        announcement.textContent = `Now showing: ${artistName}`;
        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Initialize the application
    init();

    // Export functions for potential external use
    window.RobotFashionShow = {
        toggleLanguage,
        goToSlide,
        pauseAutoSlide,
        resumeAutoSlide,
    };
})();
