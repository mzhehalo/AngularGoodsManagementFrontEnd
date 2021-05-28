import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {UserService} from '../edit-user/user.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {UserModel} from '../../model/UserModel';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  user: UserModel = new UserModel();
  @Input()
  isShowProfile: boolean;
  @Output() isShowProfileChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: AuthService,
              private userService: UserService,
              private confirmationDialogService: ConfirmationDialogService,
  ) {
  }

  ngOnInit(): void {
    this.isShowProfileChange.emit(false);
    this.user.firstName = this.userService.getFirstNameFromSessionStorage();
    this.user.id = this.userService.getUserIdFromSessionStorage();
    this.user.role = this.userService.getRoleFromSessionStorage();
    this.authService.loggedInEmitterUser.subscribe(userEmitter => this.user = userEmitter);
  }

  openConfirmationDialog(): void {
    this.confirmationDialogService.confirm('Please confirm action', 'Do you really want to delete your account ?')
      .then((confirmed) => {
        if (confirmed) {
          this.subscription.add(
            this.userService.deleteUser().subscribe(data => {
            }, error => {
              console.log(error);
              if (error.status === 200) {
                this.authService.logout();
              }
            })
          );
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleLogout(): void {
    this.isShowProfileChange.emit(false);
    this.authService.logout();
  }
}
