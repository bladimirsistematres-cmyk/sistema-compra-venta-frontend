import { TipoItem } from "./tipoItem.enum";

export interface ItemProveedorResponseDTO{
    idItemProveedor: number;
    precio: number
    tipoItem: TipoItem;
    descripcion: string;
    fechaCreacionItem: string;
    fechaActualizacionItem: string;
    idProveedor: number;
    nombreComercial: string;
    idUsuario: number;
    nombreUsuario: string;
    idMateriaPrima: number;
    nombreMateriaPrima: string;
}