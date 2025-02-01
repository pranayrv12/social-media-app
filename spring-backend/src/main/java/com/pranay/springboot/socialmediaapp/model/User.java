package com.pranay.springboot.socialmediaapp.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String bio;

	private String email;

	private String website;

	private String location;

	private String password;

	@Embedded
	private Premium premium;

	@Column(nullable = false)
	private String name;

	private String birthDate;

	private String coverImage;

	private String profileImage;

	public boolean validatedUser;

	public boolean loginWithGoogle;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	public boolean isValidatedUser = false;

	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL)
	private List<User> followers = new ArrayList<>();

	@JsonIgnore
	@ManyToMany(mappedBy = "followers")
	private List<User> following = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Post> post = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Likes> likes = new ArrayList<>();

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Bookmarks> bookmarks = new ArrayList<>();
}
