import { React, useState } from "react";
import { useStore } from "../hooks/useStore";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const [imageURLs, setImageURLs] = useState([]);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("profile_picture", image.data);
    formData.append("email", inputs.email);
    const response = fetch("http://localhost:5005/update_profile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.warn(result);
      })
      .catch((error) => console.warn("error", error));

    // if (response) setStatus(response.statusText);

    console.warn(inputs);
  };
  const { authData, setAuthData } = useStore();
  console.warn(authData);
  if (!authData) {
    return (
      <>
        <h1>se connecter</h1>
      </>
    );
  }

  return (
    <>
      <div className="container" style={{ margin: "2em" }}>
        <h2 className="container">Modifier mon profil</h2>
        {image.preview && (
          <img src={image.preview} width="100" height="100" alt="img" />
        )}
        <form className="container" onSubmit={handleSubmit}>
          <br />
          <label>
            Nom :
            <input
              type="text"
              name="username"
              value={inputs.username || ""}
              onChange={handleChange}
            />
          </label>{" "}
          <br />
          <label>
            Email :
            <input
              type="email"
              name="email"
              value={inputs.email || "gildas.le-drogoff@epitech.eu"}
              onChange={handleChange}
            />
          </label>
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imageURLs.map((imageSrc) => (
            <img src={imageSrc} alt="profile_picture" />
          ))}
          {status && <h4>{status}</h4>}
          {/* {console.warn(authData)} */}
          {authData.token ? (
            <div className="container">
              <h3>{authData.name}</h3>
              <h3>{authData.email}</h3>
              <img src={authData.image} alt="" />
              <br />
              <br />
              <label for="my_profile">Ma description :</label>
              <textarea
                id="my_profile"
                name="textarea"
                rows="5"
                cols="30"
                minlength="10"
                maxlength="30"
              ></textarea>
              <button
                type="submit"
                style={{ width: "25%" }}
                onClick={() => {
                  // googleLogout();
                  // setAuthData(localStorage.removeItem("my_events"));
                  // navigate("/" + location.search);
                }}
              >
                Sauvegarder
              </button>
            </div>
          ) : (
            <>
              <div>YOO</div>
            </>
          )}
        </form>
      </div>
    </>
  );
};
export default Profile;
