const galaxyContainer = document.getElementById("galaxy-input-container");
const addGalaxyBtn = document.getElementById("add-galaxy-btn");
const submitBtn = document.getElementById("submit-btn");

const galaxyNames = ["Andromeda", "Milky Way", "Triangulum", "Whirlpool", 
    "Sombrero", "Pinwheel", "Centaurus A", "Black Eye", "Cigar Galaxy"];

const colors = [
    'lightblue', 'lavender', 'LightGoldenRodYellow', 'LavenderBlush', 
    'lightcyan'
];
let colorIndex = Math.floor(Math.random() * colors.length);

let galaxyCount = 0;
const galaxies = [];

function createGalaxyForm() {
    galaxyCount += 1;

    const galaxyForm = document.createElement("div");
    galaxyForm.className = "galaxy-form";
    galaxyForm.innerHTML = `
        <h3>Galaxy ${galaxyCount}</h3>
        <label>Name: 
            <input type="text" class="name" placeholder="Galaxy Name" style="width: 320px;">
        </label><br>

        <label>Position [kpc]: 
            <input type="number" class="position-x" step="0.01" placeholder="x">
            <input type="number" class="position-y" step="0.01" placeholder="y">
            <input type="number" class="position-z" step="0.01" placeholder="z">
        </label><br>

        <label>Velocity [km/s]: 
            <input type="number" class="velocity-x" step="0.01" placeholder="vx">
            <input type="number" class="velocity-y" step="0.01" placeholder="vy">
            <input type="number" class="velocity-z" step="0.01" placeholder="vz">
        </label><br>

        <label>Mass [10¹⁰ solar masses]: 
            <input type="number" class="mass" min="0.1" step="0.1" placeholder="Mass">
        </label><br>

        <label>Radius [kpc]: 
            <input type="number" class="radius" min="0.1" step="0.1" placeholder="Radius">
        </label><br>

        <label>Gas content [%]:
            <input type="number" class="gas" min="0" max="100" step="0.1" placeholder="Gas">
        </label><br>

        <label>Type: 
            <select class="type">
                <option value="Spiral">Spiral</option>
                <option value="Elliptical">Elliptical</option>
                <option value="Irregular">Irregular</option>
            </select>
        </label>
    `;
    galaxyContainer.appendChild(galaxyForm);
    setRandomBackgroundColor(galaxyForm);
    const nameInput = galaxyForm.querySelector(".name");
    setRandomPlaceholder(nameInput);
}

function setRandomPlaceholder(input) {
    const randomName = galaxyNames[Math.floor(Math.random() * galaxyNames.length)];
    input.placeholder = randomName;
}

function setRandomBackgroundColor(form) {
    form.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}

function gatherInputData() {
    galaxies.length = 0; 
    const forms = document.getElementsByClassName("galaxy-form");
    
    for (let form of forms) {
        const name = form.querySelector(".name").value.trim();

        const position = [
            parseFloat(form.querySelector(".position-x").value) || 0,
            parseFloat(form.querySelector(".position-y").value) || 0,
            parseFloat(form.querySelector(".position-z").value) || 0
        ];
        const velocity = [
            parseFloat(form.querySelector(".velocity-x").value) || 0,
            parseFloat(form.querySelector(".velocity-y").value) || 0,
            parseFloat(form.querySelector(".velocity-z").value) || 0
        ];

        const mass = parseFloat(form.querySelector(".mass").value) || 0;
        const radius = parseFloat(form.querySelector(".radius").value) || 0;
        const gas = parseFloat(form.querySelector(".gas").value) || 0;
        const type = form.querySelector(".type").value;

        if (!name) {
            alert("Galaxy name is required.");
            return;
        }
        if (mass <= 0 || radius <= 0) {
            alert("Mass and Radius must be positive numbers.");
            return;
        }

        galaxies.push({
            name,
            position,
            velocity,
            mass,
            radius,
            gas,
            type
        });
    }
    return galaxies;
}

addGalaxyBtn.addEventListener("click", createGalaxyForm);

submitBtn.addEventListener("click", () => {
    const data = gatherInputData();
    if (data.length === 0) {
        alert("Please add and fill in at least one galaxy.");
        return;
    }

    console.log("Submitting Data:", data);

    fetch("http://127.0.0.1:5000/submit_parameters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Server Response:", result);
        if (result.redirect) {
            window.location.href = result.redirect;
        } else {
            alert("Parameters submitted successfully!");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to submit parameters.");
    });

});
