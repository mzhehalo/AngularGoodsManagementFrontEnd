import {Component, OnInit} from '@angular/core';
import {MainCategoryModel} from '../../model/main-category-model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../edit-user/user.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  displayedColumns: string[] = ['userId', 'userCreated', 'userFirstName', 'userLastName', 'userEmail', 'userRole', 'actions'];
  dataSource: MainCategoryModel[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService
  ) {
    this.dataSource = activatedRoute.snapshot.data.Users;
  }

  ngOnInit(): void {
  }

  editUser(user): void {
    this.router.navigateByUrl(this.userService.getFirstNameFromSessionStorage() + '/edit-user/' + user.id);
  }

  deleteUser(user): void {
    this.userService.deleteUser(user.id).subscribe(data => {
    }, error => {
      console.log(error);
      this.dataSource = this.dataSource.filter(userData => userData !== user);
    });
  }
}
