package com.example.be_eric.config;

import com.google.api.client.util.Value;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirestoreConfig {

//    @Value("${firebase.serviceFirebaseKey}")
    private String serviceAccountPath = "src/main/resources/serviceFirebaseKey.json";

    private Firestore firestore;

    @PostConstruct
    public void init() throws IOException {
        FileInputStream serviceAccount = new FileInputStream(serviceAccountPath);

        FirestoreOptions options = FirestoreOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        firestore = options.getService();
    }

    @Bean
    public Firestore firestore() {
        return firestore;
    }
}
