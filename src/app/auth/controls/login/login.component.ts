import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { User, UserService } from '../../../user.service';
import { createForm, FormType } from 'ngx-sub-form';
import { UntypedFormControl,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth.service';
import { CustumerrorService } from '../../../custumerror.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import {MatFormFieldAppearance} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}

  ]
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  error = '';
  subscription: Subscription | undefined;
  //message:confMsg;

  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService, 
    private _userService: UserService,
    private router: Router,
    private _errorService: CustumerrorService,

  ) {}

  ngOnInit(): void {
    /*if (this.authService.isAuthenticated$.value) {
      this.router.navigate(['/dashboard']); // Redirigir si ya está autenticado
    }*/
  }

  ngOnDestroy(): void {
    /*if (this.subscription) {
      this.subscription.unsubscribe();
    }*/
  }

  public form = createForm<User>(this,{
    formType:FormType.SUB,
    formControls:{

      email:new UntypedFormControl(null),
      password: new UntypedFormControl(null)
    }
  })

  login(){
     // Validamos que el usuario ingrese datos
     if (this.form.formGroup.value.email == null || this.form.formGroup.value.password == null) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      

      return
    }

    // Creamos el body
    const usuario: User = {
      email: this.form.formGroup.value.email,
      password: this.form.formGroup.value.password,
    }

    this.loading = true;
    //borrar en produccion
    this.router.navigate(['dashboard/main'])
    ///////
    /*this.subscription = this._userService.login(usuario).subscribe({
      next: (payload:any) => {//respuesta del servidor
        console.log(payload)
        //habilitar un spinner
        this.loading = false

        localStorage.setItem('token', payload.token);
        this.router.navigate(['dashboard/main'])
      },
      error: (e: HttpErrorResponse) => {
        
        this.toastr.error(traductor(e.error.message), 'Error');
        return
      },
      complete() {
        
        console.log('Login completado satisfactoriamente')
      },
    })*/
  }
  register(){
    this.router.navigate(['autenticar/registrar'])
  }
}

function traductor(e:string):string{

  const configuracion:any = {
      USER_NOT_FOUND:"Usuario no Registrado"

  }
  return configuracion[e]

}
