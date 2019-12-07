
import { injectable } from 'inversify';
import 'reflect-metadata';
import { RestClient, IRestResponse } from 'typed-rest-client';
import { IHeaders } from 'typed-rest-client/Interfaces';
import { RIOT_TOKEN } from '../res/riot-key.key';

/// Service pour controller la configuration du REST Api
@injectable()
export class RiotRestService {
    /// Retourne le fichier de configuration du REST Api
    async get<T>(url: string): Promise<IRestResponse<T>> {
        const rest: RestClient = new RestClient('Riot', 'https://na1.api.riotgames.com');
        const headers: IHeaders = { 'X-Riot-Token': RIOT_TOKEN };
        return rest.get<T>(url,
            { additionalHeaders: headers })
    }
}


