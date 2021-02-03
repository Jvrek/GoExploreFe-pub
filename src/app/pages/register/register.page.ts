import { AuthenticationService } from '../../auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/user.service';
import { RolesService } from 'src/app/shared/roles/roles.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;
  user = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private userService: UserService,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required]],
      roles: [[''], [Validators.required]]
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();
    const registerData = {
      username: this.credentials.controls.username.value,
      password: this.credentials.controls.password.value,
      email: this.credentials.controls.email.value,
      roles: [this.credentials.controls.roles.value]
    };
    this.authService.register(registerData).subscribe(
      async () => {
        await loading.dismiss();
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Rejestracja nie powiodła się',
          message: res.error.error,
          buttons: ['OK']
        });

        await alert.present();
      }
    );
  }

  get username() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }

  get email() {
    return this.credentials.get('email');
  }

  get roles() {
    return this.credentials.get('roles');
  }
}
