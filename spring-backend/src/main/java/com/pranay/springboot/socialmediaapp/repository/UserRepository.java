package com.pranay.springboot.socialmediaapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranay.springboot.socialmediaapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByEmail(String email);

	@Query("SELECT DISTINCT u FROM User u WHERE u.name LIKE %:query% OR u.email LIKE %:query%")
	public List<User> searchUsersByNameOrEmail(@Param("query") String query);

	@Query("SELECT u FROM User u WHERE u.id <> :userId AND u NOT IN (SELECT f FROM User u2 JOIN u2.following f WHERE u2.id = :userId)")
	public List<User> retrieveUsersExcludingFollowed(@Param("userId") Long userId);
}
