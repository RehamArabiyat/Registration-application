import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ArticlesComponent } from "./articles/articles.component";

const routes: Routes = [
  { path: "article", component: ArticlesComponent },
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
