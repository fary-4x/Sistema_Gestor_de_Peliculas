var Userdb = require('../model/model');

exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "¡Ninguno de los campos puede estar vacio!" });
        return;

    }

    // Nuevo Trailer
    const user = new Userdb({
        titulo: req.body.titulo,
        ano: req.body.ano,
        director: req.body.director,
        actores: req.body.actores,
        resena: req.body.resena,
        portada: req.body.portada,
        link: req.body.link
    })

    // Guardar trailer
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio algun error durante la creación de un nuevo trailer"
            });
        });
}

exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "No se encontro trailer con este id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error al buscar id " + id })
            })

    } else {
        let query;
        if (req.query?.search) {
            query = {
                $or: [
                    {
                        'titulo': {
                            $regex: new RegExp(req.query?.search, "i")
                        }
                    },
                    {
                        'director': {
                            $regex: new RegExp(req.query?.search, "i")
                        }
                    },
                    {
                        'ano': {
                            $regex: new RegExp(req.query?.search, "i")
                        },
                    },
                    {
                        'actores': {
                            $regex: new RegExp(req.query?.search, "i")
                        },
                    }
                ]
            };

        }

        console.log(query);
        const find = query ? Userdb.find(query) : Userdb.find(query);

        find.then(user => {
            console.log(user)
            res.send(user)
        }).catch(err => {
                res.status(500).send({ message: err.message || "Error al obtener la informacion del trailer" })

            })
    }
}

exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Los datos a actualizar no pueden estar vacios" })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede Modificar con este ${id}. Quizas no exista` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al Modificar Informacion del Trailer" })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede Eliminar con este id ${id}. Quizas es un id incorrecto.` })
            } else {
                res.send({
                    message: "¡El Trailer se ha eliminado correctamente!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se puede Eliminar el Trailer con este id=" + id
            });
        });
}
