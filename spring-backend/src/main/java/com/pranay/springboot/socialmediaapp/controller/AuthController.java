package com.pranay.springboot.socialmediaapp.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.util.Collections;

import javax.security.auth.login.CredentialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.pranay.springboot.socialmediaapp.exception.UserException;
import com.pranay.springboot.socialmediaapp.model.Premium;
import com.pranay.springboot.socialmediaapp.model.User;
import com.pranay.springboot.socialmediaapp.repository.UserRepository;
import com.pranay.springboot.socialmediaapp.request.SignInRequest;
import com.pranay.springboot.socialmediaapp.request.SignInWithGoogleRequest;
import com.pranay.springboot.socialmediaapp.response.AuthResponse;
import com.pranay.springboot.socialmediaapp.security.JwtProvider;
import com.pranay.springboot.socialmediaapp.service.CustomUserDetailsServiceImplementation;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CustomUserDetailsServiceImplementation userDetailsService;

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signInUser(@RequestBody SignInRequest request) {
		String username = request.getEmail();
		String password = request.getPassword();

		try {
			Authentication authentication = authenticate(username, password);
			SecurityContextHolder.getContext().setAuthentication(authentication);

			String token = jwtProvider.generateToken(authentication);

			AuthResponse authResponse = new AuthResponse();
			authResponse.setStatus(true);
			authResponse.setJwt(token);

			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.ACCEPTED);
		} catch (BadCredentialsException e) {
			AuthResponse authResponse = new AuthResponse();
			authResponse.setStatus(false);

			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.UNAUTHORIZED);
		}
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(username);

		if (userDetails == null) {
			throw new BadCredentialsException("Invalid Username!");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Username, or Password!");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> signUpUser(@Valid @RequestBody User user) throws UserException {
		String email = user.getEmail();
		String password = user.getPassword();

		AuthResponse authResponse = new AuthResponse();

		try {
			if (userRepository.findByEmail(email) != null) {
				authResponse.setStatus(false);
				return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.BAD_REQUEST);
			}
			User newUser = new User();

			newUser.setEmail(email);
			newUser.setName(user.getName());
			newUser.setPremium(new Premium());
			newUser.setBirthDate(user.getBirthDate());
			newUser.setCreatedAt(LocalDateTime.now());
			newUser.setPassword(passwordEncoder.encode(password));

			userRepository.save(newUser);

			Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
			SecurityContextHolder.getContext().setAuthentication(authentication);

			String token = jwtProvider.generateToken(authentication);

			authResponse.setStatus(true);
			authResponse.setJwt(token);

			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
		} catch (Exception e) {
			authResponse.setStatus(false);
			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	@PostMapping("/signin/google")
	public ResponseEntity<AuthResponse> signInUserWithGoogle(@RequestBody SignInWithGoogleRequest request)
			throws IOException, GeneralSecurityException {

		User user = validateGoogleIdToken(request);

		String email = user.getEmail();
		User existingUser = userRepository.findByEmail(email);

		if (existingUser == null) {
			User newUser = new User();

			newUser.setEmail(email);
			newUser.setName(user.getName());
			newUser.setLoginWithGoogle(true);
			newUser.setPremium(new Premium());
			newUser.setPassword(user.getPassword());
			newUser.setBirthDate(user.getBirthDate());
			newUser.setCreatedAt(LocalDateTime.now());
			newUser.setProfileImage(user.getProfileImage());

			userRepository.save(newUser);
		}
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, user.getPassword());

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setStatus(true);
		authResponse.setJwt(token);

		return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
	}

	private User validateGoogleIdToken(SignInWithGoogleRequest request) throws IOException, GeneralSecurityException {
		HttpTransport transport = new NetHttpTransport();
		JsonFactory jsonFactory = GsonFactory.getDefaultInstance();

		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
				.setAudience(Collections.singletonList(request.getClientId())).build();

		GoogleIdToken googleToken = verifier.verify(request.getCredential());

		if (request.getCredential() != null) {
			Payload payload = googleToken.getPayload();
			String userId = payload.getSubject();

			String birthDate = "2000 - 1 - 1";
			String email = payload.getEmail();
			String name = (String) payload.get("name");
			String profileImage = (String) payload.get("picture");

			User user = new User();

			user.setName(name);
			user.setEmail(email);
			user.setPassword(userId);
			user.setBirthDate(birthDate);
			user.setProfileImage(profileImage);

			return user;
		} else {
			throw new CredentialException("Invalid ID Token!");
		}
	}
}
