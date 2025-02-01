package com.pranay.springboot.socialmediaapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Premium;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.repository.UserRepository;
import com.pranay.springboot.socialmediaapp.security.JwtProvider;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private NotificationDetailsService notificationDetailsService;

	@Override
	public List<User> searchUsersByNameOrEmail(String query) {
		return userRepository.searchUsersByNameOrEmail(query);
	}

	@Override
	public void deactivatePremium(User user) throws UserException {
		user.setPremium(new Premium());
		userRepository.save(user);
	}

	@Override
	public User retrieveUserByJwt(String jwt) throws UserException {
		String email = jwtProvider.retrieveEmailFromJwtToken(jwt);
		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new UserException("User Not Found.");
		}
		return user;
	}

	@Override
	public User updateUserProfile(Long userId, User user) throws UserException {
		User toBeUpdated = retrieveUserById(userId);

		if (user.getBio() != null) {
			toBeUpdated.setBio(user.getBio());
		}

		if (user.getName() != null) {
			toBeUpdated.setName(user.getName());
		}

		if (user.getWebsite() != null) {
			toBeUpdated.setWebsite(user.getWebsite());
		}

		if (user.getLocation() != null) {
			toBeUpdated.setLocation(user.getLocation());
		}

		if (user.getBirthDate() != null) {
			toBeUpdated.setBirthDate(user.getBirthDate());
		}

		if (user.getCoverImage() != null) {
			toBeUpdated.setCoverImage(user.getCoverImage());
		}

		if (user.getProfileImage() != null) {
			toBeUpdated.setProfileImage(user.getProfileImage());
		}
		return userRepository.save(toBeUpdated);
	}

	@Override
	public List<User> retrieveUsersExcludingFollowed(Long userId) throws UserException {
		List<User> users = userRepository.retrieveUsersExcludingFollowed(userId);
		return users;
	}

	@Override
	public void activatePremium(User user, String planType) throws UserException {
		user.getPremium().setPremium(true);
		user.getPremium().setPlanType(planType);
		user.getPremium().setPremiumStartDate(LocalDateTime.now());

		if (planType.equals("annual")) {
			LocalDateTime premiumExpireDate = user.getPremium().getPremiumStartDate().plusYears(1);
			user.getPremium().setPremiumExpireDate(premiumExpireDate);
		} else {
			LocalDateTime premiumExpireDate = user.getPremium().getPremiumStartDate().plusMonths(1);
			user.getPremium().setPremiumExpireDate(premiumExpireDate);
		}
		userRepository.save(user);
	}

	@Override
	public User followUnfollowUser(Long userId, User user) throws UserException {
		User toBeFollowed = retrieveUserById(userId);

		if (user.getFollowing().contains(toBeFollowed) && toBeFollowed.getFollowers().contains(user)) {
			user.getFollowing().remove(toBeFollowed);
			toBeFollowed.getFollowers().remove(user);
		} else {
			user.getFollowing().add(toBeFollowed);
			toBeFollowed.getFollowers().add(user);
			notificationDetailsService.createFollowNotification(user, toBeFollowed);
		}
		userRepository.save(toBeFollowed);
		userRepository.save(user);
		return toBeFollowed;
	}

	@Override
	public User retrieveUserById(Long userId) throws UserException {
		User user = userRepository.findById(userId).orElseThrow(() -> new UserException("User Not Found."));

		return user;
	}
}
