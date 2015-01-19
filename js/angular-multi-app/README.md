# Angular `multi-app`

Angular multi-app allows you to use attributes to automatically bootstrap multiple Angular modules into the DOM. Much the same way that `ng-app` does, except without the restriction.

## How Does It Work?

First you add the file at the bottom of your page **after Angular**

```html
<script src="angular.js"></script>
<!-- more scripts -->
<script src="multi-app.js"></script>
```

Now just decorate the DOM elements you want to load your modules into

```html
<div multi-app="module-one"></div>
<div multi-app="module-two"></div>
<div multi-app="module-three"></div>
```

## Limitations

`multi-app` is only 12 lines of code. It isn't magic. It just calls `angular.bootstrap` for you automatically, so all the normal limitations of AngularJS apply.

### Can I nest modules?

No. Angular won't let you do that.

### Can I...

Did I mention that it just calls `angular.bootstrap`? Seriously, you should go [RTFM](https://docs.angularjs.org/api/ng/function/angular.bootstrap).
