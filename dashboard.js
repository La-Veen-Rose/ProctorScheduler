document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/get-schedule")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("scheduleTable");
            data.forEach(row => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${row.instructor}</td>
                    <td>${row.course}</td>
                    <td>${row.course_code}</td>
                    <td>${row.programs}</td>
                    <td>${row.time}</td>
                    <td>${row.day}</td>
                    <td>${row.room}</td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error("Error fetching schedule:", error));
});

const data = {
    instructors: ["John Doe", "Jane Smith", "Michael Johnson", "Emily Brown"],
    rooms: ["201", "202", "203", "204"],
    programs: ["BSCS", "BSCE", "BSBS", "AB PSYCH"],
    courses: ["GE1", "GE2", "GE3", "GE4"],
};

// Function to show the selected list
function showList(category) {
    const listContainer = document.getElementById("dataList");
    listContainer.innerHTML = "";

    data[category].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        listContainer.appendChild(li);
    });

    // Remove 'active' class from all buttons
    document.querySelectorAll(".toggle-btn").forEach(btn => btn.classList.remove("active"));

    // Add 'active' class to the clicked button
    document.querySelector(`button[onclick="showList('${category}')"]`).classList.add("active");
}

// Load the first category by default
document.addEventListener("DOMContentLoaded", () => showList('instructors'));
