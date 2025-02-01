package com.pranay.springboot.socialmediaapp.info;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.service.UserService;

import jakarta.annotation.PostConstruct;

@Component
public class UserInfo {

	@Autowired
	UserService userService;

	private static UserService staticUserService;

	@PostConstruct
	private void setUserService() {
		staticUserService = userService;
	}

	public static final boolean isValidatedUser(User user1, User user2) {
		return user1.getId().equals(user2.getId());
	}

	public static final boolean isFollowedByUser(User user1, User user2) {
		return user1.getFollowing().contains(user2);
	}

	public static final boolean isPremium(User user, LocalDateTime premiumExpireDate) {
		if (premiumExpireDate == null) {
			return false;
		}
		if (premiumExpireDate.isBefore(LocalDateTime.now())) {
			try {
				staticUserService.deactivatePremium(user);
			} catch (UserException e) {
				System.out.println("UserException Found.");
			}
			return false;
		}
		return true;
	}
}
