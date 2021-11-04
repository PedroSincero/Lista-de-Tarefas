import React from 'react';
import * as S from './styles';
import { MdDeleteOutline }  from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

export const ListItem = () => {
  return (
    <S.Container>
    <button className="delete" type="button" onClick={() => console.log('deletando')}><MdDeleteOutline /></button>
    <button className="edit" type="button" onClick={() => console.log('editando')}><AiOutlineEdit /></button>
      task teste
    <button className="status" onClick={() => console.log('alterando status')}>Pendente</button>
    </S.Container>
  )
}

// Agradecimentos a Leandro Reis por me auxiliar na utilização do React Icons