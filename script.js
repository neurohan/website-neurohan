document.addEventListener("DOMContentLoaded", function () {
    fetch("content.json")  // Fetch content from JSON
        .then(response => response.json())
        .then(data => {
            displayContent("news", data.news, "news");
            displayContent("blog", data.blog, "blog");
        })
        .catch(error => console.error("Error loading content:", error));
});

function displayContent(sectionId, items, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";  // Clear existing content

    items.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = `<p><strong>${item.date}:</strong> <a href="${item.link}" target="_blank">${item.title}</a></p>`;
        container.appendChild(div);
    });
}
