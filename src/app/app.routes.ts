import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './core/login/login.component';
import { adminGuard } from './core/guard/admin.guard';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: '',
        component: LayoutComponent,
        children: [
            
            // Dashboard
            {
                path: 'dashboard',
                component: DashboardComponent, canActivate: [adminGuard]
            },

            //
            {
                path: 'usuario',
                loadChildren: () => import('./pages/usuarios-page/usuario.routes').then(m => m.USUARIO_ROUTES), canActivate: [adminGuard]
            },

            // Proveedor
            {
                path: 'proveedor',
                loadChildren: () => import('./pages/proveedor-page/proveedor.routes').then(m => m.PROVEEDORES_ROUTES), canActivate: [adminGuard]
            },

            // Materia Prima
            {
                path: 'materia-prima',
                loadChildren: () => import('./pages/materia-prima-page/materia-prima.routes').then(m => m.MATERIA_PRIMA), canActivate: [adminGuard]
            },

            // Compra
            {
                path: 'compra',
                loadChildren: () => import('./pages/compras-page/compra.routes').then(m => m.COMPRA), canActivate: [adminGuard]
            },

            // Redireccinamiento
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
