---
title: Passing a table_name to a postgres plpgsql function
author: rupert
layout: post
permalink: /2011/08/passing-a-table_name-to-a-postgres-plpgsql-function/
categories:
  - postgres
tags:
  - postgres
---
**Using a table_name in a function.**  
The parameter p\_schema\_name will be passed as a string to the sql string statement processed by EXECUTE. Possible gotchas I encountered here was the FOUND variable is useless after an EXECUTE statement.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">EXECUTE</span> <span style="color: #ff0000;">'UPDATE...";
IF found THEN --this is not set when we use EXECUTE. 
END IF;</span></pre>
      </td>
    </tr>
  </table>
</div>

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="sql" style="font-family:monospace;"><span style="color: #993333; font-weight: bold;">CREATE</span> <span style="color: #993333; font-weight: bold;">OR</span> <span style="color: #993333; font-weight: bold;">REPLACE</span> <span style="color: #993333; font-weight: bold;">FUNCTION</span> dfms<span style="color: #66cc66;">.</span>upsert_ncm_execution<span style="color: #66cc66;">&#40;</span>p_schema_name text<span style="color: #66cc66;">,</span> p_fleet_id <span style="color: #993333; font-weight: bold;">INTEGER</span><span style="color: #66cc66;">,</span> p_ncm_number <span style="color: #993333; font-weight: bold;">INTEGER</span><span style="color: #66cc66;">,</span> p_version text<span style="color: #66cc66;">,</span> p_hostname text<span style="color: #66cc66;">,</span> p_process_id <span style="color: #993333; font-weight: bold;">INTEGER</span><span style="color: #66cc66;">,</span> p_execution_id <span style="color: #993333; font-weight: bold;">INTEGER</span><span style="color: #66cc66;">&#41;</span>
  <span style="color: #993333; font-weight: bold;">RETURNS</span> <span style="color: #993333; font-weight: bold;">INTEGER</span> <span style="color: #993333; font-weight: bold;">AS</span>
$BODY$
<span style="color: #993333; font-weight: bold;">DECLARE</span>
  record_found <span style="color: #993333; font-weight: bold;">BOOLEAN</span>;
  execution_id <span style="color: #993333; font-weight: bold;">INTEGER</span>;
<span style="color: #993333; font-weight: bold;">BEGIN</span>
    <span style="color: #993333; font-weight: bold;">EXECUTE</span> <span style="color: #ff0000;">'SELECT count(*) FROM '</span> <span style="color: #66cc66;">||</span> p_schema_name <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">'.ncm_executions WHERE fleet_id = $1 AND ncm_number = $2'</span> <span style="color: #993333; font-weight: bold;">INTO</span> record_found <span style="color: #993333; font-weight: bold;">USING</span> p_fleet_id<span style="color: #66cc66;">,</span> p_ncm_number;
    <span style="color: #993333; font-weight: bold;">IF</span> record_found <span style="color: #993333; font-weight: bold;">THEN</span>
      <span style="color: #993333; font-weight: bold;">EXECUTE</span> <span style="color: #ff0000;">'UPDATE '</span> <span style="color: #66cc66;">||</span> p_schema_name <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">'.ncm_executions SET execution_id = execution_id + 1 WHERE fleet_id = $1 AND ncm_number = $2'</span> <span style="color: #993333; font-weight: bold;">USING</span> p_fleet_id<span style="color: #66cc66;">,</span> p_ncm_number;
    <span style="color: #993333; font-weight: bold;">ELSE</span>
      <span style="color: #993333; font-weight: bold;">BEGIN</span>
        <span style="color: #993333; font-weight: bold;">EXECUTE</span> <span style="color: #ff0000;">'INSERT INTO '</span> <span style="color: #66cc66;">||</span> p_schema_name <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">'.ncm_executions(fleet_id, ncm_number, version, hostname, process_id, execution_id) VALUES($1, $2, $3, $4, $5, $6)'</span> <span style="color: #993333; font-weight: bold;">USING</span> p_fleet_id<span style="color: #66cc66;">,</span> p_ncm_number<span style="color: #66cc66;">,</span> p_version<span style="color: #66cc66;">,</span> p_hostname<span style="color: #66cc66;">,</span> p_process_id<span style="color: #66cc66;">,</span> p_execution_id;
      EXCEPTION <span style="color: #993333; font-weight: bold;">WHEN</span> unique_violation <span style="color: #993333; font-weight: bold;">THEN</span>
        <span style="color: #808080; font-style: italic;">-- do nothing</span>
      <span style="color: #993333; font-weight: bold;">END</span>;
    <span style="color: #993333; font-weight: bold;">END</span> <span style="color: #993333; font-weight: bold;">IF</span>;
&nbsp;
    <span style="color: #993333; font-weight: bold;">EXECUTE</span> <span style="color: #ff0000;">'SELECT execution_id FROM '</span> <span style="color: #66cc66;">||</span> p_schema_name <span style="color: #66cc66;">||</span> <span style="color: #ff0000;">'.ncm_executions WHERE fleet_id = $1 AND ncm_number = $2'</span> <span style="color: #993333; font-weight: bold;">INTO</span> execution_id <span style="color: #993333; font-weight: bold;">USING</span> p_fleet_id<span style="color: #66cc66;">,</span> p_ncm_number;
&nbsp;
    <span style="color: #993333; font-weight: bold;">RETURN</span> execution_id;
<span style="color: #993333; font-weight: bold;">END</span>;
$BODY$
  <span style="color: #993333; font-weight: bold;">LANGUAGE</span> plpgsql VOLATILE
  COST <span style="color: #cc66cc;">100</span>;</pre>
      </td>
    </tr>
  </table>
</div>