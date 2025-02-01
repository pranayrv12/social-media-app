package com.pranay.springboot.socialmediaapp.datatransfer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikesDataTransfer {

	private Long id;

	private UserDataTransfer user;

	private PostDataTransfer post;
}
