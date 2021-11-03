const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_NAME } = process.env;
const URL = 'http://localhost:3000';

describe('1 - Endpoint de Cadastro de usuários "/users"', () => {
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

  it('Verificar se houve conexão com a API ', async () => {
    await frisby
      .get(`${URL}`)
      .then((res) => {
        const { body } = res;
        expect(body).toBe('Hello World');
      });
  });

  it('Verificando se o campo "name" é obrigatório e se contem as mensagens corretas', async () => {
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

  it('Verificando se o campo "email" é obrigatório e se contem as mensagens corretas', async () => {
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

  it('Verificando se o campo "password" é obrigatório e se contem as mensagens corretas', async () => {
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

  it('Verificando se o campo "email" é inválido', async () => {
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
  it('Verificando se o campo "email" já está registrado no banco', async () => {
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

  it('Verificando se o cadastro do usuário foi um sucesso', async () => {
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