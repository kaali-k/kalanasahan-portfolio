/**
 * SITE LINKS CONFIGURATION
 * Update your links here, and they will automatically update across all pages.
 */
const SITE_LINKS = {
    // Personal Links
    facebook: "https://web.facebook.com/kalanasahanofficial",
    instagram: "https://www.instagram.com/kalana._.sahan/",
    linkedin: "https://www.linkedin.com/in/kalanasahan",
    github: "https://github.com/kaali-k",
    youtube: "https://www.youtube.com/@Part_of_kaali_life",
    tiktok: "https://www.tiktok.com/@part_of_kaali_life",

    // Zentix Links
    zentixPlayStore: "https://play.google.com/store/apps/dev?id=8379321856662439375",
    zentixFacebook: "https://web.facebook.com/profile.php?id=61584803565063",
    zentixEmail: "mailto:zentixteamofficial@gmail.com"
};

// Automatically update statically written links that have the data-social attribute
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[data-social]').forEach(el => {
        const platform = el.getAttribute('data-social');
        if (SITE_LINKS[platform]) {
            el.href = SITE_LINKS[platform];
        }
    });
});
