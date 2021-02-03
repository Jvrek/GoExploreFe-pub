import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { mergeMap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/user/I-user';
import { ViewType } from 'src/app/shared/viewType/view-type.enum';
import { UserDetailsService } from './user-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss']
})
export class UserDetailsPage implements OnInit {
  private viewType: ViewType;
  private id: string = '';
  user: IUser;

  form: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserDetailsService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formBulider: FormBuilder
  ) {
    this.initViewData();
  }

  ngOnInit() {
    this.loadData(this.id);
    this.initForm();
  }
  private initViewData() {
    this.viewType = this.activatedRoute.snapshot.paramMap.get(
      'viewType'
    ) as ViewType;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  private async loadData(id: string) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.userService.getUser(id).subscribe(
      (data) => {
        this.user = data;
        this.initForm(this.user);
      },
      async (err) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Nie udało się pobrac danych',
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

    this.userService.updateUser(this.user, this.id).subscribe(
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
