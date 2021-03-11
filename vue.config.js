module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/router/" : "/"
  // Para funcionar en una carpeta especifica, se cambia el publicPath, en este caso se quiere guardar lo que esta en dist en la carpeta "test3".
  // Creamos una carpeta llamada "test3" dentro de "dist" y todo lo que esta dentro de "dist" lo movemos a "test3"
  publicPath: process.env.NODE_ENV === "production" ? "/apps/mal/" : "/"
};
