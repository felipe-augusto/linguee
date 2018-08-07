/**
 * Extremely simple homemade Dependency Injection Container that loads
 * services only on demand.
 *
 * Use:
 *
 * const container = require('./utils/container');
 * container.register([
 *   {id: 'some-external-module', 'path-to-module'},
 *   {id: 'ketchup', path: './ketchup'},
 *   {id: 'curry': path: './curry'},
 *   {id: 'sausage', path: './sausage'},
 *   {id: 'curryWurst': path: './curryWurst', dependencies: ['sausage', 'ketchup', 'curry']}
 * ], __dirname) // the path that will be used as root for the internal services
 *
 * To fetch the service you want (returns a singleton):
 * container.get('curryWurst');
 * container.get('some-external-module');
 *
 * All internal services must be written as factory functions with
 * dependencies as parameters.
 *
 * Ex:
 *
 * module.exports = function(iconv, request, someService) {
 *   return {
 *     ...
 *   }
 * };
 */

const container = (function() {
  let registry = {};
  let booted = false;

  const solve = function(id) {
    if (!(id in registry)) {
      throw Error(`The service ${id} was not registered`);
    }

    if (registry[id].target) {
      return registry[id].target;
    }

    if (registry[id].dependencies.length === 0) {
      registry[id].target = registry[id].internal
        ? require(registry[id].path)
        : require(registry[id].path);

      return registry[id].target;
    }

    const solvedDependencies = registry[id].dependencies.map(function(
      dependency
    ) {
      return solve(dependency);
    });
    registry[id].target = require(registry[id].path)(...solvedDependencies);

    return registry[id].target;
  };

  return {
    register: function(arr, rootDir) {
      if (booted) {
        throw Error(
          'The container is already booted. You cannot register services anymore'
        );
      }
      for (let { id, path, dependencies = [] } of arr) {
        registry = {
          ...registry,
          [id]: {
            path: path.startsWith('./') ? `${rootDir}/${path}` : path,
            internal: path.startsWith('./'),
            dependencies: dependencies,
            target: null
          }
        };
      }
    },
    get: function(id) {
      booted = true;

      return solve(id);
    }
  };
})();

module.exports = container;
