import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SwitchThemeComponent } from './components/switch-theme/switch-theme.component';

const routes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'theming', component: SwitchThemeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
