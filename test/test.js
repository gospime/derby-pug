var assert = require("assert");
var fs = require("fs");
var app = {
  viewExtensions: [],
  compilers: {}
}
var dpug = require("../");

describe("Pug compiler", function() {
  it("should compile Derby.js stuff", function() {
    dpug(app);
    var compiler = app.compilers[".pug"];
    var pug = fs.readFileSync(__dirname + "/basic/js.pug", "utf8");
    var html = fs.readFileSync(__dirname + "/basic/result.html", "utf8");
    assert.equal(compiler(pug, __dirname + "/basic/js.pug"), html);
  });

  it("should compile coffee in <script> when 'coffee' option is on", function() {
    dpug(app, {coffee: true});
    var compiler = app.compilers[".pug"];
    var pug = fs.readFileSync(__dirname + "/basic/coffee.pug", "utf8");
    var html = fs.readFileSync(__dirname + "/basic/result.html", "utf8");
    assert.equal(compiler(pug, __dirname + "/basic/coffee.pug"), html);
  });

  it("should do basic extend of a file", function() {
    dpug(app);
    var compiler = app.compilers[".pug"];
    var pug = fs.readFileSync(__dirname
      + "/pugFeatures/basicExtends/index.pug", "utf8");
    var html = fs.readFileSync(__dirname
      + "/pugFeatures/basicExtends/result.html", "utf8");
    assert.equal(compiler(pug,
        __dirname + "/pugFeatures/basicExtends/index.pug"), html);
  });

  it("should support 'block' when extends", function() {
    dpug(app);
    var compiler = app.compilers[".pug"];
    var pug = fs.readFileSync(__dirname
      + "/pugFeatures/block/index.pug", "utf8");
    var html = fs.readFileSync(__dirname
      + "/pugFeatures/block/result.html", "utf8");
    assert.equal(compiler(pug,
        __dirname + "/pugFeatures/block/index.pug"), html);
  });

  it("should pass tricky case", function() {
    dpug(app);
    var compiler = app.compilers[".pug"];
    var pug = fs.readFileSync(__dirname
      + "/pugFeatures/advanced/index.pug", "utf8");
    var html = fs.readFileSync(__dirname
      + "/pugFeatures/advanced/result.html", "utf8");
    assert.equal(compiler(pug,
        __dirname + "/pugFeatures/advanced/index.pug"), html);
  });

  it.skip("should extend file with <script> in it", function() {
    dpug(app);
    var compiler = app.compilers[".pug"];
    var pug = fs.readFileSync(__dirname
      + "/pugFeatures/scriptExtends/index.pug", "utf8");
    var html = fs.readFileSync(__dirname
      + "/basic/result.html", "utf8");
    assert.equal(compiler(pug,
        __dirname + "/pugFeatures/scriptExtends/index.pug"), html);
  });

  it("should support BEM shorthand: compile '&' into element name of component", function() {
    dpug(app);
    var compiler = app.compilers[".pug"];
    var pug = fs.readFileSync(__dirname + "/extra/bem/index.pug", "utf8");
    var html = fs.readFileSync(__dirname + "/extra/bem/result.html", "utf8");
    assert.equal(compiler(pug, __dirname + "/extra/bem/index.pug"), html);
  });

  it("should support module mode", function() {
    dpug(app, {globals: {moduleMode: true}});
    var compiler = app.compilers[".pug"];
    var pug = fs.readFileSync(__dirname + "/extra/module/index.pug", "utf8");
    var html = fs.readFileSync(__dirname + "/extra/module/result.html", "utf8");
    assert.equal(compiler(pug, __dirname + "/extra/module/index.pug"), html);
  });


});
