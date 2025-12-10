import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['Nicolas', Validators.required],
      email: ['nico@gmail.com', [Validators.required, Validators.email]],
      password: ['1234', Validators.required],
      avatar: ['https://picsum.photos/800', Validators.required]
    });
  }

  onSubmit() {
    console.log("User added:", this.userForm.value);
    alert("User added successfully!");
  }
}
