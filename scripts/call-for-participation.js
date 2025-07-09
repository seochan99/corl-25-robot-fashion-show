// Call for Participation Page - Main JavaScript
(function () {
    "use strict";

    // Removed language translations - using English only

    // State management
    let robotFashionData = null;

    // DOM elements - language toggle removed

    // Initialize application
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initApp);
        } else {
            initApp();
        }
    }

    async function initApp() {
        // Load Call for Participation data
        await loadCallForParticipationData();

        // Initialize components
        initScrollEffects();
        initSmoothScrolling();

        // Render content
        renderContent();

        console.log("Call for Participation page initialized");
    }

    // Load Call for Participation data
    async function loadCallForParticipationData() {
        try {
            const { robotFashionShowData } = await import('./CallForParticipationData.js');
            robotFashionData = robotFashionShowData;
        } catch (error) {
            console.error('Error loading Call for Participation data:', error);
        }
    }

    // Language functions removed - using English only

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.addEventListener("click", (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = e.target.getAttribute("href");
                smoothScrollTo(target);
            }
        });
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

    // Scroll effects
    function initScrollEffects() {
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
        const sections = document.querySelectorAll(".cfp-section");
        sections.forEach((section) => observer.observe(section));
    }

    // Render dynamic content
    function renderContent() {
        if (!robotFashionData) return;

        renderImportantDates();
        renderResearchAreas();
        renderParticipationTracks();
        renderSubmissionFormat();
        renderRequirements();
        renderImportantNotes();
        updateExternalLinks();
    }

    function renderImportantDates() {
        const timeline = document.getElementById('cfp-timeline');
        if (!timeline) return;

        timeline.innerHTML = '';
        robotFashionData.importantDates.forEach((dateItem, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'cfp-timeline-item';
            
            const timeContent = dateItem.time ? `<div class="cfp-timeline-time">${dateItem.time}</div>` : '';
            const noteContent = dateItem.note ? `<div class="cfp-timeline-note">${dateItem.note}</div>` : '';
            const locationContent = dateItem.location ? `<div class="cfp-timeline-location">${dateItem.location}</div>` : '';

            timelineItem.innerHTML = `
                <div class="cfp-timeline-content">
                    <div class="cfp-timeline-date">${dateItem.date}</div>
                    <div class="cfp-timeline-event">${dateItem.event}</div>
                    ${timeContent}
                    ${noteContent}
                    ${locationContent}
                </div>
                <div class="cfp-timeline-marker"></div>
            `;
            
            timeline.appendChild(timelineItem);
        });
    }

    function renderResearchAreas() {
        const grid = document.getElementById('cfp-research-grid');
        if (!grid) return;

        grid.innerHTML = '';
        robotFashionData.researchAreas.forEach((area) => {
            const areaItem = document.createElement('div');
            areaItem.className = 'cfp-research-item';
            
            areaItem.innerHTML = `
                <h3 class="cfp-research-title">${area.title}</h3>
                <p class="cfp-research-description">${area.description}</p>
            `;
            
            grid.appendChild(areaItem);
        });
    }

    function renderParticipationTracks() {
        const grid = document.getElementById('cfp-tracks-grid');
        if (!grid) return;

        grid.innerHTML = '';
        robotFashionData.participationTracks.forEach((track) => {
            const trackItem = document.createElement('div');
            trackItem.className = 'cfp-track-item';
            
            const detailsContent = track.details ? `<p class="cfp-track-details">${track.details}</p>` : '';
            const requirementContent = track.requirement ? `
                <div class="cfp-track-requirement">
                    <strong>Requirement:</strong> ${track.requirement}
                </div>
            ` : '';

            trackItem.innerHTML = `
                <h3 class="cfp-track-title">${track.title}</h3>
                <p class="cfp-track-description">${track.description}</p>
                ${detailsContent}
                ${requirementContent}
            `;
            
            grid.appendChild(trackItem);
        });
    }

    function renderSubmissionFormat() {
        const container = document.getElementById('cfp-submission-format');
        if (!container) return;

        container.innerHTML = `
            <h3>Submission Format</h3>
            <ul>
                ${robotFashionData.submission.format.map(item => `
                    <li>
                        <div class="cfp-submission-item-title">${item.item}</div>
                        <div class="cfp-submission-item-details">${item.details}</div>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    function renderRequirements() {
        const container = document.getElementById('cfp-requirements-list');
        if (!container) return;

        container.innerHTML = `
            <ul>
                ${robotFashionData.requirements.map(requirement => `
                    <li>${requirement}</li>
                `).join('')}
            </ul>
        `;
    }

    function renderImportantNotes() {
        const container = document.getElementById('cfp-notes-list');
        if (!container) return;

        container.innerHTML = `
            <ul>
                ${robotFashionData.importantNotes.map(note => `
                    <li>${note}</li>
                `).join('')}
            </ul>
        `;
    }

    function updateExternalLinks() {
        // Update OpenReview link
        const openreviewLink = document.getElementById('cfp-openreview-link');
        if (openreviewLink && robotFashionData.submission.platform.url) {
            openreviewLink.href = robotFashionData.submission.platform.url;
        }

        // Update template link
        const templateLink = document.getElementById('cfp-template-link');
        if (templateLink && robotFashionData.submission.template.url) {
            templateLink.href = robotFashionData.submission.template.url;
        }

        // Update setup document link
        const setupDocLink = document.getElementById('cfp-setup-doc-link');
        if (setupDocLink && robotFashionData.setup.documentUrl) {
            setupDocLink.href = robotFashionData.setup.documentUrl;
        }
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
            // Add any resize-specific logic here
        }, 250)
    );

    // Initialize the application
    init();

    // Export functions for potential external use
    window.CallForParticipation = {
        smoothScrollTo,
    };
})();