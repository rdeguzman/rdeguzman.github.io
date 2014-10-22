---
title: 'ColdSpring bean creation magic&#8230;'
author: rupert
layout: post
permalink: /2007/02/coldspring-bean-creation-magic/
tags:
  - coldspring
  - modelglue
---
[Adam describes some fun and exciting changes in ModelGlue Unity. ][1] I can now ditch cflocation by using argument.event.forward(&#8220;location.cfm&#8221;).

Its just now that im loving ColdSpring, I think its much better to instantiate beans and set/create other objects using setters/getters through the *property* instead of *constructor-arg*. Here&#8217;s an example:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="cfm" style="font-family:monospace;"><span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfcomponent</span> displayname<span style="color: #0000FF;">=</span><span style="color: #009900;">"UserService"</span> output<span style="color: #0000FF;">=</span><span style="color: #009900;">"false"</span> <span style="color: #0000FF;">hint</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"I am a UserService."</span><span style="color: #0000FF;">&gt;</span></span>
	<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cffunction</span> <span style="color: #0000FF;">name</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"init"</span> <span style="color: #0000FF;">access</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"Public"</span> returntype<span style="color: #0000FF;">=</span><span style="color: #009900;">"UserService"</span> output<span style="color: #0000FF;">=</span><span style="color: #009900;">"false"</span> <span style="color: #0000FF;">hint</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"I am a new UserService"</span><span style="color: #0000FF;">&gt;</span></span>
		<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfreturn</span><span style="color: #0000FF;">&gt;</span></span>
	<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfreturn</span><span style="color: #0000FF;">&gt;</span></span>
&nbsp;
	<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cffunction</span><span style="color: #0000FF;">&gt;</span></span><span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cffunction</span> <span style="color: #0000FF;">name</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"setUserGateway"</span> returntype<span style="color: #0000FF;">=</span><span style="color: #009900;">"void"</span> <span style="color: #0000FF;">access</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"public"</span> output<span style="color: #0000FF;">=</span><span style="color: #009900;">"false"</span> <span style="color: #0000FF;">hint</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"Dependency: UserService"</span><span style="color: #0000FF;">&gt;</span></span>
		<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfargument</span> <span style="color: #0000FF;">name</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"userGateway"</span> <span style="color: #0000FF;">type</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"cfcodetrack.model.UserGateway"</span> <span style="color: #0000FF;">required</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"true"</span><span style="color: #0000FF;">&gt;</span></span>
		<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfset</span> variables.usergateway<span style="color: #0000FF;">=</span><span style="color: #009900;">"arguments.userGateway"</span><span style="color: #0000FF;">&gt;</span></span>
	<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfset</span><span style="color: #0000FF;">&gt;</span></span>
&nbsp;
	<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cffunction</span> <span style="color: #0000FF;">name</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"getUserGateway"</span> <span style="color: #0000FF;">access</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"public"</span> returntype<span style="color: #0000FF;">=</span><span style="color: #009900;">"cfcodetrack.model.UserGateway"</span> output<span style="color: #0000FF;">=</span><span style="color: #009900;">"false"</span><span style="color: #0000FF;">&gt;</span></span>
		<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfreturn</span><span style="color: #0000FF;">&gt;</span></span>
	<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfreturn</span><span style="color: #0000FF;">&gt;</span></span>	
&nbsp;
	<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cffunction</span><span style="color: #0000FF;">&gt;</span></span><span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cffunction</span> <span style="color: #0000FF;">name</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"authenticate"</span> <span style="color: #0000FF;">access</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"public"</span> returntype<span style="color: #0000FF;">=</span><span style="color: #009900;">"string"</span> output<span style="color: #0000FF;">=</span><span style="color: #009900;">"false"</span><span style="color: #0000FF;">&gt;</span></span>
		<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfargument</span> <span style="color: #0000FF;">name</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"username"</span> <span style="color: #0000FF;">type</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"string"</span> <span style="color: #0000FF;">required</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"true"</span><span style="color: #0000FF;">&gt;</span></span>
		<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfargument</span><span style="color: #0000FF;">&gt;</span></span><span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfargument</span> <span style="color: #0000FF;">name</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"password"</span> <span style="color: #0000FF;">type</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"string"</span> <span style="color: #0000FF;">required</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"true"</span><span style="color: #0000FF;">&gt;</span></span>
		<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfdump</span> <span style="color: #000000; font-weight: bold;">var</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"#password#"</span><span style="color: #0000FF;">&gt;</span></span>
		<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfabort</span><span style="color: #0000FF;">&gt;</span></span>
	<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfabort</span><span style="color: #0000FF;">&gt;</span></span>	
&nbsp;
	<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cffunction</span> <span style="color: #0000FF;">name</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"getUsers"</span> <span style="color: #0000FF;">access</span><span style="color: #0000FF;">=</span><span style="color: #009900;">"public"</span> returntype<span style="color: #0000FF;">=</span><span style="color: #009900;">"any"</span> output<span style="color: #0000FF;">=</span><span style="color: #009900;">"false"</span><span style="color: #0000FF;">&gt;</span></span>
		<span style="color: #333333;"><span style="color: #0000FF;">&lt;</span><span style="color: #990000; font-weight: bold;">cfreturn</span><span style="color: #0000FF;">&gt;</span></span>
	<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfreturn</span><span style="color: #0000FF;">&gt;</span></span>
&nbsp;
<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cffunction</span><span style="color: #0000FF;">&gt;</span></span>
<span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfdump</span><span style="color: #0000FF;">&gt;</span></span><span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfargument</span><span style="color: #0000FF;">&gt;</span></span><span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cffunction</span><span style="color: #0000FF;">&gt;</span></span><span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfargument</span><span style="color: #0000FF;">&gt;</span></span><span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cffunction</span><span style="color: #0000FF;">&gt;</span></span><span style="color: #333333;"><span style="color: #0000FF;">&lt;/</span><span style="color: #990000; font-weight: bold;">cfcomponent</span><span style="color: #0000FF;">&gt;</span></span></pre>
      </td>
    </tr>
  </table>
</div>

In your ColdSpring.xml your beans should only look like this:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="xml" style="font-family:monospace;">	<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;bean</span> <span style="color: #000066;">id</span>=<span style="color: #ff0000;">"dsn"</span> <span style="color: #000066;">class</span>=<span style="color: #ff0000;">"cfcodetrack.model.dsn"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
		<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;constructor</span> -arg <span style="color: #000066;">name</span>=<span style="color: #ff0000;">"dsn"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
			<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;value<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>cfcodetrack<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/value<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
		<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/constructor<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
	<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/bean<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>	
&nbsp;
	<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;bean</span> <span style="color: #000066;">id</span>=<span style="color: #ff0000;">"reactorFactory"</span> <span style="color: #000066;">class</span>=<span style="color: #ff0000;">"reactor.reactorFactory"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
		<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;constructor</span> -arg <span style="color: #000066;">name</span>=<span style="color: #ff0000;">"configuration"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
			<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;ref</span> <span style="color: #000066;">bean</span>=<span style="color: #ff0000;">"reactorConfiguration"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
		<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/ref<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
	<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/constructor<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
&nbsp;
	<span style="color: #808080; font-style: italic;">&lt;!-- Security Service</span>
<span style="color: #808080; font-style: italic;">	--&gt;</span>
	<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/bean<span style="color: #000000; font-weight: bold;">&gt;</span></span><span style="color: #000000; font-weight: bold;">&lt;bean</span> <span style="color: #000066;">id</span>=<span style="color: #ff0000;">"securityService"</span> <span style="color: #000066;">class</span>=<span style="color: #ff0000;">"cfcodetrack.model.SecurityService"</span> <span style="color: #000066;">singleton</span>=<span style="color: #ff0000;">"true"</span><span style="color: #000000; font-weight: bold;">&gt;</span><span style="color: #000000; font-weight: bold;">&lt;/bean<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
&nbsp;
	<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;bean</span> <span style="color: #000066;">id</span>=<span style="color: #ff0000;">"userGateway"</span> <span style="color: #000066;">class</span>=<span style="color: #ff0000;">"cfcodetrack.model.UserGateway"</span> <span style="color: #000066;">singleton</span>=<span style="color: #ff0000;">"true"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;property</span> <span style="color: #000066;">name</span>=<span style="color: #ff0000;">"reactorFactory"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
			<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;ref</span> <span style="color: #000066;">bean</span>=<span style="color: #ff0000;">"reactorFactory"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
		<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/ref<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/property<span style="color: #000000; font-weight: bold;">&gt;</span></span><span style="color: #000000; font-weight: bold;">&lt;property</span> <span style="color: #000066;">name</span>=<span style="color: #ff0000;">"dsn"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
			<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;ref</span> <span style="color: #000066;">bean</span>=<span style="color: #ff0000;">"dsn"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
		<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/ref<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
	<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/property<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
&nbsp;
	<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/bean<span style="color: #000000; font-weight: bold;">&gt;</span></span><span style="color: #000000; font-weight: bold;">&lt;bean</span> <span style="color: #000066;">id</span>=<span style="color: #ff0000;">"userService"</span> <span style="color: #000066;">class</span>=<span style="color: #ff0000;">"cfcodetrack.model.UserService"</span> <span style="color: #000066;">singleton</span>=<span style="color: #ff0000;">"true"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;property</span> <span style="color: #000066;">name</span>=<span style="color: #ff0000;">"userGateway"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
			<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;ref</span> <span style="color: #000066;">bean</span>=<span style="color: #ff0000;">"userGateway"</span><span style="color: #000000; font-weight: bold;">&gt;</span></span>
		<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/ref<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
	<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/property<span style="color: #000000; font-weight: bold;">&gt;</span></span></span>
<span style="color: #009900;"><span style="color: #000000; font-weight: bold;">&lt;/bean<span style="color: #000000; font-weight: bold;">&gt;</span></span></span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://www.adamfortuna.com/2006/10/30/4-fun-uses-of-model-glue/