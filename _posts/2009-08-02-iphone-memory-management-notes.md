---
title: 'iPhone Note #2: Memory Management'
author: rupert
layout: post
permalink: /2009/08/iphone-memory-management-notes/
reddit:
  - 's:55:"a:2:{s:5:"count";s:1:"0";s:4:"time";s:10:"1249278226";}";'
delicious:
  - 's:78:"a:3:{s:5:"count";s:1:"0";s:9:"post_tags";s:0:"";s:4:"time";s:10:"1249278226";}";'
categories:
  - iphone
tags:
  - iphone
---
**1. If its alloc, copy, new. YOU ARE RESPONSIBLE for RELEASING the OBJECT (YARRO). **

<pre>NSString *en_name = [[NSString alloc] initWithUTF8String:(char *)sqlite3_column_text(statement, 1)];

//do something.. set it to an object..
poi.en_name = en_name;

[en_name release];
</pre>

<!--more-->

2. **Methods that return an object that will live only on the duration of the method do not need to be released**, see Listing 2.1. Even if NSString stringWithFormat returns a new object, 
<pre>+ (id)stringWithFormat:(NSString *)format, ...</pre>

fullName does not need to be released and will be destroyed when the object holding the logTitle method is destroyed.

<pre>Listing 2.1
- (void)logTitle{
	NSString *fullName = [NSString stringWithFormat:@"%@ %@", person.first_name, person.last_name];
	NSLog(@"%@", fullName);
}

</pre>

3. **HOWEVER, if the object is to be used as an instance variable, then YARRO.** If fullName is an instance of the class Person, then it should be released in the dealloc method or somewhere.

4. Dealloc. Similar to [3] above, always release instance objects in your dealloc method.

<pre>Listing 4.1
@interface PoiModel : NSObject {
	NSString *poi_id;
	NSString *en_name;
	NSString *tel_no;
	NSString *subTitle;
}

@property (nonatomic, copy) NSString *poi_id;
@property (nonatomic, copy) NSString *en_name;
@property (nonatomic, copy) NSString *tel_no;
@property (nonatomic, copy) NSString *subTitle;

- (id) initWithPrimaryKey:(NSString *)pk_id;

@end

Listing 4.2
#import "PoiModel.h"

@implementation PoiModel

@synthesize poi_id;
@synthesize en_name;
@synthesize tel_no;
@synthesize subTitle;

- (id) initWithPrimaryKey:(NSString *)pk_id{
	if(self = [super init]){
		self.poi_id = pk_id;
	}
	return self;
}

- (void) dealloc{
	[poi_id release];
	[en_name release];
	[tel_no release];
	[subTitle release];
	[super dealloc];
}

@end
</pre>

5. **Are you in a tight loop? Use release or autorelease.** Take a look at Listing 5.1 below. My poi_category table consist of 54,435 records. Without implementing a LIMIT on the SQL statement, I would leak objects when the while loop runs if I was not releasing the NSString objects.

<pre>Listing 5.1
- (void)loadData
{
	NSLog(@"NearbyPoiListController.loadData(): Loading Data...");

	NSString *file = [[NSBundle mainBundle] pathForResource:@"travelportal" ofType:@"db"];

	NSString *sqlString = [NSString stringWithFormat:@"SELECT poi_id, en_name, category_name, py_rdname FROM poi_category WHERE category_id = %@", category.primaryKeyId];

	sqlite3 *database = NULL;

	// Open the database. The database was prepared outside the application.
    if (sqlite3_open([file UTF8String], &database) == SQLITE_OK) {
        // Get the primary key for all books.
		const char *sql = [sqlString UTF8String];
        	sqlite3_stmt *statement;

        	if (sqlite3_prepare_v2(database, sql, -1, &statement, NULL) == SQLITE_OK) {
            // We "step" through the results - once for each row.
		  while (sqlite3_step(statement) == SQLITE_ROW) {

			NSString *pk_id = [[NSString alloc] initWithFormat:@"%d",  sqlite3_column_int(statement,0)];
			PoiModel *poi = [[PoiModel alloc] initWithPrimaryKey:pk_id];
			[pk_id release];

			NSString *en_name = [[NSString alloc] initWithUTF8String:(char *)sqlite3_column_text(statement, 1)];
			poi.en_name = en_name;
			[en_name release];

			NSString *subCategory = [[NSString alloc] initWithUTF8String:(char *)sqlite3_column_text(statement, 2)];
			NSString *streetName = [[NSString alloc] initWithUTF8String:(char *)sqlite3_column_text(statement, 3)];
			NSString *subTitle = [[NSString alloc] initWithFormat:@"%@-%@", subCategory, streetName];
			[subCategory release];
			[streetName release];

			poi.subTitle = subTitle;

			[subTitle release];

			[arrayPoi addObject:poi];
			[poi release];

            }
        }
        // "Finalize" the statement - releases the resources associated with the statement.
        sqlite3_finalize(statement);
    }

	// Even though the open failed, call close to properly clean up resources.
    sqlite3_close(database);

	NSLog(@"NearbyPoiListController.loadData(): %d", [arrayPoi count]);
}

</pre>

You might be wondering, *&#8220;why not use NSString stringWithFormat then autorelease that object? When loadData finishes it gets destroyed anyway? When the autorelease pool decides to clean up its pool, then autorelease objects is destroyed. Right?&#8221;* Short answer, yes. HOWEVER, if your memory is almost near the edge or highwater mark as Al noted (Stanford CS193P Class), you might be booted even before autorelease pool gets a chance to release its object. Well, you don&#8217;t have any choice so don&#8217;t look at it as an extra effort in your part. For me, if you can use release immediately, then its better.

6. How do I memory manage NSStrings? Read the [0203-FollowUpNotes.pdf][1]

7. “Memory Usage Performance Guidelines&#8221;

https://developer.apple.com/iphone/library/documentation/

Performance/Conceptual/ManagingMemory/

 [1]: http://gismobiledev.files.wordpress.com/2009/08/0203-followupnotes.pdf "0203-FollowUpNotes.pdf"