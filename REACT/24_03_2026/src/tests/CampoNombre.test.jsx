import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CampoNombre from "../components/CampoNombre";

describe("CampoNombre", () => {
  it("Comprobamos el funcionamiento del input cambiante", async () => {
    const user = userEvent.setup();
    render(<CampoNombre />);
    //Obtenemos el input a través del texto de su label y de paso comprobamos que tenga un label correcto
    const input = screen.getByLabelText("Nombre");
    await user.type(input, "Carlos");
    expect(input).toHaveValue("Carlos");
    expect(screen.getByText("Nombre: Carlos")).toBeInTheDocument();
  });
});
