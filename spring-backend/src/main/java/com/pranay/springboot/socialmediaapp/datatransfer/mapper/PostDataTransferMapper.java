package com.pranay.springboot.socialmediaapp.datatransfer.mapper;

import java.util.ArrayList;
import java.util.List;

import com.pranay.springboot.socialmediaapp.datatransfer.PostDataTransfer;
import com.pranay.springboot.socialmediaapp.datatransfer.UserDataTransfer;
import com.pranay.springboot.socialmediaapp.info.PostInfo;
import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;

public class PostDataTransferMapper {

	public static List<PostDataTransfer> toPostDataTransfers(List<Post> posts, User user) {
		List<PostDataTransfer> postDataTransfers = new ArrayList<>();

		for (Post post : posts) {
			PostDataTransfer postDataTransfer = toReplyPostDataTransfer(post, user);
			postDataTransfers.add(postDataTransfer);
		}
		return postDataTransfers;
	}

	public static PostDataTransfer toReplyPostDataTransfer(Post post, User user) {
		UserDataTransfer userDataTransfer = UserDataTransferMapper.toUserDataTransfer(post.getUser());

		List<Long> reposters = new ArrayList<>();
		boolean isLiked = PostInfo.isLikedByUser(user, post);
		boolean isRepost = PostInfo.isRepostByUser(user, post);
		boolean isBookmarked = PostInfo.isBookmarkedByUser(user, post);

		for (User u : post.getReposters()) {
			reposters.add(u.getId());
		}
		PostDataTransfer postDataTransfer = new PostDataTransfer();

		postDataTransfer.setLiked(isLiked);
		postDataTransfer.setId(post.getId());
		postDataTransfer.setRepost(isRepost);
		postDataTransfer.setReposters(reposters);
		postDataTransfer.setUser(userDataTransfer);
		postDataTransfer.setImage(post.getImage());
		postDataTransfer.setVideo(post.getVideo());
		postDataTransfer.setBookmarked(isBookmarked);
		postDataTransfer.setHighlight(post.isHighlight());
		postDataTransfer.setCreatedAt(post.getCreatedAt());
		postDataTransfer.setTotalViews(post.getTotalViews());
		postDataTransfer.setTotalLikes(post.getLikes().size());
		postDataTransfer.setDescription(post.getDescription());
		postDataTransfer.setTotalReplies(post.getReplies().size());
		postDataTransfer.setTotalReposts(post.getReposters().size());
		postDataTransfer.setTotalBookmarks(post.getBookmarks().size());

		if (post.getReplyFor() != null) {
			postDataTransfer.setMainPostId(post.getReplyFor().getId());
		}
		return postDataTransfer;
	}

	public static PostDataTransfer toPostDataTransfer(Post post, User user) {
		UserDataTransfer userDataTransfer = UserDataTransferMapper.toUserDataTransfer(post.getUser());

		List<Long> reposters = new ArrayList<>();
		boolean isLiked = PostInfo.isLikedByUser(user, post);
		boolean isRepost = PostInfo.isRepostByUser(user, post);
		boolean isBookmarked = PostInfo.isBookmarkedByUser(user, post);

		for (User u : post.getReposters()) {
			reposters.add(u.getId());
		}
		PostDataTransfer postDataTransfer = new PostDataTransfer();

		postDataTransfer.setLiked(isLiked);
		postDataTransfer.setId(post.getId());
		postDataTransfer.setRepost(isRepost);
		postDataTransfer.setReposters(reposters);
		postDataTransfer.setUser(userDataTransfer);
		postDataTransfer.setImage(post.getImage());
		postDataTransfer.setVideo(post.getVideo());
		postDataTransfer.setBookmarked(isBookmarked);
		postDataTransfer.setHighlight(post.isHighlight());
		postDataTransfer.setCreatedAt(post.getCreatedAt());
		postDataTransfer.setTotalViews(post.getTotalViews());
		postDataTransfer.setTotalLikes(post.getLikes().size());
		postDataTransfer.setDescription(post.getDescription());
		postDataTransfer.setTotalReplies(post.getReplies().size());
		postDataTransfer.setTotalReposts(post.getReposters().size());
		postDataTransfer.setTotalBookmarks(post.getBookmarks().size());

		if (post.getReplyFor() != null) {
			postDataTransfer.setMainPostId(post.getReplyFor().getId());
		}
		postDataTransfer.setReplies(toPostDataTransfers(post.getReplies(), user));

		return postDataTransfer;
	}
}
