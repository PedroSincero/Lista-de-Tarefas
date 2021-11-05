import React, {useEffect, useState} from 'react';
import './styles/App.css';
import * as sH from './styles/Home';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';
import api from './services/api';
import { GoListOrdered } from 'react-icons/go';


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
    api
    .post('/tasks',  { task, status })
    .then(() => findAll())
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  const sort = () => {
    const result = tasks.sucess.sort((a, b) => a.task.localeCompare(b.task));
    setTasks({sucess: result});
  }

  return (
    <sH.Container>

      <sH.Area>
        <sH.Header> Lista de Tarefas </sH.Header>
      <AddArea addTask={ addTask }/>
      <sH.Button type="button" onClick={() => sort()}><GoListOrdered /></sH.Button>
      {tasks &&  tasks.sucess.map(({ _id, task, status }, index) => (
        <ListItem key={index} _id={_id} task={task} status={status} handleUpdate={ handleUpdate } handleDelete={ handleDelete }/>
      ))}
      </sH.Area>

    </sH.Container>
  );
}

export default App;

// Agradecimentos Joao Vanelli Turma 10 - Tribo B - Pelo auxilio na construição do Map
// Agradecimentos a Lucas Martins pela ajuda em resolver o erro no handleDelete
// Agradecimentos a Este Video >> https://www.youtube.com/watch?v=95sAtAareR8 Pois me auxiliou a dar os primeiros passos no front-end
// Agradecimentos a https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript/51897069 me ajudou a criar o botao de sort