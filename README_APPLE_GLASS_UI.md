# Friends Tourist — Apple Liquid Glass UI & Optical Refraction Engine (v3.2)

## Overview
The entire Friends Tourist web platform has been elevated to an **Apple Transparent Liquid Glass UI** inspired by modern Apple visionOS, iOS, and open-source liquid glass libraries ([ybouane/liquidglass](https://github.com/ybouane/liquidglass) & [nikdelvin/liquid-glass](https://github.com/nikdelvin/liquid-glass)).

---

## Key Features & Technological Enhancements

### 1. SVG Optical Refraction & Displacement Filter
- Embedded dynamically via JavaScript (`#liquid-glass-refraction` and `#liquid-glass-chromatic`).
- Uses `<feTurbulence>`, `<feDisplacementMap>`, and `<feSpecularLighting>` to produce genuine physical glass distortion without requiring heavy 3D rendering canvases or external dependencies.

### 2. visionOS-Style Spatial Specular Light Tracking
- Tracks real-time cursor (`mousemove`) and touch gestures (`touchmove` / `touchstart`) across all glass cards and buttons.
- Calculates dynamic relative coordinates (`--mouse-x` and `--mouse-y`).
- Renders an interactive radial specular reflection that naturally moves across the surface as you explore the interface.

### 3. Prismatic Chromatic Dispersion Edge Rim
- Edge dispersion effect simulating real optical glass refraction using subpixel cyan (`rgba(100, 210, 255, 0.35)`) and magenta (`rgba(255, 120, 200, 0.25)`) prism fringes on the **Floating Island Navbar** and **Quick Booking Dock**.

### 4. Liquid Sheen Glint Sweep
- Buttons (`.btn-primary`, `.ft-whatsapp`, `.ft-call`) feature an angled translucent specular glint that sweeps smoothly across on hover with fluid cubic-bezier spring easing.

### 5. Floating Dynamic Island Navbar
- Detached frosted capsule (`backdrop-filter: blur(22px) saturate(190%)`, `border-radius: 9999px`) that gracefully adapts from dark translucent glass over the hero to clean white frosted glass on scroll.
- Mobile menu expands as a floating frosted glass sheet.

### 6. Interactive Glass Cards
- **Services Tiles**: 4 frosted glass cards with Apple gradient icon discs and 3D hover elevation.
- **Popular Tour Cards**: Frosted cards with floating gold-star rating badges and image zoom.
- **Testimonial Widgets**: Translucent frosted review bubbles with verified checkmark badges.
- **Contact Tiles**: 4 frosted glass boxes with gradient glyph circles.

### 7. Floating Dynamic Island Booking Dock
- Floating pill dock in the lower corner with:
  - **WhatsApp**: Glowing Apple Emerald frosted glass gradient.
  - **Call Now**: Glowing Apple Electric Blue frosted glass gradient.
  - Haptic spring click/tap response (`scale(0.96)`).

---

## File Structure

```
css/
  ├── apple-glass.css       <-- Complete Apple Liquid Glass Design System
  ├── mobile.css            <-- Responsive & mobile base rules
  └── style.css             <-- Original theme stylesheet
js/
  ├── apple-glass.js        <-- Liquid Glass SVG injection, spatial tracking & navbar scroll
  ├── mobile.js             <-- Mobile menu & carousel dots helper
  └── main.js               <-- Original base script
index.html                  <-- Home page
about.html                  <-- About page
destination.html            <-- Destination page 1
destination1.html           <-- Destination page 2
destination2.html           <-- Destination page 3
contact.html                <-- Contact page
index - Copy.html           <-- Backup home page
```

## Deployment
Upload the contents of this folder directly to your hosting root directory. All CSS and JS files use relative paths and run out of the box with zero npm or build dependencies.
