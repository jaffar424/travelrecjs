let travelData = [];

// 1️⃣ Adatok lekérése a JSON-ból
fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log("Adatok sikeresen betöltve:", data); // ellenőrzéshez
    })
    .catch(error => console.error("Hiba a JSON betöltésekor:", error));

// 2️⃣ Keresési funkció
function search() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = ""; // előző eredmények törlése

    if (!input) {
        alert("Kérlek, adj meg egy kulcsszót!");
        return;
    }

    let category = null;

    // Kulcsszó variációk kezelése
    if (input.includes("strand")) category = "strand";
    else if (input.includes("templom")) category = "templom";
    else if (input.includes("ország")) category = "ország";

    if (!category || !travelData[category]) {
        resultsSection.innerHTML = "<p style='text-align:center;'>Nincs találat a megadott kulcsszóra.</p>";
        return;
    }

    // 3️⃣ Eredmények megjelenítése
    travelData[category].forEach(place => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
        `;
        resultsSection.appendChild(card);
    });
}

// 4️⃣ Eredmények törlése
function resetResults() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
    console.log("Eredmények törölve.");
}

// 5️⃣ (Opcionális) Idő megjelenítése egy országban
function showTimeInTokyo() {
    const options = { timeZone: 'Asia/Tokyo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const tokyoTime = new Date().toLocaleTimeString('hu-HU', options);
    console.log("Jelenlegi idő Tokióban:", tokyoTime);
}
