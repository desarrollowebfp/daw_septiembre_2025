import { render, screen } from "@testing-library/react";
import EstadoPanel from "../components/EstadoPanel";

describe("EstadoPanel", () => {
  it("Muestra 'Panel Abierto' con la prop abierto = true", () => {
    render(<EstadoPanel abierto={true} />);
    expect(screen.getByText("Panel abierto")).toBeInTheDocument();
  });

  it("El texto del componente cambia si cambia la prop durante su funcionamiento", () => {
    const { rerender } = render(<EstadoPanel abierto={true} />);
    expect(screen.getByText("Panel abierto")).toBeInTheDocument();
    rerender(<EstadoPanel abierto={false}/>)
    expect(screen.getByText("Panel cerrado")).toBeInTheDocument();
  });
});
