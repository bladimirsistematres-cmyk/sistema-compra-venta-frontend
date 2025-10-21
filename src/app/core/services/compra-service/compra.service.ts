import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompraResponseDTO } from '../../models/compra-models/compraResponseDTO.interface';
import { CompraRequestDTO } from '../../models/compra-models/compraRequestDTO.interface';
import { CompraPageListarDTO } from '../../models/compra-models/compraPageListarDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private http = inject(HttpClient);
  private url = 'https://sistema-compra-venta-sastreria-1.onrender.com/api/compra/'

  // Metodo Privado
  private buildParams(
    page: number,
    size: number,
    sortBy: string,
    sortDir: string
  ): HttpParams{
    return new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir)
  }

  // LISTADOS
  // Servicio para listar a todas las compras hechas por un proveedor
  getAllComprasByProveedor(idProveedor: number): Observable<CompraResponseDTO[]>{
    return this.http.get<CompraResponseDTO[]>(`${this.url}listarComprasProveedor/${idProveedor}`)
  }

  // Servicio para listar a todas las compras hechas de una materia prima
  getAllComprasByMateriaPrima(idProveedor: number): Observable<CompraResponseDTO[]>{
    return this.http.get<CompraResponseDTO[]>(`${this.url}listarComprasMateriaPrima/${idProveedor}`)
  }

  // Servicio para listar todas las compras
  getAllCompras(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'idCompra',
    sortDir: string = 'asc'
  ): Observable<CompraPageListarDTO>{
    
    return this.http.get<CompraPageListarDTO>(`${this.url}listarCompras`,
      {params: this.buildParams(page, size, sortBy, sortDir)}
    )
  }
  

  // CREACIONES
  // Servicio para crear una nueva compra de materia prima
  createCompraMateriaPrima(compraRequestDTO: CompraRequestDTO): Observable<CompraResponseDTO>{
    return this.http.post<CompraResponseDTO>(`${this.url}compraMateriaPrima`, compraRequestDTO)
  }
}