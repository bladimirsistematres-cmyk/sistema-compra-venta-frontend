import { UnidadCompra } from "../proveedor-models/itemProveedor/unidadCompra.enum";
import { UnidadMedida } from "../proveedor-models/itemProveedor/unidadMedida.enum";

export interface CompraDetalleResponseDTO{
    idCompraDetalle: number;
    unidadCompra: UnidadCompra;
    cantidadCompra: number;
    unidadMedida: UnidadMedida;
    cantidadMedida: number;
    materiaPrima: string;
}