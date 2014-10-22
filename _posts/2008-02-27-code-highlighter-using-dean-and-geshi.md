---
title: Code Highlighter using Dean and Geshi
author: rupert
layout: post
permalink: /2008/02/code-highlighter-using-dean-and-geshi/
categories:
  - WordPress
tags:
  - WordPress
---
I have been using this [plugin][1] to highlight my code. Below is a list of all possible programming languages that geshi could parse.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">abap actionscript ada apache applescript asm asp autoit bash blitzbasic bnf caddcl cadlisp cfdg cfm c_mac c cpp cpp-qt csharp css-gen.cfg css delphi diff div dos dot d eiffel fortran freebasic genero gml groovy haskell html4strict idl ini inno io java5 java javascript latex lisp lua m68k matlab mirc mpasm mysql nsis objc ocaml-brief ocaml oobas oracle8 pascal perl per php-brief php plsql python qbasic rails reg robots ruby sas scheme sdlbasic smalltalk smarty sql tcl text thinbasic tsql vbnet vb vhdl visualfoxpro winbatch xml xpp z80</pre>
      </td>
    </tr>
  </table>
</div>

Alas, I was able to fix the single quotes problem with the code inside the tags from this [post][2]. I also added the &#8220;&&#8221; patch especially for my cfm codes.

[Download the patched version of Dean&#8217;s code highligter (deans\_code\_highlighter1.3.tar.gz)][3]

 [1]: http://www.deanlee.cn/wordpress/code_highlighter_plugin_for_wordpress/
 [2]: http://nevermore.pri.ee/2007/03/08/wordpress-deans-code-highlighter-fixing-single-quotes-inside-code-block/
 [3]: /rupert-downloads/deans_code_highlighter1.3.tar.gz