package com.realtimefin.dashboard;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckEndpoint {

    @GetMapping(value = "/health", produces = MediaType.TEXT_PLAIN_VALUE)
    public String getHealthCheck() {
        return "Dashboard Server is up.";
    }
}
