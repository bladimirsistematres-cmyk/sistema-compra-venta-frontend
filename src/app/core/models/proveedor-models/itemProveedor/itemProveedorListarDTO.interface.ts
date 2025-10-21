import { TipoItem } from "./tipoItem.enum";

export interface ItemProveedorListarDTO{
    idItemProveedor: number;
    precio: number;
    tipoItem: TipoItem;
    nombreUsuario: string;
    fechaCreacionItem: string;
    descripcion: string;
}