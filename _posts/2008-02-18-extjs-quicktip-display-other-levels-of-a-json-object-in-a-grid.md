---
title: 'ExtJS QuickTip: Display other levels of a JSON object in a Grid'
author: rupert
layout: post
permalink: /2008/02/extjs-quicktip-display-other-levels-of-a-json-object-in-a-grid/
categories:
  - ExtJS
  - GeoJSON
  - javascript
tags:
  - ExtJS
---
You can display an item anywhere in a JSON heirarchy/level in a Grid by using **dot notation**. I am beginning to like JSON as it is simply practical and amazing. To fully understand, please see *geometry.type* as an example.<!--more-->

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;"><span style="color: #009900;">&#123;</span> <span style="color: #3366CC;">"type"</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">"FeatureCollection"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"recordcount"</span><span style="color: #339933;">:</span><span style="color: #CC0000;">6</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"features"</span><span style="color: #339933;">:</span> <span style="color: #009900;">&#91;</span> <span style="color: #009900;">&#123;</span> <span style="color: #3366CC;">"type"</span><span style="color: #339933;">:</span><span style="color: #3366CC;">"Feature"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"geometry"</span><span style="color: #339933;">:</span><span style="color: #009900;">&#123;</span> <span style="color: #3366CC;">"type"</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">"MULTIPOLYGON"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"coordinates"</span><span style="color: #339933;">:</span> <span style="color: #009900;">&#91;</span><span style="color: #009900;">&#91;</span><span style="color: #009900;">&#91;</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.368603</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.944314</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.381069</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.94464</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.388765</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.940265</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.390376</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.939124</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.391203</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.934381</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.391784</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.930743</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.387262</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.930638</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.387507</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.93289</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.383032</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.932688</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.382581</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.933204</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.37197</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.940531</span><span style="color: #009900;">&#93;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#91;</span><span style="color: #CC0000;">116.368603</span><span style="color: #339933;">,</span><span style="color: #CC0000;">39.944314</span><span style="color: #009900;">&#93;</span><span style="color: #009900;">&#93;</span><span style="color: #009900;">&#93;</span><span style="color: #009900;">&#93;</span> <span style="color: #009900;">&#125;</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"gid"</span><span style="color: #339933;">:</span><span style="color: #CC0000;">16055</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"cn_name"</span><span style="color: #339933;">:</span><span style="color: #3366CC;">"后海"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"py_name"</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">"hou hai"</span> <span style="color: #009900;">&#125;</span> <span style="color: #339933;">,</span> <span style="color: #009900;">&#123;</span> <span style="color: #3366CC;">"type"</span><span style="color: #339933;">:</span><span style="color: #3366CC;">"Feature"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"geometry"</span><span style="color: #339933;">:</span><span style="color: #009900;">&#123;</span> <span style="color: #3366CC;">"type"</span><span style="color: #339933;">:</span> <span style="color: #3366CC;">"MULTIPOLYGON"</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">"coordinates"</span><span style="color: #339933;">:</span> ....<span style="color: #009900;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>

Here is the DataStore&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">cs.<span style="color: #660066;">GridPlace</span> <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
    <span style="color: #000066; font-weight: bold;">var</span> _placeDataStore <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> Ext.<span style="color: #660066;">data</span>.<span style="color: #660066;">Store</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#123;</span>
        <span style="color: #006600; font-style: italic;">// create reader that reads the Topic records</span>
        reader<span style="color: #339933;">:</span> <span style="color: #000066; font-weight: bold;">new</span> Ext.<span style="color: #660066;">data</span>.<span style="color: #660066;">JsonReader</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#123;</span>
            root<span style="color: #339933;">:</span> <span style="color: #3366CC;">'features'</span><span style="color: #339933;">,</span>
            totalProperty<span style="color: #339933;">:</span> <span style="color: #3366CC;">'recordcount'</span><span style="color: #339933;">,</span>
            id<span style="color: #339933;">:</span> <span style="color: #3366CC;">'gid'</span><span style="color: #339933;">,</span>
            fields<span style="color: #339933;">:</span> <span style="color: #009900;">&#91;</span>
                <span style="color: #3366CC;">'cn_name'</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">'py_name'</span><span style="color: #339933;">,</span> <span style="color: #3366CC;">'geometry.type'</span>
            <span style="color: #009900;">&#93;</span>
        <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span>
    <span style="color: #009900;">&#125;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
    <span style="color: #006600; font-style: italic;">// the column model has information about grid columns</span>
    <span style="color: #006600; font-style: italic;">// dataIndex maps the column to the specific data field in</span>
    <span style="color: #006600; font-style: italic;">// the data store</span>
    <span style="color: #000066; font-weight: bold;">var</span> cm <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">new</span> Ext.<span style="color: #660066;">grid</span>.<span style="color: #660066;">ColumnModel</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#91;</span><span style="color: #009900;">&#123;</span>
           id<span style="color: #339933;">:</span> <span style="color: #3366CC;">'gid'</span><span style="color: #339933;">,</span> <span style="color: #006600; font-style: italic;">// id assigned so we can apply custom css (e.g. .x-grid-col-topic b { color:#333 })</span>
           header<span style="color: #339933;">:</span> <span style="color: #3366CC;">"CN_NAME"</span><span style="color: #339933;">,</span>
           width<span style="color: #339933;">:</span> <span style="color: #CC0000;">100</span><span style="color: #339933;">,</span>
           dataIndex<span style="color: #339933;">:</span> <span style="color: #3366CC;">'cn_name'</span>
        <span style="color: #009900;">&#125;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#123;</span>
           id<span style="color: #339933;">:</span> <span style="color: #3366CC;">'gid'</span><span style="color: #339933;">,</span> <span style="color: #006600; font-style: italic;">// id assigned so we can apply custom css (e.g. .x-grid-col-topic b { color:#333 })</span>
           header<span style="color: #339933;">:</span> <span style="color: #3366CC;">"PY_NAME"</span><span style="color: #339933;">,</span>
           width<span style="color: #339933;">:</span> <span style="color: #CC0000;">100</span><span style="color: #339933;">,</span>
           dataIndex<span style="color: #339933;">:</span> <span style="color: #3366CC;">'py_name'</span>
        <span style="color: #009900;">&#125;</span><span style="color: #339933;">,</span><span style="color: #009900;">&#123;</span>
           id<span style="color: #339933;">:</span> <span style="color: #3366CC;">'gid'</span><span style="color: #339933;">,</span> <span style="color: #006600; font-style: italic;">// id assigned so we can apply custom css (e.g. .x-grid-col-topic b { color:#333 })</span>
           header<span style="color: #339933;">:</span> <span style="color: #3366CC;">"GEOMTYPE"</span><span style="color: #339933;">,</span>
           width<span style="color: #339933;">:</span> <span style="color: #CC0000;">100</span><span style="color: #339933;">,</span>
           dataIndex<span style="color: #339933;">:</span> <span style="color: #3366CC;">'geometry.type'</span>
        <span style="color: #009900;">&#125;</span>
    <span style="color: #009900;">&#93;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>