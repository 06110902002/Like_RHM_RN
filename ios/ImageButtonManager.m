//
//  ImageButtonManager.m
//  rhm
//
//  Created by liuxiaobing on 2019/4/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "ImageButtonManager.h"

@implementation ImageButtonManager

RCT_EXPORT_MODULE(ImageButton)
RCT_EXPORT_VIEW_PROPERTY(imgUrl, NSString)
RCT_EXPORT_VIEW_PROPERTY(onSingleTap, RCTBubblingEventBlock);


-(UIView*) view{
 
  ImageButton* photoView = [[ImageButton alloc] initWithFrame:CGRectMake(0, 0, 200, 50)];//与react保持一致
  photoView.delegate = self;
  //photoView.backgroundColor = [UIColor yellowColor];
  self.photoView = photoView;
  
  return photoView;
  
  
}

- (void)tabAction{
  //响应react 的点击事件
  self.photoView.onSingleTap(@{@"showBottom":@"信息来自ios"});
}

- (void)showToastAction{
   self.photoView.onSingleTap(@{@"showBottom":@"1"});
}


/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
