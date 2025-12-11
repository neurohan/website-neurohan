document.addEventListener("DOMContentLoaded", function () {
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNXJBZ1p2VBfNAUR57-GWFQJWP_f4xO0erZCNBq44pMsci0Vb9Cms4m_wiIqUD0WVALw35mo5W2bH/pub?output=csv";

    fetch(sheetURL)
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split("\n").slice(1); // Skip header row
            let newsItems = [];
            let blogItems = [];

            rows.forEach(row => {
                const cols = row.split(",");

                let title = cols[0];
                let link = cols[1];
                let date = cols[2];
                let category = cols[3]?.trim().toLowerCase();

                let entry = { title, link, date };

                if (category === "news") {
                    newsItems.push(entry);
                } else if (category === "blog") {
                    blogItems.push(entry);
                }
            });

            displayContent("news", newsItems, "news");
            displayContent("blog", blogItems, "blog");
        })
        .catch(error => console.error("Error loading sheet:", error));
});

function displayContent(sectionId, items, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p>No content available yet.</p>";
        return;
    }

    items.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = `<p><strong>${item.date}:</strong> <a href="${item.link}" target="_blank">${item.title}</a></p>`;
        container.appendChild(div);
    });
}



