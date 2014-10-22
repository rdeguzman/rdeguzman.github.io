---
title: 'iPhone Note #5: SQLite3'
author: Rupert
layout: post
permalink: /2009/08/iphone-note-sqlite3-tutorial/
delicious:
  - 's:78:"a:3:{s:5:"count";s:1:"0";s:9:"post_tags";s:0:"";s:4:"time";s:10:"1250116853";}";'
reddit:
  - 's:55:"a:2:{s:5:"count";s:1:"0";s:4:"time";s:10:"1250116853";}";'
categories:
  - iphone
  - sqlite3
tags:
  - iphone
  - sqlite3
---
Note this tutorial will be updated in the near future&#8230;

1. The code below (based from the [SQLiteBooks Example]()) will copy the database from your bundle to the &#8220;Documents&#8221; directory. You don&#8217;t have to do this every time your app launches, so there is a check at &#8220;success&#8221; below. To check this, in the iPhone Simulator navigate to the Documents directory:

<!--more-->

**/Users/rupert/Library/Application\ Support/iPhone\ Simulator/User/Applications/unique\_number\_of\_the\_application/Documents/sample.db**

<pre>// Creates a writable copy of the bundled default database in the application Documents directory.
- (void)createEditableCopyOfDatabaseIfNeeded {
    // First, test for existence.
    BOOL success;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSError *error;

	//Documents Database Path
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSString *writableDBPath = [documentsDirectory stringByAppendingPathComponent:kDatabaseName];

	success = [fileManager fileExistsAtPath:writableDBPath];
    if (success) return;

    // The writable database does not exist, so copy the default to the appropriate location.
    NSString *defaultDBPath = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:kDatabaseName];
    success = [fileManager copyItemAtPath:defaultDBPath toPath:writableDBPath error:&error];
    if (!success) {
        NSLog(@"Failed to create writable database file with message '%@'.", [error localizedDescription]);
    }
}
</pre>