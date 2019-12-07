import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import * as logger from 'morgan';
import { ApiEndpointController } from './controllers/api-endpoint.controller';
import { BASE_ROUTE } from './res/environement';
import Types from './types';
import { SummonersInfoController } from './controllers/summoners-info.controller';
import { GameInfoController } from './controllers/game-info.controller';

@injectable()
export class Application {

    private readonly internalError: number = 500;
    app: express.Application;

    constructor(
        @inject(Types.ApiEndpointController) private apiEndpointController: ApiEndpointController,
        @inject(Types.SummonersInfoController) private summonersInfoController: SummonersInfoController,
        @inject(Types.GameInfoController) private gameInfoController: GameInfoController,
    ) {
        this.app = express();

        this.config();

        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    bindRoutes(): void {
        // Notre application utilise le routeur de notre API `Index`
        this.app.use(BASE_ROUTE, this.apiEndpointController.router);
        this.app.use(BASE_ROUTE + '/summoners', this.summonersInfoController.router);
        this.app.use(BASE_ROUTE + '/match', this.gameInfoController.router);
        this.errorHandling();
    }

    private errorHandling(): void {
        // When previous handlers have not served a request: path wasn't found
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error('Not Found');
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get('env') === 'development') {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
