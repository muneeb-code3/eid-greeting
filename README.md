# 🌙 Eid ul-Adha Greeting Animation

An elegant, modern, responsive single-page web experience showcasing a timed vector animation celebrating Eid ul-Adha. Built with raw SVGs, responsive CSS, and GSAP (GreenSock Animation Platform) for smooth transitions.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

---

## ✨ Features & Animation Sequence

The web page plays a beautifully choreographed 4-stage sequential animation:

1. **Stage 1 (The Entry):**
   - On page load, a stylized vector illustration of a sacrificial bull slides in smoothly from the left.
   - Concurrently, a stylized vector illustration of a man in traditional attire slides in from the right.
   - A minimalist, glowing crescent moon and starry night sky fade in to set a serene atmosphere.

2. **Stage 2 (The Climax):**
   - Both characters halt at center-left and center-right.
   - The man performs a respectful, symbolic, and clean bow representing the ritual sacrifice—completely artistic, using motion graphics without any explicit details or gore.

3. **Stage 3 (The Greeting):**
   - The characters gently fade out as a bold, elegant typography animation brings **"Eid Ul Adha Mubarak"** to the center.
   - Features a gorgeous gold Arabic-fusion font with a shimmering glow effect and a matching Arabic calligraphy script below.
   - Accompanied by a custom canvas-based sparkling stars and digital confetti burst.

4. **Stage 4 (The Community):**
   - Heartwarming silhouette characters representing community and family members hugging and shaking hands fade in at the bottom.
   - A subtitle reading *"Wishing you and your family a blessed Eid"* floats above them.
   - The figures loop in a gentle swaying animation to feel active and alive.

5. **🔄 Replay Control:**
   - A beautiful glassmorphic "Replay Animation" button resides at the top-right corner, allowing viewers to restart the sequence seamlessly.

---

## 🛠️ Technology Stack

- **Structure & Graphics:** Semantic HTML5 & vector inline SVGs (responsive, sharp on high-DPI screens).
- **Styling:** Custom CSS with an Islamic night-to-sunset gradient palette, gold accents, and fluid layouts using `clamp()`.
- **Animation:** [GSAP (GreenSock)](https://greensock.com/gsap/) for deterministic timeline coordination.
- **Particle Effects:** Custom HTML5 Canvas rendering sparkling stars and confetti dynamically.

---

## 🚀 Running Locally

You can launch and preview the project instantly:

1. Clone this repository (once pushed/created):
   ```bash
   git clone <your-repository-url>
   cd <repository-folder-name>
   ```

2. Serve the directory using any static web server. For example, using Node.js:
   ```bash
   npx serve .
   ```
   Or using Python:
   ```bash
   python -m http.server 8000
   ```

3. Open the output URL (e.g., `http://localhost:3000` or `http://localhost:8000`) in your web browser.

---

## 📱 Responsiveness

Designed with a mobile-first approach:
- Scaling and positioning adapt dynamically across mobile devices, tablets, and wide desktop screens.
- Mobile layouts automatically optimize element spacing and stack elements logically to avoid overlaps.

---

*Wishing you and your family a blessed and peaceful Eid!* 🌙✨
