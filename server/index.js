const express = require ('express');
const dotenv = require ('dotenv');
//fisierul .env e colorat cu verde => orice cheie pe care o vom salva in el si ii vom da commit + push => va ajunge pe github
dotenv.config()

const app = express();

// console.log(process.env.PORT) - nu mai avem nevoie de acest log pt ca am salvat cheia in .env
const PORT = process.env.PORT || 3000;

//la req avem acces la ceea ce primim noi in request, iar la res avem metoda prin care noi putem sa returnam ceva pentru utilizator
app.get('/', (req, res) => {
res.status(200).json({message: 'Hello' })

})

app.listen(PORT, () => {

    console.log(`Server succesfully started on port ${PORT}`)
})

//acum mergem in package.json si facem prima noastra comanda custom numita dev (care sa urmareasca cand schimbam ceva si sa actualizeze
//de exp daca schimbat portul la 3001 dupa ce am rulat, se va actualiza automat