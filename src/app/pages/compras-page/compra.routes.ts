import { Routes } from "@angular/router";

export const COMPRA: Routes = [

    // Compra Listar
    {
        path: 'compra-listar',
        loadComponent: () => 
            import('./compra-listar-table/compra-listar-table.component').then(
                (c) => c.CompraListarTableComponent
            )
    },
    
    // Compra Presentacion
    {
        path: 'compra-presentacion',
        loadComponent: () => 
            import('./compra-presentacion/compra-presentacion.component').then(
                (c) => c.CompraPresentacionComponent
            )
    }
]