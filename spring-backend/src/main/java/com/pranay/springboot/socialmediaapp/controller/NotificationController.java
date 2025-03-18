package com.pranay.springboot.socialmediaapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Notification;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.service.NotificationDetailsService;
import com.pranay.springboot.socialmediaapp.service.UserService;

@RestController
@RequestMapping("/api")
public class NotificationController {

	@Autowired
	private UserService userService;

	@Autowired
	private NotificationDetailsService notificationDetailsService;

	@DeleteMapping("/notifications/delete")
	public ResponseEntity<String> deleteUserNotifications(@RequestHeader("Authorization") String jwt)
			throws UserException {

		User user = userService.retrieveUserByJwt(jwt);
		notificationDetailsService.deleteUserNotifications(user);

		return new ResponseEntity<String>("Notifications Deleted Successfully.", HttpStatus.ACCEPTED);
	}

	@PutMapping("/notifications/markAllAsRead")
	public ResponseEntity<String> markAllUserNotificationsAsRead(@RequestHeader("Authorization") String jwt)
			throws UserException {

		User user = userService.retrieveUserByJwt(jwt);
		notificationDetailsService.markAllUserNotificationsAsRead(user);

		return new ResponseEntity<String>("Notifications Marked As Read Successfully.", HttpStatus.ACCEPTED);
	}

	@GetMapping("/notifications")
	public ResponseEntity<List<Notification>> retrieveUserNotifications(@RequestHeader("Authorization") String jwt)
			throws UserException {

		User user = userService.retrieveUserByJwt(jwt);
		List<Notification> notifications = notificationDetailsService.retrieveUserNotifications(user);

		return new ResponseEntity<List<Notification>>(notifications, HttpStatus.ACCEPTED);
	}
}
