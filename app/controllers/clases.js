class Usuario {
    constructor(uuid, nombre, correo, contraseña, celular, dondeVive, alojamientos = [], esHost, descripcion, reservaciones = []) {
      this._uuid = uuid;
      this._nombre = nombre;
      this._correo = correo;
      this._contraseña = contraseña;
      this._celular = celular;
      this._dondeVive = dondeVive;
      this._alojamientos = alojamientos;
      this._esHost = esHost;
      this._descripcion = descripcion;
      this._reservaciones = reservaciones;
    }
  
    // Getters
    get uuid() {
      return this._uuid;
    }
  
    get nombre() {
      return this._nombre;
    }
  
    get correo() {
      return this._correo;
    }
  
    get contraseña() {
      return this._contraseña;
    }
  
    get celular() {
      return this._celular;
    }
  
    get dondeVive() {
      return this._dondeVive;
    }
  
    get alojamientos() {
      return this._alojamientos;
    }
  
    get esHost() {
      return this._esHost;
    }
  
    get descripcion() {
      return this._descripcion;
    }
  
    get reservaciones() {
      return this._reservaciones;
    }
  
    // Setters
    set uuid(uuid) {
      this._uuid = uuid;
    }
  
    set nombre(nombre) {
      this._nombre = nombre;
    }
  
    set correo(correo) {
      this._correo = correo;
    }
  
    set contraseña(contraseña) {
      this._contraseña = contraseña;
    }
  
    set celular(celular) {
      this._celular = celular;
    }
  
    set dondeVive(dondeVive) {
      this._dondeVive = dondeVive;
    }
  
    set alojamientos(alojamientos) {
      this._alojamientos = alojamientos;
    }
  
    set esHost(esHost) {
      this._esHost = esHost;
    }
  
    set descripcion(descripcion) {
      this._descripcion = descripcion;
    }
  
    set reservaciones(reservaciones) {
      this._reservaciones = reservaciones;
    }
  }
  
 class Alojamiento {
    constructor(uuid, host, titulo, descripcion, banos, camas, habitaciones, huespedes, categorias, imagenes = [], precioPorNoche, estado, reservaciones = []) {
      this._uuid = uuid;
      this._host = host;
      this._titulo = titulo;
      this._descripcion = descripcion;
      this._banos = banos;
      this._camas = camas;
      this._habitaciones = habitaciones;
      this._huespedes = huespedes;
      this._categorias = categorias;
      this._imagenes = imagenes;
      this._precioPorNoche = precioPorNoche;
      this._estado = estado;
      this._reservaciones = reservaciones;
    }
  
    // Getters
    get uuid() {
      return this._uuid;
    }
  
    get host() {
      return this._host;
    }
  
    get titulo() {
      return this._titulo;
    }
  
    get descripcion() {
      return this._descripcion;
    }
  
    get banos() {
      return this._banos;
    }
  
    get camas() {
      return this._camas;
    }
  
    get habitaciones() {
      return this._habitaciones;
    }
  
    get huespedes() {
      return this._huespedes;
    }
  
    get categorias() {
      return this._categorias;
    }
  
    get imagenes() {
      return this._imagenes;
    }
  
    get precioPorNoche() {
      return this._precioPorNoche;
    }
  
    get estado() {
      return this._estado;
    }
  
    get reservaciones() {
      return this._reservaciones;
    }
  
    // Setters
    set uuid(uuid) {
      this._uuid = uuid;
    }
  
    set host(host) {
      this._host = host;
    }
  
    set titulo(titulo) {
      this._titulo = titulo;
    }
  
    set descripcion(descripcion) {
      this._descripcion = descripcion;
    }
  
    set banos(banos) {
      this._banos = banos;
    }
  
    set camas(camas) {
      this._camas = camas;
    }
  
    set habitaciones(habitaciones) {
      this._habitaciones = habitaciones;
    }
  
    set huespedes(huespedes) {
      this._huespedes = huespedes;
    }
  
    set categorias(categorias) {
      this._categorias = categorias;
    }
  
    set imagenes(imagenes) {
      this._imagenes = imagenes;
    }
  
    set precioPorNoche(precioPorNoche) {
      this._precioPorNoche = precioPorNoche;
    }
  
    set estado(estado) {
      this._estado = estado;
    }
  
    set reservaciones(reservaciones) {
      this._reservaciones = reservaciones;
    }
  }
  
class Reservacion {
    constructor(uuid, fechaEntrada, fechaSalida, alojamiento, host, cliente, precioTotal) {
      this._uuid = uuid;
      this._fechaEntrada = fechaEntrada;
      this._fechaSalida = fechaSalida;
      this._alojamiento = alojamiento;
      this._host = host;
      this._cliente = cliente;
      this._precioTotal = precioTotal;
    }
  
    // Getters
    get uuid() {
      return this._uuid;
    }
  
    get fechaEntrada() {
      return this._fechaEntrada;
    }
  
    get fechaSalida() {
      return this._fechaSalida;
    }
  
    get alojamiento() {
      return this._alojamiento;
    }
  
    get host() {
      return this._host;
    }
  
    get cliente() {
      return this._cliente;
    }
  
    get precioTotal() {
      return this._precioTotal;
    }
  
    // Setters
    set uuid(uuid) {
      this._uuid = uuid;
    }
  
    set fechaEntrada(fechaEntrada) {
      this._fechaEntrada = fechaEntrada;
    }
  
    set fechaSalida(fechaSalida) {
      this._fechaSalida = fechaSalida;
    }
  
    set alojamiento(alojamiento) {
      this._alojamiento = alojamiento;
    }
  
    set host(host) {
      this._host = host;
    }
  
    set cliente(cliente) {
      this._cliente = cliente;
    }
  
    set precioTotal(precioTotal) {
      this._precioTotal = precioTotal;
    }
  }
  
  // Ejemplo de uso
  const usuarioEjemplo = new Usuario(
    "12345",
    "John Doe",
    "john@example.com",
    "password123",
    "555-1234",
    "Ciudad de Ejemplo",
    ["Alojamiento 1", "Alojamiento 2"],
    true,
    "Anfitrión amigable",
    ["Reservación 1", "Reservación 2"]
  );
  // Ejemplo de uso
  const alojamientoEjemplo = new Alojamiento(
    "12345",
    "Anfitrión 1",
    "Casa Acogedora",
    "Una casa hermosa con vistas impresionantes",
    2,
    3,
    2,
    6,
    ["Familia", "Vistas"],
    ["imagen1.jpg", "imagen2.jpg", "imagen3.jpg", "imagen1.jpg", "imagen1.jpg"],
    100.0,
    "Disponible",
    []
  );
  
  const reservacionEjemplo = new Reservacion(
    "67890",
    new Date("2023-01-15"),
    new Date("2023-01-20"),
    "12345",
    "Anfitrión 1",
    "Cliente 1",
    500.0
  );
  
  // Acceder a los datos con getters
  console.log(alojamientoEjemplo.titulo);
  console.log(reservacionEjemplo.fechaEntrada);
  

  // Acceder a los datos con getters
  console.log(usuarioEjemplo.nombre);
  console.log(usuarioEjemplo.correo);
  
  // Modificar datos con setters
  usuarioEjemplo.nombre = "Nuevo Nombre";
  console.log(usuarioEjemplo.nombre);
  