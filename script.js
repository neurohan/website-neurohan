document.addEventListener("DOMContentLoaded", function () {

    // ---- 1. Map each website tab to its Google Sheet CSV URL ----
    const dataSources = {
        news: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNXJBZ1p2VBfNAUR57-GWFQJWP_f4xO0erZCNBq44pMsci0Vb9Cms4m_wiIqUD0WVALw35mo5W2bH/pub?gid=0&single=true&output=csv",

        articles: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNXJBZ1p2VBfNAUR57-GWFQJWP_f4xO0erZCNBq44pMsci0Vb9Cms4m_wiIqUD0WVALw35mo5W2bH/pub?gid=1276743394&single=true&output=csv",

        blog: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNXJBZ1p2VBfNAUR57-GWFQJWP_f4xO0erZCNBq44pMsci0Vb9Cms4m_wiIqUD0WVALw35mo5W2bH/pub?gid=1050951563&single=true&output=csv",

        kids: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNXJBZ1p2VBfNAUR57-GWFQJWP_f4xO0erZCNBq44pMsci0Vb9Cms4m_wiIqUD0WVALw35mo5W2bH/pub?gid=1862148371&single=true&output=csv"
    };

    // ---- 2. Load the default tab (news) when the site opens ----
    loadCSV("news");

    // ---- 3. Load CSV for the clicked tab ----
    document.querySelectorAll("nav button").forEach(button => {
        button.addEventListener("click", function () {
            const tabId = this.getAttribute("onclick").replace("openTab('", "").replace("')", "");
            if (dataSources[tabId]) {
                loadCSV(tabId);
            }
        });
    });

    // ---- 4. Fetch and parse CSV from Google Sheets ----
    function loadCSV(sectionId) {
        const url = dataSources[sectionId];

        fetch(url)
            .then(response => response.text())
            .then(csvText => {
                const rows = csvText.trim().split("\n");
                const header = rows.shift().split(",");

                let items = rows.map(row => {
                    const cols = row.split(",");
                    return {
                        title: cols[0],
                        link: cols[1],
                        date: cols[2]
                    };
                });

                displayContent(sectionId, items);
            })
            .catch(error => console.error("Error loading CSV:", error));
    }

    // ---- 5. Render the content into the selected section ----
    function displayContent(sectionId, items) {
        let container = document.querySelector(`#${sectionId} > div`);

        if (!container) return;
        container.innerHTML = "";

        if (items.length === 0) {
            container.innerHTML = "<p>No content available yet.</p>";
            return;
        }

        items.forEach(item => {
            let div = document.createElement("div");
            div.innerHTML = `
                <p>
                    <strong>${item.date}:</strong>
                    <a href="${item.link}" target="_blank">${item.title}</a>
                </p>
            `;
            container.appendChild(div);
        });
    }
});
