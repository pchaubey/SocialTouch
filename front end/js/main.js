/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
  'ngRoute',
  'ngSanitize',
  'ngMockE2E'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/login", {templateUrl: "partials/login.html", controller: "LoginCtrl"})
    .when("/logout", {templateUrl: "partials/logout.html", controller: "LogoutCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "DefaultCtrl"})
    .when("/dashboard", {templateUrl: "partials/dashboard.html", controller: "DashboardCtrl"})
    .when("/timeline", {templateUrl: "partials/timeline.html", controller: "TimeLineCtrl"})
    .when("/createStatus", {templateUrl: "partials/post.html", controller: "NewMsgCtrl"})
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);


/*******SERVICE*******/
app.service("service", function($http, $q) {
	
	
	var tweet1 = { "status": "Capathon in your neighborhood! if Interested please msg #1185RX", "attr": {"handleID": "pushkerchaubey", "tweetID": "2271825419825236086", "replyTo": "", "timeStamp": "Fri Feb 20 22:31:38 CET 2015" , "name" : "Pushker Chaubey", "hashTag" : "1185RX"}};
	
	var tweet2 = { "status": "cool! I am in #1185RX", "attr": {"handleID": "BMADHAVREDDY", "tweetID": "2271825419825236087", "replyTo": "pushkerchaubey", "timeStamp": "Fri Feb 20 22:32:40 CET 2015", "name" : "Madhav Reddy", "hashTag" : "1185RX"}};
	var tweet3 = { "status": "Poor IT guys, pity you #1185RX", "attr": {"handleID": "satyadeleep", "tweetID": "2271825419825236088", "replyTo": "pushkerchaubey", "timeStamp": "Fri Feb 20 23:35:45 CET 2015" , "name" : "Satya Deleep", "hashTag" : "1185RX"}};
	var tweet4 = { "status": "Capathon! What that heck is that? #1185RX", "attr": {"handleID": "satyadeleep", "tweetID": "2271825419825236096", "replyTo": "pushkerchaubey", "timeStamp": "Fri Feb 20 23:44:38 CET 2015" , "name" : "Satya Deleep", "hashTag" : "1185RX"}};
	
	this.tweetList1 = [tweet1, tweet2, tweet3];	
	
	
	
	this.users = [{userId: "pushker", password: "test"}, {userId: "madhav", password: "test"}, {userId: "jesse", password: "test"}];	
	var selfRef = this;
	this.userId = null;
	this.password = null;
	this.postCode = null;

	
    this.fetchTweets = function() {

		var deffered = $q.defer();
			$http.doGet("http://192.168.101.156:8080/MadhavCapathonTOMEEAPI/twitter/api/alltweets", {}, {withCredentials: true, params: {"hashTag": this.postCode, "userId" : this.userId}}
        ).success(function(data, status, headers) {
            selfRef.tweets = data;
            //selfRef.tweets = tweetList1;
			deffered.resolve({"data": data, "headers": headers, "isError": false});
        }).error(function(data, status, headers, config) {
            deffered.resolve({"data": data, "headers": headers, "isError": true});
        });

		return deffered.promise;
    };
    
    this.getTimeLine = function() {

		var deffered = $q.defer();
			$http.doGet("http://192.168.101.156:8080/MadhavCapathonTOMEEAPI/twitter/api/allInTimeLine", {}, {withCredentials: true, params: {"userId" : this.userId}}
        ).success(function(data, status, headers) {
            selfRef.tweets = data;
            //selfRef.tweets = tweetList1;
			deffered.resolve({"data": data, "headers": headers, "isError": false});
        }).error(function(data, status, headers, config) {
            deffered.resolve({"data": data, "headers": headers, "isError": true});
        });

		return deffered.promise;
    };    
    
    this.login = function(userid, password, postcode){
    	var valid = false;
    	for(var i=0; i < this.users.length; i++){
    		 if(this.users[i].userId == userid && this.users[i].password == password){
    			 valid = true;
    		 }
    	}
    	if(valid === false){
    		return false;
    	}
    	this.userId = userid;
    	this.password = password;
    	this.postCode = postcode;
    	return true;
    };
    
    
    this.logout = function(){
    	this.userId = null;
    	this.password = null;
    	this.postCode = null;    	
    };
    
    
    this.isLoggedIn = function(){
    	if(this.userId == null){
    		return false;
    	}else{
    		return true;
    	}
    };
    
    
    this.postStatus = function(status, options){
    	options.userId = this.userId;
    	var statusMsg = status;
    	statusMsg = statusMsg + "#" + this.postCode;
		var deffered = $q.defer();
		$http.doPost("http://192.168.101.156:8080/MadhavCapathonTOMEEAPI/twitter/api/newtweet", {"status" : statusMsg, "attr" : options}, {withCredentials: true}
		).success(function(data, status, headers) {
			selfRef.tweets = data;
			deffered.resolve({"data": data, "headers": headers, "isError": false});
			
			/*
			var tweet = { "status": "Capathon in your neighborhood! if Interested please msg", "attr": {"handleID": "pushkerchaubey", "tweetID": "2271825419825236086", "replyTo": "", "timeStamp": "Fri Feb 20 22:31:38 CET 2015" , "name" : "Pushker Chaubey", "hashTag" : "1185RX"}};
			tweet.status = statusMsg;
			tweet.attr.replyTo = options.replyTo;
			this.tweetList1.push(tweet);
			*/
			
		}).error(function(data, status, headers, config) {
			deffered.resolve({"data": data, "headers": headers, "isError": true});
		});

		return deffered.promise;
	};

});


/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope, $location, service, $window ) {
	console.log("Page Controller reporting for duty.");
  
	$scope.postCode = '1185RX';
	$scope.userName = 'pushker';
	$scope.password = 'test';
	$scope.loginError = false;
	$scope.loginFailMsg = "Login failed. Please try again."

	$scope.login = function(){
		
		var result = service.login($scope.userName, $scope.password, $scope.postCode);
		if(result === true){
			$location.path("/login");
		}else{
			//$window.alert('login failed');
			$scope.loginError = true;
		}
	};
  
});

app.controller('DefaultCtrl', function ($scope, $location, $http) {
	service.tempTweetId = null;
	service.replyToHandle = null;
});


app.controller('LoginCtrl', function ($scope, $location, service) {
	service.tempTweetId = null;
	service.replyToHandle = null;
	$location.path("/dashboard");
});

app.controller('LogoutCtrl', function ($scope, $location, service) {
	service.tempTweetId = null;
	service.replyToHandle = null;
	service.logout()
	$location.path("/");
});

app.controller('DashboardCtrl', function ($scope, $location, service) {
	service.tempTweetId = null;
	service.replyToHandle = null;
	$scope.error = false;
	if(service.isLoggedIn() == false){
		$location.path("/");
	}
	
	$scope.goToPostStatus = function(){
		service.tempTweetId = null;
		$location.path("/createStatus");
	}; 
	
	$scope.goToTimeLine = function(){
		service.tempTweetId = null;
		$location.path("/timeline");
	};	
	
	$scope.postReply = function(tweetId, replyToHandle){
		console.log(tweetId);
		service.tempTweetId = tweetId;
		service.replyToHandle = replyToHandle;
		$location.path("/createStatus");
	};
	
	$scope.refreshList = function(){
	    var promise = service.fetchTweets();
	    promise.then(function(value) {
	        if (value.isError === false) {
	        	$scope.error = false;
	            $scope.tweets = value.data;
	            
	           if(value.data != null){
	            	var patt = /#\w{6,6}/;           	
	            	for(var i=0; i < value.data.length; i++){
	            		if(value.data[i].status != null){
		                   	var res = patt.exec(value.data[i].status);
		                   	var status = value.data[i].status.replace(res, "<a href='javaScript: return' style='color:blue;text-decoration: none'> " + res + " </a>");
		                   	value.data[i].status = status;
	            		}
	            	}
	            }
	            
	            console.log("tweets in contoller " +  $scope.tweets);
	        } else {                   
	        	$scope.errorMsg = "Error!";
	        	$scope.error = true;
	            console.log("tweets : error fetxhing list" +  $scope.tweets);
	        }
	    });			
	};
	
	$scope.refreshList();
});

app.controller('TimeLineCtrl', function ($scope, $location, service) {
	service.tempTweetId = null;
	service.replyToHandle = null;
	$scope.error = false;
	if(service.isLoggedIn() == false){
		$location.path("/");
	}
	
	$scope.goToPostStatus = function(){
		service.tempTweetId = null;
		$location.path("/createStatus");
	}; 
	
	$scope.goToDashBoard = function(){
		service.tempTweetId = null;
		$location.path("/dashboard");
	};
	
	$scope.goToTimeLine = function(){
		service.tempTweetId = null;
		$location.path("/timeLine");
	};
	
	$scope.postReply = function(tweetId, replyToHandle){
		console.log(tweetId);
		service.tempTweetId = tweetId;
		service.replyToHandle = replyToHandle;
		$location.path("/createStatus");
	};
	
	$scope.refreshList = function(){
	    var promise = service.getTimeLine();
	    promise.then(function(value) {
	        if (value.isError === false) {
	        	$scope.error = false;
	            $scope.tweets = value.data;
	            
	           if(value.data != null){
	            	var patt = /#\w{6,6}/;           	
	            	for(var i=0; i < value.data.length; i++){
	            		if(value.data[i].status != null){
		                   	var res = patt.exec(value.data[i].status);
		                   	var status = value.data[i].status.replace(res, "<a href='javaScript: return' style='color:blue;text-decoration: none'> " + res + " </a>");
		                   	value.data[i].status = status;
	            		}
	            	}
	            }
	            
	            console.log("tweets in contoller " +  $scope.tweets);
	        } else {                   
	        	$scope.errorMsg = "Error!";
	        	$scope.error = true;
	            console.log("tweets : error fetxhing list" +  $scope.tweets);
	        }
	    });			
	};
	
	$scope.refreshList();
});


app.controller('NewMsgCtrl', function ($scope, $location, service) {
	
	$scope.error = false;
	$scope.errorMsg = "Error occured!.";
	$scope.tempTweetId = service.tempTweetId;
	
	if(service.replyToHandle != null){
		$scope.status = "@" + service.replyToHandle + " ";
		console.log('**** replyToHandle ' + $scope.replyToHandle);
	}
	$scope.createMsg = function(){
		if($scope.status == null){
			return;
		}
		var options = {};
		if($scope.tempTweetId != null){
			options.replyTo = $scope.tempTweetId;
		}
		console.log('**** options.tweetId' + options.inReplyTo);
	    var promise = service.postStatus($scope.status, options);
	    promise.then(function(value) {
	        if (value.isError === false) {
	        	$scope.error = false;
	            console.log("post response " +  value);
	            $location.path("/dashboard");
	        } else {                   
	        	$scope.errorMsg = "Error!";
	        	$scope.error = true;
	            console.log("tweets : error fetching list" +  $scope.tweets);
	        }
	    });		
	    service.tempTweetId = null;
	    service.replyToHandle = null;
	};
	
	$scope.backToMessages = function(){
		$location.path("/dashboard");
	};
	
	$scope.goToTimeLine = function(){
		service.tempTweetId = null;
		$location.path("/timeline");
	};	
	
	if(service.isLoggedIn() == false){
		$location.path("/");
	}	
});



app.run(function($httpBackend, $location) {
	
	var tweet1 = { "status": "Capathon in your neighborhood! if Interested please msg #1185RX", "attr": {"handleID": "pushkerchaubey", "tweetID": "2271825419825236086", "replyTo": "", "timeStamp": "Fri Feb 20 22:31:38 CET 2015" , "name" : "Pushker Chaubey", "hashTag" : "1185RX"}};
	
	var tweet2 = { "status": "cool! I am ing #1185RX", "attr": {"handleID": "BMADHAVREDDY", "tweetID": "2271825419825236087", "replyTo": "pushkerchaubey", "timeStamp": "Fri Feb 20 22:32:40 CET 2015", "name" : "Madhav Reddy", "hashTag" : "1185RX"}};
	var tweet3 = { "status": "#1185RX Poor IT guys, pity you", "attr": {"handleID": "satyadeleep", "tweetID": "2271825419825236088", "replyTo": "pushkerchaubey", "timeStamp": "Fri Feb 20 23:35:45 CET 2015" , "name" : "Satya Deleep", "hashTag" : "1185RX"}};
	var tweet4 = { "status": "Capathon! What that heck is that?", "attr": {"handleID": "satyadeleep", "tweetID": "2271825419825236096", "replyTo": "pushkerchaubey", "timeStamp": "Fri Feb 20 23:44:38 CET 2015" , "name" : "Satya Deleep", "hashTag" : "1185RX"}};
	
	this.tweetList1 = [tweet1, tweet2, tweet3];
	this.tweetList2 = [tweet1, tweet2, tweet3, tweet4];	
	
	$httpBackend.whenGET(/views/).passThrough();
	$httpBackend.whenGET(/.html/).passThrough();

	$httpBackend.whenGET("http://192.168.101.156:8080/MadhavCapathonTOMEEAPI/twitter/api/alltweets?hashTag=1185RX&userId=pushker").passThrough();
	$httpBackend.whenGET("http://192.168.101.156:8080/MadhavCapathonTOMEEAPI/twitter/api/allInTimeLine?userId=pushker").passThrough();
	$httpBackend.whenPOST("http://192.168.101.156:8080/MadhavCapathonTOMEEAPI/twitter/api/newtweet?").passThrough();
	
	//$httpBackend.whenGET("http://192.168.101.156:8080/MadhavCapathonTOMEEAPI/twitter/api/alltweets?hashTag=1185RX&userId=pushker").respond(tweetList1);
	//$httpBackend.whenPOST("http://192.168.101.156:8080/MadhavCapathonTOMEEAPI/twitter/api/newtweet?").respond({});
	//$httpBackend.whenGET("http://192.168.101.156:8080/MadhavCapathonTOMEEAPI/twitter/api/alltweets?userId=pushker").respond(tweetList1);

});


app.config(['$provide', function($provide) {

    // configure http provider to convert 'PUT', 'DELETE' methods to 'POST' requests
    $provide.decorator('$http', ['$delegate', '$location', function($http, $location) {
	
            //console.log("Concat mcpurlparam");
            // create function which overrides $http function
            var httpBridge = function (method) {

                return function(url, data, config) {

                    config || (config = {});

                    config.method = method;
					
                    //console.log("url: ", url);
                    //console.log("data: ", data);
                    console.log("test application config: ", config);

					config.params = config.params || {};
					
                    return $http(angular.extend(config, {
                        url: url,
                        data: data
                    }));
                };
            };
    		$http.doGet = httpBridge('get');
    		$http.doPost = httpBridge('post');
    		$http.doOptions = httpBridge('options');

        return $http;
    }]);
}]);
