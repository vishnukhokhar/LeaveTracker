import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { NewLeaveComponent } from './pages/new-leave/new-leave.component';
import { EarnedleaveComponent } from './pages/earnedleave/earnedleave.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
          
            {
                path:'employee',
                component:EmployeeComponent
            },
            {
                path:'leave-request',
                component:NewLeaveComponent
            },
            {
                path:'earned-leave',
                component:EarnedleaveComponent
            }
         
        ]
    }
];
