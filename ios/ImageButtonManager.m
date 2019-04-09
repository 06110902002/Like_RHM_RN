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
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    NSLog(@"24-----------%@:",[self.photoView imgUrl]);
  });
  
  return photoView;
  
  
}

- (void)tabAction{
  //响应react 的点击事件
  NSLog(@"32-----------%@:",self.photoView.imgUrl);
  self.photoView.onSingleTap(@{@"showBottom":@"0"});
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
