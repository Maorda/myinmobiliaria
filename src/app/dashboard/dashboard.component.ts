import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  habilitaMetaDiaria:boolean = false
  habilitaValorizacion:boolean = false
  habilitaconfiguracionObra:boolean = false
  habilitaPresupuestoContractual:boolean = false

  urlPlanificacion ='url(assets/estrategia1.png)';
  urlObra='url(assets/xls.png)';
  urlValorizacion='url(assets/beneficios.png)';
  urlNuevoArchivoSistema ='url(assets/xls.png)'

  panel:Subscription

  //captura los datos del child en ngDestroy con emiter
  //$event los captura
  recibiRespuestaDesdeAppObraEnconfiguracionObraDialogTemplate($event:any){
    console.log({"dentro de recibi respuesta":$event})
    this.habilitaMetaDiaria = $event.activateMetadiaria
    this.habilitaconfiguracionObra = $event.activateConfiguracion
  }
  constructor( private toastr: ToastrService,
    private readonly router:Router,
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private matBottomSheet: MatBottomSheet,
    private httpClient: HttpClient){}
  async ngOnInit() {
    this.habilitaMetaDiaria = true
  }
  logout(){}
  configuracionObra(){}
  metadiaria(){}
  valorizacion(){}
  
}
