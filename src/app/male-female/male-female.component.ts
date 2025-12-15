import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

interface Person {
  name: string;
  gender: string;
}

@Component({
  selector: 'app-male-female',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './male-female.component.html',
  styleUrls: ['./male-female.component.css'],
})
export class MaleFemaleComponent {
  // Template-driven section
  name: string = '';
  gender: string = 'Male';

  people: Person[] = [];
  maleList: Person[] = [];
  femaleList: Person[] = [];

  // Reactive form section
  userForm = new FormGroup({
    reactiveName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z ]+$/),
    ]),

    reactiveEmail: new FormControl('', [Validators.required, Validators.email]),

    address: new FormGroup({
      street: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/),
      ]),
    }),
  });

  submitted = false;

  // Getters
  get reactiveName() {
    return this.userForm.get('reactiveName');
  }

  get reactiveEmail() {
    return this.userForm.get('reactiveEmail');
  }

  get address() {
    return this.userForm.get('address') as FormGroup;
  }
  get street() {
  return this.address.get('street');
}

get district() {
  return this.address.get('district');
}

get pincode() {
  return this.address.get('pincode');
}


  constructor() {
    const saved = localStorage.getItem('people');
    if (saved) {
      this.people = JSON.parse(saved);
      this.splitData();
    }
  }

  addPerson() {
    if (!this.name.trim()) {
      alert('Please enter name');
      return;
    }

    const person: Person = {
      name: this.name,
      gender: this.gender,
    };

    this.people.push(person);
    localStorage.setItem('people', JSON.stringify(this.people));

    console.log('Full People List:', this.people);

    this.splitData();
    this.name = '';
  }

  splitData() {
    this.maleList = this.people.filter((p) => p.gender === 'Male');
    this.femaleList = this.people.filter((p) => p.gender === 'Female');

    console.log('Male List:', this.maleList);
    console.log('Female List:', this.femaleList);
  }

  submitReactiveForm() {
    this.submitted = true;
    alert('Reactive Form Submitted! Check console for details.');

    console.log('Reactive Form Submitted:');
    console.log('Full Form Value:', this.userForm.value);

    console.log('Name:', this.reactiveName?.value);
    console.log('Email:', this.reactiveEmail?.value);

    console.log('Street:', this.address.get('street')?.value);
    console.log('District:', this.address.get('district')?.value);
    console.log('Pincode:', this.address.get('pincode')?.value);
  }
}
