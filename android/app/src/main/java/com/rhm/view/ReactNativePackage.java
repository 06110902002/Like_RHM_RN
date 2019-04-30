package com.rhm.view;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

/**
 * Created by liuxiaobing
 * Date on 2019/4/30
 * Copyright 2013 - 2018 QianTuo Inc. All Rights Reserved
 * Desc: 注册自定义的View
 */
public class ReactNativePackage implements ReactPackage {


    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    /**
     * 这里调用原生组件
     * @param reactContext
     * @return
     */
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> views = new ArrayList<>();
        views.add(new TextViewManager());
        views.add(new ImageButtonManager());
        return views;
    }

    /**
     * 这里调用原生方法
     * @param reactContext
     * @return
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}