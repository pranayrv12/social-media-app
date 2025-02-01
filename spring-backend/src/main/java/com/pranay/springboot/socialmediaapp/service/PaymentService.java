package com.pranay.springboot.socialmediaapp.service;

import com.pranay.springboot.socialmediaapp.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

	public PaymentResponse generatePaymentLink(String planType) throws StripeException;
}
