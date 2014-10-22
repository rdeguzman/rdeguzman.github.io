---
title: Writing CFCs using UML with Poseidon
author: rupert
layout: post
permalink: /2007/02/writing-cfcs-using-uml-with-poseidon/
categories:
  - coldfusion
tags:
  - cf
  - coldfusion
  - uml
---
It seems the xmi2cfc tool from cfcxmi.tigris.org works only for Poseidon 2.x versions. The visio works well and poseidon can export the xmi as well but I still encounter problems during the xmi to cfc conversion.

I just bought a 1GB ram for my notebook since Poseidon peaks at 200MB. How to create cfc&#8217;s with Poseidon?

1. Download and install Poseidon. Im using Poseidon 5 Professional.  
2. Download the poseidon custom templates from <http://cfcxmi.tigris.org/>.  
3. Extract it to Poseidon/lib/. You should have the ff directories:

Poseidon/  
lib/  
custom/

4. Start poseidon  
5. Click on &#8220;Generation&#8221; -> &#8220;Java&#8221;  
6. Click on the ellipses tool and point to the custom templates.  
7. &#8220;Apply&#8221; the settings.  
8. Create your class  
9. Click on the source code to view your cfc.

I have made some changes to the templates to reflect the output=&#8221;false&#8221; and required=&#8221;true&#8221;. You can download the templates from [here][1].

 [1]: /wordpress/images/custom.zip