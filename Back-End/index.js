const express = require('express');
const { userRouter, loginRouter } = require('./routes/index');
// taskRouter,
require('dotenv').config();
const app = express();
const error = require('./middleware/error');

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

// app.use('/task', taskRouter);

app.use('/users', userRouter);

app.use('/login', loginRouter)

app.use(error);

app.listen(PORT, () => console.log(`Conectado na Porta ${PORT}`));
