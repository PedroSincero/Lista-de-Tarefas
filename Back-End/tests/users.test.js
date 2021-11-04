const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_NAME } = process.env;
const URL = 'http://localhost:3000';

describe('1 - Validando Metodo POST da Rota "/users"  ', () => {
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

  it('Será Validado se o campo "name" é obrigatório', async () => {
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
  });

  it('Será Validado se o campo "email" é obrigatório ', async () => {
    await frisby
    .post(`${URL}/users/`,
    {
      name: 'pedrinho',
      password: '123456879'
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
    .post(`${URL}/users/`,
    {
      name: 'pedrinho',
      email: 'pedrinho@gmail.com',
    })
    .expect('status', 400)
    .then((res) => {
      const { body } = res;
      const result = JSON.parse(body);
      expect(result.message).toBe('"password" is required')
    })
  });

  it('Será Validado se o campo "email" é inválido', async () => {
    await frisby
      .post(`${URL}/users`,
      {
        name: 'Pedrinho',
        email: 'pedrinho.com',
        password: '123456789'
      })
      .expect('status', 400)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('"email" must be a valid email')
      })
  })
  it('Será Validado se o campo "email" está registrado no banco de dados', async () => {
    await frisby
      .post(`${URL}/users`, 
      {
        name: 'Pedrinho',
        email: 'pedrinho@gmail.com',
        password: '123456789'
      })
      .expect('status', 201);

    await frisby
      .post(`${URL}/users`, 
      {
        name: 'Pedrinho',
        email: 'pedrinho@gmail.com',
        password: '123456789'
      })
      .expect('status', 409)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email already registered');
      });
  });

  it('Será Validado se o cadastro do usuário foi bem sucedido', async () => {
    await frisby
      .post(`${URL}/users`,
      {
        name: 'Pedrinho',
        email: 'pedrinho@gmail.com',
        password: '123456789'
      })
      .expect('status', 201)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result).toHaveProperty('sucess');
      })
  })
});
