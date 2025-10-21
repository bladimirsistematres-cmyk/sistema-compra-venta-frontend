import { MateriaPrimaListarDTO } from "./materiaPrimaListarDTO.interface";

export interface MateriaPrimaPageListarDTO{
    materiaPrima: MateriaPrimaListarDTO[];
    paginaActual: number;
    totalPaginas: number;
    totalElementos: number;
    tamanioPagina: number;
}