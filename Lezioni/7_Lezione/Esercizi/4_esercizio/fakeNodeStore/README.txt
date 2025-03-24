installare Postgres (testato con la version 16.4) con i tool, in particolarr pgAdmin e possibilmente jdbc
assegnare una password all'utente admin che è postgres
lasciare il resto di default (database postgres etc)
far correre il server su localhost (non raggiungibile dall'esterno dell'host) e porta 5432

creare il database che serve all'applicazione andando a leggere nel file  .env 
dove ci sono tutti i dati per la creazione
per la creazione del DB e user usare pgAdmin




solo per sviluppo
nodemon Riavvia il server automaticamente quando modifichi i file

AVVIO DEL SERVER
npm install dotenv   (deprecato, esercizio: trovare alternativa)
npm install
npm run dev (solo per sviluppo)
npm start


NOTE:

express         Framework per creare API REST
cors            Abilita richieste cross-origin (CORS)
dotenv          Permette di usare variabili d'ambiente .env
bcrypt          Cripta le password prima di salvarle
jsonwebtoken    Gestisce l'autenticazione con token JWT
pg              Driver per connettersi a PostgreSQL
pg-hstore       Necessario per gestire tipi JSON in PostgreSQL
sequelize       ORM per gestire il database in modo più semplice

come leggere il codice
"export..." in fondo al file
//serve per esportare il modello sequelize in modo che possa essere importato e utilizzato in altri file del progetto.

const { name, email, password } = req.body;
Questa riga utilizza la destructuring assignment di JavaScript per estrarre i valori name, email e password 
dall'oggetto req.body.
ES:
{
    name: "Alessandro Arciero",
    email: "alex@arciero.com",
    password: "itsFORever"
}
diventa:
const name = req.body.name;
const email = req.body.email;
const password = req.body.password;





per ripulire cache e ripartire:
    rd /s /q node_modules
    del package-lock.json
    npm install
    npm start
