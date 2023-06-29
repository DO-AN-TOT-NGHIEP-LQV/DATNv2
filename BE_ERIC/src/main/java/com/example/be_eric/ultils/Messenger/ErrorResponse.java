package com.example.be_eric.ultils.Messenger;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ErrorResponse {

    @JsonProperty("error_message")
    private String errorMessage;
    public ErrorResponse(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String error_message) {
        this.errorMessage = errorMessage;
    }
}

