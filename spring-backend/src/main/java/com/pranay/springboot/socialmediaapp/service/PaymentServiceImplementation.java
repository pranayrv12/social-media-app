package com.pranay.springboot.socialmediaapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.pranay.springboot.socialmediaapp.response.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentServiceImplementation implements PaymentService {

	@Value("${stripe.api.key}")
	private String stripeSecretKey;

	@Override
	public PaymentResponse generatePaymentLink(String planType) throws StripeException {
		Stripe.apiKey = stripeSecretKey;

		long amount = planType.equals("annual") ? 680000 : 65000;
		String name = planType.equals("annual") ? "Annual Subscription Plan" : "Monthly Subscription Plan";
		String description = planType.equals("annual") ? "Access Premium Features With This Annual Plan."
				: "Access Premium Features With This Monthly Plan.";

		SessionCreateParams params = SessionCreateParams.builder()
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT).setSuccessUrl("http://localhost:3000/premium/" + planType)
				.setCancelUrl("http://localhost:3000/payment/fail")
				.addLineItem(SessionCreateParams.LineItem.builder().setQuantity(1L)
						.setPriceData(SessionCreateParams.LineItem.PriceData.builder().setCurrency("INR")
								.setUnitAmount(amount).setProductData(SessionCreateParams.LineItem.PriceData.ProductData
										.builder().setName(name).setDescription(description).build())
								.build())
						.build())
				.build();

		Session session = Session.create(params);

		PaymentResponse paymentResponse = new PaymentResponse();
		paymentResponse.setPayment_url(session.getUrl());

		return paymentResponse;
	}
}
