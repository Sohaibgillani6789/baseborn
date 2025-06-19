document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    const progressElement = document.querySelector('.loading-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20);
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                preloader.classList.add('fade-out');
                content.classList.add('loaded');
                
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
        
        progressElement.textContent = progress;
    }, 200);
});

// Track actual page load
window.addEventListener('load', () => {
    const progress = document.getElementById('progress');
    progress.textContent = '100';
});
