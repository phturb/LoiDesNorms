import { NextFunction, Request, Response, Router } from 'express';
import { injectable, inject } from 'inversify';
import { SummonersInfoService } from '../services/summoners-info.service';
import Types from '../types';
import { IRestResponse } from 'typed-rest-client';
import { SummonersInfo } from '../model/summoners-info.model';
import { RiotRestService } from '../services/riot-rest.service';

@injectable()
export class GameInfoController {

    router: Router;

    constructor(
        @inject(Types.SummonersInfoService) private summonersInfo: SummonersInfoService,
        @inject(Types.RiotRestService) private riotRest: RiotRestService
    ) {
        this.configureRouter();
    }

    private configureRouter() {
        this.router = Router();

        // Retourne le fichier de definition de l'api
        this.router.get('/:summonerName',
            async (req: Request, res: Response, next: NextFunction) => {
                this.summonersInfo.getSummonersInfo(req.params.summonerName).then((summonerRes: IRestResponse<SummonersInfo>) => {
                    if (summonerRes.result) {
                        let queryParam = ''
                        if (req.query.start) {
                            queryParam = '?beginTime=' + req.query.start;
                            if (req.query.end) {
                                queryParam += '&endTime=' + req.query.end;
                            }
                        }
                        this.riotRest.get<any>(`/lol/match/v4/matchlists/by-account/${summonerRes.result.accountId}${queryParam}`).then(async (matchRes) => {
                            if (matchRes.result) {
                                const matchInfoRes: any[] = [];
                                for (const match of matchRes.result.matches) {
                                    const matchInfo = await this.riotRest.get<any>(`/lol/match/v4/matches/${match.gameId}`);
                                    matchInfoRes.push(matchInfo.result);
                                }
                                res.status(matchRes.statusCode);
                                res.send(matchInfoRes);
                            } else {
                                res.sendStatus(500);
                            }
                        });
                    } else {
                        res.sendStatus(500);
                    }
                }).catch((err) => {
                    res.sendStatus(500);
                })
            });
    }
}
