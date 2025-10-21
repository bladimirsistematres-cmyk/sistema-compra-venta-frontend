import { RepresentanteResponseDTO } from "../representante/representanteResponseDTO.interface";
import { TipoProveedor } from "./tipoProveedor.enum";

export interface ProveedorResponseDTO{

    idProveedor: number
    nombreComercial: string;
    identificacionFiscal: string;
    correoElectronico: string;
    direccion: string;
    enlacePagina: string;
    fechaCreacion: string;
    fechaActualizacion: string;
    tipoProveedor: TipoProveedor;
    representantes: RepresentanteResponseDTO[]
    tieneRepresentantes: boolean
    idCiudad: number
    nombreCiudad: string
    nombrePais: string
}