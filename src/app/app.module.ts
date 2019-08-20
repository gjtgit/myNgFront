import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ToDoService } from './to-do.service';
import { TokenService } from './token.service';

const appRoutes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'**',component: HomeComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    TasklistComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    AddtaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [TokenService, ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
