const express = require('express');
const cors = require('cors');

const app = express();
const { dbConnection } = require('./config/db');
const userRouter = require('./routers/user')
const postRouter = require('./routers/post')

dbConnection();

app.use(cors());

app.use(express.json());
const PORT = 4000;

app.use( userRouter )
app.use( postRouter )

app.listen(PORT, () => console.log('Server is running on port ' + PORT))