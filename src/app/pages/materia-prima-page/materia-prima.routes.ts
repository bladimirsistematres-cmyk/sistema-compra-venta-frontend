import { Routes } from "@angular/router";

export const MATERIA_PRIMA: Routes = [

    // Materia prima listar tabla
    {
        path: 'materia-prima-tablas',
        loadComponent: () => 
            import('./materia-prima-listar-tabla/materia-prima-listar-tabla.component').then(
                (c) => c.MateriaPrimaListarTablaComponent
            )
    },

    // Materia prima presentacion
    {
        path: 'materia-prima-presentacion',
        loadComponent: () => 
            import('./materia-prima-presentacion/materia-prima-presentacion.component').then(
                (c) => c.MateriaPrimaPresentacionComponent
            )
    }
]