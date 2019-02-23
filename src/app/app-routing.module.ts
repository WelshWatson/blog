import { CanvasComponent } from './components/canvas/canvas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {SkillsComponent} from './components/skills/skills.component';
import {AboutComponent} from './components/about/about.component';
import {BlogComponent} from './components/blog/blog.component';
import {ContactComponent} from './components/contact/contact.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'skills', component: SkillsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'canvas', component: CanvasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
