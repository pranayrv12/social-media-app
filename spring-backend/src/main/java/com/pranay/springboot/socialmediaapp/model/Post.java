package com.pranay.springboot.socialmediaapp.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String image;

	private String video;

	@ManyToOne
	private Post replyFor;

	private boolean isPost;

	private boolean isReply;

	@Column(nullable = false)
	private int totalViews = 0;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private boolean isLiked = false;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	private boolean isRepost = false;

	private boolean isHighlight = false;

	private boolean isBookmarked = false;

	@ManyToMany
	private List<User> reposters = new ArrayList<>();

	@Column(nullable = false, columnDefinition = "TEXT")
	private String description;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	private List<Likes> likes = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	private List<Bookmarks> bookmarks = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Post> replies = new ArrayList<>();
}
