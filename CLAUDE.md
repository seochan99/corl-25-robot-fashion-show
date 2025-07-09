# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for the Robot Fashion Show 2025 event at Humanoids '25 conferences in Seoul. It's a bilingual (English/Korean) one-page website featuring artist showcases, event information, and interactive visual effects.

## Technology Stack

-   **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
-   **No build process**: Static files served directly
-   **No dependencies**: Self-contained with no external libraries
-   **Fonts**: Custom Pretendard font for Korean/English support
-   **Video**: MP4 hero background videos

## Development Commands

Since this is a static site with no build process, you can:

### Local Development

```bash
# Serve locally using Python
python -m http.server 8000

# Or using Node.js
npx serve .

# Or using PHP
php -S localhost:8000
```

### File Serving

-   Simply open `index.html` in a browser for basic viewing
-   Use local server for full functionality (video, fonts, etc.)

## Code Architecture

### File Structure

```
/
├── index.html              # Main HTML file with all content
├── scripts/
│   └── script.js          # Main JavaScript (1200+ lines)
├── styles/
│   ├── style.css          # Main CSS (imports all modules)
│   ├── base.css           # Reset, variables, typography
│   ├── navigation.css     # Header navigation
│   ├── hero.css           # Hero section effects
│   ├── carousel.css       # Artist showcase
│   ├── artist-showcase.css # Fullscreen artist sections
│   ├── info.css           # Event information
│   ├── footer.css         # Footer styles
│   ├── animations.css     # All keyframe animations
│   └── responsive.css     # Media queries
└── assets/
    ├── artist/            # Artist portraits
    ├── robot/             # Artwork/robot images
    ├── fonts/             # Pretendard font files
    ├── icons/             # SVG icons
    ├── favicon/           # Favicon collection
    └── hero.mp4           # Hero video
```

### JavaScript Architecture (`scripts/script.js`)

The JavaScript is organized as an IIFE (Immediately Invoked Function Expression) with these key modules:

-   **Language Management**: Bilingual support with `translations` object
-   **Navigation**: Smooth scrolling, active link highlighting
-   **Artist Showcase**: Fullscreen section scrolling with animations
-   **Image Sliders**: Multi-image galleries within artist sections
-   **Touch/Keyboard Support**: Mobile-friendly interactions
-   **Section Snapping**: Enhanced scroll behavior between sections
-   **Accessibility**: Screen reader support, ARIA labels

### CSS Architecture (Modular CSS)

CSS is split into focused modules imported by `styles/style.css`:

-   **base.css**: CSS custom properties, reset, typography
-   **navigation.css**: Header with language toggle
-   **hero.css**: Video background, particle effects
-   **artist-showcase.css**: Fullscreen artist sections
-   **carousel.css**: Artist grid layouts
-   **info.css**: Event information cards
-   **animations.css**: All keyframe animations
-   **responsive.css**: Mobile-first responsive design

## Key Features

### Bilingual Support

-   Language switching via `currentLanguage` variable
-   All text managed through `translations` object in JavaScript
-   Dynamic content updates using `data-i18n` attributes

### Artist Showcase System

-   6 artist sections with individual IDs (`#artist-1` through `#artist-6`)
-   Each section has:
    -   Artist profile with photo and bio
    -   Multi-image work gallery with navigation
    -   Social media links
    -   Responsive layout

### Interactive Elements

-   **Image Sliders**: Custom JavaScript sliders for artist work galleries
-   **Section Snapping**: Smooth scrolling between sections
-   **Touch Support**: Mobile swipe gestures
-   **Keyboard Navigation**: Arrow key support for sliders and navigation

### Performance Optimizations

-   Intersection Observer for scroll animations
-   Throttled scroll events
-   Lazy loading considerations
-   Smooth scrolling with `scroll-behavior: smooth`

## Content Management

### Adding New Artists

1. Add artist images to `assets/artist/` and `assets/robot/`
2. Create new `<section id="artist-X">` in `index.html`
3. Add translation keys to `translations` object in `script.js`
4. Update navigation if needed

### Updating Translations

-   Edit the `translations` object in `script.js`
-   Add `data-i18n` attributes to HTML elements
-   Both English (`en`) and Korean (`ko`) translations required

### Asset Management

-   Images: Use optimized formats (JPG for photos, PNG for graphics)
-   Videos: MP4 format with compression for web
-   Fonts: Pretendard font files in `assets/fonts/`

## Important Notes

-   **No Build Process**: All files are served as static assets
-   **Cross-Browser Support**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
-   **Mobile First**: Responsive design with touch interactions
-   **Accessibility**: WCAG compliant with proper ARIA labels
-   **SEO**: Complete Open Graph and Twitter Card meta tags

## Development Tips

-   Use browser dev tools for debugging CSS animations
-   Test on mobile devices for touch interactions
-   Verify video playback across browsers
-   Check language switching functionality
-   Validate scroll snapping behavior on different screen sizes
