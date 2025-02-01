package com.pranay.springboot.socialmediaapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.socialmediaapp.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

	@Modifying
	@Query("DELETE FROM Notification n WHERE n.postId = :postId")
	public void deleteByPostId(@Param("postId") Long postId);

	@Modifying
	@Query("DELETE FROM Notification n WHERE n.userId = :userId")
	public void deleteByUserId(@Param("userId") Long userId);

	@Modifying
	@Query("UPDATE Notification n SET n.isRead = true WHERE n.userId = :userId")
	public void markAllUserNotificationsAsRead(@Param("userId") Long userId);

	@Query("SELECT n FROM Notification n WHERE n.userId = :userId ORDER BY n.createdAt DESC")
	public List<Notification> retrieveUserNotifications(@Param("userId") Long userId);
}
