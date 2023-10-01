const quotesJSON = [
  '"Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle."',
  '"Success is not final, failure is not fatal: It is the courage to continue that counts."',
  '"The only way to do great work is to love what you do."',
  `"Don't watch the clock; do what it does. Keep going."`,
  '"You are never too old to set another goal or to dream a new dream."',
  '"You are never too old to set another goal or to dream a new dream."'
];

// Get the container element where you want to display the quotes
const quoteContainer = document.getElementById('quote-container');

// Loop through the quotes and create a <p> element for each one
quotesJSON.forEach(quote => {
  const listItem = document.createElement('li');
  listItem.textContent = quote;
  quoteContainer.appendChild(listItem);
});

function displayTimeAndDate() {
  const datetimeElement = document.getElementById('datetime');
  const now = new Date();

  const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      timeZoneName: 'short' 
  };

  const formattedDatetime = now.toLocaleDateString('en-US', options);
  datetimeElement.textContent = formattedDatetime;
}

// Call the function to display the time and date immediately
displayTimeAndDate();

// Update the time and date every second (1000 milliseconds)
setInterval(displayTimeAndDate, 1000);


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
      const days = Math.floor((distance/(1000*60*60))/24);
      const hours = Math.floor((distance/(1000*60*60))%24);
      // const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  
      countdown.innerHTML = `${days} Days, ${hours} Hours, ${minutes} Minutes`;
    }
    updateCountdown();
    setInterval(updateCountdown, 3000);
    }

    
    // Update countdowns
      startCountdown('2024-01-23T23:59:59', 'countdown1');
      startCountdown('2024-03-31T23:59:59', 'countdown2');
      startCountdown('2024-06-03T23:59:59', 'countdown3');
      startCountdown('2024-05-04T23:59:59', 'countdown4');

