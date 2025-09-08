document.addEventListener('DOMContentLoaded', () => {
    const disclaimerModal = document.getElementById('disclaimer-modal');
    const acceptButton = document.getElementById('accept-disclaimer');
    const searchInput = document.getElementById('search-input');
    const resourceCards = document.querySelectorAll('.resource-card');
    const resourceSections = document.querySelectorAll('.resource-section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const hasAcceptedDisclaimer = localStorage.getItem('disclaimerAccepted');
    if (hasAcceptedDisclaimer) {
        disclaimerModal.classList.add('hidden');
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('disclaimerAccepted', 'true');
        disclaimerModal.classList.add('hidden');
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        resourceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('highlight');
                setTimeout(() => card.classList.remove('highlight'), 500);
            } else if (searchTerm === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        resourceSections.forEach(section => {
            const visibleCards = section.querySelectorAll('.resource-card:not([style*="display: none"])');
            if (visibleCards.length === 0 && searchTerm !== '') {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offset = 80;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                targetSection.classList.add('section-highlight');
                setTimeout(() => targetSection.classList.remove('section-highlight'), 1000);
            }
        });
    });

    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('href');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            animation: highlightPulse 0.5s ease;
        }
        
        .section-highlight {
            animation: sectionPulse 1s ease;
        }
        
        @keyframes highlightPulse {
            0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(49, 130, 206, 0.7);
            }
            50% {
                transform: scale(1.02);
                box-shadow: 0 0 20px 10px rgba(49, 130, 206, 0.3);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(49, 130, 206, 0);
            }
        }
        
        @keyframes sectionPulse {
            0% {
                background-color: transparent;
            }
            50% {
                background-color: rgba(99, 179, 237, 0.1);
            }
            100% {
                background-color: transparent;
            }
        }
    `;
    document.head.appendChild(style);

    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, false);

    nav.style.transition = 'transform 0.3s ease';

    console.log('Medical Resources Guide loaded successfully');
});