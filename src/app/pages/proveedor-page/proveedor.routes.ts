import { Routes } from "@angular/router";

export const PROVEEDORES_ROUTES: Routes = [
    
    //Proveedor Listar
    {
        path: 'proveedor-listar',
        loadComponent: ()  => 
            import('./proveedor/proveedor-listar/proveedor-listar.component').then(
                (c) => c.ProveedorListarComponent
            )
    },

    //Proveedor Presentación
    {
        path: 'proveedor-presentacion',
        loadComponent: () => 
            import('./proveedor/proveedor-presentacion/proveedor-presentacion.component').then(
                (c) => c.ProveedorPresentacionComponent
            )
    },

    //Ciudad Presentación
    {
        path: 'ciudad-presentacion',
        loadComponent: () => 
            import('./ciudad/ciudad-presentacion/ciudad-presentacion.component').then(
                (c) => c.CiudadPresentacionComponent
            )
    },

    {
        path: 'representante-presentacion',
        loadComponent: () =>
            import('./representante/representante-presentacion/representante-presentacion.component').then(
                (c) => c.RepresentantePresentacionComponent
            )
    },

    {
        path: 'pais-presentacion',
        loadComponent: () => 
            import('./pais/pais-presentacion/pais-presentacion.component').then(
                (c) => c.PaisPresentacionComponent
            )
    }

]