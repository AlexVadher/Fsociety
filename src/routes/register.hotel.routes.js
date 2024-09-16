import { Router } from "express";
import pool from "../config/database.js";

const router = Router();

router.get("/register.hotel.routes", (req, res) => {
  try {
    res.render("hotels/registerHotel");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/register.hotel", async (req, res) => {
  try {
    const {
      nombre,
      telefono,
      ubicacion,
      estrellas,
      disponibilidad,
      descripcion,
    } = req.body;

    const newHotel = {
      nombre,
      telefono,
      ubicacion,
      estrellas,
      disponibilidad,
      descripcion,
    };

    console.log("Datos del nuevo hotel:", newHotel); // Log para verificar los datos

    const result = await pool.query("INSERT INTO hoteles SET ?", [newHotel]);
    console.log("Resultado de la inserción:", result); // Log para verificar el resultado de la inserción

    res.redirect("/listHoteles"); // redirigir a la página de inicio de sesión
  } catch (err) {
    console.error("Error al insertar el usuario:", err); // Log para verificar el error
    res.status(500).json({ message: err.message });
  }
});

router.get("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [hotel] = await pool.query("SELECT * FROM hoteles WHERE id = ?", [id]);
    const hotelUpdate = user[0];
    res.render("admin/edit", { hotel: hotelUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un usuario por su id en el panel de administración
router.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM hoteles WHERE id = ?", [id]);
    res.redirect("/hotels/list");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
