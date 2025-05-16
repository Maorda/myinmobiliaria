import { Routes } from "@angular/router";
import { LoginComponent } from "./controls/login/login.component";
import { RegisterComponent } from "./controls/register/register.component";

export const routesAutenticar:Routes = [
    {
        //autenticar/login
        path:'login',
        component:LoginComponent
      },
      {
        //autenticar/registrar
        path:'registrar',
        component:RegisterComponent
      }
]