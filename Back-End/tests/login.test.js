const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_NAME } = process.env;
const URL = 'http://localhost:3000';

describe('2 - Validando Metodo POST da Rota "/login" ', () => {
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

  it('Será Validado se houve conexão com a API ', async () => {
    await frisby
      .get(`${URL}`)
      .then((res) => {
        const { body } = res;
        expect(body).toBe('Hello World');
      });
  });

  it('Será Validado se o login foi bem sucedido', async () => {
    await frisby
      .post(`${URL}/login`,
      {
        email: 'root@gmail.com',
        password: 'admin'
      })
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result).toHaveProperty('sucess');
      })
  })

})
