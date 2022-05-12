/**
 * This is a custom install script to create an appropriate .env file
 * and any other configurations for creating a RaiderRide development
 * enviorment.
 */
const chalk = require('chalk');
import {Listr} from 'listr2';
import execa from 'execa';
import * as fs from 'fs';
require('dotenv').config();
import {platform} from 'process';

console.log(chalk.blueBright('\nChecking raiderRide dev environment:'));

interface taskContext {
  hasYarn: boolean;
  hasEnv: boolean;
}

function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const context: taskContext = {
  hasYarn: false,
  hasEnv: false,
};
const checks = new Listr<taskContext>(
  [
    {
      title: '🧶 Checking for Yarn',
      task: async (ctx, task) => {
        await sleep(1000);
        return execa('yarn --version', {
          shell: platform !== 'win32' ? true : false,
        })
          .catch(() => {
            ctx.hasYarn = false;
            throw new Error(
              'Yarn should be installed for RaiderRide development, please install yarn by running:\n' +
                chalk.bold('npm install --global yarn'),
            );
          })
          .then(out => {
            ctx.hasYarn = true;
            task.output = 'Yarn Version: ' + out.stdout;
          });
      },
      options: {
        persistentOutput: true,
      },
    },
    {
      title: '📄 Checking for DotEnv file',
      enabled: ctx => {
        return ctx.hasYarn === true;
      },
      task: async (ctx, task) => {
        await sleep(1000);
        return fs.promises
          .access('./.env', fs.constants.F_OK)
          .catch(() => {
            task.output = 'Could not Find DotEnv File.';
            ctx.hasEnv = false;
            throw new Error('Checking for DotEnv file');
          })
          .then(() => {
            task.output = 'Found DotEnv file';
            ctx.hasEnv = true;
          });
      },

      options: {
        persistentOutput: true,
      },
    },
    {
      title: '✍ Creating DotEnv File',
      enabled: ctx => {
        return ctx.hasEnv === false;
      },
      task: (ctx, task) => {
        fs.promises
          .writeFile(
            './.env',
            'MODE=DEV\nRADAR_API_KEY=REPLACE_ME\nTENANT=common',
          )
          .catch(() => {
            throw new Error(
              'Could not create DotEnv file. You should create it manually.',
            );
          })
          .then(() => {
            ctx.hasEnv = true;
            task.output = 'Successfully Created DotEnv File.';
          });
      },
      options: {
        persistentOutput: true,
      },
    },
    {
      title: '🔍 Validating DotEnv File',
      enabled: ctx => {
        return ctx.hasEnv === true;
      },
      task: (ctx, task) => {
        return task.newListr(
          [
            {
              title: 'Checking for Application Mode',
              task: async (ctx, sub) => {
                if (process.env.MODE !== undefined) {
                  sub.output = `MODE is set as: ${chalk.blueBright(
                    process.env.MODE,
                  )}`;
                  sub.title = 'Found Application Mode';
                } else {
                  sub.title = 'MODE not found, adding...';
                  await fs.promises.appendFile('.env', '\nMODE=DEV');
                  await sleep(1000);

                  sub.output =
                    'MODE was added to env, with default value: ' +
                    chalk.blueBright('DEV');
                }
              },
              options: {
                persistentOutput: true,
              },
            },
            {
              title: 'Checking for Radar API key',
              task: async (ctx, sub) => {
                if (process.env.RADAR_API_KEY !== undefined) {
                  sub.output = `RADAR_API_KEY is set as: ${chalk.blueBright(
                    process.env.RADAR_API_KEY,
                  )}`;
                  sub.title = 'Found Radar API Key';
                  if (process.env.RADAR_API_KEY === 'REPLACE_ME') {
                    sub.output =
                      chalk.yellow('WARN: ') +
                      'RADAR_API_KEY is set to its default value.\n   See the guides section of the docs for more info.';
                  }
                } else {
                  sub.title = 'RADAR_API_KEY not found, adding...';
                  await fs.promises.appendFile(
                    '.env',
                    '\nRADAR_API_KEY=REPLACE_ME',
                  );
                  await sleep(1000);

                  sub.output =
                    chalk.yellow('WARN: ') +
                    'RADAR_API_KEY was set to its default value.\n   See the guides section of the docs for more info.';
                }
              },
              options: {
                persistentOutput: true,
              },
            },
            {
              title: 'Checking for OAuth Tenant Value',
              task: async (ctx, sub) => {
                if (process.env.TENANT !== undefined) {
                  sub.title = 'Found OAuth Tenant Value';
                  sub.output = `TENANT is set as: ${chalk.blueBright(
                    process.env.TENANT,
                  )}`;
                  if (process.env.TENANT === 'common') {
                    sub.output =
                      chalk.yellow('WARN: ') +
                      'TENANT is set to its default value, you should change this to the OAuth tenant for the application.\n  See the guides section of the docs for more info.';
                  }
                } else {
                  sub.title = 'TENANT was not found, adding...';
                  await fs.promises.appendFile('.env', '\nTENANT=common');
                  await sleep(1000);
                  sub.output =
                    chalk.yellow('WARN: ') +
                    'TENANT was set to its default value, you should change this to the OAuth tenant for the application.\n   See the guides section of the docs for more info.';
                }
              },
              options: {
                persistentOutput: true,
              },
            },
          ],
          {
            concurrent: false,
            rendererOptions: {collapse: false},
          },
        );
      },
    },
  ],
  {
    ctx: context,
    exitOnError: false,
    concurrent: false,
    rendererOptions: {collapse: false},
  },
);

checks.run().then(() => {
  console.log(
    '\n✨ ' + chalk.dim('Finished validating development environment\n'),
  );
});
