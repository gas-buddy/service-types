import { GasBuddyLogger, GasBuddyService } from './service';

export interface GasBuddySetupContext<Svc extends GasBuddyService = GasBuddyService> {
  logger: GasBuddyLogger;
  gb: Svc;
}

export interface GasBuddyHydratedModule<Svc extends GasBuddyService = GasBuddyService, Mod = any> {
  start?: (context: GasBuddySetupContext<Svc>) => Promise<Mod> | Mod;
  stop?: (context: GasBuddySetupContext<Svc>) => Promise<void> | void;
}

export interface GasBuddyHydratedModuleConstructor<
  Svc extends GasBuddyService = GasBuddyService,
  Conf = Record<string, any>
> {
  new (context: GasBuddySetupContext<Svc>, config: Conf): GasBuddyHydratedModule;
}
