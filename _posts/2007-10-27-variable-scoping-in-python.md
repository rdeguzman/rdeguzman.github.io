---
title: Variable scoping in Python
author: rupert
layout: post
permalink: /2007/10/variable-scoping-in-python/
categories:
  - python
tags:
  - python
---
In python, variables defined in a function is only local to that function.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="python" style="font-family:monospace;"><span style="color: #ff7700;font-weight:bold;">def</span> myfunct<span style="color: black;">&#40;</span><span style="color: black;">&#41;</span>:
    i <span style="color: #66cc66;">=</span> <span style="color: #ff4500;">1</span>
    <span style="color: #ff7700;font-weight:bold;">return</span> <span style="color: #483d8b;">"Hello World"</span>
&nbsp;
i <span style="color: #66cc66;">=</span> <span style="color: #ff4500;"></span>
<span style="color: #ff7700;font-weight:bold;">print</span> myfunct<span style="color: black;">&#40;</span><span style="color: black;">&#41;</span>
<span style="color: #ff7700;font-weight:bold;">print</span> i</pre>
      </td>
    </tr>
  </table>
</div>

When you run the code above, it would spit out:  
`<br />
>>><br />
Hello<br />
0<br />
>>><br />
`

In order to manipulate a variable within the function defined in main, we need to use &#8216;*global*&#8216;.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="python" style="font-family:monospace;"><span style="color: #ff7700;font-weight:bold;">def</span> myfunct<span style="color: black;">&#40;</span><span style="color: black;">&#41;</span>:
    <span style="color: #ff7700;font-weight:bold;">global</span> i
    i <span style="color: #66cc66;">=</span> <span style="color: #ff4500;">1</span>
    <span style="color: #ff7700;font-weight:bold;">return</span> <span style="color: #483d8b;">"Hello World"</span>
&nbsp;
i <span style="color: #66cc66;">=</span> <span style="color: #ff4500;"></span>
<span style="color: #ff7700;font-weight:bold;">print</span> myfunct<span style="color: black;">&#40;</span><span style="color: black;">&#41;</span>
<span style="color: #ff7700;font-weight:bold;">print</span> i</pre>
      </td>
    </tr>
  </table>
</div>

When you run the code above, it would spit out:  
`<br />
>>><br />
Hello<br />
1<br />
>>><br />
`