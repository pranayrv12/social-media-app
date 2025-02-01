package com.pranay.springboot.socialmediaapp.request;

import lombok.Data;

@Data
public class SignInWithGoogleRequest {

	private String clientId;

	private String credential;
}
