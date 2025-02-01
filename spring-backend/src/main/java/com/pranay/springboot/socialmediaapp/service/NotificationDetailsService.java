package com.pranay.springboot.socialmediaapp.service;

import java.util.List;

import com.pranay.springboot.socialmediaapp.model.Notification;
import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;

public interface NotificationDetailsService {

	public void deleteUserNotifications(User user);

	public void deletePostNotifications(Long postId);

	public void markAllUserNotificationsAsRead(User user);

	public List<Notification> retrieveUserNotifications(User user);

	public void createFollowNotification(User sender, User receiver);

	public void createLikeNotification(Post post, User sender, User receiver);
}
