/**
 * 
 */
package com.twitter.rest.madhav;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CROSFilter implements Filter {

	private ServletContext context;

	public void init(FilterConfig fConfig) throws ServletException {
		this.context = fConfig.getServletContext();
		this.context.log("CROSFilter initialized");
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
			ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;

		String origin = req.getHeader("Origin");
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Expose-Headers", "X-XSRF-TOKEN");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT");
		res.setHeader("Allow", "POST,GET,OPTIONS,PUT");
		res.setHeader("Access-Control-Max-Age", "1728000");
		res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN");

		chain.doFilter(request, response);

	}

	public void destroy() {
		// close any resources here
	}

}