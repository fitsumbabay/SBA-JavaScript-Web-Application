import {
  fetchPosts,
  searchPosts,
  createPost,
  updatePost,
  fetchCatImages,
} from "./api.js";
import { displayPosts } from "./dom.js";

let currentPage = 1; // Keeps track of the current page of posts being displayed.
const postsPerPage = 3;//Defines how many posts show on each page (3 in this case).
let posts = []; // Store posts globally and  An array to hold posts fetched from the server.

async function loadPosts() {
  posts = await fetchPosts(); // Fetch posts into the global variable
  await loadCatImages();
  updateDisplay();
}

function updateDisplay() {
  displayPosts(
    posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
  );
  setupPagination();
}

function setupPagination() {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  document.getElementById("prevButton").disabled = currentPage === 1;
  document.getElementById("nextButton").disabled = currentPage === totalPages;
}

function changePage(direction) {
  currentPage += direction;
  updateDisplay();
}


async function loadCatImages() {
  const catImages = await fetchCatImages();
  displayCatImages(catImages);
}

function displayCatImages(catImages) {
  const catContainer = document.getElementById("catContainer");
  catContainer.innerHTML = "";
  catImages.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.url;
    imgElement.alt = "Cat Image";
    catContainer.appendChild(imgElement);
  });
}

document
  .getElementById("fetchCatImagesButton")
  .addEventListener("click", async () => {
    const catImages = await fetchCatImages();
    displayCatImages(catImages);
  });


document.getElementById("searchButton").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value;
  currentPage = 1; // Reset to the first page on search
  posts = await searchPosts(query); // Update globally stored posts with search results
  updateDisplay();
});

document
  .getElementById("prevButton")
  .addEventListener("click", () => changePage(-1));
document
  .getElementById("nextButton")
  .addEventListener("click", () => changePage(1));

document
  .getElementById("createPostForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const newPost = await createPost({
      title: document.getElementById("createTitle").value,
      body: document.getElementById("createBody").value,
    });
    console.log("Created Post:", newPost);
    loadPosts(); // Reload posts to include the newly created one
  });

document
  .getElementById("updatePostForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const updatedPost = await updatePost(
      document.getElementById("updateId").value,
      {
        title: document.getElementById("updateTitle").value,
        body: document.getElementById("updateBody").value,
      }
    );
    console.log("Updated Post:", updatedPost);
    loadPosts(); // Reload posts to include the updated one
  });

// Load initial posts
loadPosts();





