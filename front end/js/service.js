/*global klantakkoord_directive_module: true */
app.service("service", function($http, $q) {
    
	var selfRef = this;
	this.userId = null;
	this.password = null;
	this.postCode = null;

    this.fetchTweets = function() {
		var deffered = $q.defer();
			$http.doGet("/lisa/klantakkoord/rest/approval_request", {}, {withCredentials: true, params: {"cramReferenceId" : this.filterCramReferenceId}}
        ).success(function(data, status, headers) {
            selfRef.tweets = data;
			deffered.resolve({"data": data, "headers": headers, "isError": false});
        }).error(function(data, status, headers, config) {
            deffered.resolve({"data": data, "headers": headers, "isError": true});
        });
		return deffered.promise;
    };
    
    this.login = function(userid, password, postcode){
    	this.userId = userid;
    	this.password = password;
    	this.postCode = postcode;    	
    };
    
    this.logout = function(){
    	this.userId = null;
    	this.password = null;
    	this.postCode = null;    	
    };    
});
