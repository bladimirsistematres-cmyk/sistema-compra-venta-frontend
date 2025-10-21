import { TipoItem } from "./tipoItem.enum";

export interface ItemProveedorRequestDTO{
    precio: number;
    tipoItem: TipoItem;
    descripcion: string;
    idProveedor: number;
    idMateriaPrima: number;
}