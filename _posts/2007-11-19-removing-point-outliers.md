---
title: Removing Point Outliers
author: rupert
layout: post
permalink: /2007/11/removing-point-outliers/
aktt_tweeted:
  - 1
categories:
  - python
tags:
  - python
---
<p>In my previous post to remove point outliers, I tried using <a href="/wordpress/?p=121">R and PLR in PostGres</a>. Although, I only <a href="http://www.bostongis.com/?content_name=postgresql_plr_tut01#87">scratched the surface on the spatial analyzing capabilities of R</a>, I needed something more extensible for my internet purposes.  I decided to use Python&#8217;s pragmatic benefits and ease in programming.  Idea was to pull out the vector points from PostGIS, process it using an algorithm (ideally minimum convex hull but it could be expensive later on) and then remove the outliers.</p>
<p><a href="http://www.scipy.org/Cookbook">Numpy</a>, a scientific python library, blends easily by using basic functions for mathematical array computations such as mean, median, standard deviation and variance.  For now, the algorithm takes a 90% threshold, taken from <a href="http://www.uoregon.edu/~robinh/outl.txt">&#8220;Dealing with &#8216;Outliers': Maintain Your Data&#8217;s Integrity&#8221;</a></p>
<blockquote>

<div class="wp_syntax"><table><tr><td class="code"><pre class="text" style="font-family:monospace;">Consider this collection of 10 scores, sorted from smallest to largest:
&nbsp;
  x    8 25 35 41 50   75 75 79 92 129
                     ^
The median of these 10 values of x is 62.5, computed as (75+50)/2.
&nbsp;
Next, calculate the absolute value of the deviation of original data from median:
&nbsp;
   x     med  abs_dev
&nbsp;
  50    62.5    12.5
  75    62.5    12.5
  75    62.5    12.5
  79    62.5    16.5
  41    62.5    21.5 -&amp;gt;|
  35    62.5    27.5 -&amp;gt;|  MEDIAN(abs_dev) = 24.5 = (21.5+27.5)/2
  92    62.5    29.5
  25    62.5    37.5
   8    62.5    54.5
 129    62.5    66.5
&nbsp;
Next, compute a test statistic which is the column of absolute values computed above, divided by the mediate of the absolute values:
&nbsp;
Test Stat = abs_dev / (Med of abs Dev)
&nbsp;
                           Med of       Test
  x    Median  abs_dev    abs dev    Statistic  Outlier?   
&nbsp;
  8     62.5     54.5       24.5      2.22449
 25     62.5     37.5       24.5      1.53061
 35     62.5     27.5       24.5      1.12245
 41     62.5     21.5       24.5      0.87755
 50     62.5     12.5       24.5      0.51020
 75     62.5     12.5       24.5      0.51020
 75     62.5     12.5       24.5      0.51020
 79     62.5     16.5       24.5      0.67347
 92     62.5     29.5       24.5      1.20408
129     62.5     66.5       24.5      2.71429       Yes
&nbsp;
The decision rule then is to compare this test statistic with an arbitrary cutoff point. A cutoff of 2.5 is conservative; 4.5 or 5 is more rigorous. If the Test Statistic &amp;gt; Critical value (=2.5), then define the observed value as an outlier. According to this cutoff value, the data above have one outlier (x=129).</pre></td></tr></table></div>

</blockquote>
<p>Implementing this in Python&#8230;</p>
<p>P = 116.32977 39.905319,116.329906 39.90464,116.329907 39.90464,116.329918 39.904675,116.330047 39.904683</p>

<div class="wp_syntax"><table><tr><td class="code"><pre class="python" style="font-family:monospace;">    multipoints <span style="color: #66cc66;">=</span> getPointsString<span style="color: black;">&#40;</span><span style="color: black;">&#41;</span>
    <span style="color: #ff7700;font-weight:bold;">print</span> multipoints
&nbsp;
    pobj <span style="color: #66cc66;">=</span> getPointArray<span style="color: black;">&#40;</span>multipoints<span style="color: black;">&#41;</span>
    p <span style="color: #66cc66;">=</span> pobj.<span style="color: black;">p</span><span style="color: #66cc66;">;</span>
    x <span style="color: #66cc66;">=</span> pobj.<span style="color: black;">x</span><span style="color: #66cc66;">;</span>
    y <span style="color: #66cc66;">=</span> pobj.<span style="color: black;">y</span><span style="color: #66cc66;">;</span>
&nbsp;
    <span style="color: #808080; font-style: italic;">#print &quot;Median:&quot;,  median(p)</span>
    <span style="color: #808080; font-style: italic;">#print &quot;Std:&quot;,  p.std(axis=0)</span>
    <span style="color: #808080; font-style: italic;">#print &quot;Min:&quot;, p.min(axis=0)</span>
    <span style="color: #808080; font-style: italic;">#print &quot;Max:&quot;, p.max(axis=0)</span>
&nbsp;
    pmed <span style="color: #66cc66;">=</span> median<span style="color: black;">&#40;</span>p<span style="color: black;">&#41;</span>
    pdev <span style="color: #66cc66;">=</span> p - pmed
    pdev_abs <span style="color: #66cc66;">=</span> <span style="color: #008000;">abs</span><span style="color: black;">&#40;</span>pdev<span style="color: black;">&#41;</span>
    med_pdev <span style="color: #66cc66;">=</span> median<span style="color: black;">&#40;</span> pdev_abs <span style="color: black;">&#41;</span>
    pfinal <span style="color: #66cc66;">=</span> pdev_abs / med_pdev</pre></td></tr></table></div>

<p>Where getPointsString() = &#8220;116.32977 39.905319,116.329906 39.90464,116.329907 39.90464,116.329918 39.904675,116.330047 39.904683..&#8221; a list of point geometries. We can easily get the median, std, and even minimum (min) and maximum (max) values in the array.</p>
<p><a href="http://www.gisnotes.com/images/2007/11/2007-11-19_102428.png" title="2007-11-19_102428.png"><img src="http://www.gisnotes.com/images/2007/11/2007-11-19_102428.png" alt="2007-11-19_102428.png" /></a></p>
<p>Here the original dots are marked as red, while the final dots after removing the outliers were colored as green.</p>
