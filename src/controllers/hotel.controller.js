import hotelModel from "../models/hotel.model.js"; // Importar el modelo de hoteles

export class hotelModel {
  static async registerHotels(req, res) {
    try {
      // Obtener los datos del formulario de registro desde req.body y validarlos
      const {
        nombre,
        telefono,
        ubicacion,
        estrellas,
        disponibilidad,
        descripcion,
      } = req.body;

      console.log("Datos recibidos:", req.body);

      // Llamar al método createUser de la clase UserModel
      const result = await hotelModel.createHotel({
        nombre,
        telefono,
        ubicacion,
        estrellas,
        disponibilidad,
        descripcion,
      });

      console.log("Resultado de la creación del hotel:", result); // Registro de resultado

      res.redirect("/");
    } catch (err) {
      console.error("Error al registrar el hotel:", err); // Mejorar el registro de errores
      res.status(500).json({
        message: "Error 500:" + err.message,
        body: req.body,
      });
    }
  }
  static async updateHotel(req, res) {
    try {
      // Obtener el id del usuario desde req.params
      const { id } = req.params;

      // Obtener los datos del formulario de actualización desde req.body
      const {
        nombre,
        telefono,
        ubicacion,
        estrellas,
        disponibilidad,
        descripcion,
      } = req.body;

      // Llamar al método updateUser de la clase UserModel
      const result = await hotelModel.updateHotel({
        id,
        nombre,
        telefono,
        ubicacion,
        estrellas,
        disponibilidad,
        descripcion,
      });

      console.log("Resultado de la actualización del hotel:", result); // Registro de resultado

      res.status(200).json({
        message: "hotel actualizado exitosamente",
        body: result,
      });
    } catch (err) {
      console.error("Error al actualizar el hotel:", err); // Mejorar el registro de errores
      res.status(500).json({
        message: "Error 500:" + err.message,
        body: req.body,
      });
    }
  }
}

export default hotelController;
