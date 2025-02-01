package com.pranay.springboot.socialmediaapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.socialmediaapp.model.Bookmarks;

public interface BookmarksRepository extends JpaRepository<Bookmarks, Long> {

	@Query("SELECT b FROM Bookmarks b WHERE b.post.id=:postId")
	public List<Bookmarks> retrieveByPostId(@Param("postId") Long postId);

	@Query("SELECT b FROM Bookmarks b WHERE b.user.id=:userId AND b.post.id=:postId")
	public Bookmarks isPostBookmarkedByUser(@Param("userId") Long userId, @Param("postId") Long postId);
}
