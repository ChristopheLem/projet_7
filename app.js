const express = require('express');
const app = express();
const { dbConnection } = require('./config/db');
const userRouter = require('./routers/user')

dbConnection();

const cors = require('cors');

app.use(cors());

app.use(express.json());
const PORT = 4000;

app.use('/api/auth', userRouter )

app.listen(PORT, () => console.log('Server is running on port ' + PORT))