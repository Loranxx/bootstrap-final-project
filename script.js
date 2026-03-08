document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. PRELOADER & BOOT SEQUENCE
    // ==========================================
    const preloader = document.getElementById('preloader');
    const bootText = document.getElementById('boot-text');
    const messages = [
        "INITIALIZING CORE...",
        "CONNECTING NEURAL PATHWAYS...",
        "LOADING SAAS MODULES...",
        "CALIBRATING VISUAL DATA...",
        "SYSTEM ONLINE."
    ];
    
    let msgIndex = 0;
    
    const bootInterval = setInterval(() => {
        msgIndex++;
        if(msgIndex < messages.length) {
            bootText.innerText = messages[msgIndex];
        } else {
            clearInterval(bootInterval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Initialize AOS after preloader
                AOS.init({
                    duration: 800,
                    easing: 'ease-out-cubic',
                    once: true,
                    offset: 50
                });
            }, 600);
        }
    }, 500);

    // ==========================================
    // 2. THEME SWITCHER
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check local storage (default to dark for LORANXX Vibe)
    const savedTheme = localStorage.getItem('loranxx-saas-theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = (savedTheme === 'dark');

    themeToggle.addEventListener('change', () => {
        if(themeToggle.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('loranxx-saas-theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('loranxx-saas-theme', 'light');
        }
    });

    // ==========================================
    // 3. SCROLL EFFECTS & NAVBAR
    // ==========================================
    const navbar = document.getElementById('main-navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Navbar glass effect
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress
        const scrolledPct = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrolledPct + "%";

        // Back to top button
        if (scrollTop > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // 4. BOOTSTRAP PLUGINS INIT
    // ==========================================
    // Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

    // Popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].map(el => new bootstrap.Popover(el));

    // Toasts
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('liveToast');
    if (toastTrigger) {
        toastTrigger.addEventListener('click', () => {
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
        });
    }

    // ==========================================
    // 5. ENTERPRISE CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('aiContactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isDark = body.getAttribute('data-theme') === 'dark';
            
            Swal.fire({
                title: 'Transmission Secured',
                text: 'Your payload has been delivered to the engineering team.',
                icon: 'success',
                background: isDark ? '#0d1b2a' : '#ffffff',
                color: isDark ? '#f8f9fa' : '#0f172a',
                confirmButtonColor: '#00b4d8',
                confirmButtonText: 'Acknowledge',
                customClass: {
                    popup: isDark ? 'border border-secondary border-opacity-50' : 'border border-light shadow-lg',
                    title: 'font-monospace'
                }
            });

            contactForm.reset();
        });
    }

    // AI Assistant Button Interaction
    const aiBtn = document.getElementById('aiAssistant');
    aiBtn.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        
        Swal.fire({
            title: 'Agent Loranxx Online',
            text: 'System metrics indicate optimal efficiency. Would you like to view the enterprise documentation?',
            icon: 'info',
            background: isDark ? '#0d1b2a' : '#ffffff',
            color: isDark ? '#f8f9fa' : '#0f172a',
            confirmButtonColor: '#00b4d8',
            confirmButtonText: 'Access Docs'
        });
    });
});

// ==========================================
// 6. GLOBAL FUNCTIONS
// ==========================================

function activateSystem() {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

// Opens the specific image in a large SaaS-style preview modal
function openModal(imgSrc, title) {
    const modalTitle = document.getElementById('galleryModalTitle').querySelector('span');
    const modalImg = document.getElementById('galleryModalImg');
    
    modalTitle.innerText = title;
    
    // Set src, use placeholder fallback on error mapping directly to image names
    modalImg.src = imgSrc;
    modalImg.onerror = function() {
        this.src = `https://via.placeholder.com/1200x800/0d1b2a/00b4d8?text=${imgSrc}`;
    };

    const myModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    myModal.show();
}