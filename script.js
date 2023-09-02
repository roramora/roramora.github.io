function startCountdown(targetDate, elementId) {
    const countdown = document.getElementById(elementId);
  
    if (!countdown) {
      console.error(`Element with ID '${elementId}' not found.`);
      return;
    }
    function updateCountdown() {
      const now = new Date().getTime();
      const targetTime = new Date(targetDate).getTime();
      const distance = targetTime - now;
      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      // const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      countdown.innerHTML = `${hours}h ${minutes}m`;
    }
    updateCountdown();
    setInterval(updateCountdown, 5000);
    }
    
    // Update countdowns
      startCountdown('2024-01-23T23:59:59', 'countdown1');
      startCountdown('2024-04-05T23:59:59', 'countdown2');
      startCountdown('2024-06-03T23:59:59', 'countdown3');
      startCountdown('2024-05-06T23:59:59', 'countdown4');