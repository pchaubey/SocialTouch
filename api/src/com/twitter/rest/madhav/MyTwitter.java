package com.twitter.rest.madhav;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.StatusUpdate;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

public class MyTwitter {

	// private static TwitterFactory twitterFactory;

	private static SimpleDateFormat FORMATTER = new SimpleDateFormat("EEE, d MMM HH:mm");

	private static Map<String, Twitter> SESSIONMAP = new HashMap<>();

	public MyTwitter() {
	}

	static {
		SESSIONMAP.put("pushker", getPushkerSession());
		SESSIONMAP.put("jesse", getJesseSession());

	}

	public static Twitter getPushkerSession() {
		String consumerKeyPushker = "XXXXXXXXXXXXXXXXX";
		String consumerSecretPushker = "XXXXXXXXXXXXXXXXXXXXXXXXX";
		String accessTokenPushker = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX";
		String accessSecretPushker = "XXXXXXXXXXXXXXXXXXXXXXXX";
		String userPushker = "62662286";
		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true).setOAuthConsumerKey(consumerKeyPushker).setOAuthConsumerSecret(consumerSecretPushker)
				.setOAuthAccessToken(accessTokenPushker).setOAuthAccessTokenSecret(accessSecretPushker);
		cb.setUser(userPushker);
		TwitterFactory tf = new TwitterFactory(cb.build());
		System.out.println("config: " + tf);
		Twitter twitter = tf.getInstance();
		System.out.println("session: " + twitter);
		twitter = tf.getInstance();
		twitter.getAuthorization();
		return twitter;
	}

	public static Twitter getJesseSession() {
		String consumerKeyJesse = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
		String consumerSecretJesse = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
		String accessTokenJesse = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
		String accessSecretJesse = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
		String userJesse = "3045185001";
		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true).setOAuthConsumerKey(consumerKeyJesse).setOAuthConsumerSecret(consumerSecretJesse)
				.setOAuthAccessToken(accessTokenJesse).setOAuthAccessTokenSecret(accessSecretJesse);
		cb.setUser(userJesse);
		TwitterFactory tf = new TwitterFactory(cb.build());
		Twitter twitter = tf.getInstance();
		twitter = tf.getInstance();
		twitter.getAuthorization();
		return twitter;
	}

	public static void postMessage(Tweet tweet) {
		String updateMessage = tweet.getStatus();
		try {
			StatusUpdate stat = new StatusUpdate(updateMessage);
			if (tweet.getAttr() != null && tweet.getAttr().getReplyTo() != null
					&& !"".equalsIgnoreCase(tweet.getAttr().getReplyTo().trim())) {
				stat.setInReplyToStatusId(Long.parseLong(tweet.getAttr().getReplyTo()));
			}
			SESSIONMAP.get(tweet.getAttr().getUserId()).updateStatus(stat);
		} catch (TwitterException e1) {
			e1.printStackTrace();
		}
	}

	public static List<Tweet> getAllTweets(String hastag, String userId) {

		List<Tweet> listoftweets = new ArrayList<>();
		try {
			Query query = new Query(hastag);
			query.count(10);
			QueryResult result = SESSIONMAP.get(userId).search(query);
			List<Status> liststatus = result.getTweets();
			for (Status each : liststatus) {
				Tweet tweeteach = new Tweet();
				TweetAttributes attr = new TweetAttributes();
				attr.setHandleID(each.getUser().getScreenName());
				attr.setName(each.getUser().getName());
				attr.setTimeStamp(FORMATTER.format(each.getCreatedAt()));
				attr.setTweetID(String.valueOf(each.getId()));
				tweeteach.setAttr(attr);
				tweeteach.setStatus(each.getText());
				listoftweets.add(tweeteach);
			}
		} catch (TwitterException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return listoftweets;
	}

	public static List<Tweet> getAllTweetsFromTimeLine(String userId) {

		List<Tweet> listoftweets = new ArrayList<>();
		try {
			List<Status> liststatus = SESSIONMAP.get(userId).getHomeTimeline();
			for (Status each : liststatus) {
				Tweet tweeteach = new Tweet();
				TweetAttributes attr = new TweetAttributes();
				attr.setHandleID(each.getUser().getScreenName());
				attr.setName(each.getUser().getName());
				attr.setTimeStamp(FORMATTER.format(each.getCreatedAt()));
				attr.setTweetID(String.valueOf(each.getId()));
				tweeteach.setAttr(attr);
				tweeteach.setStatus(each.getText());
				listoftweets.add(tweeteach);
			}
		} catch (TwitterException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return listoftweets;
	}

	// public void printHomeTimeLineToConsole() {
	// try {
	// ResponseList timeLine = twitter.getHomeTimeline();
	// String timeLineString = timeLine.toString();
	// System.out.println(timeLineString);
	// } catch (TwitterException e1) {
	// // TODO Auto-generated catch block
	// e1.printStackTrace();
	// }
	// }

	// public void printSearchResultToConsole(){
	// SearchResource search = twitter.search();
	// String searchString = search.toString();
	// System.out.println(searchString);
	// }
	//

	// public void printtermsOfServiceToConsole(){
	// try {
	// termsOfService = twitter.get;
	// // System.out.println(termsOfService.);
	// } catch (TwitterException e1) {
	// // TODO Auto-generated catch block
	// e1.printStackTrace();
	// }
	// }
	//

	// try {
	// PageResponseList x = twitter.getFollowersList(62662286l, 123);
	// String y = x.toString();
	// int z = y.length();
	// System.out.println("ID's = " + y);
	// System.out.println("Number of followers = " + z);
	// } catch (TwitterException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// }

	// TwitterFactory twitterFactory= new TwitterFactory();
	// long userId = 12345;
	// AccessToken accessToken = new AccessToken(token, tokenSecret,
	// userId);
	// Twitter session = tf.getInstance(accessToken);
	// return twitter;

	// private static void init() throws Exception {
	// String accessToken =
	// "213198449- aUA5NaEPUFDhWAegWMPZyUETBzk0CrRDb5iVeurq";
	// String accessSecretToken = "G6rJT6jSo2mmINs2HYe2LMMT5wxCVgHHYpbDM98aQ";
	//
	// String twitterconsumerkey = "ayuQj81bbCo0Qj9WEtq8w";
	// String twittersecretkey =
	// "iMDVIDkZsxCuGkwpKQ9h5eKELUJQTe6hbG9dnsKU";
	//
	// String username = "Omega_gm";
	// String password = "781024";
	//
	// System.setProperty("twitter4j.oauth.consumerKey", twitterconsumerkey);
	//
	// System.setProperty("twitter4j.oauth.consumerSecret", twittersecretkey);
	//
	// try {
	// TwitterFactory factory = new TwitterFactory();
	// Twitter twitter = factory.getInstance();
	// AccessToken accestoken = new AccessToken(accessToken,
	// accessSecretToken);
	//
	// twitter.setOAuthAccessToken(accestoken);
	//
	// } catch (Exception e) {
	// e.printStackTrace();
	// }
	// }
	// }
	//
}
