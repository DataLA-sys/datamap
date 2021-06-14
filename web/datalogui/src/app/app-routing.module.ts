import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopologyComponent } from './components/topology/topology.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/topoloy', pathMatch: 'full' },
  //{ path: '', component: TopologyComponent },  
  { path: '', component: MainLayoutComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
