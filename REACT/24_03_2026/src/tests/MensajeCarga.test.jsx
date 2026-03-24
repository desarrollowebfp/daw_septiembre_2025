import { render, screen } from "@testing-library/react";
import MensajeCarga from "../components/MensajeCarga";

describe("MensajeCarga", () => {
  it("El componente empieza con el texto Cargando...", () => {
    render(<MensajeCarga />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });
  it("Cuando pasan dos segundos, el texto es 'Listo'", async () => {
    render(<MensajeCarga />);
    expect(await screen.findByText("Listo")).toBeInTheDocument();
  });
});
