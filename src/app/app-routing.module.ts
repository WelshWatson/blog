import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {SkillsComponent} from './components/skills/skills.component';
import {AboutComponent} from './components/about/about.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'skills', component: SkillsComponent},
  {path: 'about', component: AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
