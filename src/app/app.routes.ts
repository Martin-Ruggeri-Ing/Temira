import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'driver',
                loadComponent: () => import('./business/driver/driver.component').then(m => m.DriverComponent)
            },
            {
                path: 'vehicle',
                loadComponent: () => import('./business/vehicle/vehicle.component').then(m => m.VehicleComponent)
            },
            {
                path: 'sleep-detector',
                loadComponent: () => import('./business/sleep-detector/sleep-detector.component').then(m => m.SleepDetectorComponent)
            },
            {
                path: 'statement',
                loadComponent: () => import('./business/statement/statement.component').then(m => m.StatementComponent)
            },
            {
                path: '',
                redirectTo: 'sleepDetector',
                pathMatch: 'full'
            }
        ]
    }
];
