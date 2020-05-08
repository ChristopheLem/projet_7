const express = require('express');
const path = require('path');
const cors = require('cors');

const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const app = express();

const { dbConnection } = require('./config/db');

const userRouter = require('./routers/user')
const postRouter = require('./routers/post')
const likeRouter = require('./routers/like')
const commentRouter = require('./routers/comment')

dbConnection();

app.use(express.json());
const PORT = 4000;
// Permet CORS
app.use(cors());
// Configure en-têtes HTTP
app.use(helmet());
// Empêche les attaques cross-site scripting (xss)
app.use(xss());
// Limite le nombre de requête
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
});
app.use(limiter);
// Empêche la pollution des paramètres http
app.use(hpp());



// Gestion des fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use( userRouter )
app.use( postRouter )
app.use( likeRouter )
app.use( commentRouter )

app.listen(PORT, () => console.log('Server is running on port ' + PORT))