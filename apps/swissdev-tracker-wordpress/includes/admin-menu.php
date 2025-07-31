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
function swissdev_tracker_add_admin_menu() {
    // Main menu page
    add_menu_page(
        __('SwissDev Tracker', 'swissdev-tracker-wordpress'),
        __('SwissDev Tracker', 'swissdev-tracker-wordpress'),
        'manage_options',
        'swissdev-tracker',
        'swissdev_tracker_main_page',
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
        'swissdev_tracker_main_page'
    );
    
    // Projects submenu
    add_submenu_page(
        'swissdev-tracker',
        __('Projects', 'swissdev-tracker-wordpress'),
        __('Projects', 'swissdev-tracker-wordpress'),
        'manage_options',
        'swissdev-tracker-projects',
        'swissdev_tracker_projects_page'
    );
    
    // Tasks submenu
    add_submenu_page(
        'swissdev-tracker',
        __('Tasks', 'swissdev-tracker-wordpress'),
        __('Tasks', 'swissdev-tracker-wordpress'),
        'manage_options',
        'swissdev-tracker-tasks',
        'swissdev_tracker_tasks_page'
    );
    
    // Settings submenu
    add_submenu_page(
        'swissdev-tracker',
        __('Settings', 'swissdev-tracker-wordpress'),
        __('Settings', 'swissdev-tracker-wordpress'),
        'manage_options',
        'swissdev-tracker-settings',
        'swissdev_tracker_settings_page'
    );
}

/**
 * Main dashboard page callback
 */
function swissdev_tracker_main_page() {
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
function swissdev_tracker_projects_page() {
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
function swissdev_tracker_tasks_page() {
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
function swissdev_tracker_settings_page() {
    ?>
    <div class="wrap">
        <h1><?php _e('Settings', 'swissdev-tracker-wordpress'); ?></h1>
        <div id="swissdev-tracker-admin-settings"></div>
    </div>
    <?php
}
