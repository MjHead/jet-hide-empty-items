<?php
/**
 * Plugin Name: Jet Hide Empty Items
 * Plugin URI:
 * Description: Allow to hide an empty items from Tabs and Accordion widgets from Elementor and JetTabs
 * Version:     1.0.0
 * Author:      Crocoblock
 * Author URI:  https://crocoblock.com/
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

class Jet_Hide_Empty_Items {

	public function __construct() {
		add_action( 'wp_head', array( $this, 'print_pre_hide_assets' ), 0 );
		add_action( 'elementor/frontend/after_register_scripts', array( $this, 'assets' ) );
	}

	public function is_preview() {
		return class_exists( '\Elementor\Plugin' )
			&& \Elementor\Plugin::instance()->preview
			&& \Elementor\Plugin::instance()->preview->is_preview();
	}

	public function print_pre_hide_assets() {
		if ( $this->is_preview() ) {
			return;
		}
		?>
		<script>
			document.documentElement.classList.add( 'jet-hide-empty-pending' );
		</script>
		<style>
			html.jet-hide-empty-pending .elementor-widget-jet-tabs,
			html.jet-hide-empty-pending .elementor-widget-jet-accordion,
			html.jet-hide-empty-pending .elementor-widget-accordion,
			html.jet-hide-empty-pending .elementor-widget-tabs,
			html.jet-hide-empty-pending .elementor-widget-n-tabs {
				visibility: hidden;
			}

			html.jet-hide-empty-pending .jet-hide-empty-ready {
				visibility: visible;
			}
		</style>
		<?php
	}

	public function assets() {
		if ( ! class_exists( '\Elementor\Plugin' ) || $this->is_preview() ) {
			return;
		}

		wp_add_inline_script( 'elementor-frontend', $this->get_script() );
	}

	public function get_script() {
		ob_start();
		include trailingslashit( dirname( __FILE__ ) ) . 'script.js';

		return ob_get_clean();
	}
}

new Jet_Hide_Empty_Items();