const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_NAME } = process.env;
const URL = 'http://localhost:3000';
const MONGO_DB_URL = 'mongodb://localhost:27017/Ebytr/'

describe('2 - Validando Metodo POST da Rota "/login" ', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(MONGO_DB_URL, {
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

  it('Será Validado se o campo "email" é obrigatório ', async () => {
    await frisby
    .post(`${URL}/login`,
    {
      password: 'admin'
    })
    .expect('status', 400)
    .then((res) => {
      const { body } = res;
      const result = JSON.parse(body);
      expect(result.message).toBe('"email" is required')
    })
  });

  it('Será Validado se o campo "password" é obrigatório ', async () => {
    await frisby
    .post(`${URL}/login`,
    {
      email: 'root@gmail.com',
    })
    .expect('status', 400)
    .then((res) => {
      const { body } = res;
      const result = JSON.parse(body);
      expect(result.message).toBe('"password" is required')
    })
  });

  it('Será Validado se o login utilizado não está registrado no banco de dados', async () => {
    await frisby
    .post(`${URL}/login`,
    {
      email: 'spyRoot@gmail.com',
      password: 'spyAdmin'
    })
    .expect('status', 404)
    .then((res) => {
      const { body } = res;
      const result = JSON.parse(body);
      expect(result.message).toBe('Login Invalid, try again');
    })
  })

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
