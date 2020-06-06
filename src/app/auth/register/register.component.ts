import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { NbRegisterComponent, NbAuthSocialLink, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styles: ['./register/component.scss']
})
export class NgxRegisterComponent extends NbRegisterComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];

  constructor(protected service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {},protected cd: ChangeDetectorRef,protected router: Router, 
  private authService: AuthService, private toastrService: NbToastrService){

    super(service, options, cd, router);

    this.redirectDelay = super.getConfigValue('forms.register.redirectDelay');
    this.showMessages = super.getConfigValue('forms.register.showMessages');
    this.strategy = super.getConfigValue('forms.register.strategy');
    this.socialLinks = super.getConfigValue('forms.login.socialLinks');
  }  

  register()
  {
    if(this.user.confirmPassword != this.user.password)
    {
      this.toastrService.danger('Passwords do not match!', 'Please verify password and try again.', {status: "danger", limit: 3} );
      return;
    }
    var userObject = {
      "name": this.user.fullName,
      "email": this.user.email,
      "password": this.user.password
    };
    this.authService.create(userObject)
    .subscribe((response: any) => {
      if(response._id)
      {
        this.toastrService.success('Success!', 'Registration successful!', {status: "success", limit: 1} );
        this.router.navigate(['/auth/login']);
        return;
      }
      this.toastrService.danger('Registration failed!', 'Please try again.', {status: "danger", limit: 3} );
    });
  }

}