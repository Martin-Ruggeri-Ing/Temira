import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'driver',
                loadComponent: () => import('./business/driver/driver.component').then(m => m.DriverComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'driver/add',
                loadComponent: () => import('./business/driver/add-driver/add-driver.component').then(m => m.AddDriverComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'vehicle',
                loadComponent: () => import('./business/vehicle/vehicle.component').then(m => m.VehicleComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'sleep-detector',
                loadComponent: () => import('./business/sleep-detector/sleep-detector.component').then(m => m.SleepDetectorComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'statement',
                loadComponent: () => import('./business/statement/statement.component').then(m => m.StatementComponent),
                canActivate: [AuthGuard]
            },
            {
                path: '',
                redirectTo: 'sleep-detector',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./business/authentication/login/login.component'),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
