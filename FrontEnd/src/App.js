import React from 'react';
import './styles/App.css';
import * as sH from './styles/Home';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';

function App() {
  return (
    <sH.Container>

      <sH.Area>
        <sH.Header> Lista de Tarefas </sH.Header>
      <AddArea />
      <ListItem />
      </sH.Area>

    </sH.Container>
  );
}

export default App;
