package com.pranay.springboot.socialmediaapp.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long userId;

	private Long postId;

	private Long senderId;

	private String message;

	private boolean isPremium;

	private String senderName;

	private String profileImage;

	private boolean isRead = false;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	@Column(columnDefinition = "TEXT")
	private String description;
}
