<?php
/**
 * SwissDev Tracker Custom Post Types
 *
 * @package SwissDevTrackerWordPress
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register custom post types
 */
function swissdev_tracker_register_post_types() {
    // Register Projects post type
    register_post_type('swissdev_project', array(
        'labels' => array(
            'name' => __('Projects', 'swissdev-tracker-wordpress'),
            'singular_name' => __('Project', 'swissdev-tracker-wordpress'),
            'add_new' => __('Add New Project', 'swissdev-tracker-wordpress'),
            'add_new_item' => __('Add New Project', 'swissdev-tracker-wordpress'),
            'edit_item' => __('Edit Project', 'swissdev-tracker-wordpress'),
            'new_item' => __('New Project', 'swissdev-tracker-wordpress'),
            'view_item' => __('View Project', 'swissdev-tracker-wordpress'),
            'search_items' => __('Search Projects', 'swissdev-tracker-wordpress'),
            'not_found' => __('No projects found', 'swissdev-tracker-wordpress'),
            'not_found_in_trash' => __('No projects found in trash', 'swissdev-tracker-wordpress'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'show_in_rest' => true,
        'rest_base' => 'swissdev-projects',
        'capability_type' => 'post',
        'rewrite' => array('slug' => 'swissdev-projects'),
    ));
    
    // Register Tasks post type
    register_post_type('swissdev_task', array(
        'labels' => array(
            'name' => __('Tasks', 'swissdev-tracker-wordpress'),
            'singular_name' => __('Task', 'swissdev-tracker-wordpress'),
            'add_new' => __('Add New Task', 'swissdev-tracker-wordpress'),
            'add_new_item' => __('Add New Task', 'swissdev-tracker-wordpress'),
            'edit_item' => __('Edit Task', 'swissdev-tracker-wordpress'),
            'new_item' => __('New Task', 'swissdev-tracker-wordpress'),
            'view_item' => __('View Task', 'swissdev-tracker-wordpress'),
            'search_items' => __('Search Tasks', 'swissdev-tracker-wordpress'),
            'not_found' => __('No tasks found', 'swissdev-tracker-wordpress'),
            'not_found_in_trash' => __('No tasks found in trash', 'swissdev-tracker-wordpress'),
        ),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-list-view',
        'supports' => array('title', 'editor', 'custom-fields'),
        'show_in_rest' => true,
        'rest_base' => 'swissdev-tasks',
        'capability_type' => 'post',
        'rewrite' => array('slug' => 'swissdev-tasks'),
    ));
    
    // Register Time Entries post type
    register_post_type('swissdev_time_entry', array(
        'labels' => array(
            'name' => __('Time Entries', 'swissdev-tracker-wordpress'),
            'singular_name' => __('Time Entry', 'swissdev-tracker-wordpress'),
            'add_new' => __('Add New Time Entry', 'swissdev-tracker-wordpress'),
            'add_new_item' => __('Add New Time Entry', 'swissdev-tracker-wordpress'),
            'edit_item' => __('Edit Time Entry', 'swissdev-tracker-wordpress'),
            'new_item' => __('New Time Entry', 'swissdev-tracker-wordpress'),
            'view_item' => __('View Time Entry', 'swissdev-tracker-wordpress'),
            'search_items' => __('Search Time Entries', 'swissdev-tracker-wordpress'),
            'not_found' => __('No time entries found', 'swissdev-tracker-wordpress'),
            'not_found_in_trash' => __('No time entries found in trash', 'swissdev-tracker-wordpress'),
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => 'swissdev-tracker',
        'menu_icon' => 'dashicons-clock',
        'supports' => array('title', 'custom-fields'),
        'show_in_rest' => true,
        'rest_base' => 'swissdev-time-entries',
        'capability_type' => 'post',
    ));
    
    // Register taxonomies
    swissdev_tracker_register_taxonomies();
}

/**
 * Register custom taxonomies
 */
function swissdev_tracker_register_taxonomies() {
    // Project Status taxonomy
    register_taxonomy('project_status', 'swissdev_project', array(
        'labels' => array(
            'name' => __('Project Status', 'swissdev-tracker-wordpress'),
            'singular_name' => __('Status', 'swissdev-tracker-wordpress'),
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => false,
    ));
    
    // Task Status taxonomy
    register_taxonomy('task_status', 'swissdev_task', array(
        'labels' => array(
            'name' => __('Task Status', 'swissdev-tracker-wordpress'),
            'singular_name' => __('Status', 'swissdev-tracker-wordpress'),
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => false,
    ));
    
    // Task Priority taxonomy
    register_taxonomy('task_priority', 'swissdev_task', array(
        'labels' => array(
            'name' => __('Task Priority', 'swissdev-tracker-wordpress'),
            'singular_name' => __('Priority', 'swissdev-tracker-wordpress'),
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => false,
    ));
    
    // Project Categories taxonomy
    register_taxonomy('project_category', 'swissdev_project', array(
        'labels' => array(
            'name' => __('Project Categories', 'swissdev-tracker-wordpress'),
            'singular_name' => __('Category', 'swissdev-tracker-wordpress'),
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => true,
    ));
}
