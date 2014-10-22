---
title: ExtJS Notes
author: rupert
layout: post
permalink: /2008/01/extjs-notes/
categories:
  - ExtJS
  - javascript
tags:
  - ExtJS
---
**1. How to test Ext from the extjs/docs?**  
`Ext.get(document.body).update(' `

&#8216;)

**2. Node cannot be inserted at the specified point in the hierarchy code: 3**  
**Answer:** Possible invalid nesting of id elements within a panel or div. Check if id is the same with contentEl in a panel. For example:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;"><span style="color: #006600; font-style: italic;">//in my javascript Layout.js</span>
<span style="color: #009900;">&#123;</span>
    id<span style="color: #339933;">:</span> <span style="color: #3366CC;">'pnlPOIList'</span><span style="color: #339933;">,</span> <span style="color: #006600; font-style: italic;">//should be renamed to foo-pnlPOIList just to distinguish it from pnlPOIList</span>
    region<span style="color: #339933;">:</span> <span style="color: #3366CC;">'west'</span><span style="color: #339933;">,</span>
    contentEl<span style="color: #339933;">:</span> <span style="color: #3366CC;">'pnlPOIList'</span><span style="color: #339933;">,</span>
    title<span style="color: #339933;">:</span> <span style="color: #3366CC;">'POIList'</span><span style="color: #339933;">,</span>
    width<span style="color: #339933;">:</span> <span style="color: #CC0000;">300</span><span style="color: #339933;">,</span>
    collapsible<span style="color: #339933;">:</span><span style="color: #003366; font-weight: bold;">true</span><span style="color: #339933;">,</span>
    floatable<span style="color: #339933;">:</span><span style="color: #003366; font-weight: bold;">false</span><span style="color: #339933;">,</span>
    autoScroll<span style="color: #339933;">:</span> <span style="color: #003366; font-weight: bold;">true</span>
<span style="color: #009900;">&#125;</span>
&nbsp;
<span style="color: #006600; font-style: italic;">//in my index.html</span>
<span style="color: #339933;">&lt;</span>p id<span style="color: #339933;">=</span><span style="color: #3366CC;">"east"</span><span style="color: #339933;">&gt;</span>
<span style="color: #339933;">&lt;/</span>p<span style="color: #339933;">&gt;&lt;</span>p id<span style="color: #339933;">=</span><span style="color: #3366CC;">"pnlMoreInformation"</span><span style="color: #339933;">&gt;&lt;</span>cfinclude template<span style="color: #339933;">=</span><span style="color: #3366CC;">"pnlMoreInformation.cfm"</span><span style="color: #339933;">&gt;&lt;/</span>cfinclude<span style="color: #339933;">&gt;&lt;/</span>p<span style="color: #339933;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

**3. A has no properties**  
*`Ext.Container=Ext.extend(Ext.BoxComponent,{autoDestroy:true,defaultType:"panel",...`*  
**Answer:**Check the object inside the definition of an Ext Component. It may be a different object.

**4. How to debug ext app on IE?**  
**Answer:** This should be a javascript post instead of Ext but I&#8217;m posting it anyway. When troubleshooting javascript in IE, be careful with *open-ended definition with commas*. Firefox might be forgiving but not IE. Meaning&#8230;

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="javascript" style="font-family:monospace;">	<span style="color: #000066; font-weight: bold;">var</span> config <span style="color: #339933;">=</span> <span style="color: #009900;">&#123;</span>
			id<span style="color: #339933;">:</span> taskbarButtonID<span style="color: #339933;">,</span>
			text<span style="color: #339933;">:</span> taskbarText<span style="color: #339933;">,</span>
			iconCls<span style="color: #339933;">:</span> iconstyle<span style="color: #339933;">,</span>
			handler<span style="color: #339933;">:</span> <span style="color: #000066; font-weight: bold;">function</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#123;</span>
				<span style="color: #000066; font-weight: bold;">var</span> mywindow <span style="color: #339933;">=</span> Ext.<span style="color: #660066;">getCmp</span><span style="color: #009900;">&#40;</span>windowID<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
				mywindow.<span style="color: #660066;">setVisible</span><span style="color: #009900;">&#40;</span> <span style="color: #339933;">!</span>mywindow.<span style="color: #660066;">isVisible</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
			<span style="color: #009900;">&#125;</span><span style="color: #339933;">,</span>
		<span style="color: #009900;">&#125;</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

**[5. Javascript Plugin for Eclipse][1]**. For more information, please visit [ExtJS Blog: IDEs, plugins and tools for Ext JS 2.0 ][2]

 [1]: http://www.spket.com/demos/js.html
 [2]: http://extjs.com/blog/2008/02/01/ides-plugins-and-tools-for-ext-js-20/