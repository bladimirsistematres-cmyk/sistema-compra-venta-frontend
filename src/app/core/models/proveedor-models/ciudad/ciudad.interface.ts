import { Pais } from "../pais/pais.interface";

export interface Ciudad{
    idCiudad: number;
    nombreCiudad: string;
    estadoCiudad: boolean;
    pais: Pais;
}