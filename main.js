
// get Quote from API
async function getQuote(){
    apiUrl = "https://google-translate1.p.rapidapi.com/language/translate/v2";
    
    fetch(apiUrl, {
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "accept-encoding": "application/gzip",
            "x-rapidapi-key": "b918db8e8emsh9b2401c7363cdcep103ebcjsn4f0d16c5ea33",
            "x-rapidapi-host": "google-translate1.p.rapidapi.com"
        },
        "body": {
            "q": "Hello, world!",
            "source": "en",
            "target": "ar"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });

} 


// on Load
getQuote();