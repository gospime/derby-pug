var coffeeScript = require('coffee-script');

module.exports = {
  compile: compile,
  compileAttr: compileAttr,
  compileInput: compileInput,
  isEvent: isEvent
}

function compile(js) {
  var original = js;
  // Exclude Derby block alias
  var alias;
  var aliasIndex = js.indexOf(' as ');
  if (aliasIndex >= 0) {
    alias = js.substr(aliasIndex);
    js = js.substr(0, aliasIndex);
  }
  // Replace # to not widely used symbol for alias variable names
  // js variables can not start with #
  js = js.replace(/#/g, '〇');
  try {
    js = coffeeScript.compile(js, {bare: true});
  } catch (err) {
    console.log('Coffeescript compilation error:');
    console.log(err);
    return original;
  }
  // Replace back
  js = js.replace(/〇/g, '#');
  // Trim
  js = js.replace(/^\s+|\s+$/g, '');
  // Remove semicolon
  var lastSymbol = js[js.length - 1];
  if (lastSymbol === ';') {
    js = js.slice(0, -1);
  }
  // Include alias
  if (alias) js += alias;
  return js;
}

function compileAttr(val) {
  // Remove quotes, compile and add quotes back
  val = val.slice(1, -1);
  val = compile(val);
  return '"' + val + '"';
}

function compileInput(input) {
  var result = '';
  var captures;
  // Iterate all {{..}} sections
  while (captures = /{{(.+?)}}/g.exec(input)) {
    var text = captures[0];
    var js = captures[1];
    var start = captures.index;
    var end = start + text.length;
    var block = '';

    // If it`s not end block {{/..}}
    if (js[0] !== '/') {
      var blockCaptures;
      // If it is some block, we need to exclude it from compilation
      if (blockCaptures = /^((?:if|unless|else if|else|with|each|bound|unbound|on|unescaped)\*?) *([^\n]*)/.exec(js)) {
        block = blockCaptures[1] + ' ';
        js = blockCaptures[2];
      }
      js = compile(js);
    }

    result += input.slice(0, start) + '{{' + block + js + '}}';
    input = input.slice(end);
  }
  return result + input;
}

function isEvent(key) {
  // Attributes that starts from 'on-' are event fns in Derby
  return key && key.indexOf('on-') === 0;
}