import { UnidadMedida } from "../proveedor-models/itemProveedor/unidadMedida.enum";

export interface MateriaPrimaRequestDTO{
    nombreMateriaPrima: string;
    marca: string;
    modelo: string;
    stockActual: number;
    unidadMedida: UnidadMedida;
    descripcion: string;
    idProveedor: number;
}