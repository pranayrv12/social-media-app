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

import com.pranay.springboot.socialmediaapp.datatransfer.LikesDataTransfer;
import com.pranay.springboot.socialmediaapp.datatransfer.mapper.LikesDataTransferMapper;
import com.pranay.springboot.socialmediaapp.exception.LikesException;
import com.pranay.springboot.socialmediaapp.exception.PostException;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Likes;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.service.LikesDetailsService;
import com.pranay.springboot.socialmediaapp.service.UserService;

@RestController
@RequestMapping("/api")
public class LikesController {

	@Autowired
	private UserService userService;

	@Autowired
	private LikesDetailsService likesDetailsService;

	@PostMapping("/{postId}/like")
	public ResponseEntity<LikesDataTransfer> likePost(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);
		Likes likes = likesDetailsService.likePost(postId, user);
		LikesDataTransfer likesDataTransfer = LikesDataTransferMapper.toLikesDataTransfer(likes, user);

		return new ResponseEntity<LikesDataTransfer>(likesDataTransfer, HttpStatus.OK);
	}

	@DeleteMapping("/{postId}/unlike")
	public ResponseEntity<LikesDataTransfer> unlikePost(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws LikesException, PostException, UserException {

		User user = userService.retrieveUserByJwt(jwt);
		Likes likes = likesDetailsService.unlikePost(postId, user);
		LikesDataTransfer likesDataTransfer = LikesDataTransferMapper.toLikesDataTransfer(likes, user);

		return new ResponseEntity<>(likesDataTransfer, HttpStatus.OK);
	}

	@GetMapping("/post/{postId}/likes")
	public ResponseEntity<List<LikesDataTransfer>> retrieveAllLikes(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.retrieveUserByJwt(jwt);
		List<Likes> likes = likesDetailsService.retrieveAllLikes(postId);
		List<LikesDataTransfer> likesDataTransfers = LikesDataTransferMapper.toLikesDataTransfers(likes, user);

		return new ResponseEntity<>(likesDataTransfers, HttpStatus.CREATED);
	}
}
