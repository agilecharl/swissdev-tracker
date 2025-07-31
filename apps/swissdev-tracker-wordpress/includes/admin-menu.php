<?php
/**
 * SwissDev Tracker Admin Menu Functions
 *
 * @package SwissDevTrackerWordPress
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add admin menu pages
 */
function swissdevTrackerAddAdminMenu() {
    // Main menu page
    add_menu_page(
        __('SwissDev Tracker', 'swissdev-tracker-wordpress'),
        __('SwissDev Tracker', 'swissdev-tracker-wordpress'),
        'manage_options',
        'swissdev-tracker',
        'swissdevTrackerMainPage',
        'dashicons-analytics',
        30
    );
    
    // Dashboard submenu
    add_submenu_page(
        'swissdev-tracker',
        __('Dashboard', 'swissdev-tracker-wordpress'),
        __('Dashboard', 'swissdev-tracker-wordpress'),
        'manage_options',
        'swissdev-tracker',
        'swissdevTrackerMainPage'
    );
    
    // Projects submenu
    add_submenu_page(
        'swissdev-tracker',
        __('Projects', 'swissdev-tracker-wordpress'),
        __('Projects', 'swissdev-tracker-wordpress'),
        'manage_options',
        'swissdev-tracker-projects',
        'swissdevTrackerProjectsPage'
    );
    
    // Tasks submenu
    add_submenu_page(
        'swissdev-tracker',
        __('Tasks', 'swissdev-tracker-wordpress'),
        __('Tasks', 'swissdev-tracker-wordpress'),
        'manage_options',
        'swissdev-tracker-tasks',
        'swissdevTrackerTasksPage'
    );
    
    // Settings submenu
    add_submenu_page(
        'swissdev-tracker',
        __('Settings', 'swissdev-tracker-wordpress'),
        __('Settings', 'swissdev-tracker-wordpress'),
        'manage_options',
        'swissdev-tracker-settings',
        'swissdevTrackerSettingsPage'
    );
}

/**
 * Main dashboard page callback
 */
function swissdevTrackerMainPage() {
    ?>
    <div class="wrap">
        <h1><?php _e('SwissDev Tracker Dashboard', 'swissdev-tracker-wordpress'); ?></h1>
        <div id="swissdev-tracker-admin-dashboard"></div>
    </div>
    <?php
}

/**
 * Projects page callback
 */
function swissdevTrackerProjectsPage() {
    ?>
    <div class="wrap">
        <h1><?php _e('Projects', 'swissdev-tracker-wordpress'); ?></h1>
        <div id="swissdev-tracker-admin-projects"></div>
    </div>
    <?php
}

/**
 * Tasks page callback
 */
function swissdevTrackerTasksPage() {
    ?>
    <div class="wrap">
        <h1><?php _e('Tasks', 'swissdev-tracker-wordpress'); ?></h1>
        <div id="swissdev-tracker-admin-tasks"></div>
    </div>
    <?php
}

/**
 * Settings page callback
 */
function swissdevTrackerSettingsPage() {
    ?>
    <div class="wrap">
        <h1><?php _e('Settings', 'swissdev-tracker-wordpress'); ?></h1>
        <div id="swissdev-tracker-admin-settings"></div>
    </div>
    <?php
}
