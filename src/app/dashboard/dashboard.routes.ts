import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const routesDashboard:Routes =[
    {   //dashboard/main
        path:'main',
        component:DashboardComponent,
        /**cada app dentro de main es hija */
        
        /*children:[
          {
            //dashboard/main/obra 
            path:'obra',
            loadChildren:()=>import('../obra/obra.routes').then(r=>r.routesObra),
          },
          
          {
            //dashboard/main/valorizacion 
            path:'valorizacion',
            loadChildren:()=>import('../valorizacion/valorizacion.routes').then(r=>r.routesValorizacion),
          },
          {
            //dashboard/main/metadiaria 
            path:'metadiaria',
            loadChildren:()=>import('../metadiaria/metadiaria.routes').then(r=>r.routesMetaDiaria),
          }
        ]
        */
      },
      //{
        /**dashboard/obra */
        //path:'main/obra',
        //loadChildren:()=>import('../obra/obra.module').then(m=>m.ObraModule)
        //component:LoadtemplateComponent
      //}
]