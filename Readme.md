# Jade static compiler for Derby.js

 Jade fork for derby.js templates compilation (not the actual Derby.js template engine).
 ## [Jade documentation](https://github.com/visionmedia/jade)

 Makes `if, else, else if, unless, with, each` compile into derby View-variables.

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

 Append `!` to make static variables:
```jade
if! _flash as :flash
  if :flash.error
    ul.alert.alert-error
      each :flash.error
        li {.error}
  if :flash.info
    ul.alert.alert-success
      each! :flash.info as :info
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
 Note that there is no need to append `!` to `else` -- it will automatically inherit the behavior of `if`

## Installation

```bash
$ cd /path/to/project/
$ npm install git://github.com/cray0000/jade.git --save-dev
```

 Can be used to compile your views from /jade/**/*.jade to /views/**/*.html
 or in conjunction with task-runners like [grunt-contrib-jade](https://github.com/gruntjs/grunt-contrib-jade) or simply by calling something like:

```bash
$ ./node_modules/.bin/jade -w ./jade/ --out ./views/**/
```

## Screenshot
![Screenshot of Webstorm](https://raw.github.com/cray0000/jade/master/bin/derby-jade.png "Screenshot of Webstorm")


