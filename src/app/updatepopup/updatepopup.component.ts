import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {
  roleList: any
  editData: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private authService: AuthService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<UpdatepopupComponent>) {

  }
  ngOnInit(): void {
    this.authService.GetAllRoles().subscribe((res) => {
      this.roleList = res
    })

    if (this.data.userCode !== null && this.data.userCode !== '') {
      this.authService.GetByCode(this.data.userCode).subscribe((res) => {
        this.editData = res;
        this.updateForm.setValue({
          id: this.editData.id,
          name: this.editData.name,
          email: this.editData.email,
          password: this.editData.password,
          role: this.editData.role,
          gender: this.editData.gender,
          isActive: this.editData.isActive
        })
      })
    }
  }

  updateForm = this.formBuilder.group({
    id: this.formBuilder.control(''),
    name: this.formBuilder.control(''),
    password: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    gender: this.formBuilder.control(''),
    role: this.formBuilder.control('', Validators.required),
    isActive: this.formBuilder.control(''),
  })

  updateUser() {
    if (this.updateForm.valid) {
      this.authService.UpdateUser(this.updateForm.value.id, this.updateForm.value).subscribe((res) => {
        this.toastr.success("Updated Successfully");
        this.dialog.close();
      })
    } else {
      this.toastr.warning("Please Select a Role");
    }
  }
}
