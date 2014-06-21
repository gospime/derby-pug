# Derby-Jade

- Jade compiler for Derby
- Derby 0.6 version is the only supported (for previous Derby use 0.5 branch)
- Supports derby-specific tags that ends with `:` and makes `if, else, else if, unless, with, each` compile into derby View-variables
- Colons after derby-specific tags are optional
- Coffeescript support

## Known Issues
- If you on Coffescript, use this.contextfield or @.contextfield to access context and @fieldname to access component fields as in original Derby syntax

### Installation
```
npm install derby-jade
```
### Setting
```js
app.serverUse(module, 'derby-jade');
// before app.loadViews();
```

### Coffeescript

If you want to use Coffeescript instead of Javascript in templates:

```js
app.serverUse(module, 'derby-jade', {coffee: true});
```
Then you can do something like this:
```html
if a and b
  p 
    a(on-click="console.log c or 'log'") {{d or 'Click Me'}}
  script.
    here = canbe + coffee and script
```

### Usage

## Derby.js-specific syntax

### Conditionals, `each`, `with`

```jade
if _session.loggedIn
  h1 Hello, {{_session.username}}
else
  a(href='/login') Login
```
compiles to
```html
{{if _session.loggedIn}}
    <h1>Hello, {{_session.username}}</h1>
{{else}}
    <a href="/login">Login</a>
{{/}}
```

Another example:
```jade
if _page.flash as #flash
  if #flash.error
    ul.alert.alert-error
      each #flash.error
        li {{this.error}}
  if #flash.info
    ul.alert.alert-success
      each #flash.info as #info
        li {{#info}}
else
  p No notifications
```
 compiles to
```html
{{if _page.flash as #flash}}
    {{if #flash.error}}
        <ul class="alert alert-error">
            {{each #flash.error}}
                <li>{{this.error}}</li>
            {{/}}
        </ul>
    {{/}}
    {{if #flash.info}}
        <ul class="alert alert-success">
            {{#each #flash.info as #info}}
                <li>{{#info}}</li>
            {{/}}
        </ul>
    {{/}}
{{else}}
    <p>No notifications</p>
{{/}}
```

### `import:` and template declarations

```jade
import:(src='./auth', ns='')
import(src='./games')

Title:
  | My cool app

Body
  view(name='welcome', title='Welcome {{_session.username}}')
    p We are glad to see you!

Footer:
  view(name='copyright')

welcome
  h1 {{@title}}
  | {{@content}}

copyright:
  p Use it however you want {{_session.username}}!
```


## Screenshot
![Screenshot of Webstorm](https://raw.github.com/cray0000/jade/master/bin/derby-jade.png "Screenshot of Webstorm")


