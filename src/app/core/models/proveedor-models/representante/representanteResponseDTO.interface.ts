export interface RepresentanteResponseDTO {
    idRepresentante: number,
    nombre: string
    cargo: string
    cedulaIdentidad: string
    generoRepresentante: 'Masculino' | 'Femenino' | 'Otro' | 'No Especificado'
    telefonoFijo: string | null
    telefonoCelular: string 
    correoElectronico: string
    direccion: string | null
    observaciones: string | null
    fechaCreacion: string
    fechaActualizacion: string
    idProveedor: number
    nombreComercial: string
}