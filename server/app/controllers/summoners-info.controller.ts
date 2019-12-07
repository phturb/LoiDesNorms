import { NextFunction, Request, Response, Router } from 'express';
import { injectable, inject } from 'inversify';
import Types from '../types';
import { SummonersInfo } from '../model/summoners-info.model';
import { SummonersInfoService } from '../services/summoners-info.service';
import { IRestResponse } from 'typed-rest-client';

@injectable()
export class SummonersInfoController {

    router: Router;

    constructor(
        @inject(Types.SummonersInfoService) private summonersInfo: SummonersInfoService,
    ) {
        this.configureRouter();
    }

    private configureRouter() {
        this.router = Router();

        // Retourne le fichier de definition de l'api
        this.router.get('/:summonerName',
            (req: Request, res: Response, next: NextFunction) => {
                this.summonersInfo.getSummonersInfo(req.params.summonerName).then((summonerRes: IRestResponse<SummonersInfo>) => {
                    res.status(summonerRes.statusCode);
                    res.send(summonerRes.result);
                }).catch((err) => {
                    res.sendStatus(500);
                })
            });
    }
}
