const apiFetch = async (url) => {
  try {
    const response = await fetch(url, {
      mode: "cors",
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.log("Error ", error);
  }
};

const crearArray = async (url) => {
  const data = await apiFetch(url);
  if (data) {
    let arrayObjetosPaquete = [];
    data.forEach((element) => {
      let objetoPaquete = new Object();
      objetoPaquete.nombre = element.packageName;
      objetoPaquete.imagen = element.imageUrl;
      objetoPaquete.destino = element.destination;
      objetoPaquete.descripcion = element.description;
      arrayObjetosPaquete.push(objetoPaquete);
    });
    return arrayObjetosPaquete;
  } else {
    console.log("Error in fetch response");
  }
};

const cargarDatos = async (url) => {
  const contenedor = document.getElementById("container_paquete");
  contenedor.innerHTML = "";
  let array = await crearArray(url);
  array.forEach((element, index) => {
    const contenedorPaquete = document.createElement("div");
    contenedorPaquete.setAttribute("class", "card_paquete");
    const img = document.createElement("img");
    img.setAttribute("src", array[index].imagen);
    img.setAttribute("alt", array[index].nombre);
    //luego seguro hay que ponerle clase
    img.setAttribute("class", "");
    const contenedorInfo = document.createElement("div");
    contenedorInfo.setAttribute("class", "container");
    const destino = document.createElement("h3");
    destino.innerHTML = array[index].destino;
    //agregar clase para ponerlo bold
    destino.setAttribute("class", "");
    const descripcion = document.createElement("p");
    descripcion.innerHTML = array[index].descripcion;
    const boton = document.createElement("button");
    boton.innerHTML = "Comprar";
    contenedorPaquete.appendChild(img);
    contenedorPaquete.appendChild(contenedorInfo);
    contenedorInfo.appendChild(destino);
    contenedorInfo.appendChild(descripcion);
    contenedorInfo.appendChild(boton);
    contenedor.appendChild(contenedorPaquete);
  });
};

cargarDatos(PAQUETES);
