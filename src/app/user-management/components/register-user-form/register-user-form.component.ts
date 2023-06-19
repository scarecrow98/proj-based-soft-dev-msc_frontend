import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrateUserPayload } from '../../models';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterUserFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<RegistrateUserPayload>();

  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.email ]],
    name: ['', Validators.required],
    password: [this._generatePassword(), [Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value as RegistrateUserPayload);
    }
  }

  giveMeNewPassword() {
    this.form.patchValue({
      password: this._generatePassword()
    });
  }

  reset() {
    this.form.reset();
  }

  private _generatePassword(): string {
    //https://stackoverflow.com/questions/9719570/generate-random-password-string-with-requirements-in-javascript
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';
    const length = 12;

    return Array.from(crypto.getRandomValues(new Uint32Array(length)))
      .map((x) => chars[x % chars.length])
      .join('')
  }

}
