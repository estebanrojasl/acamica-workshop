var bodyContent;
const contenedor_reg = document.getElementById("container_form_reg");
const mensaje_reg = document.createElement("p");
mensaje_reg.innerHTML = "";
contenedor_reg.appendChild(mensaje_reg);

document.getElementById("btnRegistrar").onclick = () => {
  const usuario = document.getElementById("email_signin").value;
  const contra = document.getElementById("password_signin").value;
  const nombre = document.getElementById("username_signin").value;
  bodyContent = {
    name: `${nombre}`,
    email: `${usuario}`,
    password: `${contra}`,
  };
  signInFetch(SIGNIN, bodyContent);
};

const signInFetch = async (url, authData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
      mode: "cors",
    });
    let res = await response.json();
    if (response.ok) {
      mensaje_reg.innerHTML = "Registrado!!";
      return res.token;
    } else {
      mensaje_reg.innerHTML = "Error intenta luego";
      console.log(res);
    }
    const contenedor = document.getElementById("container_form_reg");
    contenedor.appendChild(mensaje_reg);
    return null;
  } catch (error) {
    console.log("Error: ", error);
  }
};
