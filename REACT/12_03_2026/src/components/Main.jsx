import styled from "styled-components";

const MainStyled = styled.main`
  min-height: 100vh;
  padding: 20px;
`;

const Main = ({ children }) => {
  return <MainStyled>{children}</MainStyled>;
};

export default Main;
