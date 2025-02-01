package com.pranay.springboot.socialmediaapp.datatransfer.mapper;

import java.util.ArrayList;
import java.util.List;

import com.pranay.springboot.socialmediaapp.datatransfer.LikesDataTransfer;
import com.pranay.springboot.socialmediaapp.datatransfer.PostDataTransfer;
import com.pranay.springboot.socialmediaapp.datatransfer.UserDataTransfer;
import com.pranay.springboot.socialmediaapp.model.Likes;
import com.pranay.springboot.socialmediaapp.model.User;

public class LikesDataTransferMapper {

	public static LikesDataTransfer toLikesDataTransfer(Likes likes, User user) {
		UserDataTransfer userDataTransfer = UserDataTransferMapper.toUserDataTransfer(likes.getUser());
		PostDataTransfer postDataTransfer = PostDataTransferMapper.toPostDataTransfer(likes.getPost(), user);

		LikesDataTransfer likesDataTransfer = new LikesDataTransfer();

		likesDataTransfer.setId(likes.getId());
		likesDataTransfer.setPost(postDataTransfer);
		likesDataTransfer.setUser(userDataTransfer);

		return likesDataTransfer;
	}

	public static List<LikesDataTransfer> toLikesDataTransfers(List<Likes> likes, User user) {
		List<LikesDataTransfer> likesDataTransfers = new ArrayList<>();

		for (Likes like : likes) {
			UserDataTransfer userDataTransfer = UserDataTransferMapper.toUserDataTransfer(like.getUser());
			PostDataTransfer postDataTransfer = PostDataTransferMapper.toPostDataTransfer(like.getPost(), user);

			LikesDataTransfer likesDataTransfer = new LikesDataTransfer();

			likesDataTransfer.setId(like.getId());
			likesDataTransfer.setPost(postDataTransfer);
			likesDataTransfer.setUser(userDataTransfer);

			likesDataTransfers.add(likesDataTransfer);
		}
		return likesDataTransfers;
	}
}
