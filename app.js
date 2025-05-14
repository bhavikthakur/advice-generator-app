// All variables
const dice = document.querySelector(".card__dice-wrapper");
const diceImg = document.querySelector(".card__dice");
const card = document.querySelector(".card");
const id = document.querySelector(".card__index");
const advice = document.querySelector(".card__description");
let rotation = 0;
let isFetching = false;

// Function to get the result
async function adviceGenerator() {
  // Prevent multiple simultaneous requests
  if (isFetching) return;

  try {
    isFetching = true;
    dice.disabled = true;
    dice.classList.add("loading");
    const url = "https://api.adviceslip.com/advice";
    const response = await fetch(url);

    // Condition for HTTP errors (404, 500, etc.)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Update UI and rotate if we got valid data
    card.classList.add("active");
    id.innerText = result.slip.id;
    advice.innerText = result.slip.advice;
    rotation += 180;
    diceImg.style.transform = `rotate(${rotation}deg)`;
  } catch (error) {
    let message;
    if (error.message.includes("Failed to fetch")) {
      message = "Network error - Check internet connection";
    } else if (error instanceof TypeError) {
      message = "Invalid request setup";
    } else {
      message = `Error: ${error.message}`;
    }
    advice.innerText = message;
    advice.style.color = "hsl(1, 83%, 63%)";
    card.classList.add("active");
  } finally {
    isFetching = false;
    dice.disabled = false;
    dice.classList.remove("loading");
  }
}

// Event listeners
dice.addEventListener("click", adviceGenerator);
window.addEventListener("load", adviceGenerator);
