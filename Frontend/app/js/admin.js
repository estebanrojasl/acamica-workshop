const contenedor = document.getElementById("compradores-contenedor");
const mensaje = document.createElement("p");
mensaje.innerHTML = "";
contenedor.appendChild(mensaje);

contenedor.appendChild(mensaje);
const compradoresFetch = async (url) => {
  try {
    let token = sessionStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      mode: "cors",
    });
    let res = await response.json();
    mensaje.innerHTML = JSON.stringify(res);
    if (!response.ok) {
      setUrl("login.html");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

const setUrl = (url) => {
  window.location.href = url;
};

compradoresFetch(COMPRADORES);

const crearPaqueteApi = async (url) => {
  try {
    let token = sessionStorage.getItem("token");
    let paquete = crearPaquete();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(paquete),
      mode: "cors",
    });
    let res = await response.json();
    console.log(res);
    // if (!response.ok) {
    //   setUrl("login.html");
    // }
  } catch (error) {
    console.log("Error: ", error);
  }
};

const crearPaquete = () => {
  const paquete = {};
  paquete.imageUrl = document.getElementById("url-img").value;
  paquete.packageName = document.getElementById("name").value;
  paquete.destination = document.getElementById("destination").value;
  paquete.description = document.getElementById("description").value;
  paquete.quantity = document.getElementById("quantity").value;
  paquete.price = document.getElementById("description").value;
  return paquete;
};

document.getElementById("crear-paquete-btn").onclick = () => {
  crearPaqueteApi(PAQUETES);
};
