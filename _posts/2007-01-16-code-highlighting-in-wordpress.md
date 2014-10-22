---
title: 'WordPress Plugins: CodeHighlight and DBBackup'
author: rupert
layout: post
permalink: /2007/01/code-highlighting-in-wordpress/
categories:
  - WordPress
tags:
  - WordPress
---
1. I am currently using [dean lee code highlighting][1] for wordpress. Code is as follows:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="php" style="font-family:monospace;"><span style="color: #b1b100;">echo</span> <span style="color: #0000ff;">"hello world"</span><span style="color: #339933;">;</span>
?<span style="color: #339933;">&</span>gt<span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

To edit the code-highlight options go to: OPTIONS > Code Highlight

2. Download [WP-DBManager][2]. Extract it in the wp plugins directory and your good to go. Options for configuring can be found in &#8220;DATABASE&#8221; link in the Admin Site. Remember to change the Database options as follows:

for windows:  
`<br />
Path To mysqldump: mysqldump.exe<br />
Path To mysql: mysql.exe<br />
Path To Backup: E:\\wwwroot\wordpress\wp-content\backup-db<br />
`

for linux:  
`<br />
Path To mysqldump: mysqldump<br />
Path To mysql: mysql<br />
Path To Backup: /usr/local/apache2/htdocs/wordpress/wp-content/backup-db<br />
`

 [1]: http://www.deanlee.cn/wordpress/code_highlighter_plugin_for_wordpress/
 [2]: http://www.lesterchan.net/portfolio/programming.php