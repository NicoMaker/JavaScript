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

      mostraSquadra() {
        let html = `<div class="team"><h2>${this.nome}</h2><ul>`;
        for (let giocatore of this.giocatori)
          html += `<li class="player">${giocatore}</li>`;
        html += `</ul></div>`;
        return html;
      }

      // Metodo per il footer
      footer = () =>
        (document.getElementById(
          "footer"
        ).innerHTML = `&copy; ${new Date().getFullYear()} Squadre di Calcio. Tutti i diritti riservati.`);
    }

    const teamsDiv = document.getElementById("teams");
    let teamsHtml = "";

    squadreData.sort((a, b) => a.nome.localeCompare(b.nome));

    squadreData.forEach((squadraData) => {
      const squadra = new Squadra(squadraData.nome);
      squadraData.giocatori.forEach((giocatore) => {
        squadra.aggiungiGiocatore(giocatore);
      });
      teamsHtml += squadra.mostraSquadra();
    });

    teamsDiv.innerHTML = teamsHtml;

    const squadra = new Squadra(); 
    squadra.footer();
  })
  .catch((error) => console.error("Errore nel caricare il file JSON:", error));
