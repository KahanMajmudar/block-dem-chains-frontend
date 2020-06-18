import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { EthGuard } from './ethereum/shared/eth.guard';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [EthGuard]
  },
  {
    path: 'verify',
    loadChildren: () => import('./ethereum/ethereum.module')
      .then(m => m.EthereumModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#NgxAuthModule',
  },
  {
    path: '**', redirectTo: '/pages', pathMatch: 'full'
  }
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
