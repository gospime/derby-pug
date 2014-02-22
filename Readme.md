# Jade static compiler for Derby.js

Jade fork for derby.js templates compilation (not the actual Derby.js template engine). [Jade documentation](https://github.com/visionmedia/jade)

Supports derby-specific tags that ends with `:` and makes `if, else, else if, unless, with, each` compile into derby View-variables.

### This is the Jade compiler for **Derby.js 0.5**! For **Derby.js 0.6** use [**0.6** branch](https://github.com/cray0000/jade/tree/0.6).

## Derby.js-specific syntax

### Conditionals, `each`, `with`

```jade
if _loggedIn
  h1 Hello, {_username}
else
  a(href='/login') Login
```
 compiles to
```html
{#if _loggedIn}
    <h1>Hello, {_username}</h1>
{else}
    <a href="/login">Login</a>
{/}
```

 Append `*` to make a non-bound variables:
```jade
if* _flash as :flash
  if :flash.error
    ul.alert.alert-error
      each :flash.error
        li {.error}
  if :flash.info
    ul.alert.alert-success
      each* :flash.info as :info
        li {{:info}}
else
  p No notifications
```
 compiles to
```html
{{#if _flash as :flash}}
    {#if :flash.error}
        <ul class="alert alert-error">
            {#each :flash.error}
                <li>{.error}</li>
            {/}
        </ul>
    {/}
    {#if :flash.info}
        <ul class="alert alert-success">
            {{#each :flash.info as :info}}
                <li>{{:info}}</li>
            {{/}}
        </ul>
    {/}
{{else}}
    <p>No notifications</p>
{{/}}
```
 Note that there is no need to append `*` to `else` -- it will automatically inherit the behavior of `if`

### `import:` and template declarations

```jade
import:(src='auth', ns='')
import:(src='games')

Title:
  | My cool app

Body:
  app:welcome(title='Welcome {_username}')
    p We are glad to see you!

Footer:
  app:copyright/

welcome:(nonvoid)
  h1 {{@title}}
  | {{@content}}

copyright:
  p Use it however you want {_username}!
```

## Installation

```bash
$ cd /path/to/project/
$ npm install git://github.com/cray0000/jade.git --save-dev
```

 Can be used in conjunction with task-runners like [grunt-contrib-jade](https://github.com/cray0000/grunt-contrib-jade) or directly by calling for example:

```bash
$ ./node_modules/.bin/jade -w ./jade/ --out ./views/**/
```

## Screenshot
![Screenshot of Webstorm](https://raw.github.com/cray0000/jade/master/bin/derby-jade.png "Screenshot of Webstorm")


