package com.pranay.springboot.socialmediaapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;

public interface PostRepository extends JpaRepository<Post, Long> {

	public List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();

	@Query("SELECT p FROM Post p JOIN p.likes l WHERE l.user.id=:userId")
	public List<Post> retrievePostsLikedByUser(Long userId);

	public List<Post> findByLikesContainingOrderByCreatedAtDesc(User user);

	@Query("SELECT p FROM Post p JOIN p.bookmarks b WHERE b.user.id=:userId")
	public List<Post> retrievePostsBookmarkedByUser(Long userId);

	public List<Post> findByBookmarksContainingOrderByCreatedAtDesc(User user);

	public List<Post> findByRepostersContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(User user, Long userId);

	public List<Post> findByRepostersContainsOrUser_IdAndIsPostFalseOrderByCreatedAtDesc(User user, Long userId);
}
