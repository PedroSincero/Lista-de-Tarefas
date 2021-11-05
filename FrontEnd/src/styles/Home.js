import styled from 'styled-components'

// Teste
// export const Title = styled.h1`
//   color: #f00;
//   font-size: ${props => `${props.fontSize}px`};
//   span {
//     color: black;
//     font-size: 12px;
//   }
// `;
// // Pegando as info de Title e adicionando novos valores
// export const TitleSmall = styled(Title)`
//   color: #00f;
//   font-size: 16px;
// `;

export const Container = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
`;

export const Area = styled.div`
  margin: auto;
  max-width: 980px;
  padding: 10px;
`;

export const Header = styled.h1`
  color: #fff; 
  text-align: center;
  border-bottom: 1px solid #444;
  padding-bottom: 20px;
  font-size: 40px;
`;

export const Button = styled.button`
  color: #fff;
  margin-right: 5px;
  font-size: 40px;
  background: transparent;
`
// Agradecimentos a https://www.youtube.com/watch?v=R3S8DEzEn6s este video me auxiliou na utilização do styledComponents