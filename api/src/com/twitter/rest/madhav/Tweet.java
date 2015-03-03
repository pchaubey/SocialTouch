/**
 * 
 */
package com.twitter.rest.madhav;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author badreddy
 * 
 */

public class Tweet {
	
	public Tweet(){
		
	}

	@JsonProperty("status")
	private String status;

	@JsonProperty("attr")
	private TweetAttributes attr;

	public TweetAttributes getAttr() {
		return attr;
	}

	public void setAttr(TweetAttributes attr) {
		this.attr = attr;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Tweet(String tweet) {
		this.status = tweet;
	}

	public String toString() {
		return this.status;
	}

}
