package com.pranay.springboot.socialmediaapp.info;

import org.springframework.stereotype.Component;

import com.pranay.springboot.socialmediaapp.model.Bookmarks;
import com.pranay.springboot.socialmediaapp.model.Likes;
import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;

@Component
public class PostInfo {

	public static final boolean isLikedByUser(User user, Post post) {
		for (Likes like : post.getLikes()) {
			if (like.getUser().getId().equals(user.getId())) {
				return true;
			}
		}
		return false;
	}

	public static final boolean isRepostByUser(User user, Post post) {
		for (User u : post.getReposters()) {
			if (u.getId().equals(user.getId())) {
				return true;
			}
		}
		return false;
	}

	public static final boolean isBookmarkedByUser(User user, Post post) {
		for (Bookmarks bookmark : post.getBookmarks()) {
			if (bookmark.getUser().getId().equals(user.getId())) {
				return true;
			}
		}
		return false;
	}
}
