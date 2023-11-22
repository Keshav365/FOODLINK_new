// Array
var newsDataArr = [];

// apis 
const API_KEY = "f361511f02ad4a1ea7cb5be0f92fe70a";
const HEADLINES_NEWS = "https://newsapi.org/v2/everything?q=\"Food Shortage\"&apiKey=";
// const HEADLINES_NEWS = "https://newsapi.org/v2/everything?q=\"food shelter India\"&apiKey=";
const PAGE_SIZE = 9; // Set the number of articles to fetch per request

window.onload = function () {
    fetchHeadlines();
};

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS + API_KEY + `&pageSize=${PAGE_SIZE}`);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const newsContainer = document.getElementById('newsContainer');

function displayNews() {
    newsContainer.innerHTML = "";

    newsDataArr.forEach(news => {
        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className = "col-12 p-4 card";
       
        var card = document.createElement('div');
        card.className = "p-2";
        card.style.marginBottom = "40px";
        

        var image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "45%");
        image.src = news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className = "text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsContainer.appendChild(col);
    });
}
