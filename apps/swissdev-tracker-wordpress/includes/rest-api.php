<?php
/**
 * SwissDev Tracker REST API Endpoints
 *
 * @package SwissDevTrackerWordPress
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * REST API namespace for SwissDev Tracker
 */
define('SWISSDEV_TRACKER_REST_NAMESPACE', 'swissdev-tracker/v1');

/**
 * Register REST API routes
 */
function swissdevTrackerRegisterRestRoutes() {
    // Projects endpoints
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/projects', array(
        'methods' => 'GET',
        'callback' => 'swissdevTrackerGetProjects',
        'permission_callback' => 'swissdevTrackerPermissionsCheck',
    ));
    
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/projects', array(
        'methods' => 'POST',
        'callback' => 'swissdev_tracker_create_project',
        'permission_callback' => 'swissdev_tracker_permissions_check',
        'args' => array(
            'title' => array(
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'description' => array(
                'required' => false,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_textarea_field',
            ),
            'status' => array(
                'required' => false,
                'type' => 'string',
                'default' => 'active',
            ),
        ),
    ));
    
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/projects/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'swissdev_tracker_get_project',
        'permission_callback' => 'swissdev_tracker_permissions_check',
    ));
    
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/projects/(?P<id>\d+)', array(
        'methods' => 'PUT',
        'callback' => 'swissdev_tracker_update_project',
        'permission_callback' => 'swissdev_tracker_permissions_check',
    ));
    
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/projects/(?P<id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => 'swissdev_tracker_delete_project',
        'permission_callback' => 'swissdev_tracker_permissions_check',
    ));
    
    // Tasks endpoints
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/tasks', array(
        'methods' => 'GET',
        'callback' => 'swissdev_tracker_get_tasks',
        'permission_callback' => 'swissdev_tracker_permissions_check',
    ));
    
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/tasks', array(
        'methods' => 'POST',
        'callback' => 'swissdev_tracker_create_task',
        'permission_callback' => 'swissdev_tracker_permissions_check',
    ));
    
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/tasks/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'swissdev_tracker_get_task',
        'permission_callback' => 'swissdev_tracker_permissions_check',
    ));
    
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/tasks/(?P<id>\d+)', array(
        'methods' => 'PUT',
        'callback' => 'swissdev_tracker_update_task',
        'permission_callback' => 'swissdev_tracker_permissions_check',
    ));
    
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/tasks/(?P<id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => 'swissdev_tracker_delete_task',
        'permission_callback' => 'swissdev_tracker_permissions_check',
    ));
    
    // Dashboard stats endpoint
    register_rest_route(SWISSDEV_TRACKER_REST_NAMESPACE, '/dashboard/stats', array(
        'methods' => 'GET',
        'callback' => 'swissdev_tracker_get_dashboard_stats',
        'permission_callback' => 'swissdev_tracker_permissions_check',
    ));
}

/**
 * Permission callback for REST API endpoints
 */
function swissdevTrackerPermissionsCheck() {
    return current_user_can('manage_options');
}

/**
 * Get all projects
 */
function swissdevTrackerGetProjects($request) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_projects';
    $projects = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");
    
    return rest_ensure_response($projects);
}

/**
 * Create a new project
 */
function swissdev_tracker_create_project($request) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_projects';
    
    $result = $wpdb->insert(
        $table_name,
        array(
            'name' => $request['title'],
            'description' => $request['description'],
            'status' => $request['status'],
        ),
        array('%s', '%s', '%s')
    );
    
    if ($result === false) {
        return new WP_Error('db_error', 'Failed to create project', array('status' => 500));
    }
    
    $project_id = $wpdb->insert_id;
    $project = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $project_id));
    
    return rest_ensure_response($project);
}

/**
 * Get a specific project
 */
function swissdev_tracker_get_project($request) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_projects';
    $project = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $request['id']));
    
    if (!$project) {
        return new WP_Error('not_found', 'Project not found', array('status' => 404));
    }
    
    return rest_ensure_response($project);
}

/**
 * Update a project
 */
function swissdev_tracker_update_project($request) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_projects';
    $params = $request->get_params();
    
    $update_data = array();
    $update_format = array();
    
    if (isset($params['title'])) {
        $update_data['name'] = $params['title'];
        $update_format[] = '%s';
    }
    
    if (isset($params['description'])) {
        $update_data['description'] = $params['description'];
        $update_format[] = '%s';
    }
    
    if (isset($params['status'])) {
        $update_data['status'] = $params['status'];
        $update_format[] = '%s';
    }
    
    if (empty($update_data)) {
        return new WP_Error('no_data', 'No data to update', array('status' => 400));
    }
    
    $result = $wpdb->update(
        $table_name,
        $update_data,
        array('id' => $request['id']),
        $update_format,
        array('%d')
    );
    
    if ($result === false) {
        return new WP_Error('db_error', 'Failed to update project', array('status' => 500));
    }
    
    $project = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $request['id']));
    
    return rest_ensure_response($project);
}

/**
 * Delete a project
 */
function swissdev_tracker_delete_project($request) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_projects';
    
    $result = $wpdb->delete(
        $table_name,
        array('id' => $request['id']),
        array('%d')
    );
    
    if ($result === false) {
        return new WP_Error('db_error', 'Failed to delete project', array('status' => 500));
    }
    
    return rest_ensure_response(array('deleted' => true));
}

/**
 * Get all tasks
 */
function swissdev_tracker_get_tasks($request) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_tasks';
    $projects_table = $wpdb->prefix . 'swissdev_projects';
    
    $query = "SELECT t.*, p.name as project_name 
              FROM $table_name t 
              LEFT JOIN $projects_table p ON t.project_id = p.id 
              ORDER BY t.created_at DESC";
    
    $tasks = $wpdb->get_results($query);
    
    return rest_ensure_response($tasks);
}

/**
 * Create a new task
 */
function swissdev_tracker_create_task($request) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_tasks';
    
    $result = $wpdb->insert(
        $table_name,
        array(
            'project_id' => $request['project_id'],
            'title' => $request['title'],
            'description' => $request['description'],
            'status' => $request['status'] ?? 'pending',
            'priority' => $request['priority'] ?? 'medium',
            'assigned_to' => $request['assigned_to'] ?? null,
            'due_date' => $request['due_date'] ?? null,
        ),
        array('%d', '%s', '%s', '%s', '%s', '%d', '%s')
    );
    
    if ($result === false) {
        return new WP_Error('db_error', 'Failed to create task', array('status' => 500));
    }
    
    $task_id = $wpdb->insert_id;
    $task = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $task_id));
    
    return rest_ensure_response($task);
}

/**
 * Get a specific task
 */
function swissdev_tracker_get_task($request) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_tasks';
    $task = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $request['id']));
    
    if (!$task) {
        return new WP_Error('not_found', 'Task not found', array('status' => 404));
    }
    
    return rest_ensure_response($task);
}

/**
 * Update a task
 */
function swissdev_tracker_update_task($request) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_tasks';
    $params = $request->get_params();
    
    $update_data = array();
    $update_format = array();
    
    $allowed_fields = array('title', 'description', 'status', 'priority', 'assigned_to', 'due_date', 'project_id');
    
    foreach ($allowed_fields as $field) {
        if (isset($params[$field])) {
            $update_data[$field] = $params[$field];
            $update_format[] = in_array($field, array('project_id', 'assigned_to')) ? '%d' : '%s';
        }
    }
    
    if (empty($update_data)) {
        return new WP_Error('no_data', 'No data to update', array('status' => 400));
    }
    
    $result = $wpdb->update(
        $table_name,
        $update_data,
        array('id' => $request['id']),
        $update_format,
        array('%d')
    );
    
    if ($result === false) {
        return new WP_Error('db_error', 'Failed to update task', array('status' => 500));
    }
    
    $task = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $request['id']));
    
    return rest_ensure_response($task);
}

/**
 * Delete a task
 */
function swissdev_tracker_delete_task($request) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'swissdev_tasks';
    
    $result = $wpdb->delete(
        $table_name,
        array('id' => $request['id']),
        array('%d')
    );
    
    if ($result === false) {
        return new WP_Error('db_error', 'Failed to delete task', array('status' => 500));
    }
    
    return rest_ensure_response(array('deleted' => true));
}

/**
 * Get dashboard statistics
 */
function swissdev_tracker_get_dashboard_stats($request) {
    global $wpdb;
    
    $projects_table = $wpdb->prefix . 'swissdev_projects';
    $tasks_table = $wpdb->prefix . 'swissdev_tasks';
    
    $total_projects = $wpdb->get_var("SELECT COUNT(*) FROM $projects_table");
    $active_projects = $wpdb->get_var("SELECT COUNT(*) FROM $projects_table WHERE status = 'active'");
    $total_tasks = $wpdb->get_var("SELECT COUNT(*) FROM $tasks_table");
    $completed_tasks = $wpdb->get_var("SELECT COUNT(*) FROM $tasks_table WHERE status = 'completed'");
    $pending_tasks = $wpdb->get_var("SELECT COUNT(*) FROM $tasks_table WHERE status = 'pending'");
    $in_progress_tasks = $wpdb->get_var("SELECT COUNT(*) FROM $tasks_table WHERE status = 'in_progress'");
    
    $stats = array(
        'projects' => array(
            'total' => (int) $total_projects,
            'active' => (int) $active_projects,
        ),
        'tasks' => array(
            'total' => (int) $total_tasks,
            'completed' => (int) $completed_tasks,
            'pending' => (int) $pending_tasks,
            'in_progress' => (int) $in_progress_tasks,
        ),
    );
    
    return rest_ensure_response($stats);
}
