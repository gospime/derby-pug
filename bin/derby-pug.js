#!/usr/bin/env node

var fs = require('fs')
  , program = require('commander')
  , path = require('path')
  , basename = path.basename
  , dirname = path.dirname
  , resolve = path.resolve
  , join = path.join
  , mkdirp = require('mkdirp')
  , dPug = require('../');

var _app = { viewExtensions: [], compilers: {} };
dPug(_app);
dPug = _app.compilers['.pug'];

program
  .version(require('../package.json').version)
  .usage('[options] [dir|file ...]')
  .option('-o, --out <dir>', 'output the compiled html to <dir>');

program.parse(process.argv);

// compile files and directories

var files = program.args;

// compile files

if (files.length) {
  files.forEach(renderFile);
  process.on('exit', function () {
    console.log();
  });
} else {
  stdin();
}

/**
 * Compile from stdin.
 */

function stdin() {
  var buf = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(chunk){ buf += chunk; });
  process.stdin.on('end', function(){
    var output;
    output = dPug.compiler(buf);
    process.stdout.write(output);
  }).resume();

  process.on('SIGINT', function() {
    process.stdout.write('\n');
    process.stdin.emit('end');
    process.stdout.write('\n');
    process.exit();
  })
}

/**
 * Process the given path, compiling the pud files found.
 * Always walk the subdirectories.
 */

function renderFile(path) {
  var re = /\.pug$/;
  var stat = fs.lstatSync(path);
  // Found pug file/\.pug$/
  if (stat.isFile() && re.test(path)) {
    var str = fs.readFileSync(path, 'utf8');
    var filename = path;

    var extname = '.html';

    path = filename.replace(re, extname);
    if (program.out) path = join(program.out, basename(path));
    var dir = resolve(dirname(path));
    mkdirp.sync(dir, 0755);
    var output = dPug(str, filename);
    fs.writeFileSync(path, output);
    console.log('  \033[90mrendered \033[36m%s\033[0m', path);
  // Found directory
  } else if (stat.isDirectory()) {
    var files = fs.readdirSync(path);
    files.map(function(filename) {
      return path + '/' + filename;
    }).forEach(renderFile);
  }
}
