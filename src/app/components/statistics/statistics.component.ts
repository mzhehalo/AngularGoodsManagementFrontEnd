import {Component, OnInit} from '@angular/core';
import {UserService} from '../edit-user/user.service';
import {StatisticsModel} from '../../model/statistics-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  displayedColumns: string[] = ['Quantity orders', 'Sum ordered price', 'Number of added products', 'Sum price'];
  displayedColumnsAdmin: string[] = ['Quantity orders All', 'Sum ordered price All', 'Number of added products All',  'Sum price All'];
  role: string;
  dataSource: StatisticsModel;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.role = this.userService.getRoleFromSessionStorage();
    this.dataSource = this.activatedRoute.snapshot.data.Statistics;
  }
}
