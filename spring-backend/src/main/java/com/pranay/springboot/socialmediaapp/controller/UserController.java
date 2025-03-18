package com.pranay.springboot.socialmediaapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.socialmediaapp.datatransfer.UserDataTransfer;
import com.pranay.springboot.socialmediaapp.datatransfer.mapper.UserDataTransferMapper;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.info.UserInfo;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	@PutMapping("/user/update")
	public ResponseEntity<UserDataTransfer> updateUserProfile(@RequestBody User user,
			@RequestHeader("Authorization") String jwt) throws UserException {

		User u = userService.retrieveUserByJwt(jwt);
		User updatedUser = userService.updateUserProfile(u.getId(), user);
		updatedUser.setPassword(null);

		UserDataTransfer userDataTransfer = UserDataTransferMapper.toUserDataTransfer(u);
		userDataTransfer.setValidatedUser(true);

		return new ResponseEntity<UserDataTransfer>(userDataTransfer, HttpStatus.ACCEPTED);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<UserDataTransfer> retrieveUserById(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) throws UserException {

		User user1 = userService.retrieveUserByJwt(jwt);
		User user2 = userService.retrieveUserById(userId);
		UserDataTransfer userDataTransfer = UserDataTransferMapper.toUserDataTransfer(user2);

		userDataTransfer.setFollowed(UserInfo.isFollowedByUser(user1, user2));
		userDataTransfer.setValidatedUser(UserInfo.isValidatedUser(user1, user2));

		return new ResponseEntity<UserDataTransfer>(userDataTransfer, HttpStatus.ACCEPTED);
	}

	@PutMapping("/user/{userId}/follow")
	public ResponseEntity<UserDataTransfer> followUnfollowUser(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) throws UserException {

		User u = userService.retrieveUserByJwt(jwt);
		User toBeFollowed = userService.followUnfollowUser(userId, u);
		UserDataTransfer userDataTransfer = UserDataTransferMapper.toUserDataTransfer(toBeFollowed);
		userDataTransfer.setFollowed(UserInfo.isFollowedByUser(u, toBeFollowed));

		return new ResponseEntity<UserDataTransfer>(userDataTransfer, HttpStatus.ACCEPTED);
	}

	@GetMapping("/users/search")
	public ResponseEntity<List<UserDataTransfer>> searchUsersByNameOrEmail(@RequestParam String query,
			@RequestHeader("Authorization") String jwt) throws UserException {

		List<User> users = userService.searchUsersByNameOrEmail(query);
		List<UserDataTransfer> userDataTransfers = UserDataTransferMapper.toUserDataTransfers(users);

		return new ResponseEntity<List<UserDataTransfer>>(userDataTransfers, HttpStatus.ACCEPTED);
	}

	@GetMapping("/users/{userId}/excluding-followed")
	public ResponseEntity<List<UserDataTransfer>> retrieveUsersExcludingFollowed(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) throws UserException {

		List<User> users = userService.retrieveUsersExcludingFollowed(userId);
		List<UserDataTransfer> userDataTransfers = UserDataTransferMapper.toUserDataTransfers(users);

		return new ResponseEntity<List<UserDataTransfer>>(userDataTransfers, HttpStatus.ACCEPTED);
	}

	@GetMapping("/user/profile")
	public ResponseEntity<UserDataTransfer> retrieveUserProfile(@RequestHeader("Authorization") String jwt)
			throws UserException {

		User user = userService.retrieveUserByJwt(jwt);
		user.setPassword(null);
		user.setValidatedUser(true);
		UserDataTransfer userDataTransfer = UserDataTransferMapper.toUserDataTransfer(user);
		userDataTransfer.setValidatedUser(true);

		return new ResponseEntity<UserDataTransfer>(userDataTransfer, HttpStatus.ACCEPTED);
	}
}
