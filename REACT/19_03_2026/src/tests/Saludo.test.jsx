import { render, screen } from "@testing-library/react";
import Saludo from "../components/Saludo";

describe("Saludo", () => {
  it("El componente muestra el texto hola y tiene semántica de heading", () => {
    render(<Saludo />);

    expect(screen.getByRole("heading", { name: /hola/i })).toBeInTheDocument();
  });
});

//Poniendo el texto con /____/i no distinguir mayusculas y minusculas
