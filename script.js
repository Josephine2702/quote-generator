const quoteContainer = document.querySelector('.quote-container'),
    quoteText = document.querySelector('#quote'),
    authorText = document.querySelector('#author'),
    twitterBtn = document.querySelector('#twitter'),
    newQuoteBtn = document.querySelector('.new-quote'),
    loader = document.querySelector('#loader');


let apiQuotes = [];

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
   
}

// hide loading 
function complite() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// shoe new quote
function newQuote(){
    loading();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown'; 
    } else {
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 100){
    quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complite();
}

// get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();


