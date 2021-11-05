import React, { useState } from 'react';
import * as S from './styles';
import { MdPostAdd } from 'react-icons/md';
import PropTypes from 'prop-types';

export const AddArea = ({ addTask }) => {
  const [inputText, setInputText] = useState('');

  return (
    <S.Container>
      <button type="button" className="add" onClick={() => addTask(inputText, 'Pendente')}>
        <MdPostAdd/>
      </button>
      <input
        type="text"
        placeholder="Adicione uma tarefa"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </S.Container>
  )
}

AddArea.propTypes = {
  addTask: PropTypes.func.isRequired,
};