import { Container } from 'inversify';
import { Application } from './app';
import { ApiEndpointController } from './controllers/api-endpoint.controller';
import { Server } from './server';
import { ApiEndpointService } from './services/api-endpoint.service';
import Types from './types';
import { SummonersInfoController } from './controllers/summoners-info.controller';
import { RiotRestService } from './services/riot-rest.service';
import { SummonersInfoService } from './services/summoners-info.service';
import { GameInfoController } from './controllers/game-info.controller';

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.ApiEndpointController).to(ApiEndpointController);
container.bind(Types.ApiEndpointService).to(ApiEndpointService);
container.bind(Types.SummonersInfoController).to(SummonersInfoController);
container.bind(Types.RiotRestService).to(RiotRestService);
container.bind(Types.SummonersInfoService).to(SummonersInfoService);
container.bind(Types.GameInfoController).to(GameInfoController);

export { container };
