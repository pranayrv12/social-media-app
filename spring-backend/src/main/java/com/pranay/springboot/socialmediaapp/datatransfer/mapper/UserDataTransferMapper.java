package com.pranay.springboot.socialmediaapp.datatransfer.mapper;

import java.util.ArrayList;
import java.util.List;

import com.pranay.springboot.socialmediaapp.datatransfer.UserDataTransfer;
import com.pranay.springboot.socialmediaapp.info.UserInfo;
import com.pranay.springboot.socialmediaapp.model.User;

public class UserDataTransferMapper {

	public static UserDataTransfer toUserDataTransfer(User user) {
		UserDataTransfer userDataTransfer = new UserDataTransfer();

		userDataTransfer.setId(user.getId());
		userDataTransfer.setBio(user.getBio());
		userDataTransfer.setName(user.getName());
		userDataTransfer.setEmail(user.getEmail());
		userDataTransfer.setWebsite(user.getWebsite());
		userDataTransfer.setLocation(user.getLocation());
		userDataTransfer.setBirthDate(user.getBirthDate());
		userDataTransfer.setCreatedAt(user.getCreatedAt());
		userDataTransfer.setCoverImage(user.getCoverImage());
		userDataTransfer.setProfileImage(user.getProfileImage());
		userDataTransfer.setLoginWithGoogle(user.isLoginWithGoogle());

		userDataTransfer.setFollowers(toUserDataTransfers(user.getFollowers()));
		userDataTransfer.setFollowing(toUserDataTransfers(user.getFollowing()));
		userDataTransfer.setPremium(UserInfo.isPremium(user, user.getPremium().getPremiumExpireDate()));

		if (userDataTransfer.isPremium()) {
			userDataTransfer.setPremiumPlanType(user.getPremium().getPlanType());
		}
		return userDataTransfer;
	}

	public static List<UserDataTransfer> toUserDataTransfers(List<User> users) {
		List<UserDataTransfer> userDataTransfers = new ArrayList<>();

		for (User user : users) {
			UserDataTransfer userDataTransfer = new UserDataTransfer();

			userDataTransfer.setId(user.getId());
			userDataTransfer.setBio(user.getBio());
			userDataTransfer.setName(user.getName());
			userDataTransfer.setEmail(user.getEmail());
			userDataTransfer.setProfileImage(user.getProfileImage());
			userDataTransfer.setPremium(UserInfo.isPremium(user, user.getPremium().getPremiumExpireDate()));

			userDataTransfers.add(userDataTransfer);
		}
		return userDataTransfers;
	}
}
