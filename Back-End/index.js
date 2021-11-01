const express = require('express');
const { taskRouter } = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.use('/task', taskRouter)

app.listen(PORT, () => console.log(`Conectado na Porta ${PORT}`));