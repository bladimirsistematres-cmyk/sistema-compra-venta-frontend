import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CiudadResponseDTO } from '../../models/proveedor-models/ciudad/ciudadResponseDTO.interface';
import { CiudadPageResponseDTO } from '../../models/proveedor-models/ciudad/ciudadPageResponseDTO.interface';
import { CiudadDTO } from '../../models/proveedor-models/ciudad/ciudadDTO.interface';
import { RepresentantePageResponseDTO } from '../../models/proveedor-models/representante/representatePageResponseDTO.interface';
import { RepresentanteResponseDTO } from '../../models/proveedor-models/representante/representanteResponseDTO.interface';
import { RepresentanteRequestDTO } from '../../models/proveedor-models/representante/representanteRequestDTO.interface';
import { ProveedorPageResponseDTO } from '../../models/proveedor-models/proveedor/proveedorPageResponseDTO.interface';
import { ProveedorRequestDTO } from '../../models/proveedor-models/proveedor/proveedorRequestDTO.interface';
import { ProveedorResponseDTO } from '../../models/proveedor-models/proveedor/proveedorResponseDTO.interface';
import { CiudadRequestDTO } from '../../models/proveedor-models/ciudad/ciudadRequestDTO.interface';
import { ProveedorPageListarDTO } from '../../models/proveedor-models/proveedor/proveedorPageListarDTO.interface';
import { CiudadListarDTO } from '../../models/proveedor-models/ciudad/ciudadListarDTO.interface';
import { ItemProveedorRequestDTO } from '../../models/proveedor-models/itemProveedor/itemProveedorRequestDTO.interface';
import { ItemProveedorListarDTO } from '../../models/proveedor-models/itemProveedor/itemProveedorListarDTO.interface';
import { ProveedorCambiarNombreDTO } from '../../models/proveedor-models/proveedor/proveedorCambiarNombreDTO.interface';
import { RepresentanteListarDTO } from '../../models/proveedor-models/representante/representanteListarDTO.interface';
import { ItemProveedorCambiarNombreDTO } from '../../models/proveedor-models/itemProveedor/itemProveedorCambiarNombreDTO.interface';
import { ItemProveedorResponseDTO } from '../../models/proveedor-models/itemProveedor/itemProveedorResponseDTO.interface';
import { PaisListarDTO } from '../../models/proveedor-models/pais/paisListarDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private http = inject(HttpClient);
  private url = 'https://sistema-compra-venta-sastreria-1.onrender.com/api/'


  // Métodos Privados
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
      .set('sortDir', sortDir);
  } 


  //LISTADOS

  //Listar a todas las ciudades sin paginar
  getAllCiudadesSinPage(): Observable<CiudadListarDTO[]>{
    return this.http.get<CiudadListarDTO[]>(`${this.url}ciudad/listar/listar_ciudades`)
  }

  // Listar todos los proveedores (version nueva)
  getAllProveedoresNewVersion(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'idProveedor',
    sortDir: string = 'asc'
  ): Observable<ProveedorPageListarDTO>{
    
    return this.http.get<ProveedorPageListarDTO>(
      `${this.url}proveedor/listar_proveedores/nueva`,
      { params: this.buildParams(page, size, sortBy, sortDir) }
    )
  }

  //Listar todos los proveedores (version antigua)
  getAllProveedores(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'idProveedor',
    sortDir: string = 'asc'
  ): Observable<ProveedorPageResponseDTO>{

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir)

    return this.http.get<ProveedorPageResponseDTO>(`${this.url}proveedor/listar_proveedores`, { params })
  }

  // Listar todas las ciudades
  getAllCiudades(
    estadoCiudad: boolean | null,
    page: number = 0,
    size: number = 5,
    sortBy: string = 'idCiudad',
    sortDir: string = 'asc'
  ): Observable<CiudadPageResponseDTO>{

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir)

    if(estadoCiudad != null){
      params = params.set('estadoCiudad',estadoCiudad.toString());
    }

    return this.http.get<CiudadPageResponseDTO>(`${this.url}ciudad/listar_ciudades`, { params })
  }

  // Listar todas los representantes
  getAllRepresentantes(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'idRepresentante',
    sortDir: string = 'asc'
  ): Observable<RepresentantePageResponseDTO>{

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir)

    return this.http.get<RepresentantePageResponseDTO>(`${this.url}representante/listar_representantes`, { params });
  }

  //Llamar una ciudad por id
  getCiudadById(idCiudad: number): Observable<CiudadResponseDTO>{
    return this.http.get<CiudadResponseDTO>(`${this.url}ciudad/buscar/${idCiudad}`);
  }

  //Llamar un Representante por id
  getRepresentanteById(idRepresentante: number): Observable<RepresentanteResponseDTO>{
    return this.http.get<RepresentanteResponseDTO>(`${this.url}representante/buscar_representante/${idRepresentante}`);
  }

  //Llamar un Proveedor por id
  getProveedorById(idProveedor: number): Observable<ProveedorResponseDTO>{
    return this.http.get<ProveedorResponseDTO>(`${this.url}proveedor/buscar_proveedor/${idProveedor}`)
  }

  //Llamar a item de proveedor segun proveedor
  getAllItemProveedorByIdProveedor(idProveedor: number): Observable<ItemProveedorListarDTO[]>{
    return this.http.get<ItemProveedorListarDTO[]>(`${this.url}itemProveedor/listar_item_proveedor/${idProveedor}`)
  }



  //Llamar a todas los paises
  getAllPaises(): Observable<PaisListarDTO[]>{
    return this.http.get<PaisListarDTO[]>(`${this.url}pais/listar_paises`)
  }

  //Llamar a todos los represenantes de un proveedor por id
  getAllRepresentantesByProveedor(idProveedor: number): Observable<RepresentanteListarDTO[]>{
    return this.http.get<RepresentanteListarDTO[]>(`${this.url}representante/listar_representantes/${idProveedor}`)
  }

  //Llamar a todos los representantes de un proveedor por id
  getRepresentantesByProveedor(idProveedor: number): Observable<RepresentanteResponseDTO[]>{
    return this.http.get<RepresentanteResponseDTO[]>(`${this.url}proveedor/representantes/${idProveedor}`)
  }

  //Llamar a un represetante por nombre, cargo, cedula identidad o correo
  getRepresentanteByFilter(
    nombre?: string,
    cargo?: string,
    cedulaIdentidad?: string,
    correoElectronico?: string,
    page: number = 0,
    size: number = 4,
    sortBy: string = 'idRepresentante',
    sortDir: string = 'asc'
  ): Observable<RepresentantePageResponseDTO>{

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    if (nombre){
      params = params.set('nombre', nombre);
    }

    if (cargo){
      params = params.set('cargo', cargo);
    }

    if (cedulaIdentidad){
      params = params.set('cedulaIdentidad', cedulaIdentidad);
    }

    if (correoElectronico){
      params = params.set('correoElectronico', correoElectronico);
    }

    return this.http.get<RepresentantePageResponseDTO>(`${this.url}representante/filtrar_representante`, { params })
  }


  //CREACIONES

  // Crear Proveedor
  createProveedor(proveedorDTO: ProveedorRequestDTO): Observable<ProveedorRequestDTO>{
    return this.http.post<ProveedorRequestDTO>(`${this.url}proveedor/crear_proveedor`, proveedorDTO)
  }

  // Crear ciudad
  createCiudad(ciudadDTO: CiudadRequestDTO): Observable<CiudadRequestDTO>{
    return this.http.post<CiudadRequestDTO>(`${this.url}ciudad/crear_ciudad`, ciudadDTO)
  } 

  // Crear representante
  createRepresentante(representanteDTO: RepresentanteRequestDTO): Observable<RepresentanteRequestDTO>{
    return this.http.post<RepresentanteRequestDTO>(`${this.url}representante/crear_representante` ,representanteDTO)
  }

  // Crear Item Proveedor
  createItemProveedor(itemProveedorDTO: ItemProveedorRequestDTO): Observable<ItemProveedorRequestDTO>{
    return this.http.post<ItemProveedorRequestDTO>(`${this.url}itemProveedor/crear_item_proveedor`, itemProveedorDTO)
  }

  //ACTUALIZACIONES

  // Actualizar ciudad
  updateCiudad(idCiudad: number, ciudadDTO: CiudadDTO): Observable<CiudadDTO>{
    return this.http.put<CiudadDTO>(`${this.url}ciudad/actualizar/${idCiudad}`, ciudadDTO)
  }

  // Actualizar representante
  updateRepresentante(idRepresentante: number, dto: RepresentanteRequestDTO): Observable<RepresentanteRequestDTO>{
    return this.http.put<RepresentanteRequestDTO>(`${this.url}representante/actualizar_representante/${idRepresentante}`, dto)
  }

  // Actualizar proveedor
  updateProveedor(idProveedor: number, dto: ProveedorRequestDTO){
    return this.http.put<ProveedorResponseDTO>(`${this.url}proveedor/actualizar_proveedor/${idProveedor}`, dto);
  }

  // Actualizar nombre del proveedor
  updateChangeNameProveedor(nuevoNombre: ProveedorCambiarNombreDTO): Observable<ProveedorResponseDTO>{
    return this.http.put<ProveedorResponseDTO>(`${this.url}proveedor/cambiar_nombre`, nuevoNombre);
  }

  // Actualizar nombre item proveedor
  updateChangeNameItemProveedor(nuevoNombre: ItemProveedorCambiarNombreDTO): Observable<ItemProveedorResponseDTO>{
    return this.http.put<ItemProveedorResponseDTO>(`${this.url}itemProveedor/actualizar_nombre`, nuevoNombre)
  }
}