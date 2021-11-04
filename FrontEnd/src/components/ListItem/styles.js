import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  background-color: #20212C;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  align-items: center;
  position: relative;
  /* text-align: center; */

  .delete, .edit {
  color: #fff;
  margin-right: 5px;
  font-size: 40px;
  background: transparent;
  }

  .status {
    color: #fff;
    background: transparent;
    position: absolute;
    right: 5px;
    top: 5px;
    padding: 4px;
  }
`;

export const Input = styled.input`
  background-color: transparent;
  border-radius: 15px;
  border: 1px solid #555;
  padding: 10px;
  color: #fff;
  font-size: 18px;
`
