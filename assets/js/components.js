/**
 * Portfolio 2026 - Shared Header & Footer Components
 * @param {string} basePath - relative path to root ('' for root, '../' for sub-pages)
 */

// ── Google Analytics Integration ──
(function() {
    const GA_ID = 'G-CM23LZMT62';
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_ID);
})();

function loadHeader(basePath = '') {
    const headerHTML = `
    <nav class="container mx-auto px-6 py-5 flex justify-between items-center max-w-7xl">
        <!-- Logo -->
        <a href="${basePath}index.html" class="nav-logo" aria-label="Kalana Sahan - Home">
            K.S.D
        </a>

        <!-- Desktop Nav -->
        <ul class="hidden md:flex items-center gap-8" role="list">
            <li><a href="${basePath}index.html" class="nav-link">Home</a></li>
            <li><a href="${basePath}index.html#about" class="nav-link">About</a></li>
            <li><a href="${basePath}index.html#skills" class="nav-link">Skills</a></li>
            <li>
                <a href="${basePath}zentix.html" class="nav-link" style="background: linear-gradient(135deg, #a855f7, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600;">
                    ✦ Zentix
                </a>
            </li>
            <li><a href="${basePath}projects.html" class="nav-link">Projects</a></li>
            <li>
                <a href="${basePath}index.html#contact" class="nav-cta" id="nav-contact-btn">
                    Contact
                </a>
            </li>
        </ul>

        <!-- Mobile Hamburger -->
        <button id="mobile-menu-btn" class="md:hidden text-2xl text-gray-400 hover:text-white focus:outline-none transition-colors z-50" aria-label="Open navigation menu" aria-expanded="false">
            <i class="fas fa-bars" id="menu-icon"></i>
        </button>
    </nav>
    `;

    const header = document.getElementById('main-header');
    if (header) {
        header.innerHTML = headerHTML;

        // Scroll effect
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 30;
            header.classList.toggle('scrolled', scrolled);

            // Update scroll progress
            const prog = document.getElementById('scroll-progress');
            if (prog) {
                const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
                const percent = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
                prog.style.width = percent + '%';
            }
        });

        // Mobile menu toggle
        const btn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        if (btn && mobileNav) {
            btn.addEventListener('click', () => {
                const isOpen = mobileNav.classList.toggle('open');
                btn.setAttribute('aria-expanded', isOpen);
                const icon = document.getElementById('menu-icon');
                if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            });
        }
    }
}

function loadFooter(basePath = '') {
    const year = new Date().getFullYear();
    const footerHTML = `
        <div class="container mx-auto px-6 max-w-6xl">
            <div class="flex flex-col md:flex-row justify-between items-center gap-8">
                <!-- Brand -->
                <div class="text-center md:text-left">
                    <div class="text-2xl font-heading font-bold nav-logo mb-1">K.S.D</div>
                    <p class="text-gray-500 text-sm">Kalana Sahan Dillimuni</p>
                    <p class="text-gray-600 text-xs mt-1">Web Developer · App Dev · Designer</p>
                    <p class="text-gray-600 text-xs mt-1">Founder of <a href="${basePath}zentix.html" class="text-purple-400 hover:text-purple-300 transition-colors">Zentix</a></p>
                </div>

                <!-- Quick Links -->
                <div class="text-center">
                    <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
                        <a href="${basePath}index.html" class="hover:text-white transition-colors">Home</a>
                        <a href="${basePath}index.html#about" class="hover:text-white transition-colors">About</a>
                        <a href="${basePath}zentix.html" class="hover:text-purple-400 transition-colors text-purple-500">Zentix</a>
                        <a href="${basePath}projects.html" class="hover:text-white transition-colors">Projects</a>
                        <a href="${basePath}index.html#contact" class="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>

                <!-- Socials -->
                <div class="flex gap-3">
                    <a href="${typeof SITE_LINKS !== 'undefined' ? SITE_LINKS.facebook : 'https://web.facebook.com/kalanasahanofficial'}" target="_blank" rel="noopener noreferrer" class="footer-social" aria-label="Personal Facebook"><i class="fab fa-facebook"></i></a>
                    <a href="${typeof SITE_LINKS !== 'undefined' ? SITE_LINKS.instagram : 'https://www.instagram.com/kalana._.sahan/'}" target="_blank" rel="noopener noreferrer" class="footer-social" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="${typeof SITE_LINKS !== 'undefined' ? SITE_LINKS.linkedin : 'https://www.linkedin.com/in/kalanasahan'}" target="_blank" rel="noopener noreferrer" class="footer-social" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    <a href="${typeof SITE_LINKS !== 'undefined' ? SITE_LINKS.github : 'https://github.com/kaali-k'}" target="_blank" rel="noopener noreferrer" class="footer-social" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    <a href="${typeof SITE_LINKS !== 'undefined' ? SITE_LINKS.youtube : 'https://www.youtube.com/@Part_of_kaali_life'}" target="_blank" rel="noopener noreferrer" class="footer-social" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                </div>
            </div>

            <div class="border-t border-white/5 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
                <p>© <span id="footerYear">${year}</span> Kalana Sahan Dillimuni. All rights reserved.</p>
                <p>Crafted with <span class="text-primary">♥</span> in Sri Lanka · Powered by Zentix spirit</p>
            </div>
        </div>
    `;

    const footer = document.getElementById('main-footer');
    if (footer) footer.innerHTML = footerHTML;
}
