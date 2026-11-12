
const form = document.getElementById("lostForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const photo = document.getElementById("photo").files[0];

        const report = {
            itemName: document.getElementById("itemName").value,
            personName: document.getElementById("personName").value,
            location: document.getElementById("location").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            description: document.getElementById("description").value,
            type: "Lost",
            image: ""
        };

        function saveReport() {
            let reports = JSON.parse(localStorage.getItem("reports")) || [];

            reports.push(report);

            localStorage.setItem("reports", JSON.stringify(reports));

            alert("Lost item report saved!");
            form.reset();
        }

        if (photo) {
            const reader = new FileReader();

            reader.onload = function() {
                report.image = reader.result;
                saveReport();
            };

            reader.readAsDataURL(photo);
        } else {
            saveReport();
        }
    });
}

const foundForm = document.getElementById("foundForm");

if (foundForm) {
    foundForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const photo = document.getElementById("photo").files[0];

        const report = {
            itemName: document.getElementById("itemName").value,
            location: document.getElementById("location").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            description: document.getElementById("description").value,
            type: "Found",
            image: ""
        };

        const reader = new FileReader();

        reader.onload = function() {
            report.image = reader.result;

            let reports = JSON.parse(localStorage.getItem("reports")) || [];

            reports.push(report);

            localStorage.setItem("reports", JSON.stringify(reports));

            alert("Found item report saved!");

            foundForm.reset();
        };

        reader.readAsDataURL(photo);
    });
}


const lostItemsContainer = document.getElementById("lostItemsContainer");
const foundItemsContainer = document.getElementById("foundItemsContainer");

if (lostItemsContainer && foundItemsContainer) {

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    function displayItems(items, container) {

        if (items.length === 0) {
            container.textContent = "No items reported yet.";
            return;
        }

        items.forEach(function(report) {

            const card = document.createElement("div");
            card.className = "item-card";

            card.innerHTML = `
                <h3>${report.itemName}</h3>
                <p><strong>Location:</strong> ${report.location}</p>
                <p><strong>Date:</strong> ${report.date}</p>
                <p><strong>Time:</strong> ${report.time}</p>
                <p><strong>Description:</strong> ${report.description}</p>
            `;

            if (report.image) {
                const image = document.createElement("img");
                image.src = report.image;
                image.alt = report.itemName;
                image.width = 150;
                card.appendChild(image);
            }

            container.appendChild(card);

        });
    }

    const lostItems = reports.filter(function(report) {
        return report.type === "Lost";
    });

    const foundItems = reports.filter(function(report) {
        return report.type === "Found";
    });

    displayItems(lostItems, lostItemsContainer);
    displayItems(foundItems, foundItemsContainer);
}
