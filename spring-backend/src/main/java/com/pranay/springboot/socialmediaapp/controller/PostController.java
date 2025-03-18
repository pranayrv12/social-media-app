package com.pranay.springboot.socialmediaapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranay.springboot.socialmediaapp.datatransfer.PostDataTransfer;
import com.pranay.springboot.socialmediaapp.datatransfer.mapper.PostDataTransferMapper;
import com.pranay.springboot.socialmediaapp.exception.PostException;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.request.CreateReplyRequest;
import com.pranay.springboot.socialmediaapp.response.ApiResponse;
import com.pranay.springboot.socialmediaapp.service.NotificationDetailsService;
import com.pranay.springboot.socialmediaapp.service.PostDetailsService;
import com.pranay.springboot.socialmediaapp.service.UserService;

@RestController
@RequestMapping("/api")
public class PostController {

	@Autowired
	private UserService userService;

	@Autowired
	private PostDetailsService postDetailsService;

	@Autowired
	private NotificationDetailsService notificationDetailsService;

	@PutMapping("/post/{postId}/highlight")
	public ResponseEntity<PostDataTransfer> highlightPost(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);
		Post post = postDetailsService.highlightPost(postId, user.getId());
		PostDataTransfer postDataTransfer = PostDataTransferMapper.toPostDataTransfer(post, user);

		return new ResponseEntity<PostDataTransfer>(postDataTransfer, HttpStatus.ACCEPTED);
	}

	@GetMapping("/post/{postId}")
	public ResponseEntity<PostDataTransfer> retrievePostById(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);
		Post post = postDetailsService.retrievePostById(postId);

		postDetailsService.incrementTotalViews(post);

		PostDataTransfer postDataTransfer = PostDataTransferMapper.toPostDataTransfer(post, user);

		return new ResponseEntity<PostDataTransfer>(postDataTransfer, HttpStatus.ACCEPTED);
	}

	@PostMapping("/post/create")
	public ResponseEntity<PostDataTransfer> createPost(@RequestBody Post post,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);
		Post newPost = postDetailsService.createPost(post, user);
		PostDataTransfer postDataTransfer = PostDataTransferMapper.toPostDataTransfer(newPost, user);

		return new ResponseEntity<PostDataTransfer>(postDataTransfer, HttpStatus.CREATED);
	}

	@PostMapping("/post/reply")
	public ResponseEntity<PostDataTransfer> createReply(@RequestBody CreateReplyRequest request,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);
		Post newReply = postDetailsService.createReply(request, user);
		PostDataTransfer postDataTransfer = PostDataTransferMapper.toPostDataTransfer(newReply, user);

		return new ResponseEntity<PostDataTransfer>(postDataTransfer, HttpStatus.CREATED);
	}

	@PutMapping("/post/{postId}/repost")
	public ResponseEntity<PostDataTransfer> repostPost(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);
		Post newRepost = postDetailsService.repostPost(postId, user);
		PostDataTransfer postDataTransfer = PostDataTransferMapper.toPostDataTransfer(newRepost, user);

		return new ResponseEntity<PostDataTransfer>(postDataTransfer, HttpStatus.ACCEPTED);
	}

	@GetMapping("/posts/user/{userId}")
	public ResponseEntity<List<PostDataTransfer>> retrieveAllUserPosts(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user1 = userService.retrieveUserByJwt(jwt);
		User user2 = userService.retrieveUserById(userId);
		List<Post> posts = postDetailsService.retrieveAllUserPosts(user2);
		List<PostDataTransfer> postDataTransfers = PostDataTransferMapper.toPostDataTransfers(posts, user1);

		return new ResponseEntity<List<PostDataTransfer>>(postDataTransfers, HttpStatus.ACCEPTED);
	}

	@GetMapping("/posts/replies/user/{userId}")
	public ResponseEntity<List<PostDataTransfer>> retrieveAllUserReplies(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user1 = userService.retrieveUserByJwt(jwt);
		User user2 = userService.retrieveUserById(userId);
		List<Post> posts = postDetailsService.retrieveAllUserReplies(user2);
		List<PostDataTransfer> postDataTransfers = PostDataTransferMapper.toPostDataTransfers(posts, user1);

		return new ResponseEntity<List<PostDataTransfer>>(postDataTransfers, HttpStatus.ACCEPTED);
	}

	@GetMapping("/posts/user/{userId}/likes")
	public ResponseEntity<List<PostDataTransfer>> retrievePostsLikedByUser(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user1 = userService.retrieveUserByJwt(jwt);
		User user2 = userService.retrieveUserById(userId);
		List<Post> posts = postDetailsService.retrievePostsLikedByUser(user2);
		List<PostDataTransfer> postDataTransfers = PostDataTransferMapper.toPostDataTransfers(posts, user1);

		return new ResponseEntity<List<PostDataTransfer>>(postDataTransfers, HttpStatus.ACCEPTED);
	}

	@GetMapping("/posts/user/{userId}/bookmarks")
	public ResponseEntity<List<PostDataTransfer>> retrievePostsBookmarkedByUser(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user1 = userService.retrieveUserByJwt(jwt);
		User user2 = userService.retrieveUserById(userId);
		List<Post> posts = postDetailsService.retrievePostsBookmarkedByUser(user2);
		List<PostDataTransfer> postDataTransfers = PostDataTransferMapper.toPostDataTransfers(posts, user1);

		return new ResponseEntity<List<PostDataTransfer>>(postDataTransfers, HttpStatus.ACCEPTED);
	}

	@GetMapping("/posts")
	public ResponseEntity<List<PostDataTransfer>> retrieveAllPosts(@RequestHeader("Authorization") String jwt)
			throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);
		List<Post> posts = postDetailsService.retrieveAllPosts();
		List<PostDataTransfer> postDataTransfers = PostDataTransferMapper.toPostDataTransfers(posts, user);

		return new ResponseEntity<List<PostDataTransfer>>(postDataTransfers, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/post/{postId}/delete")
	public ResponseEntity<ApiResponse> deletePost(@PathVariable Long postId, @RequestHeader("Authorization") String jwt)
			throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);

		notificationDetailsService.deletePostNotifications(postId);
		postDetailsService.deletePostById(postId, user.getId());

		ApiResponse newResponse = new ApiResponse();
		newResponse.setMessage("Post Deleted Successfully.");
		newResponse.setStatus(true);

		return new ResponseEntity<ApiResponse>(newResponse, HttpStatus.ACCEPTED);
	}
}
