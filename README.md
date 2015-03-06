# README

## Install

Hi, this is Rupert's blog.	 My blog is now created in jekyll and hosted in github after following this [tutorial](http://www.girliemac.com/blog/2013/12/27/wordpress-to-jekyll/). It was previously created in wordpress. Jekyll generates static pages for your blog.
	
	gem install -V jekyll
	
## Serving the blog
	
Once jekyll is installed, we can see the blog by

	% jekyll serve
	Configuration file: /Projects/rdeguzman.github.io/_config.yml
	            Source: /Projects/rdeguzman.github.io
	       Destination: /Projects/rdeguzman.github.io/_site
	      Generating...
	                    done.
	 Auto-regeneration: enabled for '/Projects/rdeguzman.github.io'
	Configuration file: /Projects/rdeguzman.github.io/_config.yml
	    Server address: http://127.0.0.1:4000/
	  Server running... press ctrl-c to stop.
	  
Jekyll generates the whole blog under the *_site* dir.  We can remove this directory to explicitly flush everything out.	  	  
To create a post, we use [markdown for syntax](https://guides.github.com/features/mastering-markdown/). See actual posts from *_posts* directory

	rupert-imac:/Projects/rdeguzman.github.io[master]% l _posts
	total 4312
	2006-09-05-pocketpc-ehowtos.md*
	....
	2013-12-08-real-time-mobile-gps-tracking-using-android-node-js-socket-io-and-postgres.md*
	2014-03-27-libssl-1-0-0-dylib-error-when-installing-ruby-2-1-1-from-rvm.md*
	2014-10-23-upgrading-genymotion.md*
	2014-10-24-installing-google-apps-in-genymotion.md*
	
## Deployment

Simply push to github repo https://github.com/rdeguzman/rdeguzman.github.io and the blog will be served automatically under http://geocoding.io

		

## Cheatsheets	

Cheatsheets are loaded as git submodule.  If there are any changes on cheatsheet's main repo. We need to update the submodule

	git submodule update --remote cheatsheets

## TODO

* Broken links in tutorials		  
