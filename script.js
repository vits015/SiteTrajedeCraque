// ===== PRODUCTS DATA - Replace with your actual products =====
const products = [
    {
        id: 1,
        name: "Camisa Flamengo",
        placeholder_img: "assets/img/flamengo.jpg",
        preco: "R$ 159,90",
        descricao_curta: "Camisa oficial do Flamengo, tecido premium e bordado de qualidade."
    },
    // {
    //     id: 2,
    //     name: "Camisa Real Madrid",
    //     placeholder_img: "Assets/img/camisa-real-madrid.png",
    //     preco: "R$ 159,90",
    //     descricao_curta: "Camisa do Real Madrid temporada atual, material respirável e design autêntico."
    // },
    // {
    //     id: 3,
    //     name: "Camisa Barcelona",
    //     placeholder_img: "Assets/img/camisa-barcelona.png",
    //     preco: "R$ 159,90",
    //     descricao_curta: "Camisa do FC Barcelona, qualidade premium com tecnologia Dri-FIT."
    // },
    // {
    //     id: 4,
    //     name: "Camisa PSG",
    //     placeholder_img: "Assets/img/camisa-psg.png",
    //     preco: "R$ 159,90",
    //     descricao_curta: "Camisa do Paris Saint-Germain, design moderno e conforto excepcional."
    // },
    // {
    //     id: 5,
    //     name: "Camisa Manchester City",
    //     placeholder_img: "Assets/img/camisa-manchester-city.png",
    //     preco: "R$ 159,90",
    //     descricao_curta: "Camisa do Manchester City, tecido de alta performance e acabamento perfeito."
    // },
    // {
    //     id: 6,
    //     name: "Camisa Liverpool",
    //     placeholder_img: "Assets/img/camisa-liverpool.png",
    //     preco: "R$ 159,90",
    //     descricao_curta: "Camisa do Liverpool FC, material premium e design icônico dos Reds."
    // }
];

// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const scrollProgress = document.getElementById('scrollProgress');
//const themeToggle = document.getElementById('themeToggle');
const productsGrid = document.getElementById('productsGrid');
const navLinks = document.querySelectorAll('.nav-link');

// ===== SCROLL PROGRESS BAR =====
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

// ===== HEADER SCROLL EFFECT =====
function updateHeader() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== THEME TOGGLE =====
// function toggleTheme() {
//     const currentTheme = document.documentElement.getAttribute('data-theme');
//     const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
//     document.documentElement.setAttribute('data-theme', newTheme);
//     themeToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
    
//     // Save theme preference
//     localStorage.setItem('theme', newTheme);
// }

// ===== POPULATE PRODUCTS =====
function populateProducts() {
    productsGrid.innerHTML = products.map(product => `
        <a href="https://www.instagram.com/trajedecraquefc" target="_blank" rel="noopener noreferrer" class="product-card-link">
            <div class="product-card">
                <img src="${product.placeholder_img}" alt="${product.name}" class="product-image" loading="lazy">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.preco}</div>
                <p class="product-description">${product.descricao_curta}</p>
            </div>
        </a>
    `).join('');
}

// ===== REQUEST PRODUCT =====
function requestProduct(productName) {
    // Simulate purchase animation
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Processando...';
    button.style.background = '#4CAF50';
    
    setTimeout(() => {
        // Open phone call
        window.location.href = `tel:71987494504`;
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }, 1000);
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== INITIALIZE =====
function init() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'light' ? '☀️' : '🌙';
    
    // Populate products
    populateProducts();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Observe sections for animations
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Event listeners
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateHeader();
        updateActiveNavLink();
    });
    
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initial calls
    updateScrollProgress();
    updateHeader();
    updateActiveNavLink();
}

// ===== START APPLICATION =====
document.addEventListener('DOMContentLoaded', init);

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollProgress();
            updateHeader();
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);