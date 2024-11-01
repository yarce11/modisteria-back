const { Insumo } = require("../models");
const {
  getAllInsumos,
  getInsumoById,
  createInsumo,
  updateInsumo,
  deleteInsumo,
  getInsumosByCategoria,
  cantidadInsumos,
  reponerInsumo,
} = require("../repositories/insumo.repository");
const { Sequelize } = require("sequelize");


exports.getAllInsumos = async (req, res) => {
  try {
    const insumos = await getAllInsumos();
    res.status(200).json(insumos);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getInsumosByCategoria = async (req, res) => {
  const { categoriaId } = req.params;
  try {
    const insumos = await getInsumosByCategoria(categoriaId);
    if (insumos.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron insumos para esta categoría" });
    }
    res.status(200).json(insumos);
  } catch (error) {
    console.error("Error al obtener insumos:", error);
    res
      .status(400)
      .json({ error: "Error al obtener los insumos", details: error.message });
  }
};

exports.reponerInsumo = async (req, res) => {
  const { id } = req.body;
  try {
    await reponerInsumo(id);
    res.status(201).json({ msg: "Reposición de insumos realizada." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.getInsumoById = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(id);
    const insumo = await getInsumoById(id);
    res.status(200).json(insumo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createInsumo = async (req, res) => {
  const insumo = req.body;

  try {
    console.log(req.body);
    await createInsumo(insumo);
    res.status(201).json({ msg: "insumo creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateInsumo = async (req, res) => {
  const { id } = req.params;
  const insumo = req.body;
  try {
    await updateInsumo(id, insumo);
    res.status(201).json({ msg: "insumo actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.cantidadInsumos = async (req, res) => {
  const { insumos } = req.body;
  const errors = []; 

  try {
    for (let ins of insumos) {
      const { id, cantidad } = ins;
      
      if (cantidad < 0) {
        const insumo = await getInsumoById(id);
        const cantidadInsumo = insumo.cantidad;
        const total = cantidadInsumo + cantidad;
        
        if (total < 0) {
          errors.push(`El insumo con ID ${id} no puede quedar con cantidad menor a 0.`);
        }
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    for (let ins of insumos) {
      const { id, cantidad } = ins;
      await Insumo.update(
        { cantidad: Sequelize.literal(`cantidad + ${cantidad}`) },
        { where: { id: id } }
      );
    }

    res.status(201).json({ message: 'Cantidad actualizada correctamente.' });
    
  } catch (error) {
    console.error('Error al actualizar cantidad de insumos:', error);
    res.status(400).json({ error: error.message });
  }
};



exports.statusInsumo = async (req, res) => {
  const { id } = req.params;

  try {
    await statusInsumo(id);
    res.status(201).json({ msg: "insumo inactivo" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteInsumo = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteInsumo(id);
    res.status(201).json({ msg: "insumo eliminado" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
