const express = require ('express');
const dotenv = require ('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // Libr morgan ne afiseaza in consola ce tip de metoda s-a rulat (GET, PUT, DELETE..)
const User = require('./database/models/User');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes'); //ca sa lucram cu aceasta librarie trebuie sa setam o noua cheie de env in fis .env
const {verifyToken} = require('./utils');



const app = express();
//fisierul .env - cheie pe care o vom salva in el si ii vom da commit + push => va ajunge pe github
dotenv.config()

// console.log(process.env.PORT) - nu mai avem nevoie de acest log pt ca am salvat cheia in .env
const PORT = process.env.PORT || 3000; //luam PORT-ul din fis de env

//la req avem acces la ceea ce primim noi in request, iar la res avem metoda prin care noi putem sa returnam ceva pentru utilizator
//prima ruta:
app.get('/', (req, res) => {
res.status(200).json({message: 'Hello' })

})

//morgan si cors sunt API-uri
app.use(morgan('dev'))


app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json()); //ne da acces la body-ul unui request

app.use('/users', verifyToken, userRoutes); //de fiecare data cand se apeleaza vreo ruta indiferent de tipul metodei prin care se apeleaza
                                           // sa se uite in fisierul userRoutes


app.use('/auth', authRoutes);

app.listen(PORT, () => {

    console.log(`Server succesfully started on port ${PORT}`)
})

//acum mergem in package.json si facem prima noastra comanda custom numita dev (care sa urmareasca cand schimbam ceva si sa actualizeze
//de exp daca schimbat portul la 3001 dupa ce am rulat, se va actualiza automat