import { RepresentanteResponseDTO } from "./representanteResponseDTO.interface";

export interface RepresentantePageResponseDTO {
    representantes: RepresentanteResponseDTO[];
    paginaActual: number;
    totalPaginas: number;
    totalElementos: number;
    tamanioPagina: number;  
}