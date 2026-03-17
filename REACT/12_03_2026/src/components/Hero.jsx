import styled from "styled-components";

const HeroStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px dashed lightgrey;
  text-align: center;
`;

const Hero = ({ children }) => {
  return <HeroStyled>{children}</HeroStyled>;
};

export default Hero;
