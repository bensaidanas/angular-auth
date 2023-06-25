import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private authService: AuthService, private router: Router ) {

  }

  registerForm = this.formBuilder.group({
    id: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.formBuilder.control('male'),
    role: this.formBuilder.control(''),
    isActive: this.formBuilder.control(false),
  })

  proceedRegisteration() {
    if (this.registerForm.valid) {
      this.authService.ProceedRegister(this.registerForm.value).subscribe(res => {
        this.toastr.success("Please contact the admin for enable access", "Register Successfully");
        this.router.navigate(['login'])
      })
    } else {
      this.toastr.warning("Please Enter Valid Data");
    }
  }

}
