import styled from 'styled-components';

export const Container = styled.div`
border: 1px solid #555;
border-radius: 15px;
padding: 10px;
margin: 20px 0;
display: flex;
align-items: center;

.add {
  color: #fff;
  margin-right: 5px;
  font-size: 40px;
  background: transparent;
}

input {
  background-color: transparent;
  outline: 0;
  color: #fff;
  font-size: 18px;
  flex: 1;
}
`;