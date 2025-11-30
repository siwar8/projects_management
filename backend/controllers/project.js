const Project = require('../models/project');
const { createBoard } = require('./board');

const create = async (req, res, fileNames) => {
    try {
        let data = req.body;
        let project = new Project(data);
        project.files = fileNames;
        project.date = new Date();
        
        project.team = JSON.parse(data.team);

        let result = await project.save();

        createBoard(result._id);

        res.send(result);

    } catch (err) {
        console.log(err); // Affichage de l'erreur dans la console
        res.status(500).send({ message: "Erreur lors de la création du projet", error: err });
    }
};

const list = async (req, res) => {
    try {
        let projects = await Project.find()
            .populate({
                path: 'client',
                model: 'client'
            })
            .populate({
                path: 'team',
                model: 'User'
            })
            .exec();

        res.send(projects);

    } catch (err) {
        console.log(err); // Affichage de l'erreur dans la console
        res.status(500).send({ message: "Erreur lors de la récupération des projets", error: err });
    }
};

const preview = async (req, res) => {
    try {
        let id = req.params.id;
        let project = await Project.findById({ _id: id })
            .populate({
                path: 'client',
                model: 'client'
            })
            .populate({
                path: 'team',
                model: 'User'
            })
            .exec();
        res.send(project);

    } catch (err) {
        console.log(err); // Affichage de l'erreur dans la console
        res.status(500).send({ message: "Erreur lors de la prévisualisation du projet", error: err });
    }
};

const byId = async (req, res) => {
    try {
        let id = req.params.id;
        let project = await Project.findById({ _id: id });
        res.send(project);

    } catch (err) {
        console.log(err); // Affichage de l'erreur dans la console
        res.status(500).send({ message: "Erreur lors de la récupération du projet", error: err });
    }
};

const deleteProject = async (req, res) => {
    try {
        let id = req.params.id;
        let deletedProject = await Project.findByIdAndDelete({ _id: id });
        res.send(deletedProject);

    } catch (err) {
        console.log(err); // Affichage de l'erreur dans la console
        res.status(500).send({ message: "Erreur lors de la suppression du projet", error: err });
    }
};

const update = async (req, res, fileNames) => {
    try {
        let data = req.body;
        let id = req.params.id;

        if (fileNames.length > 0) {
            data.files = fileNames;
        }

        data.team = JSON.parse(data.team);

        let updatedProject = await Project.findByIdAndUpdate({ _id: id }, data, { new: true });

        res.send(updatedProject);

    } catch (err) {
        console.log(err); // Affichage de l'erreur dans la console
        res.status(500).send({ message: "Erreur lors de la mise à jour du projet", error: err });
    }
};

module.exports = { create, list, byId, preview, deleteProject, update };
