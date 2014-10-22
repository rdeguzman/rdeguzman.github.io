---
title: please install libyaml and reinstall your ruby.
author: rupert
layout: post
permalink: /2012/02/please-install-libyaml-and-reinstall-your-ruby/
categories:
  - ruby
tags:
  - ruby
  - rvm
---
<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">/Users/rupert/.rvm/rubies/ruby-1.9.3-p0/lib/ruby/1.9.1/yaml.rb:56:in `&lt;top (required)&gt;':
It seems your ruby installation is missing psych (for YAML output).
To eliminate this warning, please install libyaml and reinstall your ruby.</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~% rvm remove ruby-1.9.3-p0
Removing /Users/rupert/.rvm/src/ruby-1.9.3-p0...
Removing /Users/rupert/.rvm/rubies/ruby-1.9.3-p0...
Removing ruby-1.9.3-p0 aliases...
Removing ruby-1.9.3-p0 wrappers...
Removing ruby-1.9.3-p0 environments...
Removing ruby-1.9.3-p0 binaries...</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~% rvm list
rvm rubies
&nbsp;
   ruby-1.8.7-p302 [ x86_64 ]
   ruby-1.9.2-p0 [ x86_64 ]
=&gt; ruby-1.9.2-p180 [ x86_64 ]</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~% rvm install ruby-1.9.3-p0
/Users/rupert/.rvm/rubies/ruby-1.9.3-p0, this may take a while depending on your cpu(s)...
&nbsp;
ruby-1.9.3-p0 - #fetching 
ruby-1.9.3-p0 - #extracting ruby-1.9.3-p0 to /Users/rupert/.rvm/src/ruby-1.9.3-p0
ruby-1.9.3-p0 - #extracted to /Users/rupert/.rvm/src/ruby-1.9.3-p0
ruby-1.9.3-p0 - #configuring 
ruby-1.9.3-p0 - #compiling 
ruby-1.9.3-p0 - #installing 
ruby-1.9.3-p0 - updating #rubygems for /Users/rupert/.rvm/gems/ruby-1.9.3-p0@global
ruby-1.9.3-p0 - updating #rubygems for /Users/rupert/.rvm/gems/ruby-1.9.3-p0
ruby-1.9.3-p0 - adjusting #shebangs for (gem).
ruby-1.9.3-p0 - #importing default gemsets (/Users/rupert/.rvm/gemsets/)</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~% rvm list
&nbsp;
rvm rubies
&nbsp;
   ruby-1.8.7-p302 [ x86_64 ]
   ruby-1.9.2-p0 [ x86_64 ]
=&gt; ruby-1.9.2-p180 [ x86_64 ]
   ruby-1.9.3-p0 [ x86_64 ]</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~% rvm use ruby-1.9.3-p0
Using /Users/rupert/.rvm/gems/ruby-1.9.3-p0</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">~/current[master]% gem list
&nbsp;
*** LOCAL GEMS ***
&nbsp;
rake (0.9.2.2)
rubygems-update (1.8.15)</pre>
      </td>
    </tr>
  </table>
</div>