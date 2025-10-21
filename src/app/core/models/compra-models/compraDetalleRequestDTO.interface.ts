import { UnidadCompra } from "../proveedor-models/itemProveedor/unidadCompra.enum";
import { UnidadMedida } from "../proveedor-models/itemProveedor/unidadMedida.enum";

export interface CompraDetalleRequestDTO{
    unidadCompra: UnidadCompra;
    cantidadCompra: number;
    unidadMedida: UnidadMedida;
    cantidadMedida: number;
    materiaPrima: number;
}