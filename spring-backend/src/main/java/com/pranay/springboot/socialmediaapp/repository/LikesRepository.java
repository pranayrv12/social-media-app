package com.pranay.springboot.socialmediaapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.socialmediaapp.model.Likes;

public interface LikesRepository extends JpaRepository<Likes, Long> {

	@Query("SELECT l FROM Likes l WHERE l.post.id=:postId")
	public List<Likes> retrieveByPostId(@Param("postId") Long postId);

	@Query("SELECT l FROM Likes l WHERE l.user.id=:userId AND l.post.id=:postId")
	public Likes isPostLikedByUser(@Param("userId") Long userId, @Param("postId") Long postId);
}
