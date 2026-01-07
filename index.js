'use strict';

const { parse } = require('yaml');
const fs = require('fs');
const path = require('path');
const { deepMerge } = require('hexo-util');

class Util {
  constructor(hexo, pluginDir) {
    this.hexo = hexo;
    this.pluginDir = pluginDir;
  }

  getFilePath(file) {
    return this.pluginDir ? path.resolve(this.pluginDir, file) : file;
  }

  getFileContent(file) {
    return fs.readFileSync(this.getFilePath(file), 'utf8');
  }

  defaultConfigFile(key, file) {
    const defaultConfig = file ? parse(this.getFileContent(file)) : {};
    this.hexo.config[key] = deepMerge(defaultConfig[key], deepMerge(this.hexo.theme.config[key] || {}, this.hexo.config[key] || {}));
    return this.hexo.config[key];
  }
}

module.exports = Util;
