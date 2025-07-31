<?php
/**
 * Plugin Name: SwissDev Tracker WordPress
 * Plugin URI: https://github.com/agilecharl/swissdev-tracker
 * Description: A comprehensive development tracking and project management plugin with React-powered frontend
 * Version: 1.0.0
 * Author: AgileCharl
 * Author URI: https://github.com/agilecharl
 * License: MIT
 * Text Domain: swissdev-tracker-wordpress
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SWISSDEV_TRACKER_VERSION', '1.0.0');
define('SWISSDEV_TRACKER_PLUGIN_URL', plugin_dir_url(__FILE__));
define('SWISSDEV_TRACKER_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('SWISSDEV_TRACKER_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Main SwissDev Tracker WordPress Plugin Class
 */
class SwissDevTrackerWordPress {
    
    /**
     * Instance of this class
     * @var SwissDevTrackerWordPress
     */
    private static $instance;
    
    /**
     * Get instance of this class
     * @return SwissDevTrackerWordPress
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        $this->init_hooks();
    }
    
    /**
     * Initialize WordPress hooks
     */
    private function init_hooks() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_scripts'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('rest_api_init', array($this, 'init_rest_api'));
        add_action('wp_footer', array($this, 'add_react_root'));
        
        // Admin hooks
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'admin_init'));
        
        // Activation/Deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        
        // Load text domain
        add_action('plugins_loaded', array($this, 'load_textdomain'));
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        // Include required files
        $this->include_files();
        
        // Initialize custom post types
        $this->init_post_types();
        
        // Initialize shortcodes
        $this->init_shortcodes();
    }
    
    /**
     * Include required files
     */
    private function include_files() {
        require_once SWISSDEV_TRACKER_PLUGIN_PATH . 'includes/functions.php';
        require_once SWISSDEV_TRACKER_PLUGIN_PATH . 'includes/post-types.php';
        require_once SWISSDEV_TRACKER_PLUGIN_PATH . 'includes/rest-api.php';
        require_once SWISSDEV_TRACKER_PLUGIN_PATH . 'includes/shortcodes.php';
        require_once SWISSDEV_TRACKER_PLUGIN_PATH . 'includes/admin-menu.php';
    }
    
    /**
     * Initialize custom post types
     */
    private function init_post_types() {
        if (function_exists('swissdev_tracker_register_post_types')) {
            swissdev_tracker_register_post_types();
        }
    }
    
    /**
     * Initialize shortcodes
     */
    private function init_shortcodes() {
        if (function_exists('swissdev_tracker_register_shortcodes')) {
            swissdev_tracker_register_shortcodes();
        }
    }
    
    /**
     * Initialize REST API endpoints
     */
    public function init_rest_api() {
        if (function_exists('swissdev_tracker_register_rest_routes')) {
            swissdev_tracker_register_rest_routes();
        }
    }
    
    /**
     * Enqueue frontend scripts and styles
     */
    public function enqueue_frontend_scripts() {
        // Enqueue React build files
        wp_enqueue_script(
            'swissdev-tracker-react',
            SWISSDEV_TRACKER_PLUGIN_URL . 'assets/js/frontend.js',
            array('wp-element', 'wp-api-fetch'),
            SWISSDEV_TRACKER_VERSION,
            true
        );
        
        wp_enqueue_style(
            'swissdev-tracker-frontend',
            SWISSDEV_TRACKER_PLUGIN_URL . 'assets/css/frontend.css',
            array(),
            SWISSDEV_TRACKER_VERSION
        );
        
        // Localize script with data
        wp_localize_script('swissdev-tracker-react', 'swissdevTracker', array(
            'apiUrl' => rest_url('swissdev-tracker/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'pluginUrl' => SWISSDEV_TRACKER_PLUGIN_URL,
        ));
    }
    
    /**
     * Enqueue admin scripts and styles
     */
    public function enqueue_admin_scripts($hook) {
        // Only load on our admin pages
        if (strpos($hook, 'swissdev-tracker') === false) {
            return;
        }
        
        wp_enqueue_script(
            'swissdev-tracker-admin',
            SWISSDEV_TRACKER_PLUGIN_URL . 'assets/js/admin.js',
            array('wp-element', 'wp-api-fetch', 'wp-components'),
            SWISSDEV_TRACKER_VERSION,
            true
        );
        
        wp_enqueue_style(
            'swissdev-tracker-admin',
            SWISSDEV_TRACKER_PLUGIN_URL . 'assets/css/admin.css',
            array('wp-components'),
            SWISSDEV_TRACKER_VERSION
        );
        
        // Localize script with data
        wp_localize_script('swissdev-tracker-admin', 'swissdevTrackerAdmin', array(
            'apiUrl' => rest_url('swissdev-tracker/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'ajaxUrl' => admin_url('admin-ajax.php'),
        ));
    }
    
    /**
     * Add React root div to footer
     */
    public function add_react_root() {
        echo '<div id="swissdev-tracker-app"></div>';
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        if (function_exists('swissdev_tracker_add_admin_menu')) {
            swissdev_tracker_add_admin_menu();
        }
    }
    
    /**
     * Admin initialization
     */
    public function admin_init() {
        // Register settings, etc.
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        // Create database tables if needed
        $this->create_database_tables();
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Create database tables
     */
    private function create_database_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // Projects table
        $table_name = $wpdb->prefix . 'swissdev_projects';
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name tinytext NOT NULL,
            description text,
            status varchar(20) DEFAULT 'active',
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        // Tasks table
        $table_name_tasks = $wpdb->prefix . 'swissdev_tasks';
        $sql_tasks = "CREATE TABLE $table_name_tasks (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            project_id mediumint(9) NOT NULL,
            title tinytext NOT NULL,
            description text,
            status varchar(20) DEFAULT 'pending',
            priority varchar(10) DEFAULT 'medium',
            assigned_to bigint(20) UNSIGNED,
            due_date datetime,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            FOREIGN KEY (project_id) REFERENCES $table_name(id) ON DELETE CASCADE,
            FOREIGN KEY (assigned_to) REFERENCES {$wpdb->users}(ID) ON DELETE SET NULL
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        dbDelta($sql_tasks);
    }
    
    /**
     * Load text domain for translations
     */
    public function load_textdomain() {
        load_plugin_textdomain(
            'swissdev-tracker-wordpress',
            false,
            dirname(SWISSDEV_TRACKER_PLUGIN_BASENAME) . '/languages/'
        );
    }
}

// Initialize the plugin
SwissDevTrackerWordPress::get_instance();
