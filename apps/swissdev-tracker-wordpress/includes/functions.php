<?php
/**
 * SwissDev Tracker Helper Functions
 *
 * @package SwissDevTrackerWordPress
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get project statuses
 */
function swissdevTrackerGetProjectStatuses() {
    return array(
        'active' => __('Active', 'swissdev-tracker-wordpress'),
        'completed' => __('Completed', 'swissdev-tracker-wordpress'),
        'on_hold' => __('On Hold', 'swissdev-tracker-wordpress'),
        'cancelled' => __('Cancelled', 'swissdev-tracker-wordpress'),
    );
}

/**
 * Get task statuses
 */
function swissdev_tracker_get_task_statuses() {
    return array(
        'pending' => __('Pending', 'swissdev-tracker-wordpress'),
        'in_progress' => __('In Progress', 'swissdev-tracker-wordpress'),
        'review' => __('Under Review', 'swissdev-tracker-wordpress'),
        'completed' => __('Completed', 'swissdev-tracker-wordpress'),
        'cancelled' => __('Cancelled', 'swissdev-tracker-wordpress'),
    );
}

/**
 * Get task priorities
 */
function swissdev_tracker_get_task_priorities() {
    return array(
        'low' => __('Low', 'swissdev-tracker-wordpress'),
        'medium' => __('Medium', 'swissdev-tracker-wordpress'),
        'high' => __('High', 'swissdev-tracker-wordpress'),
        'urgent' => __('Urgent', 'swissdev-tracker-wordpress'),
    );
}

/**
 * Format date for display
 */
function swissdev_tracker_format_date($date, $format = 'Y-m-d H:i:s') {
    if (empty($date)) {
        return '';
    }
    
    $date_obj = DateTime::createFromFormat('Y-m-d H:i:s', $date);
    if ($date_obj === false) {
        return $date;
    }
    
    return $date_obj->format($format);
}

/**
 * Get user display name
 */
function swissdev_tracker_get_user_display_name($user_id) {
    if (empty($user_id)) {
        return __('Unassigned', 'swissdev-tracker-wordpress');
    }
    
    $user = get_user_by('ID', $user_id);
    if (!$user) {
        return __('Unknown User', 'swissdev-tracker-wordpress');
    }
    
    return $user->display_name;
}

/**
 * Get project by ID
 */
function swissdev_tracker_get_project_by_id($project_id) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_projects';
    return $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $project_id));
}

/**
 * Get tasks by project ID
 */
function swissdev_tracker_get_tasks_by_project($project_id, $limit = 10) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_tasks';
    return $wpdb->get_results(
        $wpdb->prepare(
            "SELECT * FROM $table_name WHERE project_id = %d ORDER BY created_at DESC LIMIT %d",
            $project_id,
            $limit
        )
    );
}

/**
 * Get recent projects
 */
function swissdev_tracker_get_recent_projects($limit = 5) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_projects';
    return $wpdb->get_results(
        $wpdb->prepare(
            "SELECT * FROM $table_name ORDER BY updated_at DESC LIMIT %d",
            $limit
        )
    );
}

/**
 * Get recent tasks
 */
function swissdev_tracker_get_recent_tasks($limit = 5) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_tasks';
    $projects_table = $wpdb->prefix . 'swissdev_projects';
    
    return $wpdb->get_results(
        $wpdb->prepare(
            "SELECT t.*, p.name as project_name 
             FROM $table_name t 
             LEFT JOIN $projects_table p ON t.project_id = p.id 
             ORDER BY t.updated_at DESC 
             LIMIT %d",
            $limit
        )
    );
}

/**
 * Check if user can manage projects
 */
function swissdev_tracker_user_can_manage() {
    return current_user_can('manage_options') || current_user_can('edit_posts');
}

/**
 * Check if user can edit specific project
 */
function swissdevTrackerUserCanEditProject($project_id) {
    if (current_user_can('manage_options')) {
        return true;
    }
    
    // Add custom logic here for project-specific permissions
    return false;
}
```

/**
 * Check if user can edit specific task
 */
function swissdevTrackerUserCanEditTask($task_id) {
    if (current_user_can('manage_options')) {
        return true;
    }
    
    global $wpdb;
    $table_name = $wpdb->prefix . 'swissdev_tasks';
    $task = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $task_id));
    
    if ($task && $task->assigned_to == get_current_user_id()) {
        return true;
    }
    
    return false;
}

/**
 * Sanitize project data
 */
function swissdevTrackerSanitizeProjectData($data) {
    $sanitized = array();
    
    if (isset($data['name'])) {
        $sanitized['name'] = sanitize_text_field($data['name']);
    }
    
    if (isset($data['description'])) {
        $sanitized['description'] = sanitize_textarea_field($data['description']);
    }
    
    if (isset($data['status'])) {
        $valid_statuses = array_keys(swissdevTrackerGetProjectStatuses());
        $sanitized['status'] = in_array($data['status'], $valid_statuses) ? $data['status'] : 'active';
    }
    
    return $sanitized;
}

/**
 * Sanitize task data
 */
function swissdevTrackerSanitizeTaskData($data) {
    $sanitized = array();
    
    if (isset($data['title'])) {
        $sanitized['title'] = sanitize_text_field($data['title']);
    }
    
    if (isset($data['description'])) {
        $sanitized['description'] = sanitize_textarea_field($data['description']);
    }
    
    if (isset($data['status'])) {
        $valid_statuses = array_keys(swissdev_tracker_get_task_statuses());
        $sanitized['status'] = in_array($data['status'], $valid_statuses) ? $data['status'] : 'pending';
    }
    
    if (isset($data['priority'])) {
        $valid_priorities = array_keys(swissdev_tracker_get_task_priorities());
        $sanitized['priority'] = in_array($data['priority'], $valid_priorities) ? $data['priority'] : 'medium';
    }
    
    if (isset($data['project_id'])) {
        $sanitized['project_id'] = intval($data['project_id']);
    }
    
    if (isset($data['assigned_to'])) {
        $sanitized['assigned_to'] = intval($data['assigned_to']);
    }
    
    if (isset($data['due_date']) && !empty($data['due_date'])) {
        $sanitized['due_date'] = sanitize_text_field($data['due_date']);
    }
    
    return $sanitized;
}

/**
 * Log activity
 */
function swissdevTrackerLogActivity($type, $object_id, $message) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_activity_log';
    
    // Create activity log table if it doesn't exist
    $wpdb->query("CREATE TABLE IF NOT EXISTS $table_name (
        id int(11) NOT NULL AUTO_INCREMENT,
        type varchar(50) NOT NULL,
        object_id int(11) NOT NULL,
        user_id bigint(20) UNSIGNED,
        message text NOT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    )");
    
    $wpdb->insert(
        $table_name,
        array(
            'type' => $type,
            'object_id' => $object_id,
            'user_id' => get_current_user_id(),
            'message' => $message,
        ),
        array('%s', '%d', '%d', '%s')
    );
}
