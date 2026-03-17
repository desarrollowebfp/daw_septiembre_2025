import styled from "styled-components";

const ButtonStyled = styled.button`
  padding: 12px 20px;
  border-radius: 10px;
  border: 2px solid #2563eb;
  background-color: ${(props) => (props.primary ? "#2563eb" : "white")};
  color: ${(props) => (props.primary ? "#white" : "#2563eb")};
  font-size: 16px;
  &:hover {
    background-color: ${(props) => (props.primary ? "#blue" : "lightgrey")};
  }
`;

const Button = ({ children, primary }) => {
  return (
    <ButtonStyled primary={JSON.stringify(primary)}>{children}</ButtonStyled>
  );
};

export default Button;
