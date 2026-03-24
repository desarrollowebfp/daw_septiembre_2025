import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MostrarAyuda from "../components/MostrarAyuda";

describe("MostrarAyuda", () => {
  it("Al renderizar de base no aparece el texto de ayuda", () => {
    render(<MostrarAyuda />);
    expect(
      screen.queryByText("Este texto es para ayudarte."),
    ).not.toBeInTheDocument();
  });

  it("Al pulsar el botón debe aparecer el texto de ayuda correcto", async () => {
    const user = userEvent.setup();
    render(<MostrarAyuda />);
    await user.click(screen.getByRole("button", { name: "Mostrar ayuda" }));
    expect(
      screen.getByText("Este texto es para ayudarte."),
    ).toBeInTheDocument();
  });

  it("El texto de ayuda se muestra y se oculta con clicks durante el renderizado", async () => {
    const user = userEvent.setup();
    render(<MostrarAyuda />);
    await user.click(screen.getByRole("button", { name: "Mostrar ayuda" }));
    expect(screen.getByText("Este texto es para ayudarte."));
    await user.click(screen.getByRole("button", { name: "Ocultar ayuda" }));
    expect(
      screen.queryByText("Este texto es para ayudarte."),
    ).not.toBeInTheDocument();
  });
});
