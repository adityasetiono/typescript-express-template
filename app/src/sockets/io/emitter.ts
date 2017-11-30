import * as emit from 'socket.io-emitter';
import { config } from 'config/connections';
const env: string = process.env.NODE_ENV || 'local';
const redisConfig: CustomConfig.IRedisConfig = config[env].redis;

export const emitter = emit({ host: redisConfig.host, port: redisConfig.port });
