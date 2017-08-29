import Config from './ConfigInterface'

let env = process.env.NODE_ENV || 'development';

export let settings: Config = {
  name: 'typescript-workshop',
  version: '2.0.0',
  port: 3000,
  env: 'dev'
};

if (env === 'production') {
  settings.env = 'prod';
  // other production settings
}