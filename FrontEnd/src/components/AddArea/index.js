import React from 'react';
import * as S from './styles';
import { MdPostAdd } from 'react-icons/md';

export const AddArea = () => {
  return (
    <S.Container>
      <button type="button" className="add" onClick={() => console.log('Adicionei')}>
        <MdPostAdd/>
      </button>
      <input
        type="text"
        placeholder="Adicione uma tarefa"
      />
    </S.Container>
  )
}