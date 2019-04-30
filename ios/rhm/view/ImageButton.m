//
//  ImageButton.m
//  rhm
//
//  Created by liuxiaobing on 2019/4/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "ImageButton.h"

@implementation ImageButton


-(instancetype) initWithFrame:(CGRect)frame{
  if(self = [super initWithFrame:frame]){
    [self initView:frame];
  }
  return self;
    
}

-(void) initView:(CGRect)frame{
  self.button = [[UIButton alloc] initWithFrame:frame];
  [self.button setTitle:@"这是一个原生组件" forState:UIControlStateNormal];
  self.button.backgroundColor = [UIColor clearColor];
  [self.button addTarget:self action:@selector(onClick:) forControlEvents:UIControlEventTouchUpInside];
  [self addSubview:self.button];
}

-(void) onClick:(UIButton*) button{
  NSLog(@"31-------------ImageButton:");
  if(self.delegate){
    [self.delegate tabAction];
  }
}

- (void)layoutSubviews{
  [super layoutSubviews];
  //self.button.center = CGPointMake(self.frame.size.width * 0.5, self.frame.size.height * 0.5);
  
}


/**
 对应react 的属性直接改写的setrv函数即可

 @param imgUrl react传进来的属性值
 */
-(void)setImgUrl:(NSString *)imgUrl{
  
  _imgUrl = imgUrl;
  
  NSLog(@"47---------test react pass parmas setImgUrl:%@",imgUrl);
  
}


/**
 在这个生命周期处理react传过来的信息
 */
- (void)didMoveToWindow{
  NSLog(@"57---------didMoveToWindowImgUrl:%@",self.imgUrl);
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing coded
}
*/

@end
