document.addEventListener('DOMContentLoaded', function() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');
    const apodContainer=document.getElementById('apod-container');

    const newYears = '1 Jan 2024';
    
    function countdown() {
        const newYearsDate = new Date(newYears);
        const currentDate = new Date();
        const seconds = (newYearsDate - currentDate) / 1000;
    
        const days = Math.floor(seconds / 3600 / 24);
        const hours = Math.floor(seconds / 3600) % 24;
        const mins = Math.floor((seconds / 60)) % 60;
        const secs = Math.floor(seconds) % 60;
    
        daysEl.innerHTML = days;
        hoursEl.innerHTML = hours;
        minsEl.innerHTML = mins;
        secsEl.innerHTML = secs;
        fetchAPOD();
    }
    function fetchAPOD() {
        const apiKey = 'iJQABZKG1VkHjhOHTMIpqoEYtD63IrIGmtgSANbR'; // Replace with your actual NASA API key
    
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.media_type === 'image' && data.url) {
                    // Set APOD image as the background image for the body
                    document.body.style.backgroundImage = `url('${data.url}')`;
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundPosition = 'center center';
                } else {
                    console.error('Invalid APOD data:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching APOD:', error);
            });
    }
    
    
    countdown();
    setInterval(countdown, 1000);
});
