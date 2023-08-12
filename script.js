let searchBtn = document.querySelector(".movie-input img");
let posterDiv = document.querySelector(".posters-div");
let loader = document.querySelector(".loader");
searchBtn.addEventListener('click', () => {
    let ApiKey = document.getElementById("apiInput").value.trim();
    let searchInput = document.getElementById("SearchInput");
    let url = `https://www.omdbapi.com/?s=${searchInput.value.trim()}&apikey=${ApiKey}`;
    posterDiv.innerHTML = "";
    loader.style.display = "block";
    getData(url);
    searchInput.value = ""; 
})

async function getData(url) {
    try {
        let ApiKey = document.getElementById("apiInput").value.trim();
        let response = await fetch(url);
        let data = await response.json();
        createUi(data.Search, ApiKey);
    } catch (data) {
        posterDiv.innerHTML = `Invalid API Key!`;
    }
}

function createUi(data, ApiKey) {
    loader.style.display = "none";
    posterDiv.innerHTML = "";
    let movieList = data;
    let cardNumber = 1;
    movieList.forEach((movie) => {
        let card = document.createElement("div");
        card.classList.add("single-card");
        cardInnerHtml = `<div class="poster">
                                <img src="${movie.Poster}" alt="${movie.Title}" />
                            </div>
                                <div class="Movie-details-div">
                                <div class="card-no">${cardNumber++}</div>
                                <div class="movie-details">
                                    <div class="text-details">
                                    <div class="movie-title">${movie.Title}</div>
                                <div class="Released-year">${movie.Year}</div>
                                </div>
                                <div class="more-details">more details...</div>
                                </div>
                            </div>`;
        card.innerHTML = cardInnerHtml;
        let moreDetailsElement = card.querySelector(".more-details");
        moreDetailsElement.addEventListener("click", () => {
        let MoviePageUrl = `https://www.imdb.com/title/${movie.imdbID}/`
        window.open(MoviePageUrl, "_blank");
        });
        posterDiv.appendChild(card);
    });
}


function autoType(elementClass, typingSpeed) {
    var thhis = $(elementClass);
    thhis.css({
        "position": "relative",
        "display": "inline-block"
    });
    thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
    thhis = thhis.find(".text-js");
    var text = thhis.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    thhis.text("|");
    setTimeout(function () {
        thhis.css("opacity", 1);
        thhis.prev().removeAttr("style");
        thhis.text("");
        for (var i = 0; i < amntOfChars; i++) {
        (function (i, char) {
            setTimeout(function () {
            newString += char;
            thhis.text(newString);
            }, i * typingSpeed);
        })(i + 1, text[i]);
        }
    }, 1500);
}

$(document).ready(function () {   
    autoType(".type-js", 200);
});