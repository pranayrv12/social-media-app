package com.pranay.springboot.socialmediaapp.service;

import java.util.List;

import com.pranay.springboot.socialmediaapp.exception.LikesException;
import com.pranay.springboot.socialmediaapp.exception.PostException;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Likes;
import com.pranay.springboot.socialmediaapp.model.User;

public interface LikesDetailsService {

	public List<Likes> retrieveAllLikes(Long postId) throws PostException;

	public Likes likePost(Long postId, User user) throws PostException, UserException;

	public Likes unlikePost(Long postId, User user) throws LikesException, PostException, UserException;
}
