//
//  CashBackVCViewController.m
//  rhm
//
//  Created by liuxiaobing on 2019/4/9.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CashBackVCViewController.h"

@interface CashBackVCViewController ()

@end

@implementation CashBackVCViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [UIColor whiteColor];
  UIButton* button = [[UIButton alloc] initWithFrame:CGRectMake(0, 50, 150, 40)];
  [button setTitle:@"返回React页面" forState:UIControlStateNormal];
  button.backgroundColor = [UIColor grayColor];
  [button addTarget:self action:@selector(onClick:) forControlEvents:UIControlEventTouchUpInside];
  [self.view addSubview:button];
  
  UILabel* reactParmas = [[UILabel alloc] initWithFrame:CGRectMake(160, 50, 100, 40)];
  reactParmas.text = self.reactStr;
  reactParmas.backgroundColor = [UIColor grayColor];
  [self.view addSubview:reactParmas];

  
}

-(void)onClick:(UIButton*) button{
  [self.navigationController popViewControllerAnimated:false];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
