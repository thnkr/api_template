/**
 * Node.js module for Forge.
 *
 * @author Dave Longley
 *
 * Copyright 2011-2013 Digital Bazaar, Inc.
 */
(function() {
var name = 'forge';
if(typeof define !== 'function') {
  // NodeJS -> AMD
  if(typeof module === 'object' && module.exports) {
    var nodeJS = true;
    define = function(ids, factory) {
      factory(require, module);
    };
  }
  // <script>
  else {
    if(typeof forge === 'undefined') {
      // set to true to disable native code if even it's available
      forge = {disableNativeCode: false};
    }
    return;
  }
}
// AMD
var deps;
var defineFunc = function(require, module) {
  module.exports = function(forge) {
    var mods = deps.map(function(dep) {
      return require(dep);
    });
    // handle circular dependencies
    forge = forge || {};
    forge.defined = forge.defined || {};
    if(forge.defined[name]) {
      return forge[name];
    }
    forge.defined[name] = true;
    for(var i = 0; i < mods.length; ++i) {
      mods[i](forge);
    }
    return forge;
  };
  // set to true to disable native code if even it's available
  module.exports.disableNativeCode = false;
  module.exports(module.exports);
};
var tmpDefine = define;
define = function(ids, factory) {
  deps = (typeof ids === 'string') ? factory.slice(2) : ids.slice(2);
  if(nodeJS) {
    delete define;
    return tmpDefine.apply(null, Array.prototype.slice.call(arguments, 0));
  }
  define = tmpDefine;
  return define.apply(null, Array.prototype.slice.call(arguments, 0));
};
define([
  'require',
  'module',
  'components/forge/aes',
  'components/forge/aesCipherSuites',
  'components/forge/asn1',
  'components/forge/debug',
  'components/forge/des',
  'components/forge/hmac',
  'components/forge/log',
  'components/forge/pbkdf2',
  'components/forge/pem',
  'components/forge/pkcs7',
  'components/forge/pkcs1',
  'components/forge/pkcs12',
  'components/forge/pki',
  'components/forge/prng',
  'components/forge/pss',
  'components/forge/random',
  'components/forge/rc2',
  'components/forge/task',
  'components/forge/tls',
  'components/forge/util',
  'components/forge/md',
  'components/forge/mgf1',
  'components/forge/ssh'
], function() {
  defineFunc.apply(null, Array.prototype.slice.call(arguments, 0));
});
})();
