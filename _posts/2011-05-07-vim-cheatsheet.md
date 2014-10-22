---
title: VIM cheatsheet
author: rupert
layout: post
permalink: /2011/05/vim-cheatsheet/
categories:
  - linux
tags:
  - linux
---
<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">set nocompatible
set nu
set expandtab
&nbsp;
"this will change tab to spaces
set ts=2 
set shiftwidth=2
set expandtab
&nbsp;
set hlsearch
syntax on
&nbsp;
"Use TAB to complete when typing words, else inserts TABs as usual.
"Uses dictionary and source files to find matching words to complete.
&nbsp;
"See help completion for source,
"Note: usual completion is on &lt;C-n&gt; but more trouble to press all the time.
"Never type the same word twice and maybe learn a new spellings!
"Use the Linux dictionary when spelling is in doubt.
"Window users can copy the file to their machine.
function! Tab_Or_Complete()
  if col('.')&gt;1 && strpart( getline('.'), col('.')-2, 3 ) =~ '^\w'
    return "\&lt;C-N&gt;"
  else 
    return "\&lt;Tab&gt;"
  endif
endfunction
:inoremap &lt;Tab&gt; &lt;C-R&gt;=Tab_Or_Complete()&lt;CR&gt;
:set dictionary="/usr/dict/words"
&nbsp;
set numberwidth=5
set cmdheight=2
"To map: imap ;f foobar =&gt; Type f; foobar will be inserted
&nbsp;
"RSPEC Where ! is execute command. % is the current file
":!rspec %
&nbsp;
"Map RSPEC test to ,t
":map ,t :w\|!rspec %&lt;cr&gt;</pre>
      </td>
    </tr>
  </table>
</div>