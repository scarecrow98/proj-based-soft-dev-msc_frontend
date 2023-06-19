import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading$ = new BehaviorSubject<boolean>(false);

  form = this.fb.group({
    username: [environment.production ? '' : 'admin', [Validators.required]],
    password: [environment.production ? '' : 'Admin_123', [ Validators.required ]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    this.loading$.next(true);

    this.authService.login(this.form.value.username!, this.form.value.password!).subscribe({
      next: (response) => {
        if (response && response.token) {
          // console.log(response);
          this.router.navigate([ '/dashboard/data-import' ]);
          this.loading$.next(false);
        }
      },
      error: (err) => {
        this.toaster.error('Login failed');
        this.loading$.next(false);
      }
    });
  }

}
