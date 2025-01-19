import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "sonner";
import axios from "axios";
import "./athlete-register.css";

export default function AthleteRegisterThree() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const navigate = useNavigate();

  function handleNameFamily(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      first_names_family: event.target.value,
    }));
  }

  function handleLastNameFamily(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      last_names_family: event.target.value,
    }));
  }

  function handleCellPhoneFamily(event) {
    const maxLength = 10;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterAthlete((prev) => ({
        ...prev,
        contact_family: inputValue,
      }));
    }
  }

  async function saveRegisterAthlete(data) {
    let res = false;
    await axios
      .post(`${urlApi}academy/register/athletes`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (!response.data.success) {
          toast.error(`${response.data.message}`);
          return;
        }
        res = true;
      })
      .catch(() => {
        res = false;
      });
    return res;
  }

  async function nextStep() {
    const validRegister = await context.validateEmptyAthlete();
    if (!validRegister) {
      toast.error("Por favor, complete todos los campos");
      return;
    }
    toast.promise(saveRegisterAthlete(context.registerAthlete), {
      loading: "Cargando...",
      success: (data) => {
        if (data) {
          context.clearRegisterAthlete();
          navigate("/success-register");
          return "Solicitud de Registro realizada";
        } else {
          return "Error al registrarte";
        }
      },
      error: "Error al filtrar entrenadores",
    });
  }

  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <div className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como deportista
          </h2>
          <label htmlFor="nombre-familia" className="label__login">
            Nombres del Padre o Madre
          </label>
          <input
            type="text"
            id="firstname_family"
            name="firstname_family"
            autoComplete="off"
            className="input__login"
            placeholder="Nombres"
            value={context.registerAthlete.first_names_family}
            onChange={(e) => handleNameFamily(e)}
          />
          <label htmlFor="apellido-familia" className="label__login">
            Apellidos del Padre o Madre
          </label>
          <input
            type="text"
            id="lastname_family"
            name="lastname_family"
            autoComplete="off"
            className="input__login"
            placeholder="Apellidos"
            value={context.registerAthlete.last_names_family}
            onChange={(e) => handleLastNameFamily(e)}
          />
          <label htmlFor="contacto-familia" className="label__login">
            Contacto del Padre o Madre
          </label>
          <input
            type="tel"
            id="contac_family"
            name="contac_family"
            autoComplete="off"
            className="input__login"
            placeholder="Número de celular"
            min={1}
            max={9999999999}
            step={1}
            value={
              context.registerAthlete.contact_family === 0
                ? ""
                : context.registerAthlete.contact_family
            }
            onChange={(e) => handleCellPhoneFamily(e)}
          />

          {/* <input
            type="tel"
            id="contac_family"
            name="contac_family"
            autoComplete="off"
            className="input__login"
            placeholder="Numero de celular"
            min={9999999}
            max={9999999999}
            step={1}
            value={
              context.registerAthlete.contact_family == 0
                ? ""
                : context.registerAthlete.contact_family
            }
            onChange={(e) => handleCellPhoneFamily(e)}
          /> */}
          <button onClick={() => nextStep()} className="button-three__login">
            Registrar
          </button>
          <button
            className="link__login link--color__login center-text__login"
            onClick={() => navigate("/register/athlete/step-two")}
          >
            Regresar
          </button>
        </div>
      </section>
    </>
  );
}
