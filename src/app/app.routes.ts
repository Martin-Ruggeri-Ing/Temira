import { Routes } from '@angular/router';
import { AuthGuard } from './business/guards/auth.guard';
import { AuthenticatedGuard } from './business/guards/authenticated.guard';

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
