/**
 * Sub-page helper: renders a full app/software detail page
 * Call renderAppDetail(config) from the page script
 */
function renderAppDetail(cfg) {
    const {
        title,
        subtitle = '',
        description = '',
        icon = '',
        iconAlt = '',
        iconBg = 'bg-gray-900',
        badges = [],
        downloadUrl = '',
        playStoreIcon = 'fab fa-google-play',
        starTip = '',
        protectWarning = '',
        secondaryDownloadUrl = '',
        secondaryDownloadLabel = 'Previous Version'
    } = cfg;

    const main = document.getElementById('main-content');
    if (!main) return;

    // ── Feature cards ──
    const featureHTML = features.map(f => `
        <div class="feature-item">
            <div class="feature-icon"><i class="${f.icon || 'fas fa-check'}"></i></div>
            <div>
                <div class="font-semibold text-white text-sm">${f.title}</div>
                <div class="text-gray-400 text-sm mt-0.5">${f.desc}</div>
            </div>
        </div>
    `).join('');

    // ── Screenshot gallery ──
    const screenshotHTML = screenshots.map(s => `
        <img src="${screenshotDir}${s.file}"
             alt="${s.alt}"
             class="app-screenshot flex-shrink-0 w-52 md:w-64 lg:w-72 cursor-pointer"
             onclick="openModal('${screenshotDir}${s.file}', '${s.alt.replace(/'/g, "\\'")}')"
             loading="lazy"
             onerror="this.style.display='none'">
    `).join('');

    // ── Tech badges ──
    const techHTML = tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

    // ── Category badges ──
    const badgeHTML = badges.map(b => `<span class="badge badge-${b.type || 'purple'}">${b.label}</span>`).join('');

    // ── Zentix branding badge ──
    const zentixBadge = isZentix
        ? `<a href="../../zentix.html" class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-colors">
               ✦ Zentix App
           </a>`
        : '';

    // ── Play Store button ──
    const playBtn = playStoreUrl ? `
        <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="social-btn social-btn-google">
            <i class="${playStoreIcon}"></i> ${playStoreLabel}
        </a>` : '';

    // ── Star tip ──
    const starTipHTML = starTip ? `
        <div class="mt-4 flex items-center gap-2 text-xs text-gray-500 opacity-80 italic">
            <i class="fas fa-star text-yellow-500/50"></i>
            <span>${starTip}</span>
        </div>` : '';

    // ── Download button ──
    const downloadBtn = downloadUrl ? `
        <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" class="btn-download bg-primary hover:scale-105 transition-transform">
            <i class="fas fa-cloud-download-alt"></i> ${downloadLabel}
        </a>` : '';

    const secondaryBtn = secondaryDownloadUrl ? `
        <a href="${secondaryDownloadUrl}" target="_blank" rel="noopener noreferrer" class="social-btn" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
            <i class="fas fa-history text-gray-400"></i> <span class="text-gray-300 font-medium">${secondaryDownloadLabel}</span>
        </a>` : '';

    // ── Play Protect / warning notice ──
    const warningHTML = protectWarning ? `
        <div class="mt-5 flex gap-3 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
            <i class="fas fa-shield-alt text-yellow-400 mt-0.5 flex-shrink-0"></i>
            <p class="text-yellow-200/80 text-sm leading-relaxed">${protectWarning}</p>
        </div>` : '';

    // ── Icon: support both image path and emoji/icon string ──
    const iconContent = icon
        ? `<img src="${icon}" alt="${iconAlt}" class="w-full h-full object-cover" loading="eager"
               onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-mobile-alt text-primary text-4xl\\'></i>'">`
        : `<i class="fas fa-mobile-alt text-primary text-4xl"></i>`;

    main.innerHTML = `
    <section class="container mx-auto px-6 max-w-4xl">

        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="../../index.html">Home</a>
            <span class="breadcrumb-sep">/</span>
            <a href="../../projects.html">Projects</a>
            <span class="breadcrumb-sep">/</span>
            <a href="${backUrl}">${backLabel.replace('Back to ', '')}</a>
            <span class="breadcrumb-sep">/</span>
            <span class="text-white">${title}</span>
        </nav>

        <!-- App Header card -->
        <div class="app-detail-card p-8 md:p-10 mb-8" data-aos="fade-up">
            <div class="flex flex-col sm:flex-row items-start gap-6">

                <!-- App icon -->
                <div class="flex-shrink-0 w-24 h-24 ${iconBg} rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 shadow-xl">
                    ${iconContent}
                </div>

                <!-- Info -->
                <div class="flex-1">
                    <div class="flex flex-wrap items-center gap-2 mb-1">
                        <h1 class="text-3xl font-heading font-bold text-white">${title}</h1>
                        ${zentixBadge}
                    </div>
                    ${subtitle ? `<p class="text-secondary text-sm font-semibold mb-3">${subtitle}</p>` : ''}
                    <p class="text-gray-300 leading-relaxed mb-4">${description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">${badgeHTML}</div>
                    <div class="flex flex-wrap gap-3">
                        ${downloadBtn}
                        ${secondaryBtn}
                        ${playBtn}
                    </div>
                    ${starTipHTML}
                    ${warningHTML}
                </div>
            </div>
        </div>

        <!-- Body sections -->
        <div class="glass-card rounded-2xl p-8 md:p-10 space-y-10" data-aos="fade-up" data-aos-delay="100">

            ${features.length ? `
            <!-- Key Features -->
            <div>
                <h2 class="font-heading font-bold text-white text-xl mb-5 flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-star text-primary text-xs"></i>
                    </span>
                    Key Features
                </h2>
                <div class="grid sm:grid-cols-2 gap-3">${featureHTML}</div>
            </div>` : ''}

            ${screenshots.length ? `
            <!-- Screenshots -->
            <div>
                <h2 class="font-heading font-bold text-white text-xl mb-5 flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-images text-secondary text-xs"></i>
                    </span>
                    Screenshots
                </h2>
                <div class="image-gallery-scroll flex gap-4 pb-2">
                    ${screenshotHTML}
                </div>
                <p class="text-gray-500 text-xs mt-3 text-center">← Scroll to see all screenshots · Click to enlarge →</p>
            </div>` : ''}

            ${tech.length ? `
            <!-- Tech Stack -->
            <div>
                <h2 class="font-heading font-bold text-white text-xl mb-4 flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-layer-group text-primary text-xs"></i>
                    </span>
                    Technology Stack
                </h2>
                <div class="flex flex-wrap gap-2">${techHTML}</div>
            </div>` : ''}

        </div>

        <!-- Back button -->
        <div class="text-center mt-10" data-aos="fade-up">
            <a href="${backUrl}" class="btn-outline">
                <i class="fas fa-arrow-left"></i> ${backLabel}
            </a>
        </div>

    </section>`;

    // Re-init AOS for dynamically injected content
    if (typeof AOS !== 'undefined') AOS.refresh();
}

// ── Image modal lightbox ──
function openModal(src, alt) {
    let modal = document.getElementById('img-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'img-modal';
        modal.className = 'fixed inset-0 z-[200] flex items-center justify-center modal-overlay';
        modal.innerHTML = `
            <div class="relative p-4 modal-content max-h-screen overflow-auto" id="modal-inner">
                <button onclick="closeModal()"
                    class="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white text-lg transition-colors z-10"
                    aria-label="Close image">
                    <i class="fas fa-times"></i>
                </button>
                <img id="modal-img" class="modal-image" src="" alt="">
                <p id="modal-caption" class="text-gray-400 text-xs text-center mt-3"></p>
            </div>`;
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
        document.body.appendChild(modal);
    }
    document.getElementById('modal-img').src = src;
    document.getElementById('modal-img').alt = alt;
    document.getElementById('modal-caption').textContent = alt;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('img-modal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
}

// Keyboard close
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
