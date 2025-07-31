<?php
/**
 * SwissDev Tracker Shortcodes
 *
 * @package SwissDevTrackerWordPress
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register shortcodes
 */
function swissdev_tracker_register_shortcodes() {
    add_shortcode('swissdev_tracker_dashboard', 'swissdev_tracker_dashboard_shortcode');
    add_shortcode('swissdev_tracker_projects', 'swissdev_tracker_projects_shortcode');
    add_shortcode('swissdev_tracker_tasks', 'swissdev_tracker_tasks_shortcode');
    add_shortcode('swissdev_tracker_project_form', 'swissdev_tracker_project_form_shortcode');
    add_shortcode('swissdev_tracker_task_form', 'swissdev_tracker_task_form_shortcode');
}

/**
 * Dashboard shortcode
 */
function swissdev_tracker_dashboard_shortcode($atts) {
    $atts = shortcode_atts(array(
        'theme' => 'light',
        'show_stats' => 'true',
        'show_recent' => 'true',
    ), $atts, 'swissdev_tracker_dashboard');
    
    ob_start();
    ?>
    <div class="swissdev-tracker-dashboard" 
         data-theme="<?php echo esc_attr($atts['theme']); ?>"
         data-show-stats="<?php echo esc_attr($atts['show_stats']); ?>"
         data-show-recent="<?php echo esc_attr($atts['show_recent']); ?>">
        <div id="swissdev-tracker-frontend-dashboard"></div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Projects list shortcode
 */
function swissdev_tracker_projects_shortcode($atts) {
    $atts = shortcode_atts(array(
        'limit' => '10',
        'status' => 'all',
        'columns' => 'title,status,created',
        'editable' => 'false',
    ), $atts, 'swissdev_tracker_projects');
    
    ob_start();
    ?>
    <div class="swissdev-tracker-projects" 
         data-limit="<?php echo esc_attr($atts['limit']); ?>"
         data-status="<?php echo esc_attr($atts['status']); ?>"
         data-columns="<?php echo esc_attr($atts['columns']); ?>"
         data-editable="<?php echo esc_attr($atts['editable']); ?>">
        <div id="swissdev-tracker-frontend-projects"></div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Tasks list shortcode
 */
function swissdev_tracker_tasks_shortcode($atts) {
    $atts = shortcode_atts(array(
        'limit' => '10',
        'project_id' => '',
        'status' => 'all',
        'assigned_to' => '',
        'columns' => 'title,status,priority,due_date',
        'editable' => 'false',
    ), $atts, 'swissdev_tracker_tasks');
    
    ob_start();
    ?>
    <div class="swissdev-tracker-tasks" 
         data-limit="<?php echo esc_attr($atts['limit']); ?>"
         data-project-id="<?php echo esc_attr($atts['project_id']); ?>"
         data-status="<?php echo esc_attr($atts['status']); ?>"
         data-assigned-to="<?php echo esc_attr($atts['assigned_to']); ?>"
         data-columns="<?php echo esc_attr($atts['columns']); ?>"
         data-editable="<?php echo esc_attr($atts['editable']); ?>">
        <div id="swissdev-tracker-frontend-tasks"></div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Project form shortcode
 */
function swissdev_tracker_project_form_shortcode($atts) {
    $atts = shortcode_atts(array(
        'redirect_after' => '',
        'show_title' => 'true',
        'title' => 'Create New Project',
    ), $atts, 'swissdev_tracker_project_form');
    
    ob_start();
    ?>
    <div class="swissdev-tracker-project-form" 
         data-redirect-after="<?php echo esc_attr($atts['redirect_after']); ?>"
         data-show-title="<?php echo esc_attr($atts['show_title']); ?>"
         data-title="<?php echo esc_attr($atts['title']); ?>">
        <?php if ($atts['show_title'] === 'true'): ?>
            <h3><?php echo esc_html($atts['title']); ?></h3>
        <?php endif; ?>
        <div id="swissdev-tracker-frontend-project-form"></div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Task form shortcode
 */
function swissdev_tracker_task_form_shortcode($atts) {
    $atts = shortcode_atts(array(
        'project_id' => '',
        'redirect_after' => '',
        'show_title' => 'true',
        'title' => 'Create New Task',
    ), $atts, 'swissdev_tracker_task_form');
    
    ob_start();
    ?>
    <div class="swissdev-tracker-task-form" 
         data-project-id="<?php echo esc_attr($atts['project_id']); ?>"
         data-redirect-after="<?php echo esc_attr($atts['redirect_after']); ?>"
         data-show-title="<?php echo esc_attr($atts['show_title']); ?>"
         data-title="<?php echo esc_attr($atts['title']); ?>">
        <?php if ($atts['show_title'] === 'true'): ?>
            <h3><?php echo esc_html($atts['title']); ?></h3>
        <?php endif; ?>
        <div id="swissdev-tracker-frontend-task-form"></div>
    </div>
    <?php
    return ob_get_clean();
}
