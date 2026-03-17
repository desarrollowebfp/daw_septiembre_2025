import styled from "styled-components";

const TitleStyled = styled.h1`
  font-size: 40px;
  font-weight: 900;
  letter-spacing: 2.3px;
`;

const Title = ({ children }) => {
  return <TitleStyled>{children}</TitleStyled>;
};

export default Title;
