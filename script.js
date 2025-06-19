document.addEventListener('DOMContentLoaded', function() {
    const loaderPercentage = document.querySelector('.loader-percentage');
    
    // Create performance observer for real loading progress
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const totalResources = entries.length;
        const loadedResources = entries.filter(entry => entry.responseEnd > 0).length;
        const progress = Math.round((loadedResources / totalResources) * 100);
        
        loaderPercentage.textContent = `${progress}%`;
        
        if (progress >= 100) {
            document.body.classList.remove('loading');
            setTimeout(() => {
                document.getElementById('loader-wrapper').remove();
            }, 500);
        }
    });

    observer.observe({ entryTypes: ['resource'] });
});

window.addEventListener('load', function() {
    document.querySelector('.loader-percentage').textContent = '100%';
    document.body.classList.remove('loading');
});
