package com.pranay.springboot.socialmediaapp.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Premium {

	private String planType;

	private boolean isPremium = false;

	private LocalDateTime premiumStartDate;

	private LocalDateTime premiumExpireDate;
}
