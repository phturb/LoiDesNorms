import { NextFunction, Request, Response, Router } from 'express';
import { injectable } from 'inversify';

@injectable()
export class GameInfoController {

    router: Router;

    constructor(
    ) {
        this.configureRouter();
    }

    private configureRouter() {
        this.router = Router();

        // Retourne le fichier de definition de l'api
        this.router.get('/:summonerName',
            async (req: Request, res: Response, next: NextFunction) => {
                if (req.query.start && req.query.end) {
                    console.log(req.query);
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            });
    }
}
