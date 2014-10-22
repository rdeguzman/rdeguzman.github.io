---
title: 'Rails Note #17: cucumber + factory_girl + has_many associations'
author: rupert
layout: post
permalink: /2011/02/rails-note-17-cucumber-factory_girl-has_many-associations/
categories:
  - rails
tags:
  - rails
  - rails3
  - tdd
---
1. It seems everytime :section is created, the association :app\_profile is created as well. Now, there is an existing uniqueness constraint to both :app\_profile and :sections. 

Say we have an app_profile for &#8220;Hotel 1&#8243;.

Now app_profile, &#8220;Hotel 1&#8243;, have two sections &#8220;Section 1&#8243;, &#8220;Section 2&#8243;.

Now the behaviour that we want is you cannot add &#8220;Section 1&#8243; again. &#8220;Section 3&#8243; is fine.

What is the factory definition that I need to specify for :section so that it will create an association if needed but will use an existing association if it already exists?

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="text" style="font-family:monospace;">Validation failed: App name has already been taken (ActiveRecord::RecordInvalid)
./features/step_definitions/seed_steps.rb:6:in `/^there is a section called "([^"]*)"$/'
features/editing_existing_sections.feature:10:in `And there is a section called "Test Section 2"'</pre>
      </td>
    </tr>
  </table>
</div>

2. Now I don&#8217;t know if this is ideal but the only way I worked around this is by assigning the factory build instance into an instance variable using &#8220;@&#8221;, thus it will be available through the whole request.

[<img src="/images/2011/02/cucumber_factory_girl_association_thumb.png" alt="cucumber_factory_girl_association_thumb.png" border="0" width="700" height="387" />][1]

Referene: [Getting Started with factory_girl][2]

 [1]: /images/2011/02/cucumber_factory_girl_associations.png
 [2]: http://rdoc.info/github/thoughtbot/factory_girl/master/file/GETTING_STARTED.md