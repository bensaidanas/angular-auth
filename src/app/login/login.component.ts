import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userdata: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private authService: AuthService, private router: Router ) {
    sessionStorage.clear();
  }

  loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required)
  })

  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.GetByCode(this.loginForm.value.username).subscribe(res => {
        this.userdata = res;

        if (this.userdata.password === this.loginForm.value.password) {
          if (this.userdata.isActive) {
            sessionStorage.setItem('username', this.userdata.id);
            sessionStorage.setItem('userrole', this.userdata.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error("Please contact the admin", "Inactive User")
          }
        } else {
          this.toastr.error("Invalid Credentials");
        }
      })
    } else {
      this.toastr.warning("")
    }
  }
}
