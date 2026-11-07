const form = document.getElementById("lostForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const report = {
            itemName: document.getElementById("itemName").value,
            personName: document.getElementById("personName").value,
            location: document.getElementById("location").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            description: document.getElementById("description").value,
            type: "Lost"
        };

        let reports = JSON.parse(localStorage.getItem("reports")) || [];

        reports.push(report);

        localStorage.setItem("reports", JSON.stringify(reports));

        alert("Lost item report saved!");
        form.reset();
    });
}