/* ══════════════════════════════════════════════
   EID UL-ADHA GREETING — ANIMATION ENGINE
   Uses GSAP for smooth, sequential stage-based
   animations with confetti & sparkles.
   ══════════════════════════════════════════════ */

(function () {
  "use strict";

  // ───── DOM refs ─────
  const bullWrap       = document.getElementById("bull-wrap");
  const manWrap        = document.getElementById("man-wrap");
  const manBodyGroup   = document.getElementById("man-body-group");
  const greetingInner  = document.getElementById("greeting-inner");
  const greetingWords  = document.querySelectorAll(".g-word");
  const greetingArabic = document.getElementById("greeting-arabic");
  const communityLayer = document.getElementById("community-layer");
  const commSub        = document.getElementById("community-subtitle");
  const commPairs      = document.querySelectorAll(".community-pair");
  const confettiCanvas = document.getElementById("confetti-canvas");
  const bgCrescent     = document.getElementById("bg-crescent");
  const bgMosque       = document.getElementById("bg-mosque");
  const starsContainer = document.getElementById("stars-container");
  const replayBtn      = document.getElementById("replayBtn");

  // ───── Confetti Engine ─────
  const ctx = confettiCanvas.getContext("2d");
  let confettiPieces = [];
  let confettiRunning = false;
  let confettiRAF = null;

  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const CONFETTI_COLORS = [
    "#d4a04a", "#f5d98e", "#c2185b", "#ff6f61",
    "#4fc3f7", "#81c784", "#ba68c8", "#fff176",
    "#ffffff", "#fde68a"
  ];

  function createConfettiPiece() {
    const isSparkle = Math.random() > 0.6;
    return {
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height * 0.5,
      w: isSparkle ? 3 : Math.random() * 8 + 4,
      h: isSparkle ? 3 : Math.random() * 5 + 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      speedY: Math.random() * 2.5 + 1.2,
      speedX: (Math.random() - 0.5) * 2,
      opacity: 1,
      isSparkle,
      sparklePhase: Math.random() * Math.PI * 2,
    };
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const p = confettiPieces[i];
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;
      p.sparklePhase += 0.08;

      if (p.y > confettiCanvas.height + 20) {
        p.opacity -= 0.02;
        if (p.opacity <= 0) { confettiPieces.splice(i, 1); continue; }
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.isSparkle ? (0.5 + 0.5 * Math.sin(p.sparklePhase)) * p.opacity : p.opacity;

      if (p.isSparkle) {
        // Draw a sparkle / star
        ctx.fillStyle = p.color;
        ctx.beginPath();
        for (let s = 0; s < 4; s++) {
          const angle = (s * Math.PI) / 2;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * 6, Math.sin(angle) * 6);
          ctx.lineTo(Math.cos(angle + Math.PI / 4) * 2, Math.sin(angle + Math.PI / 4) * 2);
        }
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }

      ctx.restore();
    }

    if (confettiPieces.length > 0) {
      confettiRAF = requestAnimationFrame(drawConfetti);
    } else {
      confettiRunning = false;
    }
  }

  function launchConfetti(count = 200) {
    confettiPieces = [];
    for (let i = 0; i < count; i++) {
      confettiPieces.push(createConfettiPiece());
    }
    if (!confettiRunning) {
      confettiRunning = true;
      drawConfetti();
    }
  }

  // ───── Background Stars ─────
  function generateStars() {
    starsContainer.innerHTML = "";
    const count = Math.min(Math.floor(window.innerWidth * 0.12), 100);
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "bg-star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 55 + "%";
      const size = Math.random() * 2.5 + 1.5;
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.animation = `twinkle ${2 + Math.random() * 4}s ${Math.random() * 4}s ease-in-out infinite`;
      starsContainer.appendChild(star);
    }
  }
  generateStars();

  // ───── Master Timeline ─────
  let masterTL = null;

  function buildTimeline() {
    // Kill previous timeline
    if (masterTL) { masterTL.kill(); }
    if (confettiRAF) { cancelAnimationFrame(confettiRAF); confettiRunning = false; }
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    // Reset all elements
    gsap.set([bullWrap, manWrap], { opacity: 0 });
    gsap.set(bullWrap, { x: "-120vw" });
    gsap.set(manWrap, { x: "120vw" });
    gsap.set(manBodyGroup, { rotation: 0, transformOrigin: "50% 100%" });
    gsap.set(greetingInner, { opacity: 0, scale: 0.8 });
    gsap.set(greetingWords, { opacity: 0, y: 30 });
    gsap.set(greetingArabic, { opacity: 0 });
    gsap.set(communityLayer, { opacity: 0 });
    gsap.set(commSub, { opacity: 0 });
    gsap.set(commPairs, { opacity: 0, y: 30 });
    commPairs.forEach(p => p.classList.remove("is-active"));

    masterTL = gsap.timeline({ delay: 0.4 });

    // ────────────────────────────────
    // BG: Fade in crescent & mosque
    // ────────────────────────────────
    masterTL.to(bgCrescent, { opacity: 1, duration: 1.5, ease: "power2.out" }, 0);
    masterTL.to(bgMosque, { opacity: 1, duration: 2, ease: "power2.out" }, 0.3);

    // ────────────────────────────────
    // STAGE 1 — The Entry
    // ────────────────────────────────
    masterTL.to(bullWrap, {
      opacity: 1,
      x: "-12vw",
      duration: 2,
      ease: "power3.out"
    }, 0.5);

    masterTL.to(manWrap, {
      opacity: 1,
      x: "12vw",
      duration: 2,
      ease: "power3.out"
    }, 0.5);

    // ────────────────────────────────
    // STAGE 2 — The Climax (symbolic bow)
    // ────────────────────────────────
    // Small pause, then man bows
    masterTL.to(manBodyGroup, {
      rotation: -25,
      duration: 1.2,
      ease: "power2.inOut"
    }, "+=0.6");

    // Hold the bow
    masterTL.to({}, { duration: 1.0 });

    // Man rises back up
    masterTL.to(manBodyGroup, {
      rotation: 0,
      duration: 0.8,
      ease: "power2.inOut"
    });

    // Small pause
    masterTL.to({}, { duration: 0.4 });

    // ────────────────────────────────
    // STAGE 3 — The Greeting
    // ────────────────────────────────
    // Fade out characters
    masterTL.to([bullWrap, manWrap], {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.in"
    });

    // Fade in greeting container
    masterTL.to(greetingInner, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.5)"
    }, "-=0.3");

    // Animate each word
    greetingWords.forEach((word, i) => {
      masterTL.to(word, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(2)"
      }, `-=${i === 0 ? 0.1 : 0.35}`);
    });

    // Arabic text
    masterTL.to(greetingArabic, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2");

    // Launch confetti!
    masterTL.call(() => launchConfetti(250), null, "-=0.3");

    // ────────────────────────────────
    // STAGE 4 — The Community
    // ────────────────────────────────
    masterTL.to(communityLayer, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "+=0.5");

    masterTL.to(commSub, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");

    commPairs.forEach((pair, i) => {
      masterTL.to(pair, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.8)"
      }, `-=${i === 0 ? 0.1 : 0.4}`);
    });

    // Activate looping sway
    masterTL.call(() => {
      commPairs.forEach(p => p.classList.add("is-active"));
    });
  }

  // ───── Init ─────
  buildTimeline();

  // ───── Replay ─────
  replayBtn.addEventListener("click", () => {
    buildTimeline();
  });

  // Re-generate stars on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(generateStars, 300);
  });
})();
