package com.pranay.springboot.socialmediaapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.response.PaymentResponse;
import com.pranay.springboot.socialmediaapp.service.PaymentService;
import com.pranay.springboot.socialmediaapp.service.UserService;
import com.stripe.exception.StripeException;

@RestController
@RequestMapping("/api")
public class PaymentController {

	@Autowired
	private UserService userService;

	@Autowired
	private PaymentService paymentService;

	@PostMapping("/premium/payment-link/{planType}")
	public ResponseEntity<PaymentResponse> generatePaymentLink(@PathVariable String planType,
			@RequestHeader("Authorization") String jwt) throws UserException, StripeException {

		PaymentResponse paymentResponse = paymentService.generatePaymentLink(planType);

		return new ResponseEntity<PaymentResponse>(paymentResponse, HttpStatus.CREATED);
	}

	@PutMapping("/premium/activate/{planType}")
	public ResponseEntity<String> activatePremium(@PathVariable String planType,
			@RequestHeader("Authorization") String jwt) throws UserException, StripeException {

		User user = userService.retrieveUserByJwt(jwt);

		if (user.getPremium().isPremium()) {
			return new ResponseEntity<String>("You are already subscribed to Premium.", HttpStatus.ACCEPTED);
		}
		userService.activatePremium(user, planType);

		return new ResponseEntity<String>("You are now subscribed to Premium.", HttpStatus.ACCEPTED);
	}
}
