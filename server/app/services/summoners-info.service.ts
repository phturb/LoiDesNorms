import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { IRestResponse } from 'typed-rest-client/RestClient'
import Types from '../types';
import { RiotRestService } from './riot-rest.service';
import { SummonersInfo } from '../model/summoners-info.model';

/// Service pour controller la configuration du REST Api
@injectable()
export class SummonersInfoService {

    constructor(@inject(Types.RiotRestService) private riotRest: RiotRestService) { }
    /// Retourne le fichier de configuration du REST Api
    async getSummonersInfo(summonerName: string): Promise<IRestResponse<SummonersInfo>> {
        return this.riotRest.get<SummonersInfo>(`/lol/summoner/v4/summoners/by-name/${summonerName}`);
    }
}
