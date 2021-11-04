import React, { useState } from 'react';
import * as S from './styles';
import { MdDeleteOutline }  from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import PropTypes from 'prop-types';

export const ListItem = ({_id, task, status }) => {

  const [setStatusList] = useState('Pendente');


  const addStatus = (value) => {
    if(value === 'Pendente')  return setStatusList('Em andamento');
    if(value === 'Em andamento') return setStatusList('Pronto');
    if(value === 'Pronto') return setStatusList('Pendente');
  }

  return (
    <S.Container>
    <button id={_id} className="delete" type="button" onClick={() => console.log('deletando')}><MdDeleteOutline /></button>
    <button className="edit" type="button" onClick={() => console.log('editando')}><AiOutlineEdit /></button>
      {task}
    <button id={_id}className="status" type="button"  onClick={(e) => addStatus(e.target.textContent)}>{status}</button>
    </S.Container>
  )
}

ListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

// Agradecimentos a Leandro Reis por me auxiliar na utilização do React Icons *