import { Component, OnInit, NgZone } from '@angular/core';
import { NbLoginComponent, NbAuthService, NbAuthSocialLink, NB_AUTH_OPTIONS } from '@nebular/auth';
import { ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class NgxLoginComponent extends NbLoginComponent implements OnInit {

    redirectDelay: number = 0;
    showMessages: any = {};
    strategy: string = '';

    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    socialLinks: NbAuthSocialLink[] = [];
    rememberMe = false;

    constructor(protected service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, protected cd: ChangeDetectorRef,
    protected router: Router, protected authService: AuthService, private toastrService: NbToastrService, private zone: NgZone) {

        super(service, options, cd, router);

        this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
        this.showMessages = this.getConfigValue('forms.login.showMessages');
        this.strategy = this.getConfigValue('forms.login.strategy');
        this.socialLinks = this.getConfigValue('forms.login.socialLinks');
        this.rememberMe = this.getConfigValue('forms.login.rememberMe');
    }

    ngOnInit(): void {
        this.toastrService.show('Please login to continue.', 'Welcome to Block Dem Chains!', {status: "primary", limit: 1} );
        this.checkExistingCredentials();
    }

    checkExistingCredentials()
    {
        var email = localStorage.getItem('email');
        if(email)
        {
            this.user.email = email;
        }
    }

    login()
    {
        var existingUserObject = {
            "email": this.user.email,
            "password": this.user.password
        };

        this.authService.login(existingUserObject)
        .subscribe((response:Response) => {
            console.log(response);
            if(response.body['loginStatus'] === true)
            {
                sessionStorage.setItem('x-auth-token', response.headers.get('x-auth-token'));
                localStorage.setItem('user-name', response.body['name']);
                this.toastrService.success('Let\'s Block some chains!', 'Logged in successfully!', {status: "success", limit: 1} );
                this.zone.run(()=>{
                    this.router.navigate(['/verify']);
                })

                if(this.user.rememberMe === true)
                {
                    localStorage.setItem('email', this.user.email);
                }
                return;
            }
        }, (error:any) => {
           console.log(error);
           this.toastrService.danger('Login failed!', 'Please verify credentials!', {status: "danger", limit: 3} );
        });
    }

}