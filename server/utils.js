const jwt = require('jsonwebtoken');

//middlewear de verificare

//in index.js am linia app.use('/users', verifyToken, userRoutes);
// practiv functia verifyToken va stabili daca requestul poate sa mearga mai departe
// catre ruta (userRoutes) si sa execute de e acolo sau nu
//si fct verifyToken e un fel de ruta, deci are acces la req si res
//daca nu apelam next nu va putea trece mai departe
const verifyToken = (req, res, next) => {
const bearerToken = req.headers['authorization'];
const token = bearerToken.split(' ')[1]; // 1 pt ca pe prima pozitie e array (Bearer) si pe a doua e token

//console.log(token);
jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
        return res.status(400).json({success: false, message: 'Invalid token', data: {}})
    }

    req.userId = decoded.id;

    next();

})

}

module.exports = verifyToken; // ca sa putem sa o apelam in index.js in app.use('/auth', verifyToken, authRoutes);
                              // si sa putem vedea ce lucram
