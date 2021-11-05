import React, { useState } from 'react';
import * as S from './styles';
import { MdDeleteOutline }  from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import PropTypes from 'prop-types';

export const ListItem = ({_id, task, status, handleUpdate, handleDelete }) => {
  const [inputEdit, setInputEdit] = useState(false);
  const addStatus = async (value) => {
    if(value === 'Pendente') return await handleUpdate(_id, task, 'Em Andamento'); 
    if(value === 'Em Andamento') return await handleUpdate(_id, task, 'Pronto');
    if(value === 'Pronto') return await handleUpdate(_id, task, 'Pendente');
  }

  const openEdit = (value) => {
    if(value === false) {
      setInputEdit(true);
    }
    if(value === true) {
      setInputEdit(false);
    }
  }
  
  const editTask = async (value) => {
    return handleUpdate(_id, value, status);
  }

  return (
    <>
    <S.Container>
    <button id={_id} className="delete" type="button" onClick={() => handleDelete(_id)}><MdDeleteOutline /></button>
    <button className="edit" type="button" onClick={() => openEdit(inputEdit)}><AiOutlineEdit /></button>
      {task}
    <button id={_id} className="status" type="button"  onClick={(e) => addStatus(e.target.textContent)}>{status}</button>
    </S.Container>
    {inputEdit ? (
      <S.Input
        type="text"
        placeholder="Edite a Tarefa"
        value={task}
        onChange={(e) => editTask(e.target.value)}
      />) : undefined}
    </>
  )
}

ListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

// Agradecimentos a Leandro Reis por me auxiliar na utilização do React Icons *