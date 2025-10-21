import { CompraListarDTO } from "./compraListarDTO.interface"

export interface CompraPageListarDTO{
    listaCompra: CompraListarDTO[]
    paginaActual: number
    totalPaginas: number
    totalElementos: number
    tamanioPagina: number
}