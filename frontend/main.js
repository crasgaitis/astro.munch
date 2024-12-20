const galaxyContainer = document.getElementById("galaxy-input-container");
const addGalaxyBtn = document.getElementById("add-galaxy-btn");
const submitBtn = document.getElementById("submit-btn");

let galaxyCount = 0;
const galaxies = [];

function createGalaxyForm() {
    galaxyCount += 1;

    const galaxyForm = document.createElement("div");
    galaxyForm.className = "galaxy-form";
    galaxyForm.innerHTML = `
        <h3>Galaxy ${galaxyCount}</h3>
        <label>Name: <input type="text" class="name"></label><br>
        <label>Position (x,y,z): <input type="text" class="position"></label><br>
        <label>Velocity (vx,vy,vz): <input type="text" class="velocity"></label><br>
        <label>Mass: <input type="number" class="mass" min="1"></label><br>
        <label>Radius: <input type="number" class="radius" min="1"></label><br>
        <label>Type: 
            <select class="type">
                <option value="Spiral">Spiral</option>
                <option value="Elliptical">Elliptical</option>
                <option value="Irregular">Irregular</option>
            </select>
        </label>
    `;
    galaxyContainer.appendChild(galaxyForm);
}

function gatherInputData() {
    galaxies.length = 0; 
    const forms = document.getElementsByClassName("galaxy-form");
    
    for (let form of forms) {
        const name = form.querySelector(".name").value;
        const position = form.querySelector(".position").value.split(",").map(Number);
        const velocity = form.querySelector(".velocity").value.split(",").map(Number);
        const mass = parseFloat(form.querySelector(".mass").value);
        const radius = parseFloat(form.querySelector(".radius").value);
        const type = form.querySelector(".type").value;

        galaxies.push({
            name, position, velocity, mass, radius, type
        });
    }
    return galaxies;
}

addGalaxyBtn.addEventListener("click", createGalaxyForm);

submitBtn.addEventListener("click", () => {
    const data = gatherInputData();
    console.log("Submitting Data:", data);

    fetch("http://127.0.0.1:5000/submit_parameters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Server Response:", result);
        alert("Parameters submitted successfully!");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to submit parameters.");
    });
});
