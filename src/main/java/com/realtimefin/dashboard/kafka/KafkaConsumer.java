package com.realtimefin.dashboard.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Component
public class KafkaConsumer {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public KafkaConsumer(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @KafkaListener(topics = "reddit-comments", groupId = "reddit-comments-group-id")
    public void consumeRedditComments(String message) {

        System.out.println("comment = " + message);
        simpMessagingTemplate.convertAndSend("/topic/ws-reddit-comments", message);
    }

    @KafkaListener(topics = "reddit-posts", groupId = "reddit-posts-group-id")
    public void consumeRedditPosts(String message) {

        System.out.println("post = " + message);
        simpMessagingTemplate.convertAndSend("/topic/ws-reddit-posts", message);
    }
}
