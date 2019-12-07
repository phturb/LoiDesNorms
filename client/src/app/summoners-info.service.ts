import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummonersInfoService {

  constructor(private http: HttpClient) { }

  getSummonerInfo(summonerName: string): Observable<any> {
    summonerName.replace(' ', '_');
    return this.http.get<any>(`http://localhost:3000/api/summoners/${summonerName}`);
  }

  getSummonersList() {
    return ['SugarTits', 'THe Big BADABOOM'];
  }
}
