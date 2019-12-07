import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { ApiEndpointService } from '../services/api-endpoint.service';
import Types from '../types';

@injectable()
export class ApiEndpointController {

    router: Router;

    constructor(@inject(Types.ApiEndpointService) private apiEndpointService: ApiEndpointService) {
        this.configureRouter();
    }

    private configureRouter() {
        this.router = Router();

        // Retourne le fichier de definition de l'api
        this.router.get('/',
            (req: Request, res: Response, next: NextFunction) => {
                this.apiEndpointService.getDef().then((api: any) => {
                    res.json(api);
                }).catch((reason: unknown) => {
                    res.sendStatus(500);
                });
            });
    }
}
