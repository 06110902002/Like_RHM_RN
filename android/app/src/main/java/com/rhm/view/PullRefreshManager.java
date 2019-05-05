package com.rhm.view;

import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by liuxiaobing
 * Date on 2019-05-02
 * Copyright 2013 - 2018 QianTuo Inc. All Rights Reserved
 * Desc:
 */
public class PullRefreshManager extends ViewGroupManager<ViewGroup> {

    public static final String REACT_VIEW = "pullLayout";

    private static final String EVENT_NAME_ONCLICK = "onRefresh";
    /**
     * @return 返回的名字会用于在JavaScript端引用这个原生视图类型。
     */
    @Override
    public String getName() {
        return REACT_VIEW;
    }

    /**
     * 创建视图，且应当把自己初始化为默认的状态。所有属性的设置都通过后续的updateView来进行。
     */
    @Override
    public ViewGroup createViewInstance(ThemedReactContext reactContext) {
        LinearLayout view = new LinearLayout(reactContext);

        return view;
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                EVENT_NAME_ONCLICK, MapBuilder.of("registrationName", EVENT_NAME_ONCLICK));
    }

}
