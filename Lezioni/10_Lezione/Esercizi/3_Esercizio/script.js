const map = L.map("map").setView([41.9028, 12.4964], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let currentMarkers = [];
let allMarkers = [];
let allLines = [];
let distanceCount = 0;
const distanceData = [];
let totalDistance = 0; // Aggiunto per tenere traccia della distanza totale

// Funzione per resettare tutti i marker e le linee
function resetAll() {
  allMarkers.forEach((m) => map.removeLayer(m));
  allLines.forEach((l) => map.removeLayer(l));
  currentMarkers = [];
  allMarkers = [];
  allLines = [];
  distanceCount = 0;
  distanceData.length = 0;
  totalDistance = 0; // Reset totale
  document.getElementById("totalKm").textContent = totalDistance.toFixed(2); // Aggiorna la distanza totale
  map.closePopup();
  document.getElementById("distanceList").innerHTML =
    "<strong>Distanze calcolate:</strong>";
}

// Funzione per generare un colore casuale
const getRandomColor = () => "#0000FF"; // Colore Blu fisso per il marker

// Funzione per effettuare il reverse geocoding
async function reverseGeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.hamlet ||
      data.display_name ||
      "Luogo sconosciuto"
    );
  } catch (err) {
    return "Errore nel geocoding";
  }
}

// Evento per il click sulla mappa
map.on("click", async (e) => {
  const { lat, lng } = e.latlng;
  const marker = L.marker(e.latlng, {
    icon: L.icon({
      iconUrl:
        "https://th.bing.com/th/id/OIP.mHLjbg50cgl324u5z4za5wHaL_?rs=1&pid=ImgDetMain",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }),
  }).addTo(map);
  allMarkers.push(marker);

  const locationName = await reverseGeocode(lat, lng);
  marker
    .bindPopup(
      `<strong>${locationName}</strong><br>Lat: ${lat.toFixed(
        5
      )}<br>Lng: ${lng.toFixed(5)}`
    )
    .openPopup();

  currentMarkers.push({ marker, locationName });

  // Funzione di rimozione dei marker
  marker.on("click", function () {
    map.removeLayer(marker);
    allMarkers = allMarkers.filter((m) => m !== marker);
  });

  if (currentMarkers.length === 2) {
    const pointA = currentMarkers[0].marker.getLatLng();
    const pointB = currentMarkers[1].marker.getLatLng();
    const locationA = currentMarkers[0].locationName;
    const locationB = currentMarkers[1].locationName;

    const color = getRandomColor(); // Colore Blu fisso per la linea
    const line = L.polyline([pointA, pointB], { color }).addTo(map);
    allLines.push(line);

    line.on("click", function () {
      map.removeLayer(line);
      allLines = allLines.filter((l) => l !== line);
    });

    const distanceMeters = pointA.distanceTo(pointB);
    const distanceKm = (distanceMeters / 1000).toFixed(2);
    const distanceMiles = (distanceMeters / 1609.34).toFixed(2);

    const midPoint = L.latLng(
      (pointA.lat + pointB.lat) / 2,
      (pointA.lng + pointB.lng) / 2
    );

    const popupText = `Distanza: ${distanceKm} km (${distanceMiles} mi)`;
    L.popup().setLatLng(midPoint).setContent(popupText).openOn(map);

    // Aggiungi la distanza alla somma totale
    totalDistance += parseFloat(distanceKm);
    document.getElementById("totalKm").textContent = totalDistance.toFixed(2);

    distanceCount++;
    const listEntry = document.createElement("div");
    listEntry.className = "distance-entry";
    listEntry.innerHTML = ` 
      <strong>${distanceCount})</strong>
      ${locationA} → ${locationB}<br>
      ${distanceKm} km (${distanceMiles} mi)
      <button class="delete-btn" data-id="${distanceCount}">🗑️</button>
    `;
    document.getElementById("distanceList").appendChild(listEntry);

    distanceData.push({
      id: distanceCount,
      km: distanceKm,
      mi: distanceMiles,
      locationA,
      locationB,
      startLat: pointA.lat.toFixed(5),
      startLng: pointA.lng.toFixed(5),
      endLat: pointB.lat.toFixed(5),
      endLng: pointB.lng.toFixed(5),
    });

    currentMarkers = [];
  }
});

// Funzione per esportare le distanze in CSV
document.getElementById("exportCSV").addEventListener("click", () => {
  if (distanceData.length === 0) return alert("Nessuna distanza da esportare.");

  const csvContent = [
    [
      "ID",
      "Luogo A",
      "Luogo B",
      "Distanza (km)",
      "Distanza (mi)",
      "Lat A",
      "Lng A",
      "Lat B",
      "Lng B",
    ],
    ...distanceData.map((d) => [
      d.id,
      d.locationA,
      d.locationB,
      d.km,
      d.mi,
      d.startLat,
      d.startLng,
      d.endLat,
      d.endLng,
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "distanze.csv");
  link.click();
});

// Funzione per salvare la mappa come immagine PNG
document.getElementById("saveMap").addEventListener("click", () => {
  leafletImage(map, function (err, canvas) {
    if (err) {
      alert("Errore durante il salvataggio immagine.");
      return;
    }

    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = img;
    link.download = "mappa_distanze.png";
    link.click();
  });
});

// Funzione per resettare la mappa
document.getElementById("resetButton").addEventListener("click", resetAll);

// Gestire l'eliminazione delle distanze specifiche
// Gestire l'eliminazione delle distanze specifiche
document.getElementById("distanceList").addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("delete-btn")) {
    const idToRemove = e.target.getAttribute("data-id");

    // Rimuovi la distanza dalla mappa
    const distanceToRemove = distanceData.find((d) => d.id == idToRemove);
    const markerToRemoveA = allMarkers.find(
      (m) =>
        m.getLatLng().lat.toFixed(5) === distanceToRemove.startLat &&
        m.getLatLng().lng.toFixed(5) === distanceToRemove.startLng
    );
    const markerToRemoveB = allMarkers.find(
      (m) =>
        m.getLatLng().lat.toFixed(5) === distanceToRemove.endLat &&
        m.getLatLng().lng.toFixed(5) === distanceToRemove.endLng
    );
    const lineToRemove = allLines.find((l) =>
      l
        .getLatLngs()
        .some(
          (latlng) =>
            latlng.lat.toFixed(5) === distanceToRemove.startLat ||
            latlng.lat.toFixed(5) === distanceToRemove.endLat
        )
    );

    // Rimuovi i marker dalla mappa
    if (markerToRemoveA) map.removeLayer(markerToRemoveA);
    if (markerToRemoveB) map.removeLayer(markerToRemoveB);

    // Rimuovi la linea dalla mappa
    if (lineToRemove) map.removeLayer(lineToRemove);

    // Rimuovi la voce dalla lista
    e.target.closest(".distance-entry").remove();

    // Rimuovi i dati dalla lista
    distanceData.splice(
      distanceData.findIndex((d) => d.id == idToRemove),
      1
    );

    // Aggiorna la distanza totale
    totalDistance -= parseFloat(distanceToRemove.km);
    document.getElementById("totalKm").textContent = totalDistance.toFixed(2);

    // Decrementa il contatore e riorganizza le voci
    distanceCount = distanceData.length;
    document.getElementById("distanceList").innerHTML =
      "<strong>Distanze calcolate:</strong>";
    distanceData.forEach((entry, index) => {
      const listEntry = document.createElement("div");
      listEntry.className = "distance-entry";
      listEntry.innerHTML = `
          <strong>${index + 1})</strong>
          ${entry.locationA} → ${entry.locationB}<br>
          ${entry.km} km (${entry.mi} mi)
          <button class="delete-btn" data-id="${entry.id}">🗑️</button>
        `;
      document.getElementById("distanceList").appendChild(listEntry);
    });
  }
});
