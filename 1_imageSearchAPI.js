 // use link developersAPI of unsplashed
const accessKey = "40QAwjfEEfhqCgUUIYZssVOzmz2mqHAHqRWGKCtLU34";



// target form & image searchInput , searchAnchorTag & button.
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button");

let inputData = ""
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();console.log(data)

    // console.log(data)
    const results = data.results;


    if (page === 1) {
        searchResults.innerHTML = "";
    }

      results.map((res) => {
        //create new div tag
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        //create new image tag
        const image = document.createElement("img");
        image.src = res.urls.small;
        image.alt = res.alt_description;
        //create new anchor tag
        const imageLink = document.createElement("a");
        imageLink.href = res.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = res.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page >= 1) {
        showMore.style.display = "block";
    };
};

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});