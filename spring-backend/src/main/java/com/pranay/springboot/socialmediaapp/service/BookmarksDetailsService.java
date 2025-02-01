package com.pranay.springboot.socialmediaapp.service;

import java.util.List;

import com.pranay.springboot.socialmediaapp.exception.BookmarksException;
import com.pranay.springboot.socialmediaapp.exception.PostException;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Bookmarks;
import com.pranay.springboot.socialmediaapp.model.User;

public interface BookmarksDetailsService {

	public List<Bookmarks> retrieveAllBookmarks(Long postId) throws PostException;

	public Bookmarks bookmarkPost(Long postId, User user) throws PostException, UserException;

	public Bookmarks unbookmarkPost(Long postId, User user) throws BookmarksException, PostException, UserException;
}
