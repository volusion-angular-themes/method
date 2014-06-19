vn-labeled-radio
================

> An [AngularJS][] component that generates an input text box wrapped in a label. All content is transcluded into a content span nested within the label.

[![Build Status][]](https://travis-ci.org/volusion-angular/vn-labeled-radio)
[![Dependency Status][]](https://gemnasium.com/volusion-angular/vn-labeled-radio)
[![Views][]](https://sourcegraph.com/github.com/volusion-angular/vn-labeled-radio)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


## Template

[labeled-radio.html](https://github.com/volusion-angular/vn-labeled-radio/blob/master/src/labeled-radio.html)


## Generated BEM CSS Classes

- label.vn-labeled-radio
  - input.vn-labeled-radio__input
  - span.vn-labeled-radio__content

_Note: Please don't reference the HTML elements directly in your CSS. Instead, use the provided BEM classes to stay at CSS specificity of 1. For more information about BEM, refer to [MindBEMding &ndash; getting your head &rsquo;round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)._

Transcluded elements that implement the `data-vn-element` directive will provide their own BEM classes automatically.
For example, `data-vn-element="foo"` generates the BEM class `.vn-labeled-radio__foo`. For more information, please
refer to the [vn-bem directive's documentation](https://github.com/volusion-angular/vn-bem/blob/master/README.md).


## Features

- [transclusion](https://docs.angularjs.org/api/ng/directive/ngTransclude)

The following [HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) get copied to the inner input:
- name
- value

The following [AngularJS directives](https://docs.angularjs.org/guide/directive) get copied to the inner input:
- [data-ng-value](https://docs.angularjs.org/api/ng/directive/ngValue)
- [data-ng-model](https://docs.angularjs.org/api/ng/directive/ngModel)
- [data-ng-disabled](https://docs.angularjs.org/api/ng/directive/ngDisabled)
- [data-ng-change](https://docs.angularjs.org/api/ng/directive/ngChange)


## Basic Usage

```html
<div data-vn-labeled-radio>Click me!</div>
```

_Note: Volusion urges you to use the `data-` attribute prefix for [HTML5 validation](http://html5.validator.nu/) purposes on all AngularJS directives._


## Complex Example

```html
<div data-vn-labeled-radio
  data-vn-modifiers="{{option.class}}"
  name="{{option.id}}"
  data-ng-value="item"
  data-ng-model="option.selected"
  data-ng-repeat="item in option.items"
  data-ng-disabled="{{item.availability}} < 1"
  data-ng-change="change()"
  data-ng-click="click(option)">
  <div data-vn-element="text">{{item.text}}</div>
</div>
```


## License

No license. OSS License is TBD &copy; [Volusion, Inc.](http://www.volusion.com/)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/volusion-angular/vn-labeled-radio/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


[Build Status]: https://travis-ci.org/volusion-angular/vn-labeled-radio.png?branch=master
[Dependency Status]: https://gemnasium.com/volusion-angular/vn-labeled-radio.png
[Views]: https://sourcegraph.com/api/repos/github.com/volusion-angular/vn-labeled-radio/counters/views-24h.png
[AngularJS]: http://angularjs.org/
