// ================================================
// PORTFOLIO 2026 - MAIN.JS
// Dragon Scroll Animation + Particles + Effects
// ================================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- AOS INIT ----
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: false, offset: 60 });
    }

    // ---- CURSOR GLOW ----
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        let cursorX = 0, cursorY = 0;
        let glowX = 0, glowY = 0;
        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });
        function animateCursor() {
            glowX += (cursorX - glowX) * 0.08;
            glowY += (cursorY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // ---- PARTICLE BACKGROUND ----
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', () => { resize(); initParticles(); });

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 1.5 + 0.5;
                this.alpha = Math.random() * 0.4 + 0.1;
                this.color = Math.random() > 0.5 ? '#7c3aed' : '#06b6d4';
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function connectParticles() {
            const maxDist = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.15;
                        ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 120);
            for (let i = 0; i < count; i++) particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // =====================================================
    // DRAGON SCROLL ANIMATION
    // =====================================================
    const dragonSVG = document.getElementById('dragon-svg');
    const dragonTrailCanvas = document.getElementById('dragon-trail-canvas');

    if (dragonSVG && dragonTrailCanvas) {
        const trailCtx = dragonTrailCanvas.getContext('2d');
        dragonTrailCanvas.width = 150;
        dragonTrailCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            dragonTrailCanvas.height = window.innerHeight;
        });

        let dragonTargetY = 0;
        let dragonCurrentY = 80;
        let dragonVelocity = 0;
        let trailPoints = [];
        let lastScrollY = 0;

        // Dragon body wave segments for serpentine effect
        const dragonSegments = [];
        const SEGMENT_COUNT = 12;
        for (let i = 0; i < SEGMENT_COUNT; i++) {
            dragonSegments.push({ x: 60, y: 80 + i * 10, angle: 0 });
        }

        function animateDragon() {
            const scrollFraction = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const maxY = window.innerHeight - 200;
            dragonTargetY = 80 + scrollFraction * maxY;

            // Spring physics for smooth following
            const springK = 0.08;
            const damping = 0.85;
            const delta = dragonTargetY - dragonCurrentY;
            dragonVelocity = (dragonVelocity + delta * springK) * damping;
            dragonCurrentY += dragonVelocity;

            // Clamp
            dragonCurrentY = Math.max(40, Math.min(window.innerHeight - 180, dragonCurrentY));

            // Update SVG position
            dragonSVG.style.top = dragonCurrentY + 'px';

            // Scroll direction tilt and wave
            const scrollDelta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;
            const tiltAngle = Math.max(-20, Math.min(20, scrollDelta * 3));
            const waveOffset = Math.sin(Date.now() * 0.002) * 8;

            dragonSVG.style.transform = `translateX(${waveOffset}px) rotate(${tiltAngle}deg)`;

            // Add glow pulse based on scroll speed
            const glowIntensity = Math.min(30, Math.abs(scrollDelta) * 5 + 12);
            dragonSVG.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(124,58,237,0.8)) drop-shadow(0 0 ${glowIntensity*0.5}px rgba(6,182,212,0.5))`;

            // Trail effect
            trailPoints.unshift({ y: dragonCurrentY + 90, opacity: 1.0 });
            if (trailPoints.length > 25) trailPoints.pop();

            // Draw trail
            trailCtx.clearRect(0, 0, 150, window.innerHeight);
            for (let i = 0; i < trailPoints.length; i++) {
                const pt = trailPoints[i];
                pt.opacity -= 0.04;
                if (pt.opacity <= 0) continue;

                const x = 55 + Math.sin(i * 0.3 + Date.now() * 0.003) * 8;
                const r = Math.max(0, 5 - i * 0.2);

                const grad = trailCtx.createRadialGradient(x, pt.y, 0, x, pt.y, r * 3);
                grad.addColorStop(0, `rgba(124, 58, 237, ${pt.opacity * 0.5})`);
                grad.addColorStop(0.5, `rgba(6, 182, 212, ${pt.opacity * 0.25})`);
                grad.addColorStop(1, 'transparent');
                trailCtx.fillStyle = grad;
                trailCtx.beginPath();
                trailCtx.arc(x, pt.y, r * 3, 0, Math.PI * 2);
                trailCtx.fill();
            }

            // Connect trail with line
            if (trailPoints.length > 2) {
                trailCtx.beginPath();
                trailCtx.moveTo(50, trailPoints[0].y);
                for (let i = 1; i < Math.min(trailPoints.length, 20); i++) {
                    const xWave = 55 + Math.sin(i * 0.3) * 6;
                    trailCtx.lineTo(xWave, trailPoints[i].y);
                }
                const trailGrad = trailCtx.createLinearGradient(0, trailPoints[0].y, 0, trailPoints[Math.min(trailPoints.length-1, 19)].y);
                trailGrad.addColorStop(0, 'rgba(124,58,237,0.4)');
                trailGrad.addColorStop(1, 'rgba(6,182,212,0)');
                trailCtx.strokeStyle = trailGrad;
                trailCtx.lineWidth = 2;
                trailCtx.stroke();
            }

            requestAnimationFrame(animateDragon);
        }

        animateDragon();

        // Fire breath on fast scroll
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                // Breathing idle state
            }, 100);
        });
    }

    // =====================================================
    // CONTACT FORM ENHANCEMENT
    // =====================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const btn = document.getElementById('submit-btn');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;
                btn.style.opacity = '0.7';
            }
        });
    }

    // =====================================================
    // SCROLL REVEAL for elements without AOS
    // =====================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(el);
    });

}); // end DOMContentLoaded
