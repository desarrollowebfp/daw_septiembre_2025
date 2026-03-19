import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contador from "../components/Contador";

describe("Contador", () => {
  it("El contador empieza siendo 0 y se muestra en la interfaz", () => {
    render(<Contador />);
    expect(screen.getByText("Valor: 0")).toBeInTheDocument();
  });

  it("El contador muestra uno cuando un usuario clica el botón", async () => {
    const user = userEvent.setup();
    render(<Contador />);
    await user.click(screen.getByRole("button", { name: "Sumar" }));
    expect(screen.getByText("Valor: 1")).toBeInTheDocument();
  });
});
