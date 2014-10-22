---
title: Binding an ArrayList to a DataGrid
author: rupert
layout: post
permalink: /2006/09/binding-an-arraylist-to-a-datagrid/
categories:
  - pocketpc
tags:
  - winmo
---
I need to populate a DataGrid from a CSV or FlatFile. I stumbbled upon George Sheperd&#8217;s Blog in binding an arraylist to a DataGrid instead.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="csharp" style="font-family:monospace;">       <span style="color: #0600FF; font-weight: bold;">public</span> <span style="color: #6666cc; font-weight: bold;">void</span> CreateArrayList<span style="color: #008000;">&#40;</span>Building<span style="color: #008000;">&#91;</span><span style="color: #008000;">&#93;</span> res<span style="color: #008000;">&#41;</span>
        <span style="color: #008000;">&#123;</span>
            arrayList <span style="color: #008000;">=</span> <span style="color: #008000;">new</span> ArrayList<span style="color: #008000;">&#40;</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
&nbsp;
            <span style="color: #0600FF; font-weight: bold;">foreach</span> <span style="color: #008000;">&#40;</span>Building mybldg <span style="color: #0600FF; font-weight: bold;">in</span> res<span style="color: #008000;">&#41;</span>
            <span style="color: #008000;">&#123;</span>
                arrayList<span style="color: #008000;">.</span><span style="color: #0600FF; font-weight: bold;">Add</span><span style="color: #008000;">&#40;</span>mybldg<span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
            <span style="color: #008000;">&#125;</span>
        <span style="color: #008000;">&#125;</span>
&nbsp;
        <span style="color: #0600FF; font-weight: bold;">public</span> <span style="color: #6666cc; font-weight: bold;">void</span> BindArrayListToDataGrid<span style="color: #008000;">&#40;</span><span style="color: #008000;">&#41;</span>
        <span style="color: #008000;">&#123;</span>
            dataGrid<span style="color: #008000;">.</span><span style="color: #0000FF;">DataSource</span> <span style="color: #008000;">=</span> arrayList<span style="color: #008000;">;</span>
&nbsp;
            <span style="color: #008080; font-style: italic;">//create a custom tablestyle and add five columnstyles</span>
            DataGridTableStyle ts <span style="color: #008000;">=</span> <span style="color: #008000;">new</span> DataGridTableStyle<span style="color: #008000;">&#40;</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
            ts<span style="color: #008000;">.</span><span style="color: #0000FF;">MappingName</span> <span style="color: #008000;">=</span> <span style="color: #666666;">"ArrayList"</span><span style="color: #008000;">;</span>
&nbsp;
            AddTextBoxColumnToGrid<span style="color: #008000;">&#40;</span>ts, <span style="color: #666666;">"bldg_id"</span>, <span style="color: #666666;">"id"</span>, <span style="color: #FF0000;">50</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
            AddTextBoxColumnToGrid<span style="color: #008000;">&#40;</span>ts, <span style="color: #666666;">"CN_bldg_name"</span>, <span style="color: #666666;">"Name (CN)"</span>, <span style="color: #FF0000;">50</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
            AddTextBoxColumnToGrid<span style="color: #008000;">&#40;</span>ts, <span style="color: #666666;">"EN_bldg_name"</span>, <span style="color: #666666;">"Name (EN)"</span>, <span style="color: #FF0000;">50</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
            AddTextBoxColumnToGrid<span style="color: #008000;">&#40;</span>ts, <span style="color: #666666;">"CN_address"</span>, <span style="color: #666666;">"Address (EN)"</span>, <span style="color: #FF0000;">50</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
            AddTextBoxColumnToGrid<span style="color: #008000;">&#40;</span>ts, <span style="color: #666666;">"EN_address"</span>, <span style="color: #666666;">"Address (CN)"</span>, <span style="color: #FF0000;">50</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
&nbsp;
            dataGrid<span style="color: #008000;">.</span><span style="color: #0000FF;">TableStyles</span><span style="color: #008000;">.</span><span style="color: #0000FF;">Clear</span><span style="color: #008000;">&#40;</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
            dataGrid<span style="color: #008000;">.</span><span style="color: #0000FF;">TableStyles</span><span style="color: #008000;">.</span><span style="color: #0600FF; font-weight: bold;">Add</span><span style="color: #008000;">&#40;</span>ts<span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
        <span style="color: #008000;">&#125;</span>
&nbsp;
        <span style="color: #0600FF; font-weight: bold;">private</span> <span style="color: #6666cc; font-weight: bold;">void</span> AddTextBoxColumnToGrid<span style="color: #008000;">&#40;</span>DataGridTableStyle tableStyle,
                                        <span style="color: #6666cc; font-weight: bold;">String</span> strMappingName,
                                        <span style="color: #6666cc; font-weight: bold;">String</span> strHeaderText,
                                        <span style="color: #6666cc; font-weight: bold;">int</span> width<span style="color: #008000;">&#41;</span>
        <span style="color: #008000;">&#123;</span>
            DataGridTextBoxColumn cs <span style="color: #008000;">=</span> <span style="color: #008000;">new</span> DataGridTextBoxColumn<span style="color: #008000;">&#40;</span><span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
            cs<span style="color: #008000;">.</span><span style="color: #0000FF;">MappingName</span> <span style="color: #008000;">=</span> strMappingName<span style="color: #008000;">;</span> <span style="color: #008080; font-style: italic;">//public property name</span>
            cs<span style="color: #008000;">.</span><span style="color: #0000FF;">HeaderText</span> <span style="color: #008000;">=</span> strHeaderText<span style="color: #008000;">;</span>
            cs<span style="color: #008000;">.</span><span style="color: #0000FF;">Width</span> <span style="color: #008000;">=</span> width<span style="color: #008000;">;</span>
            tableStyle<span style="color: #008000;">.</span><span style="color: #0000FF;">GridColumnStyles</span><span style="color: #008000;">.</span><span style="color: #0600FF; font-weight: bold;">Add</span><span style="color: #008000;">&#40;</span>cs<span style="color: #008000;">&#41;</span><span style="color: #008000;">;</span>
        <span style="color: #008000;">&#125;</span></pre>
      </td>
    </tr>
  </table>
</div>