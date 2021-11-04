const frisby = require('frisby');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_NAME } = process.env;
const URL = 'http://localhost:3000';

describe('3 - Validando Metodo POST da Rota "/tasks"  ', () => {
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
    await db.collection('tasks').deleteMany({});
    const task = {
      task: 'admin'
    };
    await db.collection('tasks').insertOne(task);
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

  it('Será Validado se o campo "task" é obrigatório', async () => {
    await frisby
    .post(`${URL}/tasks`,
    {

    })
    .expect('status', 400)
    .then((res) => {
      const { body } = res;
      const result = JSON.parse(body);
      expect(result.message).toBe('"task" is required')
    })
  });

  it('Será Validado se a task foi enviada com sucedido', async () => {
    await frisby
      .post(`${URL}/tasks`,
      {
        task: 'testeTASK'
      })
      .expect('status', 201)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result).toHaveProperty('sucess');
      })
  })
});

describe('4 - Validando Metodo GET da Rota "/tasks"  ', () => {
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
    await db.collection('tasks').deleteMany({});
    const task = {
      task: 'admin'
    };
    await db.collection('tasks').insertOne(task);
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

  it('Será Validado se é retornado "sucess" ao requisitar todas as tasks', async () => {
    await frisby
      .get(`${URL}/tasks`)
      .expect('status', 200)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result).toHaveProperty('sucess');
      })
  })
  
});

describe.only('5 - Validando Metodo PUT da rota "/tasks"',  () => {
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
    await db.collection('tasks').deleteMany({});
    const task = {
      task: 'admin'
    };
    await db.collection('tasks').insertOne(task);
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

  it('Será Validado se o campo "id" é invalido', async () => {
    await frisby
    .put(`${URL}/tasks`,
    {
      id: '0010001000100',
      task: 'task suprema'
    })
    .expect('status', 400)
    .then((res) => {
      const { body } = res;
      const result = JSON.parse(body);
      expect(result.message).toBe('Invalid ID, try again.');
    })
  })

  it('Será Validado se a task foi editada com sucesso', async () => {
    let result;
    
    await frisby
    .post(`${URL}/tasks`,
    {
      task: 'testeTASK'
    })
    .expect('status', 201)
    .then((res) => {
      const { body } = res;
      result = JSON.parse(body);
    });

      await frisby
      .put(`${URL}/tasks`,
      {
        id: result.sucess,
        task: 'task suprema'
      })
      .expect('status', 201)
      .then((res) => {
        const { body } = res;
        const result = JSON.parse(body);
        expect(result).toHaveProperty('sucess');
      })
  })
})