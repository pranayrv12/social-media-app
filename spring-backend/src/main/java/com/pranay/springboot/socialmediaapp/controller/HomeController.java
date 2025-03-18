package com.pranay.springboot.socialmediaapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.socialmediaapp.response.ApiResponse;

@RestController
public class HomeController {

	@GetMapping("/")
	public ResponseEntity<ApiResponse> Home() {
		ApiResponse response = new ApiResponse("Welcome to X!", true);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.ACCEPTED);
	}
}
