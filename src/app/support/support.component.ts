import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  supportForm!: FormGroup;
  submitted = false;
  files: File[] = [];
  showTokenPopup = false;
  generatedTokenId = '';

  products: string[] = [
    'AIMS',
    'PIMS/UHN/EMS',
    'ANALYTICS',
    'DMS',
    'ERP'
  ];

  priorities: string[] = ['High', 'Medium', 'Low'];

  types: string[] = [
    'Alarm Alerts',
    'RCA',
    'CCTV',
    'DON',
    'Mobile App',
    'Web AE Client',
    'Reporters',
    'Historian',
    'Web Dashboard',
    'Other'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  get f() { return this.supportForm.controls; }

  ngOnInit(): void {
    this.supportForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      companyname: ['', [Validators.required]],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.emailValidator, this.emailDomainValidator]],
      mobile: ['', [Validators.required, this.mobileValidator]],
      product: ['', [Validators.required]],
      issueType: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      description: ['', [Validators.required]]
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

  generateTokenId(): string {
    const now = new Date();
    const dateStr = now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0') +
      now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `0001-${dateStr}-${random}`;
  }

  submitForm(): void {
    this.submitted = true;
    console.log(this.supportForm.value);

    if (this.supportForm.valid) {
      this.generatedTokenId = this.generateTokenId();

      const formData = new FormData();
      formData.append('tokenId', this.generatedTokenId);
      formData.append('name', this.supportForm.get('name')?.value);
      formData.append('companyname', this.supportForm.get('companyname')?.value);
      formData.append('location', this.supportForm.get('location')?.value);
      formData.append('email', this.supportForm.get('email')?.value);
      formData.append('mobile', this.supportForm.get('mobile')?.value);
      formData.append('product', this.supportForm.get('product')?.value);
      formData.append('issueType', this.supportForm.get('issueType')?.value);
      formData.append('priority', this.supportForm.get('priority')?.value);
      formData.append('description', this.supportForm.get('description')?.value);

      this.files.forEach((file) => formData.append('attachments', file));

      this.http.post('http://localhost:3000/support-email', formData, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('Support request sent successfully:', response);
          this.showTokenPopup = true;
        },
        error: (error) => {
          console.error('Error sending support request:', error);
          this.showTokenPopup = true;
        },
      });
    }
  }

  closePopup(): void {
    this.showTokenPopup = false;
    window.location.reload();
  }
}
