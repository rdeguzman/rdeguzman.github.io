---
title: CVS cheatsheet
author: rupert
layout: post
permalink: /2012/01/cvs-cheatsheet/
categories:
  - cvs
  - scm
tags:
  - cvs
---
References: <http://ximbiot.com/cvs/manual/>

**Checkout a branch**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># cvs co -r ncmpg ncm
# mv ncm ncmpg</pre>
      </td>
    </tr>
  </table>
</div>

**Remove Empty Directories.** This will (-P) prune directories (-R) recursively and remove them

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;">cvs update -P -R</pre>
      </td>
    </tr>
  </table>
</div>

**Show list of file names that are locally changed**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># cvs -Q status | grep -i locally
File: foo.cpp      	Status: Locally Modified</pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># cvs -qn update
? run.sh
cvs update: warning: .cvsignore was lost
M foo.cpp</pre>
      </td>
    </tr>
  </table>
</div>

**File belongs to which branch**  
When you start using branches, things called sticky tags will start being attached to your files. You can see them with the cvs status command.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># cvs status include/DI.h
===================================================================
File: DI.h             	Status: Locally Modified
&nbsp;
   Working revision:	1.43.2.2
   Repository revision:	1.43.2.2	/cvs/datalink/src/app/ncm/include/DI.h,v
   Sticky Tag:		ncmpg (branch: 1.43.2)
   Sticky Date:		(none)
   Sticky Options:	(none)</pre>
      </td>
    </tr>
  </table>
</div>

**Changes between local and HEAD**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># cvs diff -r HEAD include/DI.h
Index: include/DI.h
===================================================================
RCS file: /cvs/datalink/src/app/ncm/include/DI.h,v
retrieving revision 1.45
retrieving revision 1.44
diff -r1.45 -r1.44
24c24
&lt;   * $Revision: 1.45 $
---
&gt;   * $Revision: 1.44 $
27c27
&lt;   * $Date: 2012/05/22 21:41:37 $
---
&gt;   * $Date: 2012/02/06 01:20:14 $
392c392
&lt;   bool textMessage(AM &am, uint32_t address, int connId, addrList* sendList);
---
&gt;   void textMessage(AM &am, uint32_t address, int connId);</pre>
      </td>
    </tr>
  </table>
</div>