vn-product-option
=================

> An [AngularJS][] component that generates a product option for products on the Volusion E-commerce Platform.

[![Build Status][]](https://travis-ci.org/volusion-angular/vn-product-option)
[![Dependency Status][]](https://gemnasium.com/volusion-angular/vn-product-option)
[![Views][]](https://sourcegraph.com/github.com/volusion-angular/vn-product-option)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


## Templates

- [product-option.html](https://github.com/volusion-angular/vn-product-option/blob/master/src/product-option.html)
- [radios.html](https://github.com/volusion-angular/vn-product-option/blob/master/src/radios.html)
- [checkboxes.html](https://github.com/volusion-angular/vn-product-option/blob/master/src/checkboxes.html)
- [content.html](https://github.com/volusion-angular/vn-product-option/blob/master/src/content.html)
- [select.html](https://github.com/volusion-angular/vn-product-option/blob/master/src/select.html)
- [text.html](https://github.com/volusion-angular/vn-product-option/blob/master/src/text.html)


## Generated BEM CSS Classes

- div.vn-product-option
  - label.vn-product-option__label
  - div.vn-product-option\__group modifiers="__{{displayType.type}}__"
    - label.vn-labeled-radio modifiers="__{{option.class}}__"
      - input.vn-labeled-radio\__radio
      - div.vn-labeled-radio\__content
        - div.vn-labeled-radio\__color
        - img.vn-labeled-radio\__image
        - div.vn-labeled-radio\__text
        - div.vn-labeled-radio\__border
    - label.vn-labeled-checkbox modifiers="__{{option.class}}__"
      - input.vn-labeled-checkbox\__checkbox
      - vn-labeled-checkbox\__content
        - div.vn-labeled-radio\__color
        - img.vn-labeled-radio\__image
        - div.vn-labeled-radio\__text
        - div.vn-labeled-radio\__border
    - select.vn-product-option\__select modifiers="__{{option.class}}__"
    - input.vn-product-option\__text modifiers="__{{option.class}}__"
  - div.vn-product-option (recursive)

_Note: Please don't reference the HTML elements directly in your CSS. Instead, use the provided BEM classes to stay at CSS specificity of 1. For more information about BEM, refer to [MindBEMding &ndash; getting your head &rsquo;round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)._


## Basic Usage

```html
<div data-vn-product-option
  data-ng-repeat="option in product.options"
  data-option="option"
  data-product="product">
</div>
```

_Note: Volusion urges you to use the `data-` attribute prefix for [HTML5 validation](http://html5.validator.nu/) purposes on all AngularJS directives._


## License

No license. OSS License is TBD &copy; [Volusion, Inc.](http://www.volusion.com/)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/volusion-angular/vn-product-option/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


[Build Status]: https://travis-ci.org/volusion-angular/vn-product-option.png?branch=master
[Dependency Status]: https://gemnasium.com/volusion-angular/vn-product-option.png
[Views]: https://sourcegraph.com/api/repos/github.com/volusion-angular/vn-product-option/counters/views-24h.png
[AngularJS]: http://angularjs.org/
