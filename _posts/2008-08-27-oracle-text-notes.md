---
title: Oracle Text Notes
author: rupert
layout: post
permalink: /2008/08/oracle-text-notes/
aktt_tweeted:
  - 1
categories:
  - oracle
tags:
  - oracle
---
Just a couple of notes from studying Oracle Text&#8230; 

1. What is the default index?  
Its CONTEXT. The text column can be of type CLOB, BLOB, BFILE, VARCHAR2, or CHAR.

CREATE INDEX idx\_ft\_meta\_en\_name ON poi\_app(ft\_meta\_en\_name) INDEXTYPE IS CTXSYS.CONTEXT;

2. When you perform inserts or updates on the base table, you must explicitly synchronize the index with CTX\_DDL.SYNC\_INDEX.

SQL> EXEC CTX\_DDL.SYNC\_INDEX(&#8216;idx_docs&#8217;, &#8216;2M&#8217;);

3. CONTAINS Phrase Queries

If multiple words are contained in a query expression, separated only by blank spaces (no operators), the string of words is considered a phrase and Oracle Text searches for the entire string during a query.

4. Logical Operators  
<img src="/images/2008/08/picture-13.png" alt="Picture 1.png" border="0" width="518" height="512" />

5. Some sample SQL queries:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #808080; font-style: italic;">-- Simple Query</span>
<span style="color: #993333; font-weight: bold;">SELECT</span> SCORE<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">AS</span> myscore<span style="color: #66cc66;">,</span> en_name<span style="color: #66cc66;">,</span> en_visname<span style="color: #66cc66;">,</span> py_name <span style="color: #993333; font-weight: bold;">FROM</span> poi_app <span style="color: #993333; font-weight: bold;">WHERE</span> CONTAINS<span style="color: #66cc66;">&#40;</span>ft_meta_en_name<span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'grammy center'</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">&gt;</span> <span style="color: #cc66cc;"></span> <span style="color: #993333; font-weight: bold;">ORDER</span> <span style="color: #993333; font-weight: bold;">BY</span> myscore <span style="color: #993333; font-weight: bold;">DESC</span>;
&nbsp;
<span style="color: #993333; font-weight: bold;">SELECT</span> SCORE<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">AS</span> myscore<span style="color: #66cc66;">,</span> en_name<span style="color: #66cc66;">,</span> en_visname<span style="color: #66cc66;">,</span> py_name <span style="color: #993333; font-weight: bold;">FROM</span> poi_app <span style="color: #993333; font-weight: bold;">WHERE</span> CONTAINS<span style="color: #66cc66;">&#40;</span>ft_meta_en_name<span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'cybersoft'</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">&gt;</span> <span style="color: #cc66cc;"></span>;
&nbsp;
<span style="color: #808080; font-style: italic;">-- Query Rewrite</span>
<span style="color: #993333; font-weight: bold;">SELECT</span> en_name<span style="color: #66cc66;">,</span> en_visname<span style="color: #66cc66;">,</span> py_name
<span style="color: #993333; font-weight: bold;">FROM</span> poi_app
<span style="color: #993333; font-weight: bold;">WHERE</span> CONTAINS <span style="color: #66cc66;">&#40;</span>ft_meta_en_name<span style="color: #66cc66;">,</span>
<span style="color: #ff0000;">'&lt;query&gt;
&lt;textquery lang="ENGLISH" grammar="CONTEXT"&gt; international hotel boya
&lt;progression&gt;
&lt;seq&gt;&lt;rewrite&gt;transform((TOKENS, "{", "}", "AND"))&lt;/rewrite&gt;&lt;/seq&gt;
&lt;seq&gt;&lt;rewrite&gt;transform((TOKENS, "{", "}", "ACCUM"))&lt;/rewrite&gt;&lt;/seq&gt;
&lt;/progression&gt;
&lt;/textquery&gt;
&lt;score datatype="INTEGER" algorithm="COUNT"/&gt;
&lt;/query&gt;'</span><span style="color: #66cc66;">&#41;</span><span style="color: #66cc66;">&gt;</span><span style="color: #cc66cc;"></span>;
&nbsp;
<span style="color: #808080; font-style: italic;">-- Query 'About'</span>
<span style="color: #993333; font-weight: bold;">SELECT</span> en_name<span style="color: #66cc66;">,</span> en_visname<span style="color: #66cc66;">,</span> py_name<span style="color: #66cc66;">,</span> score<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span>
<span style="color: #993333; font-weight: bold;">FROM</span> poi_app
<span style="color: #993333; font-weight: bold;">WHERE</span> CONTAINS<span style="color: #66cc66;">&#40;</span>ft_meta_en_name<span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'about(italian restaurants)'</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">&gt;</span> <span style="color: #cc66cc;"></span>
<span style="color: #993333; font-weight: bold;">ORDER</span> <span style="color: #993333; font-weight: bold;">BY</span> SCORE<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">DESC</span>;
&nbsp;
<span style="color: #808080; font-style: italic;">-- Query logical</span>
<span style="color: #993333; font-weight: bold;">SELECT</span> en_name<span style="color: #66cc66;">,</span> en_visname<span style="color: #66cc66;">,</span> py_name<span style="color: #66cc66;">,</span> score<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span>
<span style="color: #993333; font-weight: bold;">FROM</span> poi_app
<span style="color: #993333; font-weight: bold;">WHERE</span> CONTAINS<span style="color: #66cc66;">&#40;</span>ft_meta_en_name<span style="color: #66cc66;">,</span> <span style="color: #ff0000;">'beijing, international, hotel'</span><span style="color: #66cc66;">,</span> <span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span> <span style="color: #66cc66;">&gt;</span> <span style="color: #cc66cc;"></span>
<span style="color: #993333; font-weight: bold;">ORDER</span> <span style="color: #993333; font-weight: bold;">BY</span> SCORE<span style="color: #66cc66;">&#40;</span><span style="color: #cc66cc;">1</span><span style="color: #66cc66;">&#41;</span> <span style="color: #993333; font-weight: bold;">DESC</span>;</pre>
      </td>
    </tr>
  </table>
</div>