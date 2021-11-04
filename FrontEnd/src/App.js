import React, {useEffect, useState} from 'react';
import './styles/App.css';
import * as sH from './styles/Home';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';
import api from './services/api';

function App() {
  const [task, setTask] = useState();

  useEffect(() => {
    api
      .get('/tasks')
      .then((response) => setTask(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <sH.Container>

      <sH.Area>
        <sH.Header> Lista de Tarefas </sH.Header>
      <AddArea />
      {task && task.sucess.map(({ _id, task, status }, index) => (
        <ListItem key={index} _id={_id} task={task} status={status}/>
      ))}
      </sH.Area>

    </sH.Container>
  );
}

export default App;
