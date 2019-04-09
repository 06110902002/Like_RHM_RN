//
//  ImageButton.h
//  rhm
//
//  Created by liuxiaobing on 2019/4/9.
//  Copyright © 2019 Facebook. All rights reserved.
//  自定义一个UIImage + UIButton 组合

#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTViewManager.h>


NS_ASSUME_NONNULL_BEGIN
@protocol TabDelegate <NSObject>

@optional
-(void) tabAction;
-(void) showToastAction;

@end



@interface ImageButton : UIView
@property(nonatomic,strong) UIImage* image;
@property(nonatomic,strong) UIButton* button;


@property(nonatomic,weak) id<TabDelegate> delegate;

@property(nonatomic,copy) NSString* imgUrl;
@property(nonatomic,copy) RCTBubblingEventBlock onSingleTap;

@end

NS_ASSUME_NONNULL_END
