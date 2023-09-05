package com.realtimefin.dashboard;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumer {

//    private final SimpleMessagingTemplate

//
//    public KafkaConsumer(SimpleMessagingTemplate simpleMessagingTemplate){
//        this.simpleMessagingTemplate = simpleMessagingTemplate;
//    }

    @KafkaListener(topics = "reddit-comments", groupId = "reddit-comments-group-id")
    public void consumeRedditComments(String message) {

        System.out.println("comment = " + message);
    }

    @KafkaListener(topics = "reddit-posts", groupId = "reddit-posts-group-id")
    public void consumeRedditPosts(String message) {

        System.out.println("post = " + message);
    }
}
