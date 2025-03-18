package com.pranay.springboot.socialmediaapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.socialmediaapp.datatransfer.BookmarksDataTransfer;
import com.pranay.springboot.socialmediaapp.datatransfer.mapper.BookmarksDataTransferMapper;
import com.pranay.springboot.socialmediaapp.exception.BookmarksException;
import com.pranay.springboot.socialmediaapp.exception.PostException;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Bookmarks;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.service.BookmarksDetailsService;
import com.pranay.springboot.socialmediaapp.service.UserService;

@RestController
@RequestMapping("/api")
public class BookmarksController {

	@Autowired
	private UserService userService;

	@Autowired
	private BookmarksDetailsService bookmarksDetailsService;

	@GetMapping("/post/{postId}/bookmarks")
	public ResponseEntity<List<BookmarksDataTransfer>> retrieveAllBookmarks(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);
		List<Bookmarks> bookmarks = bookmarksDetailsService.retrieveAllBookmarks(postId);
		List<BookmarksDataTransfer> bookmarksDataTransfers = BookmarksDataTransferMapper
				.toBookmarksDataTransfers(bookmarks, user);

		return new ResponseEntity<List<BookmarksDataTransfer>>(bookmarksDataTransfers, HttpStatus.ACCEPTED);
	}

	@PostMapping("/{postId}/bookmark")
	public ResponseEntity<BookmarksDataTransfer> bookmarkPost(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);
		Bookmarks bookmarks = bookmarksDetailsService.bookmarkPost(postId, user);
		BookmarksDataTransfer bookmarksDataTransfer = BookmarksDataTransferMapper.toBookmarksDataTransfer(bookmarks,
				user);

		return new ResponseEntity<BookmarksDataTransfer>(bookmarksDataTransfer, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/{postId}/unbookmark")
	public ResponseEntity<BookmarksDataTransfer> unbookmarkPost(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws BookmarksException, PostException, UserException {

		User user = userService.retrieveUserByJwt(jwt);
		Bookmarks bookmarks = bookmarksDetailsService.unbookmarkPost(postId, user);
		BookmarksDataTransfer bookmarksDataTransfer = BookmarksDataTransferMapper.toBookmarksDataTransfer(bookmarks,
				user);

		return new ResponseEntity<BookmarksDataTransfer>(bookmarksDataTransfer, HttpStatus.ACCEPTED);
	}
}
