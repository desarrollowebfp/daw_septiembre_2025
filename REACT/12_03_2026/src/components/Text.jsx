import styled from "styled-components";

const TextStyled = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #334155;
  margin-bottom: 18px;
`;

const Text = ({ children }) => {
  return <TextStyled>{children}</TextStyled>;
};

export default Text;
