import React, {useEffect, useState} from 'react';
import './styles/App.css';
import * as sH from './styles/Home';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';
import api from './services/api';

function App() {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    findAll();
  }, []);

  const findAll = () => {
    api
    .get('/tasks')
    .then((response) => setTasks(response.data))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }
  
  const handleUpdate = async (_id, task, status) => {
    await api.put('/tasks',
    {
      id: _id,
      task,
      status
    })
    .then(() => {
      const updateTasks = tasks.sucess.map((el) => {
        if (el._id === _id) {
          return  {...el, task, status } ;
        }else {
          return el;
        }
      });
      setTasks({ sucess:updateTasks })
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  const handleDelete =  (id) => {
    api
    .delete('/tasks', { data: { id } })
    .then(() => findAll())
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  const addTask = (task, status) => {
    console.log('task: ', task, 'status: ', status);
    api
    .post('/tasks',  { task, status })
    .then(() => findAll())
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  return (
    <sH.Container>

      <sH.Area>
        <sH.Header> Lista de Tarefas </sH.Header>
      <AddArea addTask={ addTask }/>
      {tasks && tasks.sucess.map(({ _id, task, status }, index) => (
        <ListItem key={index} _id={_id} task={task} status={status} handleUpdate={ handleUpdate } handleDelete={ handleDelete }/>
      ))}
      </sH.Area>

    </sH.Container>
  );
}

export default App;

// Agradecimentos Joao Vanelli Turma 10 - Tribo B - Pelo auxilio na construição do Map
// Agradecimentos a Lucas Martins pela ajuda em resolver o erro no handleDelete