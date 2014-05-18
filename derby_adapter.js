var jade = require('./index');

var jadeCompiler = function(file, filename, options) {
  options || (options = {});
  var out;
  jade.renderFile(filename, options, function(err, html) {
    if (err) throw err;
    out = html;
  });
  return out;
};

module.exports = function(app) {
  app.viewExtensions.push('.jade');
  app.compilers['.jade'] = jadeCompiler;
};
