/**
 * @ngdoc service
 * @name Volusion.services.Notifications
 * @description
 * # notifications
 * Service in the Volusion.services.
 */

angular.module('Volusion.services')
	.factory('notifications', ['$filter', 'vnAppMessageService', function ($filter, vnAppMessageService) {

		'use strict';

		function displayMsg(type, msg) {
			vnAppMessageService.addMessage({ type: type, text: msg });
		}

		function displaySuccessfulAddition() {
			displayMsg('success', $filter('translate')('message.CART_ADD_SUCCESS'));
		}

		function displaySuccessfulUpdate() {
			displayMsg('success', $filter('translate')('message.CART_UPDATE_SUCCESS'));
		}

		function displayWarnings(warningsArray) {
			var vnMsg, messageKey;
			var translateFilter = $filter('translate');

			if (warningsArray && warningsArray.length > 0) {
				angular.forEach(warningsArray, function (warning) {
					messageKey = 'message.' + warning.Code;
					vnMsg = translateFilter(messageKey);
					vnMsg = (!vnMsg || vnMsg === messageKey) ? warning.Message : vnMsg;
					displayMsg('warning', vnMsg);
				});
			}
		}

		function displayErrors(errors) {
			var vnMsg,
				messageKey,
				translateFilter = $filter('translate');

			if (errors && errors.length > 0) {
				angular.forEach(errors, function (error) {
					messageKey = 'message.' + error.Code;
					vnMsg = translateFilter(messageKey);
					vnMsg = (!vnMsg || vnMsg === messageKey) ? error.Message : vnMsg;
					vnMsg = vnMsg || translateFilter('message.CART_UNKNOWN');
					displayMsg('danger', vnMsg);
				});
			}
		}

		return {
			displaySuccessfulAddition: displaySuccessfulAddition,
			displaySuccessfulUpdate  : displaySuccessfulUpdate,
			displayWarnings          : displayWarnings,
			displayErrors            : displayErrors
		};
	}]);
