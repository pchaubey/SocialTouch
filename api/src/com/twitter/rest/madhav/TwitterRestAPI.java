/**
 * 
 */
package com.twitter.rest.madhav;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("/api")
public class TwitterRestAPI {


	// This method is called if TEXT_PLAIN is request
	@Path("/newtweet")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void newTweet(Tweet tweet) {
		MyTwitter.postMessage(tweet);
	}

	@Path("/alltweets")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Object getAllTweetsWithPostCode(@Context final HttpServletRequest req) {
		String hastag = req.getParameter("hashTag");
		String userId = req.getParameter("userId");
		return MyTwitter.getAllTweets(hastag,userId);
	}
	
	@Path("/allInTimeLine")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Object getAllTweetsTimeLine(@Context final HttpServletRequest req) {
		String userId = req.getParameter("userId");
		return MyTwitter.getAllTweetsFromTimeLine(userId);
	}

}