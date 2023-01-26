import type { FastifyPluginCallback, FastifyInstance, HTTPMethods as _HTTPMethods } from 'fastify';

export type StatiklyApp = FastifyInstance;
export type StatiklyPlugin = FastifyPluginCallback;
export type HTTPMethods = _HTTPMethods;
