package com.pranay.springboot.socialmediaapp.service;

import java.util.List;

import com.pranay.springboot.socialmediaapp.exception.PostException;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.request.CreateReplyRequest;

public interface PostDetailsService {

	public List<Post> retrieveAllPosts();

	public void incrementTotalViews(Post post);

	public List<Post> retrieveAllUserPosts(User user);

	public List<Post> retrieveAllUserReplies(User user);

	public List<Post> retrievePostsLikedByUser(User user);

	public List<Post> retrievePostsBookmarkedByUser(User user);

	public Post retrievePostById(Long postId) throws PostException;

	public Post createReply(CreateReplyRequest request, User user) throws PostException;

	public Post repostPost(Long postId, User user) throws PostException, UserException;

	public Post createPost(Post request, User user) throws PostException, UserException;

	public Post deleteRepost(Long postId, User user) throws PostException, UserException;

	public Post highlightPost(Long postId, Long userId) throws PostException, UserException;

	public void deletePostById(Long postId, Long userId) throws PostException, UserException;
}
