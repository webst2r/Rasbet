import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {AuthGuard} from "../../guard/auth.guard";
import {MainComponent} from "./main.component";
import {ApostasComponent} from "../apostas/apostas.component";
import {ApostasMultiplasComponent} from "../apostas-multiplas/apostas-multiplas.component";
import {TransacoesComponent} from "../transacoes/transacoes.component";
import {UserAreaComponent} from "../user-area/user-area.component";
import {GamesAdminComponent} from "../games-admin/games-admin.component";
import {GamesSpecialistComponent} from "../games-specialist/games-specialist.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'aposta',
        component: ApostasComponent,
      },
      {
        path: 'apostaMultipla',
        component: ApostasMultiplasComponent,
      },
      {
        path: 'transacoes',
        component: TransacoesComponent,
      },
      {
        path: 'profile',
        component: UserAreaComponent,
      },
      {
        path: 'games',
        component: GamesAdminComponent,
      },
      {
        path: 'specialist',
        component: GamesSpecialistComponent,
      },
      { path: '**', redirectTo: '' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
