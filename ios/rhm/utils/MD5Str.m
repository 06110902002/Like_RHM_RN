//
//  MD5Str.m
//  rhm
//
//  Created by liuxiaobing on 2019/4/13.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "MD5Str.h"
#import "NSString+URLEncoding.h"
#import "NSString+Md5.h"

@implementation MD5Str

+(NSString*) getMd5Str:(NSString*) str{
  NSString *encodedString = [[str URLEncodedString] stringByReplacingOccurrencesOfString:@"%20" withString:@"+" ];
  NSString *m = [[encodedString md5] uppercaseString];
  return m;
}

@end
