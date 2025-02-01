package com.pranay.springboot.socialmediaapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pranay.springboot.socialmediaapp.model.Post;
import com.pranay.springboot.socialmediaapp.model.User;

public interface PostRepository extends JpaRepository<Post, Long> {

	List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();

	List<Post> findByLikesContainingOrderByCreatedAtDesc(User user);

	List<Post> findByBookmarksContainingOrderByCreatedAtDesc(User user);

	@Query("SELECT p FROM Post p JOIN p.likes l WHERE l.user.id=:userId")
	List<Post> retrievePostsLikedByUser(Long userId);

	@Query("SELECT p FROM Post p JOIN p.bookmarks b WHERE b.user.id=:userId")
	List<Post> retrievePostsBookmarkedByUser(Long userId);

	List<Post> findByRepostersContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(User user, Long userId);

	List<Post> findByRepostersContainsOrUser_IdAndIsPostFalseOrderByCreatedAtDesc(User user, Long userId);
}
