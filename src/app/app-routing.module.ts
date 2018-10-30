import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerManagementComponent } from './pages/customer-management/customer-management.component';

const routes: Routes = [
    { path: 'customer-management', component: CustomerManagementComponent },
    { path: '**', redirectTo: 'customer-management', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
