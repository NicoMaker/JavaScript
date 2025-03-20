async function fetchMultipleData() {
  try {
    const [response1, response2] = await Promise.all([
      fetch("http://192.168.100.4/APIJs/promise-all.php"),
      fetch("http://192.168.100.4/APIJs/async-await.php"),
    ]);

    if (!response1.ok || !response2.ok) {
      throw new Error("Errore in una delle richieste");
    }

    const data1 = await response1.json();
    const data2 = await response2.json();

    console.log("Risultato 1:", data1);
    console.log("Risultato 2:", data2);
  } catch (error) {
    console.error("Errore nelle richieste:", error);
  }
}

fetchMultipleData();
