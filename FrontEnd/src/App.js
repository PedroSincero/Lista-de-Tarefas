import React from 'react';
import './styles/App.css';
import * as sH from './styles/Home';
import { ListItem } from './components/ListItem';

function App() {
  return (
    <sH.Container>
      <sH.Area>
        <sH.Header> Lista de Tarefas </sH.Header>
      </sH.Area>
      
      <ListItem />
    </sH.Container>
  );
}

export default App;
