const argv = require("./yargs").argv;
const porHacer = require("./por_hacer/por_hacer");
const color = require("colors");

let comando = argv._[0];
switch (comando) {
    case "crear":
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case "listar":
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log("======POR HACER======".green);
            console.log(tarea.descripcion);
            console.log("estado", tarea.completado);
            console.log("====================".green);
        }
        break;
    case "actualizar":
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case "borrar":
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    case "filtrar":
        let filtracion = porHacer.filtrar(argv.completado);
        for (let tarea of filtracion) {
            console.log("======POR HACER======".green);
            console.log(tarea.descripcion);
            console.log("estado", tarea.completado);
            console.log("====================".green);
        }
        break;
    default:
        console.log("comando no reconocido");
}