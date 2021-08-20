const fs = require("fs");
const argv = require("yargs").argv;

let listadoPorHacer = [];

const guardardb = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile("db/data.json", data, (err) => {
        if (err) throw new Error("no se pudo grabar", err);
    });
};

const cargarDB = () => {
    try {
        listadoPorHacer = require("../db/data.json");
    } catch (err) {
        listadoPorHacer = [];
    }
};

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false,
    };
    listadoPorHacer.push(porHacer);
    guardardb();
    return porHacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(
        (tarea) => tarea.descripcion === descripcion
    );
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardardb();
        return true;
    } else {
        return false;
    }
};
const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter((tarea) => {
        return tarea.descripcion !== descripcion;
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardardb();
        return true;
    }
};
const filtrar = (completado) => {
    cargarDB();
    let filtro = listadoPorHacer.filter(
        (tarea) => tarea.completado === completado
    );
    if (!filtro) {
        return false;
    } else {
        return true, filtro;
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    filtrar,
};