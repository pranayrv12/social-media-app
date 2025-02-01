package com.pranay.springboot.socialmediaapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pranay.springboot.socialmediaapp.info.UserInfo;
import com.pranay.springboot.socialmediaapp.model.Notification;
import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.repository.NotificationRepository;

@Service
public class NotificationDetailsServiceImplementation implements NotificationDetailsService {

	@Autowired
	private NotificationRepository notificationRepository;

	@Override
	@Transactional
	public void deletePostNotifications(Long postId) {
		notificationRepository.deleteByPostId(postId);
	}

	@Override
	@Transactional
	public void deleteUserNotifications(User user) {
		notificationRepository.deleteByUserId(user.getId());
	}

	@Override
	@Transactional
	public void markAllUserNotificationsAsRead(User user) {
		notificationRepository.markAllUserNotificationsAsRead(user.getId());
	}

	@Override
	public List<Notification> retrieveUserNotifications(User user) {
		return notificationRepository.retrieveUserNotifications(user.getId());
	}

	@Override
	public void createLikeNotification(Post post, User sender, User receiver) {
		Notification notification = new Notification();
		int totalLikes = post.getLikes().size();

		notification.setPostId(post.getId());
		notification.setSenderId(sender.getId());
		notification.setUserId(receiver.getId());
		notification.setSenderName(sender.getName());
		notification.setCreatedAt(LocalDateTime.now());
		notification.setDescription(post.getDescription());
		notification.setProfileImage(sender.getProfileImage());

		if (totalLikes == 0) {
			if (post.isPost()) {
				notification.setMessage(" liked your post.");
			} else {
				notification.setMessage(" liked your reply.");
			}
		} else {
			if (post.isPost()) {
				notification.setMessage(" and " + totalLikes + " others liked your post.");
			} else {
				notification.setMessage(" and " + totalLikes + " others liked your reply.");
			}
		}
		notification.setPremium(UserInfo.isPremium(sender, sender.getPremium().getPremiumExpireDate()));

		notificationRepository.save(notification);
	}

	@Override
	public void createFollowNotification(User sender, User receiver) {
		Notification notification = new Notification();

		notification.setSenderId(sender.getId());
		notification.setUserId(receiver.getId());
		notification.setSenderName(sender.getName());
		notification.setMessage(" has followed you.");
		notification.setCreatedAt(LocalDateTime.now());
		notification.setProfileImage(sender.getProfileImage());
		notification.setPremium(UserInfo.isPremium(sender, sender.getPremium().getPremiumExpireDate()));

		notificationRepository.save(notification);
	}
}
