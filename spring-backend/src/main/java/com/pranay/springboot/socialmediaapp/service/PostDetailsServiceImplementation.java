package com.pranay.springboot.socialmediaapp.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pranay.springboot.socialmediaapp.exception.PostException;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.repository.PostRepository;
import com.pranay.springboot.socialmediaapp.request.CreateReplyRequest;

@Service
public class PostDetailsServiceImplementation implements PostDetailsService {

	@Autowired
	private PostRepository postRepository;

	@Override
	public void incrementTotalViews(Post post) {
		post.setTotalViews(post.getTotalViews() + 1);
		postRepository.save(post);
	}

	@Override
	public List<Post> retrieveAllPosts() {
		return postRepository.findAllByIsPostTrueOrderByCreatedAtDesc();
	}

	@Override
	public Post createPost(Post request, User user) throws UserException {
		Post post = new Post();

		post.setUser(user);
		post.setPost(true);
		post.setReply(false);
		post.setImage(request.getImage());
		post.setVideo(request.getVideo());
		post.setCreatedAt(LocalDateTime.now());
		post.setDescription(request.getDescription());

		return postRepository.save(post);
	}

	@Override
	public List<Post> retrievePostsLikedByUser(User user) {
		List<Post> posts = postRepository.retrievePostsLikedByUser(user.getId());
		Collections.reverse(posts);

		return posts;
	}

	@Override
	public List<Post> retrievePostsBookmarkedByUser(User user) {
		List<Post> posts = postRepository.retrievePostsBookmarkedByUser(user.getId());
		Collections.reverse(posts);

		return posts;
	}

	@Override
	public Post createReply(CreateReplyRequest request, User user) throws PostException {
		Post reply = new Post();
		Post mainPost = retrievePostById(request.getPostId());

		reply.setUser(user);
		reply.setPost(false);
		reply.setReply(true);
		reply.setReplyFor(mainPost);
		reply.setImage(request.getImage());
		reply.setVideo(request.getVideo());
		reply.setCreatedAt(LocalDateTime.now());
		reply.setDescription(request.getDescription());

		Post savedReply = postRepository.save(reply);
		mainPost.getReplies().add(savedReply);
		postRepository.save(mainPost);

		return mainPost;
	}

	@Override
	public Post repostPost(Long postId, User user) throws PostException, UserException {
		Post post = retrievePostById(postId);

		if (post.getReposters().contains(user)) {
			post.getReposters().remove(user);
		} else {
			post.getReposters().add(user);
		}
		return postRepository.save(post);
	}

	@Override
	public Post deleteRepost(Long postId, User user) throws PostException, UserException {
		Post post = retrievePostById(postId);
		post.getReposters().remove(user);

		return postRepository.save(post);
	}

	@Override
	public Post highlightPost(Long postId, Long userId) throws PostException, UserException {
		Post post = retrievePostById(postId);

		if (!userId.equals(post.getUser().getId())) {
			throw new UserException("You are not authorized to highlight this post.");
		}
		if (post.isHighlight()) {
			post.setHighlight(false);
		} else {
			post.setHighlight(true);
		}
		return postRepository.save(post);
	}

	@Override
	public void deletePostById(Long postId, Long userId) throws PostException, UserException {
		Post post = retrievePostById(postId);

		if (!userId.equals(post.getUser().getId())) {
			throw new UserException("You are not authorized to delete this post.");
		}
		if (post.getReplyFor() != null) {
			Post mainPost = post.getReplyFor();
			mainPost.getReplies().remove(post);
			post.setReplyFor(null);
			postRepository.save(mainPost);
		}
		List<Post> replies = post.getReplies();

		if (replies != null && !replies.isEmpty()) {
			for (Post reply : replies) {
				postRepository.delete(reply);
			}
		}
		postRepository.deleteById(post.getId());
	}

	@Override
	public Post retrievePostById(Long postId) throws PostException {
		Post post = postRepository.findById(postId).orElseThrow(() -> new PostException("Post Not Found."));

		return post;
	}

	@Override
	public List<Post> retrieveAllUserPosts(User user) {
		return postRepository.findByRepostersContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(user, user.getId());
	}

	@Override
	public List<Post> retrieveAllUserReplies(User user) {
		return postRepository.findByRepostersContainsOrUser_IdAndIsPostFalseOrderByCreatedAtDesc(user, user.getId());
	}
}
