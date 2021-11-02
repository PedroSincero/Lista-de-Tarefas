const express = require('express');
// const { taskRouter, loginRouter, userRouter } = require('./routes/index');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

// app.use('/task', taskRouter);

// app.use('/login', loginRouter);

// app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Conectado na Porta ${PORT}`));
