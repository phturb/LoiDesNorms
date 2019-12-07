import { injectable } from 'inversify';
import 'reflect-metadata';

/// Service pour controller la configuration du REST Api
@injectable()
export class ApiEndpointService {
    /// Retourne le fichier de configuration du REST Api
    async getDef(): Promise<any> {
        return {
            summoners: '/summoners'
        };
    }
}
