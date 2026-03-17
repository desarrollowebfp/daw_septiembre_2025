import { Main, Hero, Title, Text, Button } from "./components";

const App = () => {
  return (
    <>
      <Main>
        <Hero>
          <Title>Mi primera aplicación con Styled Components</Title>
          <Text>
            De esta manera podemos mezclar estilos y lógica en el mismo fichero
            sin necesidad de CSS externo.
          </Text>
          <Text>
            Y podemos tener una librería de componentes bastante reutilizable.
          </Text>
          <Button primary>Login</Button>
          <Button>Register</Button>
        </Hero>
      </Main>
    </>
  );
};

export default App;
