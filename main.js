const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const newWallpaperBtn = document.getElementById("new-wallpaper");

// Error counter
let errorCount = 0;

// get Quote from API
async function getQuote() {
  proxyUrl = "https://cors-anywhere.herokuapp.com/";
  apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  // Maximum error allowed
  if (errorCount >= 7) {
    quoteText.innerText =
      "Sorry, Looks Like Something Went Wrong Please try again later ";
  } else {
    try {
      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();
      // check if Author Is Unknown
      if (data.quoteAuthor == "") {
        authorText.innerText = "- Unkonwn";
      } else {
        authorText.innerText = `- ${data.quoteAuthor}`;
      }
      // reduce font Size for Long Quotes
      if (data.quoteText.length > 120) {
        quoteText.classList.add("long-quote");
      } else {
        quoteText.classList.remove("long-quote");
      }
      quoteText.innerText = data.quoteText;
    } catch (error) {
      getQuote();
      errorCount++;
      console.log(errorCount);
      console.log(`Something went Wrong.`, error);
    }
  }
}

// Get Image from Unsplash API

async function getImage(){
    const apiKey = "API_KEY";
    const category = "coffee";
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=${category}`;

    try{
     const response = await fetch(apiUrl);
     const data = await response.json();    
     const imgUrl = data.urls.regular;
     console.log(imgUrl);
     document.body.style.backgroundImage = `url(${imgUrl})`;
    }
    catch(error){
        console.log(error)
    }

}

// tweet it
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} ${author} &hashtags=Quote`;
  window.open(tweetUrl, "_blank");
}


// New Quote Button
newQuoteBtn.addEventListener("click", () => {
  getQuote();
  errorCount = 0;
});

// tweet Button
twitterBtn.addEventListener("click", tweetQuote);

//New wallpaper Btn
newWallpaperBtn.addEventListener("click", getImage);

// on Load
getQuote();

getImage();