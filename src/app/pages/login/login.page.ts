import { AuthenticationService } from './../../auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, isPlatform, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  FacebookLogin,
  FacebookLoginPlugin
} from '@capacitor-community/facebook-login';
import { Plugins, registerWebPlugin } from '@capacitor/core';
import { UserService } from 'src/app/shared/user/user.service';
import { RolesService } from 'src/app/shared/roles/roles.service';

registerWebPlugin(FacebookLogin);
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  fbLogin: FacebookLoginPlugin;
  user = null;
  token = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private userService: UserService,
    private rolesService: RolesService
  ) {
    this.setupFbLogin();
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async setupFbLogin() {
    if (isPlatform('desktop')) {
      this.fbLogin = FacebookLogin;
    } else {
      // Use the native implementation inside a real app!
      const { FacebookLogin } = Plugins;
      this.fbLogin = FacebookLogin;
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        if (this.rolesService.checkAdminPermission())
          this.router.navigateByUrl('/menu/main', { replaceUrl: true });
        else this.router.navigateByUrl('/menu/main', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Logowanie nie powiodło się',
          message: res.error.error,
          buttons: ['OK']
        });

        await alert.present();
      }
    );
  }

  async facebookLogin() {
    const FACEBOOK_PERMISSIONS = ['email', 'user_birthday'];
    console.log(this.fbLogin);
    const result = await this.fbLogin.login({
      permissions: FACEBOOK_PERMISSIONS
    });

    if (result.accessToken && result.accessToken.userId) {
      this.token = result.accessToken;
      console.log(result);
    } else if (result.accessToken && !result.accessToken.userId) {
      // Web only gets the token but not the user ID
      // Directly call get token to retrieve it now
      this.getCurrentToken();
    } else {
      // Login failed
    }
  }
  async getCurrentToken() {
    const result = await this.fbLogin.getCurrentAccessToken();

    if (result.accessToken) {
      console.log(result);
    } else {
      // Not logged in.
    }
  }

  get username() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }
}
