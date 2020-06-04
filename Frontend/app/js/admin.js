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
  } catch (error) {
    console.log("Error: ", error);
  }
};

compradoresFetch(COMPRADORES);
