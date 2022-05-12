'use strict';
/**
 * This is a custom install script to create an appropriate .env file
 * and any other configurations for creating a RaiderRide development
 * enviorment.
 */
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', {enumerable: true, value: v});
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = {next: verb(0), throw: verb(1), return: verb(2)}),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {value: op[1], done: false};
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return {value: op[0] ? op[1] : void 0, done: true};
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
exports.__esModule = true;
var chalk = require('chalk');
var listr2_1 = require('listr2');
var execa_1 = __importDefault(require('execa'));
var fs = __importStar(require('fs'));
require('dotenv').config();
console.log(chalk.blueBright('\nChecking raiderRide dev environment:'));
function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
var context = {
  hasYarn: false,
  hasEnv: false,
};
var checks = new listr2_1.Listr(
  [
    {
      title: '🧶 Checking for Yarn',
      task: function (ctx, task) {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, sleep(1000)];
              case 1:
                _a.sent();
                return [
                  2 /*return*/,
                  (0, execa_1['default'])('yarn --version')
                    ['catch'](function () {
                      ctx.hasYarn = false;
                      throw new Error(
                        'Yarn should be installed for RaiderRide development, please install yarn by running:\n' +
                          chalk.bold('npm install --global yarn'),
                      );
                    })
                    .then(function (out) {
                      ctx.hasYarn = true;
                      task.output = 'Yarn Version: ' + out.stdout;
                    }),
                ];
            }
          });
        });
      },
      options: {
        persistentOutput: true,
      },
    },
    {
      title: '📄 Checking for DotEnv file',
      enabled: function (ctx) {
        return ctx.hasYarn === true;
      },
      task: function (ctx, task) {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, sleep(1000)];
              case 1:
                _a.sent();
                return [
                  2 /*return*/,
                  fs.promises
                    .access('./.env', fs.constants.F_OK)
                    ['catch'](function () {
                      task.output = 'Could not Find DotEnv File.';
                      ctx.hasEnv = false;
                      throw new Error('Checking for DotEnv file');
                    })
                    .then(function () {
                      task.output = 'Found DotEnv file';
                      ctx.hasEnv = true;
                    }),
                ];
            }
          });
        });
      },
      options: {
        persistentOutput: true,
      },
    },
    {
      title: '✍ Creating DotEnv File',
      enabled: function (ctx) {
        return ctx.hasEnv === false;
      },
      task: function (ctx, task) {
        fs.promises
          .writeFile(
            './.env',
            'MODE=DEV\nRADAR_API_KEY=REPLACE_ME\nTENANT=common',
          )
          ['catch'](function () {
            throw new Error(
              'Could not create DotEnv file. You should create it manually.',
            );
          })
          .then(function () {
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
      enabled: function (ctx) {
        return ctx.hasEnv === true;
      },
      task: function (ctx, task) {
        return task.newListr(
          [
            {
              title: 'Checking for Application Mode',
              task: function (ctx, sub) {
                return __awaiter(void 0, void 0, void 0, function () {
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        if (!(process.env.MODE !== undefined))
                          return [3 /*break*/, 1];
                        sub.output = 'MODE is set as: '.concat(
                          chalk.blueBright(process.env.MODE),
                        );
                        sub.title = 'Found Application Mode';
                        return [3 /*break*/, 4];
                      case 1:
                        sub.title = 'MODE not found, adding...';
                        return [
                          4 /*yield*/,
                          fs.promises.appendFile('.env', '\nMODE=DEV'),
                        ];
                      case 2:
                        _a.sent();
                        return [4 /*yield*/, sleep(1000)];
                      case 3:
                        _a.sent();
                        sub.output =
                          'MODE was added to env, with default value: ' +
                          chalk.blueBright('DEV');
                        _a.label = 4;
                      case 4:
                        return [2 /*return*/];
                    }
                  });
                });
              },
              options: {
                persistentOutput: true,
              },
            },
            {
              title: 'Checking for Radar API key',
              task: function (ctx, sub) {
                return __awaiter(void 0, void 0, void 0, function () {
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        if (!(process.env.RADAR_API_KEY !== undefined))
                          return [3 /*break*/, 1];
                        sub.output = 'RADAR_API_KEY is set as: '.concat(
                          chalk.blueBright(process.env.RADAR_API_KEY),
                        );
                        sub.title = 'Found Radar API Key';
                        if (process.env.RADAR_API_KEY === 'REPLACE_ME') {
                          sub.output =
                            chalk.yellow('WARN: ') +
                            'RADAR_API_KEY is set to its default value.\n   See the guides section of the docs for more info.';
                        }
                        return [3 /*break*/, 4];
                      case 1:
                        sub.title = 'RADAR_API_KEY not found, adding...';
                        return [
                          4 /*yield*/,
                          fs.promises.appendFile(
                            '.env',
                            '\nRADAR_API_KEY=REPLACE_ME',
                          ),
                        ];
                      case 2:
                        _a.sent();
                        return [4 /*yield*/, sleep(1000)];
                      case 3:
                        _a.sent();
                        sub.output =
                          chalk.yellow('WARN: ') +
                          'RADAR_API_KEY was set to its default value.\n   See the guides section of the docs for more info.';
                        _a.label = 4;
                      case 4:
                        return [2 /*return*/];
                    }
                  });
                });
              },
              options: {
                persistentOutput: true,
              },
            },
            {
              title: 'Checking for OAuth Tenant Value',
              task: function (ctx, sub) {
                return __awaiter(void 0, void 0, void 0, function () {
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        if (!(process.env.TENANT !== undefined))
                          return [3 /*break*/, 1];
                        sub.title = 'Found OAuth Tenant Value';
                        sub.output = 'TENANT is set as: '.concat(
                          chalk.blueBright(process.env.TENANT),
                        );
                        if (process.env.TENANT === 'common') {
                          sub.output =
                            chalk.yellow('WARN: ') +
                            'TENANT is set to its default value, you should change this to the OAuth tenant for the application.\n  See the guides section of the docs for more info.';
                        }
                        return [3 /*break*/, 4];
                      case 1:
                        sub.title = 'TENANT was not found, adding...';
                        return [
                          4 /*yield*/,
                          fs.promises.appendFile('.env', '\nTENANT=common'),
                        ];
                      case 2:
                        _a.sent();
                        return [4 /*yield*/, sleep(1000)];
                      case 3:
                        _a.sent();
                        sub.output =
                          chalk.yellow('WARN: ') +
                          'TENANT was set to its default value, you should change this to the OAuth tenant for the application.\n   See the guides section of the docs for more info.';
                        _a.label = 4;
                      case 4:
                        return [2 /*return*/];
                    }
                  });
                });
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
checks.run().then(function () {
  console.log(
    '\n✨ ' + chalk.dim('Finished validating development environment\n'),
  );
});
