---
title: Trac slow on updating or creating tickets
author: rupert
layout: post
permalink: /2008/03/trac-slow-on-updating-or-creating-tickets/
tags:
  - subversion
  - trac
---
This has been a productivity hogger for us for quite a few weeks and we really had no clue at it first. What I noticed was after enabling logging on trac.ini:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">[logging]
log_file = trac.log
log_level = CRITICAL
log_type = file</pre>
      </td>
    </tr>
  </table>
</div>

was that every post was being sent to an SMTP server.

<!--more-->

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">2008-03-09 19:50:49,323 Trac[__init__] DEBUG: Dispatching &lt;request&gt;
2008-03-09 19:50:49,335 Trac[__init__] DEBUG: action controllers: [
&lt;trac&gt;]
2008-03-09 19:51:48,483 Trac[__init__] INFO: Sending SMTP notification to 192.168.1.15:25 to [u'rupert@cybersoftchina.com', u'dev@cybersoftchina.com']
2008-03-09 19:51:53,610 Trac[__init__] DEBUG: Retrieving session for ID 'rupert'
2008-03-09 19:51:53,654 Trac[__init__] DEBUG: Dispatching &lt;request&gt;
&lt;/request&gt;&lt;/trac&gt;&lt;/request&gt;</pre>
      </td>
    </tr>
  </table>
</div>

The culprit as you expected was my slow qmail server which for some reason I can&#8217;t figure out for now.

**Workaround**  
I have to disable email alerts for every new/update ticket for the time being.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="conf" style="font-family:monospace;">[notification]
admit_domains =
always_notify_owner = true
always_notify_reporter = true
always_notify_updater = true
ignore_domains =
mime_encoding = base64
#smtp_always_bcc =
#smtp_always_cc = dev@cybersoftchina.com
#smtp_default_domain =
#smtp_enabled = true
#smtp_from = trac@cybersoftchina.com
#smtp_from_name = Trac Auto Notification CNCPHS
#smtp_password = cybertrac2007
#smtp_port = 25
#smtp_replyto = dev@cybersoftchina.com
#smtp_server = 192.168.1.15
#smtp_subject_prefix = __default__
#smtp_user = trac@cybersoftchina.com
ticket_subject_template = $prefix #$ticket.id: $summary
use_public_cc = false
use_short_addr = false
use_tls = false</pre>
      </td>
    </tr>
  </table>
</div>