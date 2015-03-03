/**
 * 
 */
package com.twitter.rest.madhav;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author badreddy
 * 
 */

public class TweetAttributes {

	@JsonProperty("handleID")
	private String handleID;

	@JsonProperty("tweetID")
	private String tweetID;

	@JsonProperty("name")
	private String name;

	@JsonProperty("replyTo")
	private String replyTo;

	@JsonProperty("timeStamp")
	private String timeStamp;
	
	@JsonProperty("userId")
	private String userId;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public TweetAttributes() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getHandleID() {
		return handleID;
	}

	public void setHandleID(String handleID) {
		this.handleID = handleID;
	}

	public String getTweetID() {
		return tweetID;
	}

	public void setTweetID(String tweetID) {
		this.tweetID = tweetID;
	}

	public String getReplyTo() {
		return replyTo;
	}

	public void setReplyTo(String replyTo) {
		this.replyTo = replyTo;
	}

	public String getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}

}
