'use strict';

// TODO : Figure out why this is an issue: ReferenceError: MessageFormat is not defined

xdescribe('Controller: ArticleCtrl', function() {

	// load the controller's module
	beforeEach(module('methodApp'));

	// ReSharper disable once InconsistentNaming
	var controller,
		scope,
		article = {
			data: {
				id: 1,
				title: 'foo',
				caption: 'bar',
				body: 'baz',
				seo: {
					title: 'qux',
					description: 'quux',
					keywords: 'garply'
				}
			}
		},
		MessageFormat = {};

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		$rootScope.seo = {
			title: 'foo',
			description: 'bar',
			keywords: 'baz'
		};

		scope = $rootScope.$new();
		controller = $controller('ArticleCtrl', {
			$scope: scope,
			article: article,
			messageFormat: MessageFormat
		});
	}));

	it('should attach the article data to the scope', function() {
		console.log(scope.article); // Undefined
		console.log(article.data);
		expect(scope.article).to.deep.equal(article.data);
	});

	it('updates the root scope\'s seo object with the article seo', function() {
		expect(scope.seo).to.deep.equal(article.data.seo);
	});

});
