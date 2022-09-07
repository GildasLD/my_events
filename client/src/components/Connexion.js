import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const hash = require("object-hash");
const sha1 = require("sha1");
const { v4: uuidv4 } = require("uuid");

const Connexion = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  const [state, setState] = useState({
    name: "Gildas Le Drogoff",
    email: "gildas.le-drogoff@epitech.eu",
    password: sha1("very_secure_pwd"),
  });
  console.warn(state);

  const [result, setResult] = useState(null);

  const sendForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5005/login", { ...state })
      .then((response) => {
        localStorage.setItem("my_events", JSON.stringify(response.data.user));
        setResult(response.data);
        console.warn(response.data);
        window.location.reload();
        navigate("/profile" + location.search, { replace: true });
        setState({
          name: "Gildas Le Drogoff",
          email: "gildas.le-drogoff@epitech.eu",
          password: sha1("very_secure_pwd"),
        });
      })
      .catch((error) => {
        console.error(error);
        setResult({
          success: false,
          message:
            error.response.data || "Something went wrong. Try again later",
        });
      });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="container" style={{ margin: "2em" }}>
      {result && (
        <p className={`${result.success ? "success" : "error"}`}>
          {result.message}
        </p>
      )}
      <form className="container" onSubmit={sendForm}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={state.name}
            onChange={onInputChange}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={onInputChange}
            // REGEX HERE
          />
        </label>
        <br />

        <label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={onInputChange}
          />
        </label>
        <br />

        <input type="submit" style={{ width: "25%" }} className="btn btn-sm" />
      </form>
    </div>
  );
};

export default Connexion;
