import "./Form.css";
import { useForm } from "react-hook-form";

const espera = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data) => {
    await espera(4000);
    console.log("Datos del formulario:", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name"> Name</label>
      <input
        type="text"
        id="name"
        {...register("name", {
          required: "El nombre es obligatorio",
          maxLength: {
            value: 10,
            message: "Maximo 10 caracteres permitidos",
          },
        })}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        {...register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "El formato del email no es valido",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Registrar"}
      </button>
    </form>
  );
};

export default Form;
