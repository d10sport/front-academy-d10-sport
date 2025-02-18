import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const user = context.user;

  const [courses, setCourses] = useState([]);

  async function getDateCourses() {
    try {
      const response = await axios.get(`${urlApi}/academy/g/courses`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });
      setCourses(response.data || []);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  }

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      getDateCourses();
    }
  }, [context.token]);

  return (
    <>
      <section className="section__home">
        <h1 className="title__home margin--space">
          Bienvenido {user?.first_names}
        </h1>
        <div className="cntr-big-img__home">
          <img src={Example} alt="" className="img__home" />
        </div>
        <h1 className="title__home title--color__home margin--space">
          Explora nuestras secciones de curso:
        </h1>
        <h2 className="subtitle__home">
          Explora nuestras secciones de cursos. Ideales para encontrar la
          formación perfecta en todo tipo de ámbito deportivo
        </h2>
        <div className="cntr-course__home">
          {courses.map((course) => (
            <div key={course.id} className="item__home">
              <h1 className="title__home title--color__home title-center__home margin--space">
                {course.course_title}
              </h1>
              <div className="cntr-info__home">
                <div className="cntr-small-img__home">
                  <img
                    src={course.main_photo?.bg_photo}
                    alt="Imagen del curso"
                  />
                </div>
                <div className="subcntr-info__home">
                  <p className="text__home">{course.description_course}</p>
                  <Link to={`/class/${course.id}`} className="link__home">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
