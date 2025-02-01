package com.pranay.springboot.socialmediaapp.request;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateReplyRequest {

	private Long postId;

	private String image;

	private String video;

	private String description;

	private LocalDateTime createdAt;
}
