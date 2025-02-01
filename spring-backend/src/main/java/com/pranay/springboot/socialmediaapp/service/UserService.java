package com.pranay.springboot.socialmediaapp.service;

import java.util.List;

import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.User;

public interface UserService {

	public List<User> searchUsersByNameOrEmail(String query);

	public void deactivatePremium(User user) throws UserException;

	public User retrieveUserById(Long userId) throws UserException;

	public User retrieveUserByJwt(String jwt) throws UserException;

	public User updateUserProfile(Long userId, User user) throws UserException;

	public User followUnfollowUser(Long userId, User user) throws UserException;

	public void activatePremium(User user, String planType) throws UserException;

	public List<User> retrieveUsersExcludingFollowed(Long userId) throws UserException;
}
