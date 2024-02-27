( function( $ ) {

	"use strict";

	var hideHandler = function() {

		var $jetAccodion = $( '.jet-accordion__item' );
		var $jetTabs = $( '.jet-tabs__control' );
		var $elAccodion = $( '.elementor-accordion-item' );
		var $elTabs = $( '.elementor-tab-title.elementor-tab-desktop-title' );
		var maybeHideElement = function( $el, $content ) {
			var text = $content.text();

			text = text.replace( /\t|\s/g, '' );
			text = text.replace( /\r?\n|\r/g, '' );

			if ( ! text ) {
				$el.css( 'display', 'none' );
				return true;
			} else if ( $content.find( '.jet-listing-not-found' ).length ) {
				$el.css( 'display', 'none' );
				return true;
			} 
			return false;
		};

		if ( $jetAccodion.length ) {
			$('.elementor-widget-jet-accordion').each( function( index, scope ) {

				let $scope = $( scope );
				let jetAccordionСount = 0;
				let jetAccordionItems = $scope.find( $jetAccodion );

				jetAccordionItems.each( function( index, el ) {
					var $el = $( el ),
					$content = $el.find( '.jet-toggle__content' );
					if ( maybeHideElement( $el, $content ) ) {
						jetAccordionСount++;
					}
				} );
				if ( jetAccordionСount === jetAccordionItems.length ){
					jetAccordionItems.parents( '.jet-accordion' ).css( 'display', 'none' );
				}
			} );
		}

		if ( $elAccodion.length ) {
			$elAccodion.each( function( index, el ) {
				var $el = $( el ),
					$content = $el.find( '.elementor-tab-content' );

				if ( ! maybeHideElement( $el, $content ) ) {

					var $prev = $el.prev();
					var borderTop = $el.css( 'border-top' );
					var borderBottom = $el.css( 'border-bottom' );

					if ( borderTop && ( -1 !== borderTop.indexOf( 'none' ) ) && borderBottom && 'none' === $prev.css( 'display' ) ) {
						$el.css( 'border-top', borderBottom );
					}
				}

			} );
		}

		if ( $jetTabs.length ) {
			$('.elementor-widget-jet-tabs').each( function( index, scope ) {

				let $scope = $( scope );
				let jetTabsСount = 0;
				let jetTabsItems = $scope.find( $jetTabs );

				jetTabsItems.each( function( index, el ) {
					var $el = $( el ),
						$tabs = $el.closest( '.jet-tabs' ),
						$content = $tabs.find( '.jet-tabs__content[data-tab="' + $el.data( 'tab' ) + '"]' );

					if ( maybeHideElement( $el, $content ) ) {
						jetTabsСount++;
						if ( $el.hasClass( 'active-tab' ) ) {
							var $next = $el.next();
							if ( $next.length ) {

								var $controlList = $tabs.find( '.jet-tabs__control' ),
									$contentWrapper = $tabs.find( '.jet-tabs__content-wrapper' ),
									$contentList = $tabs.find( '.jet-tabs__content' ),
									curentIndex = $next.data( 'tab' ),
									$activeControl = $tabs.find( '.jet-tabs__control[data-tab="' + curentIndex + '"]' ),
									$activeContent = $tabs.find( '.jet-tabs__content[data-tab="' + curentIndex + '"]' ),
									activeContentHeight = 'auto';

								$contentWrapper.css( { 'height': $contentWrapper.outerHeight( true ) } );

								$controlList.removeClass( 'active-tab' );
								$activeControl.addClass( 'active-tab' );

								$controlList.attr( 'aria-expanded', 'false' );
								$activeControl.attr( 'aria-expanded', 'true' );

								$contentList.removeClass( 'active-content' );
								activeContentHeight = $activeContent.outerHeight( true );
								activeContentHeight += parseInt( $contentWrapper.css( 'border-top-width' ), 10 ) + parseInt( $contentWrapper.css( 'border-bottom-width' ), 10 );
								$activeContent.addClass( 'active-content' );

								$contentList.attr( 'aria-hidden', 'true' );
								$activeContent.attr( 'aria-hidden', 'false' );

								$contentWrapper.css( { 'height': activeContentHeight } );
							}
						}
					}
				} );
				if ( jetTabsСount === jetTabsItems.length ){
					jetTabsItems.parents( '.jet-tabs' ).css( 'display', 'none' );
				}
			});
		}

		if ( $elTabs.length ) {

			$elTabs.each( function( index, el ) {
				var $el = $( el ),
					$tabs = $el.closest( '.elementor-tabs' ),
					$content = $tabs.find( '.elementor-tab-content[data-tab="' + $el.data( 'tab' ) + '"]' );

				maybeHideElement( $el, $content );

			} );
		}

	};

	$( window ).on( 'elementor/frontend/init', hideHandler );

}( jQuery ) );
