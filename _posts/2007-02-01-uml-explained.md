---
title: UML Explained
author: rupert
layout: post
permalink: /2007/02/uml-explained/
tags:
  - uml
---
As Im making some progress in ColdSpring/Reactor, I need some modelling to be able to visualise things much better and to help the team understand. Here is a very good post regarding [Use Case Diagrams][1] and [Activity Diagrams][2] that Doug wrote.

Some UML Tools:  
**[ArgoUML][3]**  
&#8211; hard to copy and paste objects

**[Poseidon for UML5.0.1 &#8211; without JRE][4]**  
&#8211; cannot save

**[cfcxmi convert XML models to CFC][5]**

[Visio 2003 UML Class Export Tool][6]  
`<br />
1. Open your class diagram at a page with a class you wish to export.<br />
2. Control+click each class you wish to export<br />
3. Open the Visual Basic Editor (Alt+F11)<br />
4. Double click on "ThisDocument" if no script is currently loaded<br />
5. Paste the script below here into  the empty page<br />
6. Edit the "LogFileLocation" string to tell it where you wish to save your file.  (Note: this must exist before the script runs)<br />
7. Hit F5 to run the script<br />
8. Enter a name for the file in the popup box<br />
9. Hit OK<br />
`

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="vb" style="font-family:monospace;"><span style="color: #E56717; font-weight: bold;">Sub</span> ExportShapes()
    Const LogFileLocation <span style="color: #151B8D; font-weight: bold;">As</span> <span style="color: #F660AB; font-weight: bold;">String</span> = <span style="color: #800000;">"C:\visioExportFiles\"</span>
    <span style="color: #151B8D; font-weight: bold;">Dim</span> selObj <span style="color: #151B8D; font-weight: bold;">As</span> Visio.Selection <span style="color: #008000;">'Shapes selection collection
</span>    <span style="color: #151B8D; font-weight: bold;">Dim</span> shpObj <span style="color: #151B8D; font-weight: bold;">As</span> Visio.Shape <span style="color: #008000;">'A shape instance
</span>    <span style="color: #151B8D; font-weight: bold;">Dim</span> i <span style="color: #151B8D; font-weight: bold;">As</span> <span style="color: #F660AB; font-weight: bold;">Integer</span>
    <span style="color: #151B8D; font-weight: bold;">Dim</span> myClassDef <span style="color: #151B8D; font-weight: bold;">As</span> <span style="color: #F660AB; font-weight: bold;">String</span>
    <span style="color: #151B8D; font-weight: bold;">Dim</span> LogFileName <span style="color: #151B8D; font-weight: bold;">As</span> <span style="color: #F660AB; font-weight: bold;">String</span>
    <span style="color: #151B8D; font-weight: bold;">Dim</span> FileNum <span style="color: #151B8D; font-weight: bold;">As</span> <span style="color: #F660AB; font-weight: bold;">Integer</span>
&nbsp;
    myClassDef = <span style="color: #800000;">"&lt;classes&gt;"</span>
    <span style="color: #151B8D; font-weight: bold;">Set</span> selObj = Visio.ActiveWindow.Selection
    <span style="color: #8D38C9; font-weight: bold;">For</span> i = 1 <span style="color: #8D38C9; font-weight: bold;">To</span> selObj.Count
        <span style="color: #151B8D; font-weight: bold;">Set</span> shpObj = selObj(i)
        myClassDef = myClassDef &amp; <span style="color: #800000;">"&lt;class&gt;"</span>
        myClassDef = myClassDef &amp; <span style="color: #800000;">"
&lt;properties&gt;
&lt;property&gt;"</span> &amp; Replace(shpObj.Shapes.Item(6).Text, Chr(10), <span style="color: #800000;">"&lt;/property&gt;
&lt;property&gt;"</span>) &amp; <span style="color: #800000;">"&lt;/property&gt;&lt;/properties&gt;"</span>
        myClassDef = myClassDef &amp; <span style="color: #800000;">"&lt;methods&gt;&lt;method&gt;"</span> &amp; Replace(shpObj.Shapes.Item(5).Text, Chr(10), <span style="color: #800000;">"&lt;/method&gt;&lt;method&gt;"</span>) &amp; <span style="color: #800000;">"&lt;/method&gt;&lt;/methods&gt;"</span>
        myClassDef = myClassDef &amp; <span style="color: #800000;">"&lt;/class&gt;"</span>
    <span style="color: #8D38C9; font-weight: bold;">Next</span> i
    myClassDef = myClassDef &amp; <span style="color: #800000;">"&lt;/classes&gt;"</span>
    <span style="color: #008000;">'Begin export
</span>    LogFileName = InputBox(<span style="color: #800000;">"What is the file name you wish to use (exclude the .xml extension)?"</span>, <span style="color: #800000;">"Export Classes"</span>)
    MsgBox (myClassDef)
    <span style="color: #8D38C9; font-weight: bold;">If</span> Len(LogFileName) <span style="color: #8D38C9; font-weight: bold;">Then</span>
&nbsp;
        FileNum = FreeFile <span style="color: #008000;">' next file number
</span>        <span style="color: #151B8D; font-weight: bold;">Open</span> LogFileLocation &amp; LogFileName &amp; <span style="color: #800000;">".xml"</span> <span style="color: #8D38C9; font-weight: bold;">For</span> <span style="color: #151B8D; font-weight: bold;">Output</span> <span style="color: #151B8D; font-weight: bold;">As</span> #FileNum <span style="color: #008000;">' creates the file if it doesn't exist
</span>        <span style="color: #151B8D; font-weight: bold;">Print</span> #FileNum, myClassDef <span style="color: #008000;">' write information at the end of the text file
</span>        <span style="color: #8D38C9; font-weight: bold;">Close</span> #FileNum <span style="color: #008000;">' close the file
</span>    <span style="color: #8D38C9; font-weight: bold;">Else</span>
        MsgBox (<span style="color: #800000;">"Bad file name"</span>)
    <span style="color: #8D38C9; font-weight: bold;">End</span> <span style="color: #8D38C9; font-weight: bold;">If</span>
&nbsp;
<span style="color: #8D38C9; font-weight: bold;">End</span> <span style="color: #E56717; font-weight: bold;">Sub</span></pre>
      </td>
    </tr>
  </table>
</div>

 [1]: http://www.doughughes.net/index.cfm?event=viewEntry&entryId=86
 [2]: http://www.doughughes.net/index.cfm?event=viewEntry&entryId=97
 [3]: http://argouml.tigris.org/
 [4]: http://www.gentleware.com/downloadcenter.html
 [5]: http://cfcxmi.tigris.org/
 [6]: http://www.webdevref.com/blog/index.cfm?mode=entry&entry=BF2978A8-FF56-FC82-0879E67AA4DAA062&dv=notable