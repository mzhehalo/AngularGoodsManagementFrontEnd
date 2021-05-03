import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {StatisticsModel} from '../model/statistics-model';
import {Observable} from 'rxjs';
import {StatisticsService} from '../components/statistics/statistics.service';
import {UserService} from '../components/edit-user/user.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsResolverService implements Resolve<StatisticsModel> {

  constructor(private statisticsService: StatisticsService,
              private userService: UserService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StatisticsModel> | Promise<StatisticsModel> |
    StatisticsModel {
    return this.statisticsService.getAllStatistics(this.userService.getUserIdFromSessionStorage());
  }
}
