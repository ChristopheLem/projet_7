const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const { dbConnection } = require('./config/db');
const userRouter = require('./routers/user')
const postRouter = require('./routers/post')

dbConnection();

app.use(cors());

app.use(express.json());
const PORT = 4000;

// Gestion des fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use( userRouter )
app.use( postRouter )

app.listen(PORT, () => console.log('Server is running on port ' + PORT))