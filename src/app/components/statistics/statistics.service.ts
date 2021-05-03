import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StatisticsModel} from '../../model/statistics-model';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  baseUrl = Constants.API_BASE_URL + 'statistics/';

  constructor(private httpClient: HttpClient) {
  }

  getAllStatistics(userId: number): Observable<StatisticsModel> {
    return this.httpClient.get<StatisticsModel>(this.baseUrl + 'get/' + userId);
  }
}
