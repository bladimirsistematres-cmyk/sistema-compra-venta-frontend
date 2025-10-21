import { UnidadMedida } from "../proveedor-models/itemProveedor/unidadMedida.enum";

export interface CompraListarDTO{
    idCompra: number;
    totalCompra: number;
    nombreComercial: string;
    nombreMateriaPrima: string;
    unidadMedida: UnidadMedida;
    cantidadUnidadMedida: number;
}