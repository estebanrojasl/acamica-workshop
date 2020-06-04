var bodyContent;
const contenedor = document.getElementById("container_form");
const mensaje = document.createElement("p");
mensaje.innerHTML = "";
contenedor.appendChild(mensaje);

document.getElementById("btnlogin").onclick = () => {
  const usuario = document.getElementById("username_login").value;
  const contra = document.getElementById("password_login").value;
  bodyContent = { email: `${usuario}`, contrasena: `${contra}` };
  loginFetch(LOGIN, bodyContent);
};

const loginFetch = async (url, authData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
      mode: "cors",
    });
    if (response.ok) {
      mensaje.innerHTML = "Bienvenido!!";
      let res = await response.json();
      if (res.tipousuario === "A") {
        guardarToken(res.token);
        setUrl("admin.html");
      } else {
        setUrl("/../../index.html");
      }
      return res.token;
    } else {
      mensaje.innerHTML = "Usuario o clave invalida!";
      console.log("Usuario o clave invalida");
    }
    const contenedor = document.getElementById("container_form");
    contenedor.appendChild(mensaje);
    return null;
  } catch (error) {
    console.log("Error: ", error);
  }
};

const guardarToken = (token) => {
  sessionStorage.setItem("token", token);
};

const setUrl = (url) => {
  window.location.href = url;
};
