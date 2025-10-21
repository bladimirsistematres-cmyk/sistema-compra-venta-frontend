import { CiudadResponseDTO } from "./ciudadResponseDTO.interface";

export interface CiudadPageResponseDTO{
    ciudades: CiudadResponseDTO[];
    paginaActual: number;
    totalPaginas: number;
    totalEmentos: number;
    tamanioPagina: number;   
}