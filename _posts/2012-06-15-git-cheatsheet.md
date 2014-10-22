---
title: git cheatsheet
author: rupert
layout: post
permalink: /2012/06/git-cheatsheet/
categories:
  - git
tags:
  - cheatsheet
  - git
  - scm
---
**\# git init**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># git init
Initialized empty Git repository in /Users/rupert/projects</pre>
      </td>
    </tr>
  </table>
</div>

**\# git status**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD &lt;file&gt;..." to unstage)
#
#       new file:   file2
#</pre>
      </td>
    </tr>
  </table>
</div>

**\# git commit**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># git commit -m "Added support on something" spec/requests/status_spec.rb
[master 7651ed1] typo on route
 1 files changed, 2 insertions(+), 2 deletions(-)</pre>
      </td>
    </tr>
  </table>
</div>

**\# git push**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># git push =&gt; defaults to git push origin master
# git push origin master
# git push origin branch_name =&gt; pushes branch_name to remote
# git push origin --delete branch_name =&gt; deletes branch_name in remote
# git push --tags =&gt; pushes tags to remote</pre>
      </td>
    </tr>
  </table>
</div>

**\# git pull**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># git pull
# git pull . branch_name</pre>
      </td>
    </tr>
  </table>
</div>

**\# git branch**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># git branch -a =&gt; lists all branches in local and remote
  experimental
* master
  remotes/origin/HEAD -&gt; origin/master
  remotes/origin/experimental
  remotes/origin/master
# git branch new_branch =&gt; creates new_branch locally
# git branch -D new_branch =&gt; deletes the new_branch locally. To delete remotely see git push</pre>
      </td>
    </tr>
  </table>
</div>

**\# git checkout or git co**

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="terminal" style="font-family:monospace;"># git checkout experimental
Switched to branch 'experimental'</pre>
      </td>
    </tr>
  </table>
</div>

Ref: <http://cheat.errtheblog.com/s/git>