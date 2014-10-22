---
title: Java Thread MySQL Error
author: rupert
layout: post
permalink: /2007/05/java-thread-mysql-error/
categories:
  - java
tags:
  - java
  - mysql
---
My java thread bails on me after a few hours. I get the ff errors from my log4j. Anyway, I tried upgrading the mysql-java-connector to mysql-connector-java-5.0.5-bin.jar. And added &#8220;autoreconnect=true&#8221; in the url string&#8230; *url=jdbc:mysql://127.0.0.1:3306/cncphs?autoreconnect=true*.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="java" style="font-family:monospace;">   <span style="color: #cc66cc;">1086</span> java.<span style="color: #006633;">io</span>.<span style="color: #003399;">EOFException</span>
   <span style="color: #cc66cc;">1087</span>
   <span style="color: #cc66cc;">1088</span> STACKTRACE<span style="color: #339933;">:</span>
   <span style="color: #cc66cc;">1089</span>
   <span style="color: #cc66cc;">1090</span> java.<span style="color: #006633;">io</span>.<span style="color: #003399;">EOFException</span>
   <span style="color: #cc66cc;">1091</span>     at com.<span style="color: #006633;">mysql</span>.<span style="color: #006633;">jdbc</span>.<span style="color: #006633;">MysqlIO</span>.<span style="color: #006633;">readFully</span><span style="color: #009900;">&#40;</span>MysqlIO.<span style="color: #006633;">java</span><span style="color: #339933;">:</span><span style="color: #cc66cc;">1895</span><span style="color: #009900;">&#41;</span>
   <span style="color: #cc66cc;">1092</span>     at com.<span style="color: #006633;">mysql</span>.<span style="color: #006633;">jdbc</span>.<span style="color: #006633;">MysqlIO</span>.<span style="color: #006633;">reuseAndReadPacket</span><span style="color: #009900;">&#40;</span>MysqlIO.<span style="color: #006633;">java</span><span style="color: #339933;">:</span><span style="color: #cc66cc;">2342</span><span style="color: #009900;">&#41;</span>
   <span style="color: #cc66cc;">1093</span>     at com.<span style="color: #006633;">mysql</span>.<span style="color: #006633;">jdbc</span>.<span style="color: #006633;">MysqlIO</span>.<span style="color: #006633;">checkErrorPacket</span><span style="color: #009900;">&#40;</span>MysqlIO.<span style="color: #006633;">java</span><span style="color: #339933;">:</span><span style="color: #cc66cc;">2838</span><span style="color: #009900;">&#41;</span>
   <span style="color: #cc66cc;">1094</span>     at com.<span style="color: #006633;">mysql</span>.<span style="color: #006633;">jdbc</span>.<span style="color: #006633;">MysqlIO</span>.<span style="color: #006633;">sendCommand</span><span style="color: #009900;">&#40;</span>MysqlIO.<span style="color: #006633;">java</span><span style="color: #339933;">:</span><span style="color: #cc66cc;">1584</span><span style="color: #009900;">&#41;</span>
   <span style="color: #cc66cc;">1095</span>     at com.<span style="color: #006633;">mysql</span>.<span style="color: #006633;">jdbc</span>.<span style="color: #006633;">MysqlIO</span>.<span style="color: #006633;">sqlQueryDirect</span><span style="color: #009900;">&#40;</span>MysqlIO.<span style="color: #006633;">java</span><span style="color: #339933;">:</span><span style="color: #cc66cc;">1675</span><span style="color: #009900;">&#41;</span>
   <span style="color: #cc66cc;">1096</span>     at com.<span style="color: #006633;">mysql</span>.<span style="color: #006633;">jdbc</span>.<span style="color: #003399;">Connection</span>.<span style="color: #006633;">execSQL</span><span style="color: #009900;">&#40;</span><span style="color: #003399;">Connection</span>.<span style="color: #006633;">java</span><span style="color: #339933;">:</span><span style="color: #cc66cc;">2295</span><span style="color: #009900;">&#41;</span>
   <span style="color: #cc66cc;">1097</span>     at com.<span style="color: #006633;">mysql</span>.<span style="color: #006633;">jdbc</span>.<span style="color: #003399;">Connection</span>.<span style="color: #006633;">execSQL</span><span style="color: #009900;">&#40;</span><span style="color: #003399;">Connection</span>.<span style="color: #006633;">java</span><span style="color: #339933;">:</span><span style="color: #cc66cc;">2228</span><span style="color: #009900;">&#41;</span>
   <span style="color: #cc66cc;">1098</span>     at com.<span style="color: #006633;">mysql</span>.<span style="color: #006633;">jdbc</span>.<span style="color: #003399;">Statement</span>.<span style="color: #006633;">executeQuery</span><span style="color: #009900;">&#40;</span><span style="color: #003399;">Statement</span>.<span style="color: #006633;">java</span><span style="color: #339933;">:</span><span style="color: #cc66cc;">1159</span><span style="color: #009900;">&#41;</span>
   <span style="color: #cc66cc;">1099</span>     at DBThread.<span style="color: #006633;">run</span><span style="color: #009900;">&#40;</span>DBThread.<span style="color: #006633;">java</span><span style="color: #339933;">:</span><span style="color: #cc66cc;">45</span><span style="color: #009900;">&#41;</span>
   <span style="color: #cc66cc;">1100</span></pre>
      </td>
    </tr>
  </table>
</div>