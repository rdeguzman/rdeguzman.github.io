---
title: 'DataGrid: Selecting a single row from a cell'
author: rupert
layout: post
permalink: /2006/09/datagrid-selecting-a-single-row-from-a-cell/
categories:
  - pocketpc
tags:
  - winmo
---
This would select the whole row after selecting the cell

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="csharp" style="font-family:monospace;"><span style="color: #0600FF; font-weight: bold;">private</span> <span style="color: #6666cc; font-weight: bold;">void</span> dataGrid1_MouseUp<span style="color: #008000;">&#40;</span><span style="color: #6666cc; font-weight: bold;">object</span> sender, <span style="color: #000000;">System</span><span style="color: #008000;">.</span><span style="color: #0000FF;">Windows</span><span style="color: #008000;">.</span><span style="color: #0000FF;">Forms</span><span style="color: #008000;">.</span><span style="color: #0000FF;">MouseEventArgs</span> e<span style="color: #008000;">&#41;</span>
<span style="color: #008000;">&#123;</span>
    DataGrid<span style="color: #008000;">.</span><span style="color: #0000FF;">HitTestInfo</span> hti <span style="color: #008000;">=</span> dataGrid1<span style="color: #008000;">.</span><span style="color: #0000FF;">HitTest</span><span style="color: #008000;">&#40;</span>e<span style="color: #008000;">.</span><span style="color: #0000FF;">X</span>, e<span style="color: #008000;">.</span><span style="color: #0000FF;">Y</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
    <span style="color: #0600FF; font-weight: bold;">if</span> <span style="color: #008000;">&#40;</span>hti<span style="color: #008000;">.</span><span style="color: #0000FF;">Type</span> <span style="color: #008000;">==</span> DataGrid<span style="color: #008000;">.</span><span style="color: #0000FF;">HitTestType</span><span style="color: #008000;">.</span><span style="color: #0000FF;">Cell</span><span style="color: #008000;">&#41;</span>
    <span style="color: #008000;">&#123;</span>
        dataGrid1<span style="color: #008000;">.</span><span style="color: #0000FF;">CurrentCell</span> <span style="color: #008000;">=</span> <span style="color: #008000;">new</span> DataGridCell<span style="color: #008000;">&#40;</span>hti<span style="color: #008000;">.</span><span style="color: #0000FF;">Row</span>, hti<span style="color: #008000;">.</span><span style="color: #0000FF;">Column</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
        dataGrid1<span style="color: #008000;">.</span><span style="color: #0600FF; font-weight: bold;">Select</span><span style="color: #008000;">&#40;</span>hti<span style="color: #008000;">.</span><span style="color: #0000FF;">Row</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
        POI temp <span style="color: #008000;">=</span> arrayListPOI<span style="color: #008000;">&#91;</span>dataGrid1<span style="color: #008000;">.</span><span style="color: #0000FF;">CurrentRowIndex</span><span style="color: #008000;">&#93;</span> <span style="color: #0600FF; font-weight: bold;">as</span> POI<span style="color: #008000;">;</span>
        FormPOI f <span style="color: #008000;">=</span> <span style="color: #008000;">new</span> FormPOI<span style="color: #008000;">&#40;</span>temp<span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
        f<span style="color: #008000;">.</span><span style="color: #0000FF;">ShowDialog</span><span style="color: #008000;">&#40;</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
        <span style="color: #008080; font-style: italic;">//MessageBox.Show("RowIndex is: " + dataGrid1.CurrentRowIndex + " POIID: " + temp.poi_id);</span>
    <span style="color: #008000;">&#125;</span>
<span style="color: #008000;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>