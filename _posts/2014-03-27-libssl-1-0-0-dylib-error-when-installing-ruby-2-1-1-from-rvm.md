---
title: 'openssl libssl.1.0.0.dylib error when installing ruby-2.1.1 from rvm'
author: rupert
layout: post
permalink: /2014/03/libssl-1-0-0-dylib-error-when-installing-ruby-2-1-1-from-rvm/
categories:
  - ruby
tags:
  - ruby
  - rvm
---

This post is regarding a libssl error on ruby-2.1.1 when using rvm. Details of the error is as follows:

  	dyld: Library not loaded: /Users/mpapis/.sm/pkg/versions/openssl/1.0.1f/lib/libssl.1.0.0.dylib when installing ruby-2.1.1 from rvm

Upgrading rvm should be just as easy as

	rupert-imac:~% rvm get stable
	  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
	                                 Dload  Upload   Total   Spent    Left  Speed
	100   184  100   184    0     0     64      0  0:00:02  0:00:02 --:--:--    64
	100 20511  100 20511    0     0   4958      0  0:00:04  0:00:04 --:--:--  400k
	Downloading https://github.com/wayneeseguin/rvm/archive/stable.tar.gz
	&nbsp;
	Upgrading the RVM installation in /Users/rupert/.rvm/
	    RVM PATH line found in /Users/rupert/.bashrc /Users/rupert/.zshrc.
	    RVM sourcing line found in /Users/rupert/.bash_profile /Users/rupert/.zlogin.
	    Migrating environment ruby-1.8.7-p302 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.8.7-p302@global to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.8.7-p302@test to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.8.7-p302@virgin_checker to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p0 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p0@cartodb to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p0@cartoset to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p0@cws to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p0@datalink to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p0@global to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@ads to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@ar-dbcopy to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@autoselect to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@cws to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@datalink-migration to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@doctest to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@geo_rails_test_30 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@geo_rails_test_31 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@global to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@markdown to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@mta-partner-hotels to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@myproj to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@mytravel-asia-dev to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.2-p180@virginmobileusagechecker to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@activerecord-postgis-adapter-dev to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@android-calabash to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@dfms to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@geocoder-cache to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@georails to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@georails32 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@georails4 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@global to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@kata to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@myapp to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@namegen to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@ncmpg to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@queue_classic to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@rails31 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@rails32 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@rgeo to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@rgeo_examples to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@rspec-rails to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@selenium to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p0@test to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p362 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p362@android-calabash to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p362@global to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p362@gpslogger to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p448 to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p448@dfms to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p448@global to use with 'gem-wrappers' gem.
	    Migrating environment ruby-1.9.3-p448@rails4 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.8.7-p302 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.8.7-p302@global to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.8.7-p302@test to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.8.7-p302@virgin_checker to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p0 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p0@cartodb to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p0@cartoset to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p0@cws to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p0@datalink to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p0@global to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@ads to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@ar-dbcopy to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@autoselect to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@cws to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@datalink-migration to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@doctest to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@geo_rails_test_30 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@geo_rails_test_31 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@global to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@markdown to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@mta-partner-hotels to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@myproj to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@mytravel-asia-dev to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.2-p180@virginmobileusagechecker to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p0 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p0@android-calabash to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p0@dfms to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p0@global to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p0@namegen to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p0@ncmpg to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p0@rails31 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p0@rails32 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p0@rspec-rails to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p362 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p362@android-calabash to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p362@global to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p362@gpslogger to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p448 to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p448@dfms to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p448@global to use with 'gem-wrappers' gem.
	    Migrating wrappers ruby-1.9.3-p448@rails4 to use with 'gem-wrappers' gem.
	    Installing rvm gem in 1 gemsets.
	    Installing gem-wrappers gem in 6 gemsets.
	Upgrade of RVM in /Users/rupert/.rvm/ is complete.
	&nbsp;
	# Rupert,
	#
	#   Thank you for using RVM!
	#   We sincerely hope that RVM helps to make your life easier and more enjoyable!!!
	#
	# ~Wayne, Michal & team.
	&nbsp;
	In case of problems: http://rvm.io/help and https://twitter.com/rvm_io
	&nbsp;
	Upgrade Notes:
	&nbsp;
	&nbsp;
	  * WARNING: You have '~/.profile' file, you might want to load it,
	    to do that add the following line to '/Users/rupert/.bash_profile':
	&nbsp;
	      source ~/.profile
	&nbsp;
	  * It looks like some old stuff is laying around RVM, you can cleanup with: rvm cleanup all
	&nbsp;
	  * RVM 1.24 changes default package manager on OSX to Homebrew,
	    use `rvm autolibs macports` if you prefer Macports.
	&nbsp;
	  * RVM 1.24 changes default `--verify-downloads` flag to `1` you can get the paranoid mode again with:
	&nbsp;
	      echo rvm_verify_downloads_flag=0 &gt;&gt; ~/.rvmrc
	&nbsp;
	  * RVM 1.25 disables default pollution of rvm_path/bin, you still can generate the links using:
	&nbsp;
	      rvm wrapper ruby-name           # or for default:
	      rvm wrapper default --no-prefix
	&nbsp;
	  * RVM 1.25.11 'rvm remove' will by default remove gems, to remove only ruby use 'rvm uninstall'
	&nbsp;
	&nbsp;
	RVM reloaded!

Installing ruby-2.1.1 seems to be having issues with a hardcoded static library_ssl path dyld: Library not loaded: /Users/mpapis/.sm/pkg/versions/openssl/1.0.1f/lib/libssl.1.0.0.dylib

	No checksum for downloaded archive, recording checksum in user configuration.
	ruby-2.1.1 - #extracting rubygems-2.2.2...
	ruby-2.1.1 - #removing old rubygems.........
	ruby-2.1.1 - #installing rubygems-2.2.2.
	Error running 'env GEM_HOME= GEM_PATH= /Users/rupert/.rvm/rubies/ruby-2.1.1/bin/ruby -d /Users/rupert/.rvm/src/rubygems-2.2.2/setup.rb',
	showing last 15 lines of /Users/rupert/.rvm/log/1395619519_ruby-2.1.1/rubygems.install.log
	[2014-03-24 11:05:25] /Users/rupert/.rvm/rubies/ruby-2.1.1/bin/ruby
	current path: /Users/rupert/.rvm/src/rubygems-2.2.2
	GEM_HOME=
	PATH=/usr/local/opt/pkg-config/bin:/usr/local/opt/libtool/bin:/usr/local/opt/automake/bin:/usr/local/opt/autoconf/bin:/Users/rupert/.rvm/gems/ruby-1.9.2-p180/bin:/Users/rupert/.rvm/gems/ruby-1.9.2-p180@global/bin:/Users/rupert/.rvm/rubies/ruby-1.9.2-p180/bin:/Users/rupert/.rvm/bin:/Users/rupert/.rvm/bin:/Users/rupert/bin:/Users/rupert/.bin:/usr/local/homebrew/bin:/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/opt/X11/bin:/Library/Oracle/instantclient/10.2.0.4:/Developer/android-sdk-macosx/tools:/Developer/android-sdk-macosx/platform-tools:/usr/local/apache2/bin:/usr/local/ImageMagick/bin:/usr/local/sphinx/bin:/Users/rupert/.dotfiles/cheat_commands/:/usr/local/lib/node_modules:/Users/rupert/.rvm/bin
	GEM_PATH=
	command(6): env GEM_HOME= GEM_PATH= /Users/rupert/.rvm/rubies/ruby-2.1.1/bin/ruby -d /Users/rupert/.rvm/src/rubygems-2.2.2/setup.rb
	dyld: Library not loaded: /Users/mpapis/.sm/pkg/versions/openssl/1.0.1f/lib/libssl.1.0.0.dylib
	  Referenced from: /Users/rupert/.rvm/rubies/ruby-2.1.1/bin/ruby
	  Reason: image not found
	/Users/rupert/.rvm/scripts/functions/support: line 411: 11560 Trace/BPT trap: 5       "$ruby_path" -rrbconfig -e '\
	    File.open("'"$config_path"'","w") { |file|
	      RbConfig::CONFIG.sort.each{|key,value|
	        file.write("#{key.gsub(/\.|-/,"_")}=\"#{value.gsub("$","\\$")}\"\n")
	      }
	    }
	  ' &gt; /dev/null 2&gt;&1
	dyld: Library not loaded: /Users/mpapis/.sm/pkg/versions/openssl/1.0.1f/lib/libssl.1.0.0.dylib
	  Referenced from: /Users/rupert/.rvm/rubies/ruby-2.1.1/bin/ruby
	  Reason: image not found
	Empty path passed to certificates update, functions stack: requirements_osx_update_openssl_cert_run rvm_requiremnts_fail_or_run_action __rvm_osx_ssl_certs_ensure_for_ruby __rvm_osx_ssl_certs_ensure_for_ruby_except_jruby external_import_setup external_import main
	  9.37s user 3.69s system 30% cpu 43.351 total
	  9.47s user 3.77s system 30% cpu 43.492 total
	  9.49s user 3.80s system 30% cpu 43.524 total
	Gemset '' does not exist, 'rvm ruby-2.1.1 do rvm gemset create ' first, or append '--create'.

Running `rvm get stable` again to fetch the fix from <https://github.com/wayneeseguin/rvm/issues/2732> should do the trick

	rupert-imac:~/Desktop% sudo rvm install ruby-2.1.1
	Searching for binary rubies, this might take some time.
	Found remote file https://rvm.io/binaries/osx/10.9/x86_64/ruby-2.1.1.tar.bz2
	Checking requirements for osx.
	Certificates in '/usr/local/etc/openssl/cert.pem' already are up to date.
	Requirements installation successful.
	ruby-2.1.1 - #configure
	ruby-2.1.1 - #download
	ruby-2.1.1 - #validate archive
	ruby-2.1.1 - #extract
	ruby-2.1.1 - #validate binary
	ruby-2.1.1 - #setup
	ruby-2.1.1 - #making binaries executable..
	Rubygems 2.2.2 already available in installed ruby, skipping installation, use --force to reinstall.
	ruby-2.1.1 - #gemset created /Users/rupert/.rvm/gems/ruby-2.1.1@global
	ruby-2.1.1 - #importing gemset /Users/rupert/.rvm/gemsets/global.gems.......................................
	ruby-2.1.1 - #generating global wrappers.........
	ruby-2.1.1 - #gemset created /Users/rupert/.rvm/gems/ruby-2.1.1
	ruby-2.1.1 - #importing gemsetfile /Users/rupert/.rvm/gemsets/default.gems evaluated to empty gem list
	ruby-2.1.1 - #generating default wrappers.........