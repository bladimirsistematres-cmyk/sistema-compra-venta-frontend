import { ProveedorResponseDTO } from "../proveedor/proveedorResponseDTO.interface";

export interface CiudadResponseDTO{
    idCiudad: number;
    nombreCiudad: string;
    idPais: number;
    nombrePais: string;
    proveedor: ProveedorResponseDTO[]
}