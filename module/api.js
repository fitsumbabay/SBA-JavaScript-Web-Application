const apiUrl = "https://jsonplaceholder.typicode.com/posts";
const CAT_API_URL =
  "https://api.thecatapi.com/v1/images/search?limit=6&x-api-key=live_1tEWtJDyMx0SMoDKfVqzs4f8aA3q73wK550epJujSKyOtk40LjjT0sZrS2MPwJRS";

async function fetchData(url, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return [];
  }
}

export async function fetchPosts() {
  return await fetchData(apiUrl);
}

export async function searchPosts(query) {
  return await fetchData(`${apiUrl}?q=${query}`);
}

export async function createPost(post) {
  return await fetchData(apiUrl, "POST", post);
}

export async function updatePost(id, post) {
  return await fetchData(`${apiUrl}/${id}`, "PUT", post);
}

// // Function specifically for fetching cat images
export async function fetchCatImages() {
  return await fetchData(CAT_API_URL);
}
