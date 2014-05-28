var jade = require('./index');
var options = {};

var jadeCompiler = function(file, filename) {
  var out;
  jade.renderFile(filename, options, function(err, html) {
    if (err) throw err;
    out = html;
  });
  return out;
};

module.exports = function(app, opts) {
  if (opts) options = opts;
  app.viewExtensions.push('.jade');
  app.compilers['.jade'] = jadeCompiler;
};
