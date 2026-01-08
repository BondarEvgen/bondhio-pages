# Adaptive Slider Guide

This guide explains the core concepts used in the adaptive slider implementation.

## Core Concepts

### 1. Viewport & Track
The fundamental structure of a carousel slider involves two main parts:
-   **The Container (Viewport):** This element (`#slider-container`) has a fixed width (or percentage width) and `overflow: hidden`. It acts like a window, showing only one slide at a time.
-   **The Track:** This element (`#slider-track`) contains all the slides side-by-side. It is much wider than the container.

**How it works:**
We move the **Track** left or right relative to the **Container**. By setting `transform: translateX(-100%)`, we shift the track to show the second slide. `translateX(-200%)` shows the third, and so on.

### 2. Responsiveness (Adaptivity)
We achieve adaptivity using CSS Flexbox and percentages:
-   **Flexbox:** `display: flex` on the track ensures slides sit in a row.
-   **Widths:** Each slide has `min-width: 100%`. This tells the browser "Make each slide exactly as wide as the parent container".
-   **Images:** Images are set to `object-cover`, ensuring they fill the slide area without distortion, regardless of the screen size.

### 3. State Management
State refers to "data that changes over time". In our slider, the state is simply:
-   `currentIndex`: Which slide is currently active (0, 1, 2...).

When the user clicks "Next", we update the state (`currentIndex++`) and then call a function `updateSliderPosition()` to visually reflect that new state.

### 4. CSS Transitions vs JS Animation
-   **CSS Transitions:** We use `transition: transform 0.5s ease-out` in CSS. This is the modern, performant way to animate.
-   **JS:** JavaScript *only* updates the final value (e.g., "Go to -100%"). CSS handles the smooth sliding animation between the two points.

## Implementation Details

### HTML Structure
```html
<div id="slider-container" class="overflow-hidden ...">
    <div id="slider-track" class="flex transition ...">
        <div class="min-w-full ...">...</div>
        <div class="min-w-full ...">...</div>
    </div>
</div>
```

### JavaScript Logic
1.  **Select Elements:** Get references to track, buttons, and dots.
2.  **Move Logic:**
    ```javascript
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    ```
3.  **Looping:**
    -   If at the end and user clicks next -> wrap to index 0.
    -   If at start and user clicks prev -> wrap to last index.

### Touch Support
We listen for `touchstart` and `touchend` events to calculate the difference in X position.
-   Swipe Left (Start > End): Next Slide.
-   Swipe Right (Start < End): Previous Slide.
