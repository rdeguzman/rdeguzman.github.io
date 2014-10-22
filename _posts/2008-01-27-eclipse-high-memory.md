---
title: Eclipse High Memory
author: rupert
layout: post
permalink: /2008/01/eclipse-high-memory/
categories:
  - eclipse
tags:
  - eclipse
---
Awkward title, but I figure it would be easier for Google to crawl and index such keywords. Anyhow, I&#8217;ve been using Eclipse consistently for ColdFusion (CFEclipse) for the past 6 months now. The IDE&#8217;s features is really comprehensive and fit my needs, however, it is eating up 500 MB of memory. Though memory maybe cheap nowadays (I have 2 GB), it has been slowing down my productivity because of intermittent hangups and jvm pauses.

I realized that I am loading a lot of plugins for Eclipse, myEclipse, SVN (I preferred to use tortoiseSVN natively&#8230;), UML Diagram plugins, Visual Editor (for creating Swing components). So I disabled and uninstalled some of them from

1. HELP -> Software Updates -> Manage Configurations.  
2. Right click on the plugin of choice.  
3. Disable or uninstall.  
4. You will be prompted to restart Eclipse. If an error fails, then a dependency is met, so be sure to disable/uninstall the dependency first.

Woot! From a whopping 500 MB, my Eclipse is now running at 87 MB. Afterwards, I jogged for two hours on the basement and went back to check, still 87 MB. Well obviously, it should be consistent since I didn&#8217;t do any interactions with it. Nevertheless, I am a happy Eclipse user once again!