function resetAutoAdjustSpanStyles() {
  let spans = document.querySelectorAll(".countdown");
  spans.forEach(function (span) {
    // Reset styling to initial CSS values
    span.style.display = "inline-block";
    span.style.whiteSpace = "normal";
    span.style.padding = "0";
    span.style.fontSize = "100px";
  });
}

// Function to check and adjust text wrapping for elements with the class 'auto-adjust-span'
function checkAndAdjustTextWrapping() {
  // Get all elements with the class 'auto-adjust-span'
  let elements = document.querySelectorAll(".countdown");

  elements.forEach(function (element) {
    // Get the font size of the text in the element
    let fontSize = parseInt(window.getComputedStyle(element).fontSize);

    // Check if text is wrapping with a 20% tolerance
    let isWrapping = element.offsetHeight > fontSize * 1.2;

    // Adjust font size if text is wrapping
    if (isWrapping) {
      // Reduce font size by 1px
      element.style.fontSize = fontSize - 1 + "px";
      // Call the function recursively to recheck text wrapping after font size adjustment
      checkAndAdjustTextWrapping();
    }
  });
}

function setMinFontSize() {
  let elements = document.querySelectorAll(".countdown");
  let fontSizes = [];

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let computedFontSize = window
      .getComputedStyle(element)
      .getPropertyValue("font-size");
    fontSizes.push(parseFloat(computedFontSize));
  }

  if (fontSizes.length > 0) {
    let minFontSize = Math.min.apply(null, fontSizes);

    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontSize = minFontSize + "px";
    }
  }
}

// Call the function to reset styles initially
resetAutoAdjustSpanStyles();

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
    const days = Math.floor(distance / (1000 * 60 * 60) / 24);
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    // const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days}d ${hours}h ${minutes}m`;
    // Call the function initially for all elements with the class 'auto-adjust-span'
    checkAndAdjustTextWrapping();
    // Call the function with the desired class name
    setMinFontSize();
  }
  updateCountdown();
  setInterval(updateCountdown, 5000);
}

// Update countdowns
startCountdown("2024-01-23T23:59:59", "countdown1");
startCountdown("2024-03-31T23:59:59", "countdown2");
startCountdown("2024-05-25T23:59:59", "countdown3");
startCountdown("2024-05-04T23:59:59", "countdown4");

// Add event listener for the resize event to reset styles and then update wrapping status and adjust font size on content resizing
window.addEventListener("resize", function () {
  // Reset styles first
  resetAutoAdjustSpanStyles();
  // Call the function to update widths on resizing
  checkAndAdjustTextWrapping();
  // Call the function to set minimum font size for elements with the specified class name
  setMinFontSize(); // Replace "yourClassName" with the actual class name
});

// Get the HTML elements by their IDs
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Add an event listener to the form
searchForm.addEventListener("submit", function (event) {
  // Prevent the default behavior of the form
  event.preventDefault();

  // Get the user input from the input field
  const userInput = searchInput.value;

  // Check if the input is not empty
  if (userInput) {
    // Encode the user input as a component of a URL
    const encodedInput = encodeURIComponent(userInput);

    // Construct the Perplexity search URL with the encoded input
    const perplexityURL = `https://www.perplexity.ai/?q=${encodedInput}`;

    // Open the Perplexity search in a new tab
    window.open(perplexityURL, "_blank");
  }
});
