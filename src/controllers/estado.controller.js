const { getAllEstados, getEstadoById, createEstado, updateEstado, deleteEstado, getEstadosByCategoria } = require("../repositories/estado.repository");

exports.getAllEstados = async (req, res) => {
  try {
    const estados = await getAllEstados();
    res.status(200).json(estados);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getEstadoById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id);
        const estado = await getEstadoById(id);
        res.status(200).json(estado);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Agregar validacion con consulta de tipo de categoria para que solo se pueda agregar una con tipo Estado
exports.createEstado = async (req, res) => {
    const estado = req.body;

    try {
        console.log(req.body);
        await createEstado(estado);
        res.status(201).json({msg: 'estado creado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.updateEstado = async (req, res) => {
    const { id } = req.params;
    const estado = req.body;
    try {
        await updateEstado(id, estado);
        res.status(201).json({msg: 'estado actualizado exitosamente'});
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.statusEstado = async (req, res) => {
    const { id } = req.params;

    try {
        await statusEstado(id);
        res.status(201).json({msg: 'estado inactivo'});
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteEstado = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteEstado(id);
        res.status(201).json({msg: 'estado eliminado'});
    } catch (error) {
        res.status(500).json(error);
    }
}