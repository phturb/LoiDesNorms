import { Component } from '@angular/core';
import { SummonersInfoService } from './summoners-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private summonersInfo: SummonersInfoService) {
    this.processSummoners();
  }

  list = [];

  get summonersList() { return this.summonersInfo.getSummonersList(); }

  processSummoners() {
    for (const summoner of this.summonersList) {
      this.summonersInfo.getSummonerInfo(summoner).subscribe((value) => console.log(value));
    }
  }

  title = 'loi-des-norms';
}
