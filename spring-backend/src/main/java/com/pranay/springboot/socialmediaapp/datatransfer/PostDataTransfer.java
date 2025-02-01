package com.pranay.springboot.socialmediaapp.datatransfer;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDataTransfer {

	private Long id;

	private String image;

	private String video;

	private int totalLikes;

	private int totalViews;

	private boolean isLiked;

	private Long mainPostId;

	private boolean isRepost;

	private int totalReplies;

	private int totalReposts;

	private String description;

	private int totalBookmarks;

	private boolean isHighlight;

	private boolean isBookmarked;

	private List<Long> reposters;

	private UserDataTransfer user;

	private LocalDateTime createdAt;

	private List<PostDataTransfer> replies;
}
