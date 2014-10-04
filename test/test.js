var assert = require("assert");
var fs = require("fs");
var app = {
  viewExtensions: [],
  compilers: {}
}
var dJade = require("../");

describe("test", function() {
  it("jade + js", function() {
    dJade(app);
    var compiler = app.compilers[".jade"];
    var jade = fs.readFileSync(__dirname + "/basic/js.jade", "utf8");
    var html = fs.readFileSync(__dirname + "/basic/result.html", "utf8");
    assert.equal(compiler(jade, __dirname + "/basic/js.jade"), html);
  });

  it("jade + coffee", function() {
    dJade(app, {coffee: true});
    var compiler = app.compilers[".jade"];
    var jade = fs.readFileSync(__dirname + "/basic/coffee.jade", "utf8");
    var html = fs.readFileSync(__dirname + "/basic/result.html", "utf8");
    assert.equal(compiler(jade, __dirname + "/basic/coffee.jade"), html);
  });
});