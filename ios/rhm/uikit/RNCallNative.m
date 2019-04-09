//
//  RNCallNative.m
//  rhm
//
//  Created by liuxiaobing on 2019/4/8.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNCallNative.h"
#import "CashBackVCViewController.h"
#import "AppDelegate.h"

#define TestNativeJsonData @"{\"callback1\":\"123\",\"callback2\":\"asd\"}"
@implementation RNCallNative
RCT_EXPORT_MODULE();

/**
 *rn 调 原生方法，并将 参数传进来
 */
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  NSLog(@"16---------Pretending to create an event %@ at %@", name, location);
}

//桥接到Javascript的方法返回值必须是void。React native的桥接操作是异步的。所以要返回给Javascript，必须通过回调函数或者出触发事件
RCT_EXPORT_METHOD(RNTransferIOSWithCallBack:(NSString *)jsString callBack:(RCTResponseSenderBlock)callback){
  NSLog(@"24----------调用了jsCallback函数 %@",jsString);
  callback(@[[NSString stringWithFormat:@"来自iOS Native的数据：%@",TestNativeJsonData]]);
}

RCT_EXPORT_METHOD(switchNative:(NSString*) reactParmas){
  
  NSLog(@"33-------------from react parmas:%@",reactParmas);
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    CashBackVCViewController* vc = [[CashBackVCViewController alloc] init];
    vc.reactStr = reactParmas;
    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [app.nav pushViewController:vc animated:YES];
  });

  
}


@end
