import React, { useState } from 'react';
import * as S from './styles';
import { MdDeleteOutline }  from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

export const ListItem = () => {
  const [statusList, setStatusList] = useState('Pendente');

  const addStatus = (value) => {
    console.log(value);
    if(value === 'Pendente')  return setStatusList('Em andamento');
    if(value === 'Em andamento') return setStatusList('Pronto');
    if(value === 'Pronto') return setStatusList('Pendente');
  }

  return (
    <S.Container>
    <button className="delete" type="button" onClick={() => console.log('deletando')}><MdDeleteOutline /></button>
    <button className="edit" type="button" onClick={() => console.log('editando')}><AiOutlineEdit /></button>
      task teste
    <button className="status" type="button"  onClick={(e) => addStatus(e.target.textContent)}>{statusList}</button>
    </S.Container>
  )
}

// Agradecimentos a Leandro Reis por me auxiliar na utilização do React Icons *