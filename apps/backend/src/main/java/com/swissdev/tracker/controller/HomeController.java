package com.swissdev.tracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to SwissDev Tracker Backend! Available endpoints: /, /api/health, /api/status";
    }

    @GetMapping("/api/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/api/status")
    public String status() {
        return "{\"status\": \"running\", \"service\": \"SwissDev Tracker Backend\"}";
    }
}