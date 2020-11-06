import { Request, RequestHandler, Response } from 'express';
import * as core from 'express-serve-static-core';
import { ParsedQs } from 'qs';

type LogMethod = (message: string, meta: Record<string, any> | Error) => void;

export interface GasBuddyLogger {
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
}

export interface GasBuddyService {
  logger: GasBuddyLogger;
}

export interface GasBuddyRequest<
  T extends GasBuddyService,
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  gb: T;
}

export interface GasBuddyRequestHandler<
  T extends GasBuddyService = GasBuddyService,
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
> extends RequestHandler<P, ResBody, ReqBody, ReqQuery> {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2
  (
    req: GasBuddyRequest<T, P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: core.NextFunction,
  ): any;
}
