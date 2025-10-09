# Red-whiskered Bulbul Personal Story Website

## Overview

This is a bilingual personal website celebrating the Red-whiskered Bulbul (Pycnonotus jocosus) that has been nesting in the owner's home since 2022. The site combines personal storytelling with educational content about the bird species, featuring multimedia galleries with photos, videos, and audio recordings. The website supports English and Tamil languages to accommodate family members and emphasizes a calm, nature-inspired aesthetic that reflects the peaceful presence of the bird.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: Pure HTML/CSS/JavaScript (Vanilla JS)
- **Rationale**: No build process or framework overhead; simple static site suitable for GitHub Pages deployment
- **Pros**: Fast loading, easy to maintain, works everywhere, no dependencies
- **Cons**: Manual DOM manipulation, limited scalability for complex features

**Language Toggle System**: Client-side language switching via CSS class toggling
- **Implementation**: Body class `.tamil` controls content visibility through CSS `[lang]` selectors
- **Storage**: LocalStorage persists user language preference across sessions
- **Rationale**: Avoids page reloads and provides instant switching experience

**Responsive Design**: CSS-based responsive layout with mobile-first approach
- **Color System**: CSS custom properties (variables) for consistent theming
- **Visual Design**: Bold, modern black-red-white color scheme with clean aesthetics (no emojis)
- **Background Effects**: Fixed radial gradients create subtle wave patterns with smooth animations
- **Enhanced Aesthetics**: Sophisticated hover effects, card transforms, fade-in animations, and refined typography

### Media Management

**Static Asset Structure**: All media files stored in `/media` folder
- **Videos**: 7 video files (video6.mov and video7.mov recently added) showcasing Beta's life and nest
- **Photos**: 4 user-provided photos (`photo1.jpg` through `photo4.jpg`) 
- **Audio**: Bird song recording (`beta-song.m4a`)
- **Rationale**: Simple folder structure suitable for static hosting; no CDN or database needed

**Video Playback Control**: JavaScript ensures only one video plays at a time
- **Implementation**: Event listeners pause other videos when one starts playing
- **Rationale**: Prevents audio overlap and improves user experience

### Deployment Strategy

**GitHub Pages Hosting**: Static site deployment
- **Rationale**: Free hosting, automatic HTTPS, simple git-based deployment
- **Requirements**: Repository must include `/media` folder with all assets
- **URL Pattern**: `https://username.github.io/repository-name/`

## External Dependencies

### Browser APIs
- **LocalStorage API**: Persists language preference
- **HTML5 Video/Audio APIs**: Native media playback without external players

### None Required
- No external JavaScript libraries
- No CSS frameworks
- No backend services
- No databases
- No build tools or bundlers
- No third-party hosting for media assets

### Future Considerations
- If scaling to more content, consider static site generator (Jekyll/Hugo)
- For analytics, could add Google Analytics or similar (currently none)
- For multilingual expansion beyond English/Tamil, consider i18n library