import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  emailForm!: FormGroup;
  submitted = false;
  files: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  get f() { return this.emailForm.controls; }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.emailValidator, this.emailDomainValidator]],
      mobile: ['', [Validators.required, this.mobileValidator]],
      message: ['']
    });
  }

  onFileChange(event: any): void {
    this.files = Array.from(event.target.files);
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && (!value.includes('@'))) {
      return { invalidEmail: true };
    }
    return null;
  }

  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const domainRegex = /^[^\s@]+@[^\s@]+\.(com|in|net|org|edu|gov|tech|dev|club|geeks|community|jp|uk|cn|io)$/;
    if (value && !domainRegex.test(value)) {
      return { invalidDomain: true };
    }
    return null;
  }

  mobileValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const mobileRegex = /^[6-9]\d{9}$/;
    if (value && !mobileRegex.test(value)) {
      return { invalidFormat: true };
    }
    return null;
  }

  submitForm(): void {
    this.submitted = true;
    console.log(this.emailForm.value);

    if (this.emailForm.valid) {
      const formData = new FormData();
      formData.append('email', this.emailForm.get('email')?.value);
      formData.append('name', this.emailForm.get('name')?.value);
      formData.append('mobile', this.emailForm.get('mobile')?.value);
      formData.append('message', this.emailForm.get('message')?.value);

      this.files.forEach((file) => formData.append('attachments', file));

      this.http.post('http://localhost:3000/careers-email', formData, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('Application sent successfully:', response);
          alert('Thank you for applying! We will review your application and contact you soon.');
          window.location.reload();
        },
        error: (error) => {
          console.error('Error sending application:', error);
          alert('Thank you for your application. We will get back to you soon.');
          window.location.reload();
        },
      });
    }
  }
}
