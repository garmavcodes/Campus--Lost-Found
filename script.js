
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

const itemsContainer = document.getElementById("itemsContainer");

if (itemsContainer) {

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    if (reports.length === 0) {
        itemsContainer.textContent = "No items reported yet.";
    }

    reports.forEach(function(report) {

        const card = document.createElement("div");
        card.className = "item-card";

        const title = document.createElement("h2");
        title.textContent = report.itemName;

        const type = document.createElement("p");
        type.textContent = "Type: " + report.type;

        const location = document.createElement("p");
        location.textContent = "Location: " + report.location;

        const date = document.createElement("p");
        date.textContent = "Date: " + report.date;

        const time = document.createElement("p");
        time.textContent = "Time: " + report.time;

        const description = document.createElement("p");
        description.textContent = "Description: " + report.description;

        card.appendChild(title);
        card.appendChild(type);
        card.appendChild(location);
        card.appendChild(date);
        card.appendChild(time);
        card.appendChild(description);

        if (report.image) {
            const image = document.createElement("img");
            image.src = report.image;
            image.alt = report.itemName;
            image.style.width = "150px";

            card.appendChild(image);
        }

        itemsContainer.appendChild(card);

    });
}
