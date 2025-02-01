package com.pranay.springboot.socialmediaapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.socialmediaapp.exception.BookmarksException;
import com.pranay.springboot.socialmediaapp.exception.PostException;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Bookmarks;
import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.repository.BookmarksRepository;
import com.pranay.springboot.socialmediaapp.repository.PostRepository;

@Service
public class BookmarksDetailsServiceImplementation implements BookmarksDetailsService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private PostDetailsService postDetailsService;

	@Autowired
	private BookmarksRepository bookmarksRepository;

	@Override
	public List<Bookmarks> retrieveAllBookmarks(Long postId) throws PostException {
		Post post = postDetailsService.retrievePostById(postId);
		List<Bookmarks> bookmarks = bookmarksRepository.retrieveByPostId(post.getId());

		return bookmarks;
	}

	@Override
	public Bookmarks bookmarkPost(Long postId, User user) throws PostException, UserException {
		Bookmarks isBookmarkedAlready = bookmarksRepository.isPostBookmarkedByUser(user.getId(), postId);

		if (isBookmarkedAlready != null) {
			bookmarksRepository.deleteById(isBookmarkedAlready.getId());
			return isBookmarkedAlready;
		}
		Post post = postDetailsService.retrievePostById(postId);
		Bookmarks bookmarks = new Bookmarks();
		bookmarks.setUser(user);
		bookmarks.setPost(post);

		Bookmarks bookmarked = bookmarksRepository.save(bookmarks);
		post.getBookmarks().add(bookmarked);
		postRepository.save(post);

		return bookmarked;
	}

	@Override
	public Bookmarks unbookmarkPost(Long postId, User user) throws BookmarksException, PostException, UserException {
		Bookmarks bookmarks = bookmarksRepository.findById(postId)
				.orElseThrow(() -> new BookmarksException("Bookmark Not Found."));

		if (bookmarks.getUser().getId().equals(user.getId())) {
			throw new UserException("An Error Occurred.");
		}
		bookmarksRepository.deleteById(bookmarks.getId());
		return bookmarks;
	}
}
