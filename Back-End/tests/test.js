const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_NAME } = process.env;
const URL = 'http://localhost:3000';

describe('1 - Crie um endpoint para o cadastro de usuários', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017/Ebytr/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db(DB_NAME);
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    const users = {
      name: 'admin', email: 'root@gmail.com', password: 'admin' 
    };
    await db.collection('users').insertOne(users);
  });

  afterAll(async () => {
    await connection.close();
  })

  it('Verificando se o campo "name" é obrigatório', async () => {
    await frisby
    .post(`${URL}/users/`,
    {
      email: 'pedrinho@gmail.com',
      password: '123456879'
    })
    .expect('status', 400)
    .then((res) => {
      const { body } = res;
      const result = JSON.parse(body);
      expect(result.message).toBe('"name" is required')
    })
  })

  it('Verificar se houve conexão com a API ', async () => {
    await frisby
      .get(`${URL}`)
      .then((res) => {
        const { body } = res;
        expect(body).toBe('Hello World');
      });
  })
});