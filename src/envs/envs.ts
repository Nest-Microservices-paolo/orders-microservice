import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown();

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error('Error config file ' + error.message);
}

const envEnvars: EnvVars = value;

export const envs = {
  port: envEnvars.PORT,
};
