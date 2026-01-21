/**
 * Header and Footer Loader
 * Loads the same header and footer across all pages.
 * @param {string} basePath - The relative path to the root directory (e.g. '', '../', '../../')
 */
function loadHeader(basePath = '') {
    const headerHTML = `
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        <!-- Logo Link -->
        <a href="${basePath}index.html" class="text-2xl font-bold text-primary hover:text-secondary transition duration-300">K.S.D</a>

        <!-- Desktop Navigation -->
        <ul class="hidden md:flex space-x-8 items-center">
            <li><a href="${basePath}index.html" class="hover:text-primary transition duration-300 font-medium">Home</a></li>
            <li><a href="${basePath}index.html#about" class="hover:text-primary transition duration-300 font-medium">About</a></li>
            <li><a href="${basePath}index.html#skills" class="hover:text-primary transition duration-300 font-medium">Skills</a></li>
            <!-- Link to the separate projects page -->
            <li><a href="${basePath}projects.html" class="text-white bg-gradient-to-r from-primary to-secondary py-2 px-5 rounded-full hover:opacity-90 transition duration-300 font-semibold shadow-lg shadow-primary/30">View Projects</a></li>
            <li><a href="${basePath}index.html#contact" class="hover:text-primary transition duration-300 font-medium">Contact</a></li>
        </ul>

        <!-- Mobile Menu Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden focus:outline-none text-lighttext hover:text-primary text-2xl z-50">
            <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
    </nav>
    
    <!-- Mobile Menu overlay injected separately via Alpine often, but we can put links here -->
    <div x-show="mobileMenuOpen"
         x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0 transform -translate-y-full"
         x-transition:enter-end="opacity-100 transform translate-y-0"
         x-transition:leave="transition ease-in duration-200"
         x-transition:leave-start="opacity-100 transform translate-y-0"
         x-transition:leave-end="opacity-0 transform -translate-y-full"
         class="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center space-y-6 md:hidden"
         @click.away="mobileMenuOpen = false" style="display: none;">
            <a href="${basePath}index.html" @click="mobileMenuOpen = false" class="text-2xl hover:text-primary transition duration-300">Home</a>
            <a href="${basePath}index.html#about" @click="mobileMenuOpen = false" class="text-2xl hover:text-primary transition duration-300">About</a>
            <a href="${basePath}index.html#skills" @click="mobileMenuOpen = false" class="text-2xl hover:text-primary transition duration-300">Skills</a>
            <a href="${basePath}projects.html" @click="mobileMenuOpen = false" class="text-2xl text-white bg-gradient-to-r from-primary to-secondary py-2 px-5 rounded-full hover:opacity-90 transition duration-300 font-semibold">View Projects</a>
            <a href="${basePath}index.html#contact" @click="mobileMenuOpen = false" class="text-2xl hover:text-primary transition duration-300">Contact</a>
    </div>
    `;

    const header = document.getElementById('main-header');
    if (header) {
        header.innerHTML = headerHTML;
        // Re-init Alpine for the new content if needed, but since Alpine initializes on load, 
        // putting x-data on the body usually handles the state, but x-show inside injected HTML might need care.
        // Actually, for simplicity in a static site with Alpine, it's safer if the wrapper has x-data.
    }
}

function loadFooter(basePath = '') {
    const year = new Date().getFullYear();
    const footerHTML = `
        <div class="container mx-auto px-6 text-center">
            <div class="mb-6">
                <p class="text-gray-400 mb-4 text-lg">Follow Me</p>
                <div class="flex justify-center items-center space-x-5 md:space-x-6">
                     <a href="https://web.facebook.com/kalana.sahan.79" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-primary transition duration-300 text-2xl"><i class="fab fa-facebook"></i></a>
                     <a href="https://www.instagram.com/kalana._.sahan/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-primary transition duration-300 text-2xl"><i class="fab fa-instagram"></i></a>
                     <a href="https://www.linkedin.com/in/kalanasahan" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-primary transition duration-300 text-2xl"><i class="fab fa-linkedin"></i></a>
                     <a href="https://www.youtube.com/@Part_of_kaali_life" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-primary transition duration-300 text-2xl"><i class="fab fa-youtube"></i></a>
                     <a href="https://www.tiktok.com/@part_of_kaali_life" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-primary transition duration-300 text-2xl"><i class="fab fa-tiktok"></i></a>
                     <a href="https://github.com/kaali-k" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-primary transition duration-300 text-2xl"><i class="fab fa-github"></i></a>
                </div>
            </div>
            <p>&copy; <span id="currentYear">${year}</span> Kalana Sahan Dillimuni. All Rights Reserved.</p>
             <p class="text-sm mt-2">Designed with <i class="fas fa-heart text-primary"></i> using Tailwind CSS & Alpine.js</p>
        </div>
    `;
    
    const footer = document.getElementById('main-footer');
    if (footer) {
        footer.innerHTML = footerHTML;
    }
}
