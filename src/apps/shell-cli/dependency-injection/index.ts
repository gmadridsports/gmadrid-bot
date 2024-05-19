import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'dev';

export default async () => {
  await loader.load(`${__dirname}/application_${env}.yaml`);
  return container;
};
