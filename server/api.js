const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
  console.log("test");
  // AFFICHER LA BDD
  // FAIRE UN AUTRE APP.GET POUR UN AUTRE LIEN OU ON METTRAIT L'ID ET CELA AFFICHE TOUT LE PRODUIT
});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
