import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  files: File[] = [];

  captchaQuestion = '';
  captchaAnswer = 0;
  captchaInput = '';
  captchaError = false;

  enquiryTypes = [
    { value: 'enquiry', label: 'For Enquiries' },
    { value: 'support', label: 'For Support' },
    { value: 'book-demo', label: 'For Demo' }
  ];

  products = [
    'SAMA - Supra Advanced Manufacturing Analytics',
    'Real Time Historian',
    'AIMS - Alarm Management System',
    'PIMS - Plant Information Management',
    'EMS - Energy Management System',
    'Grid Management System',
    'Pipeline Management System',
    'Smart City System',
    'Digital E-Logbook',
    'OPC Products',
    'Web Reporter',
    'MES / IIOT Solutions',
    'Other'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get f() { return this.registerForm.controls; }

  generateCaptcha(): void {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    if (op === '+') {
      this.captchaAnswer = a + b;
    } else if (op === '-') {
      this.captchaAnswer = a - b;
    } else {
      this.captchaAnswer = a * b;
    }
    this.captchaQuestion = `${a} ${op} ${b} = ?`;
    this.captchaInput = '';
    this.captchaError = false;
  }

  ngOnInit(): void {
    this.generateCaptcha();
    const typeParam = this.route.snapshot.queryParamMap.get('type');
    const defaultType = this.enquiryTypes.find(t => t.value === typeParam) ? typeParam : '';

    this.registerForm = this.formBuilder.group({
      enquiryType: [defaultType, [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      mobile: ['', [Validators.required, Validators.pattern(/^[+]?[0-9\s\-]{7,15}$/)]],
      product: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && (!value.includes('@') || !value.includes('.com'))) {
      return { invalidEmail: true };
    }
    return null;
  }

  onFileChange(event: any): void {
    this.files = Array.from(event.target.files);
  }

  onSubmit(): void {
    this.submitted = true;
    this.captchaError = parseInt(this.captchaInput, 10) !== this.captchaAnswer;
    console.log(this.registerForm.value);

    if (this.registerForm.valid && !this.captchaError) {
      const formData = new FormData();
      formData.append('enquiryType', this.registerForm.get('enquiryType')?.value);
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('name', this.registerForm.get('name')?.value);
      formData.append('mobile', this.registerForm.get('mobile')?.value);
      formData.append('product', this.registerForm.get('product')?.value);
      formData.append('message', this.registerForm.get('message')?.value);
      formData.append('subject', this.registerForm.get('subject')?.value);

      this.files.forEach((file) => formData.append('attachments', file));

      this.http.post('/api/mail.php?action=contact', formData, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('Email sent successfully:', response);
          alert('Thank you for contacting us! We will get back to you soon.');
          window.location.reload();
        },
        error: (error) => {
          console.error('Error sending email:', error);
          alert('Thank you for your message. We will respond shortly.');
          window.location.reload();
        },
      });
    }
  }
}
