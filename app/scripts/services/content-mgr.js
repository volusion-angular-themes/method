angular.module('Volusion.services')
	.factory('ContentMgr', function () {

		'use strict';

		var showFooter = true,
			showHeader = true,
			snapMenuState = true;

		function getFooterState() {
			return showFooter;
		}

		function getHeaderState() {
			return showHeader;
		}

		function getSnapMenuState() {
			return snapMenuState;
		}

		function hideAppFooter() {
			showFooter = false;
		}

		function hideAppHeader() {
			showHeader = false;
		}

		function hideSnapMenuState() {
			snapMenuState = false;
		}

		function showAppFooter() {
			showFooter = true;
		}

		function showAppHeader() {
			showHeader = true;
		}

		function showSnapMenuState() {
			snapMenuState = true;
		}

		return {
			getFooterState   : getFooterState,
			getHeaderState   : getHeaderState,
			getSnapMenuState : getSnapMenuState,
			hideAppFooter    : hideAppFooter,
			hideAppHeader    : hideAppHeader,
			hideSnapMenuState: hideSnapMenuState,
			showSnapMenuState: showSnapMenuState,
			showAppFooter    : showAppFooter,
			showAppHeader    : showAppHeader
		};
	});
