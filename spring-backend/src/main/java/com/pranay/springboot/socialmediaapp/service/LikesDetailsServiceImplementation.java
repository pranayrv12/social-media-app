package com.pranay.springboot.socialmediaapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.socialmediaapp.exception.LikesException;
import com.pranay.springboot.socialmediaapp.exception.PostException;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Likes;
import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.repository.LikesRepository;
import com.pranay.springboot.socialmediaapp.repository.PostRepository;

@Service
public class LikesDetailsServiceImplementation implements LikesDetailsService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private LikesRepository likesRepository;

	@Autowired
	private PostDetailsService postDetailsService;

	@Autowired
	private NotificationDetailsService notificationDetailsService;

	@Override
	public List<Likes> retrieveAllLikes(Long postId) throws PostException {
		Post post = postDetailsService.retrievePostById(postId);
		List<Likes> likes = likesRepository.retrieveByPostId(post.getId());

		return likes;
	}

	@Override
	public Likes likePost(Long postId, User user) throws PostException, UserException {
		Likes isLikedAlready = likesRepository.isPostLikedByUser(user.getId(), postId);

		if (isLikedAlready != null) {
			likesRepository.deleteById(isLikedAlready.getId());
			return isLikedAlready;
		}
		Post post = postDetailsService.retrievePostById(postId);
		notificationDetailsService.createLikeNotification(post, user, post.getUser());

		Likes likes = new Likes();
		likes.setUser(user);
		likes.setPost(post);

		Likes liked = likesRepository.save(likes);
		post.getLikes().add(liked);
		postRepository.save(post);

		return liked;
	}

	@Override
	public Likes unlikePost(Long postId, User user) throws LikesException, PostException, UserException {
		Likes likes = likesRepository.findById(postId).orElseThrow(() -> new LikesException("Like Not Found."));

		if (likes.getUser().getId().equals(user.getId())) {
			throw new UserException("An Error Occurred.");
		}
		likesRepository.deleteById(likes.getId());
		return likes;
	}
}
