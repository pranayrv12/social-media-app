package com.pranay.springboot.socialmediaapp.datatransfer;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDataTransfer {

	private Long id;

	private String bio;

	private String name;

	private String email;

	private String website;

	private String location;

	private String birthDate;

	private String coverImage;

	private boolean isPremium;

	private boolean isFollowed;

	private String profileImage;

	private boolean validatedUser;

	private String premiumPlanType;

	private boolean loginWithGoogle;

	private LocalDateTime createdAt;

	private List<UserDataTransfer> followers = new ArrayList<>();

	private List<UserDataTransfer> following = new ArrayList<>();
}
