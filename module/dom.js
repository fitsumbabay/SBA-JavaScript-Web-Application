export function displayPosts(posts) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;

    gallery.appendChild(postElement);
  });
}

