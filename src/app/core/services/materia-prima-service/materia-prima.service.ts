import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MateriaPrimaPageListarDTO } from '../../models/materia-prima/materiaPrimaPageListarDTO.interface';
import { MateriaPrimaRequestDTO } from '../../models/materia-prima/materiaPrimaRequestDTO.interface';
import { MateriaPrimaResponseDTO } from '../../models/materia-prima/materiaPrimaResponseDTO.interface';
import { EventInfoWrapper } from '@angular/core/primitives/event-dispatch';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {

  private http = inject(HttpClient)
  private url = 'https://sistema-compra-venta-sastreria-1.onrender.com/api/materiaPrima/'

  // Metodo privado
  private buildParams(
    page: number,
    size: number,
    sortBy: string,
    sortDir: string
  ): HttpParams {
    return new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir)
  }

  // LISTADOS

  // Servicio para listar a todas las materias primas
  gettAllMateriaPrima(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'idMateriaPrima',
    sortDir: string = 'asc'
  ): Observable<MateriaPrimaPageListarDTO>{

    return this.http.get<MateriaPrimaPageListarDTO>(`${this.url}listarMateriaPrima`,
      {params: this.buildParams(page, size, sortBy, sortDir)}
    )
  }

  // Servicio para listar a materia prima segun el id del proveedor
  getMateriaPrimaByProveedor(idProveedor: number): Observable<MateriaPrimaResponseDTO[]>{
    return this.http.get<MateriaPrimaResponseDTO[]>(`${this.url}listarMateriaPrima/${idProveedor}`)
  }

  // CREACIONES

  // Servicio para crear una nueva materia prima
  createMateriaPrima(materiaPrima: MateriaPrimaRequestDTO): Observable<MateriaPrimaRequestDTO>{
    return this.http.post<MateriaPrimaRequestDTO>(`${this.url}crearMateriaPrima`, materiaPrima)
  }
}