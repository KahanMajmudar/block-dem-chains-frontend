import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthereumComponent } from './ethereum.component';

export const routes: Routes = [
    {
        path: '',
        component: EthereumComponent,
        // children: [
        //     {
        //         path: '',
        //         redirectTo: 'metamask',
        //         pathMatch: 'full',
        //     },
        //     {
        //         path: 'metamask',
        //         component: EthereumComponent,
        //     },
        // ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EthereumRoutingModule {
}