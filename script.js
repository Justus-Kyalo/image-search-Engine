const accessKey = "NClEd1riL1XXgZeumwv60X-q0EnNg_cyY1ViqfVAA4A";
const bodyContainer = document.querySelector(".body-container");
const searchInput = document.querySelector(".input-bar");
const searchBtn = document.querySelector(".search-btn");
const showMore = document.querySelector(".show-more-btn");
let page;

async function fetchImages(page) {
  const query = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  data.results.map((item) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    bodyContainer.appendChild(imageContainer);

    const image = document.createElement("img");
    imageContainer.appendChild(image);
    image.src = item.urls.small;
  });

  showMore.style.display = "flex";
  //searchInput.value = "";
}
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page = 1;
  bodyContainer.innerHTML = "";
  showMore.style.display = "none";

  fetchImages(page);
});
showMore.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  fetchImages(page);
});

searchInput.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
    page = 1;
    bodyContainer.innerHTML = "";
    showMore.style.display = "none";

    fetchImages(page);
  }
});
