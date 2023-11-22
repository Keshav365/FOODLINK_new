
// Array
var newsDataArr = [];

// apis 
const API_KEY = "f361511f02ad4a1ea7cb5be0f92fe70a";
const HEADLINES_NEWS = "https://newsapi.org/v2/everything?q=food&apiKey=";


window.onload = function() {
    newsType.innerHTML="<h2 class = 'three'>Food Related Top Headlines</h2>";
    fetchHeadlines();
};

count = 0;
const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
    count = count+1;
    if(count == 9){
        break
    }
}

function displayNews() {
    var newsContainer = document.querySelector('.box-wrap'); // Assuming you have a container div with the class 'box-wrap'

    // If the container div is not found, you can create it dynamically
    if (!newsContainer) {
        newsContainer = document.createElement('div');
        newsContainer.className = 'box-wrap';
        document.body.appendChild(newsContainer); // Append it to the body or any other container
    }

    newsContainer.innerHTML = ""; // Clear existing content

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className = "col-lg-4 col-md-6"; // Assuming you want each news item in a column

        var boxWrap = document.createElement('div');
        boxWrap.className = "box-wrap";

        var icon = document.createElement('div');
        icon.className = "icon";
        icon.innerHTML = '<i class="fas fa-user-tie"></i>';

        var number = document.createElement('h4');
        number.className = "number";
        number.innerHTML = "01";

        var title = document.createElement('h4');
        title.innerHTML = `<a href="${news.url}">${news.title}</a>`;

        var description = document.createElement('p');
        description.innerHTML = news.description;

        var readMoreLink = document.createElement('a');
        readMoreLink.className = "read";
        readMoreLink.href = news.url;
        readMoreLink.innerHTML = "Read more";

        boxWrap.appendChild(icon);
        boxWrap.appendChild(number);
        boxWrap.appendChild(title);
        boxWrap.appendChild(description);
        boxWrap.appendChild(readMoreLink);

        col.appendChild(boxWrap);

        newsContainer.appendChild(col);
    });
}

