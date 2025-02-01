package com.pranay.springboot.socialmediaapp.datatransfer.mapper;

import java.util.ArrayList;
import java.util.List;

import com.pranay.springboot.socialmediaapp.datatransfer.BookmarksDataTransfer;
import com.pranay.springboot.socialmediaapp.datatransfer.PostDataTransfer;
import com.pranay.springboot.socialmediaapp.datatransfer.UserDataTransfer;
import com.pranay.springboot.socialmediaapp.model.Bookmarks;
import com.pranay.springboot.socialmediaapp.model.User;

public class BookmarksDataTransferMapper {

	public static BookmarksDataTransfer toBookmarksDataTransfer(Bookmarks bookmarks, User user) {
		UserDataTransfer userDataTransfer = UserDataTransferMapper.toUserDataTransfer(bookmarks.getUser());
		PostDataTransfer postDataTransfer = PostDataTransferMapper.toPostDataTransfer(bookmarks.getPost(), user);

		BookmarksDataTransfer bookmarksDataTransfer = new BookmarksDataTransfer();

		bookmarksDataTransfer.setId(bookmarks.getId());
		bookmarksDataTransfer.setPost(postDataTransfer);
		bookmarksDataTransfer.setUser(userDataTransfer);

		return bookmarksDataTransfer;
	}

	public static List<BookmarksDataTransfer> toBookmarksDataTransfers(List<Bookmarks> bookmarks, User user) {
		List<BookmarksDataTransfer> bookmarksDataTransfers = new ArrayList<>();

		for (Bookmarks bookmark : bookmarks) {
			UserDataTransfer userDataTransfer = UserDataTransferMapper.toUserDataTransfer(bookmark.getUser());
			PostDataTransfer postDataTransfer = PostDataTransferMapper.toPostDataTransfer(bookmark.getPost(), user);

			BookmarksDataTransfer bookmarksDataTransfer = new BookmarksDataTransfer();

			bookmarksDataTransfer.setId(bookmark.getId());
			bookmarksDataTransfer.setPost(postDataTransfer);
			bookmarksDataTransfer.setUser(userDataTransfer);

			bookmarksDataTransfers.add(bookmarksDataTransfer);
		}
		return bookmarksDataTransfers;
	}
}
