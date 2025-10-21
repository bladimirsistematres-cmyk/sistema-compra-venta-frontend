import { Routes } from "@angular/router";

export const USUARIO_ROUTES: Routes = [

    // Usuario Presentación
    {
        path: 'usuario-presentación',
        loadComponent: () => 
            import('./usuario-presentacion/usuario-presentacion.component').then(
                (c) => c.UsuarioPresentacionComponent
            )
    }
]