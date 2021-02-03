import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { IUser } from 'src/app/shared/user/I-user';
import { UserService } from 'src/app/shared/user/user.service';
import { AccountSettingsService } from './account-settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss']
})
export class AccountSettingsPage implements OnInit {
  user: IUser;

  form: FormGroup;
  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formBulider: FormBuilder,
    private userService: UserService,
    private accountSettings: AccountSettingsService
  ) {
    this.user = this.userService.getUserDetails();
  }

  ngOnInit() {
    this.initForm();
    this.initForm(this.user);
  }

  private initForm(data?: IUser) {
    if (data) {
      this.form.patchValue(data);
    } else {
      this.form = this.formBulider.group({
        username: ['', [Validators.required, Validators.maxLength(20)]],
        email: [
          '',
          [Validators.email, Validators.required, Validators.maxLength(50)]
        ]
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  async submit() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.user.username = this.f.username.value;
    this.user.email = this.f.email.value;

    this.accountSettings.updateUser(this.user, this.user.id).subscribe(
      async (resp) => {
        const alert = await this.alertController.create({
          header: 'Informacja',
          message: resp,
          buttons: ['OK']
        });
        await alert.present();
      },
      async (err) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Nie udało się zapisać zmian',
          message: err.error.error,
          buttons: ['OK']
        });
        await alert.present();
      },
      async () => {
        await loading.dismiss();
      }
    );
  }
}
