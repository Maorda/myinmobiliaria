import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import {MatFormFieldAppearance} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { createForm, FormType } from 'ngx-sub-form';
import { User, UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CustumerrorService } from './custumerror.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface confMsg{
  title:string;
  typeMsg:string;
  msg:string;
  panelClass:string;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'myapp';
  constructor(
    private readonly router:Router
  ){}
  ngOnInit(): void {
    this.router.navigate(['autenticar/login'])
  }
  
}
