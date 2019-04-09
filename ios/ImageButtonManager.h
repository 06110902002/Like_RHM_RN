//
//  ImageButtonManager.h
//  rhm
//
//  Created by liuxiaobing on 2019/4/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import "React/RCTBridge.h"           //进行通信的头文件
#import "ImageButton.h"

NS_ASSUME_NONNULL_BEGIN

@interface ImageButtonManager : RCTViewManager<TabDelegate>

@property(nonatomic,weak) ImageButton* photoView;

@end

NS_ASSUME_NONNULL_END
