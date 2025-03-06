fetch("squadre.json")
  .then((response) => response.json())
  .then((squadreData) => {

    class Squadra {
      constructor(nome) {
        this.nome = nome;
        this.giocatori = [];
      }

      // Metodo per aggiungere un giocatore
      aggiungiGiocatore = (giocatore) => this.giocatori.push(giocatore);

      // Metodo per mostrare la squadra senza logo e con un buon design
      mostraSquadra() {
        let html = `<div class="team"><h2>${this.nome}</h2><ul>`;
        for (let giocatore of this.giocatori)
          html += `<li class="player">${giocatore}</li>`;
        html += `</ul></div>`;
        return html;
      }
    }

    // Creazione delle squadre dinamicamente
    const teamsDiv = document.getElementById("teams");
    let teamsHtml = "";

    squadreData.forEach((squadraData) => {
      const squadra = new Squadra(squadraData.nome);
      squadraData.giocatori.forEach((giocatore) => {
        squadra.aggiungiGiocatore(giocatore);
      });
      teamsHtml += squadra.mostraSquadra();
    });

    // Visualizzazione delle squadre sulla pagina
    teamsDiv.innerHTML = teamsHtml;
  })
  .catch((error) => console.error("Errore nel caricare il file JSON:", error));
