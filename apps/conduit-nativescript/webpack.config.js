const webpack = require('@nativescript/webpack');
const path = require("path");
const fs = require("fs");

class PreferNsVariantsPlugin {
  constructor(exts = [".ts", ".html", ".css", ".scss"]) {
    this.exts = exts;
  }

  apply(resolver) {
    resolver.getHook("before-file").tapAsync("PreferNsVariantsPlugin", (request, resolveContext, cb) => {
      const filePath = request.path;
      if (!filePath) return cb();

      for (const ext of this.exts) {
        if (filePath.endsWith(ext) && !filePath.endsWith(`.ns${ext}`)) {
          const nsVariant = filePath.slice(0, -ext.length) + `.ns${ext}`;

          if (fs.existsSync(nsVariant)) {
            const newRequest = { ...request, path: nsVariant };
            return resolver.doResolve(
              resolver.getHook("file"),
              newRequest,
              `resolved .ns${ext} variant`,
              resolveContext,
              cb
            );
          }
        }
      }

      return cb();
    });
  }
}

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig('angular');

  webpack.chainWebpack((config) => {
    config.resolve.plugin("prefer-ns-variants").use(PreferNsVariantsPlugin);
  });

  return webpack.resolveConfig();
};

