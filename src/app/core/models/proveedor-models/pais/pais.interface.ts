import { Ciudad } from "../ciudad/ciudad.interface";

export interface Pais{
    idPais: number;
    nombrePais: string;
    ciudades?: Ciudad[]
}