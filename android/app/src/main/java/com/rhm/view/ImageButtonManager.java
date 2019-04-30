package com.rhm.view;

import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by liuxiaobing
 * Date on 2019/4/30
 * Copyright 2013 - 2018 QianTuo Inc. All Rights Reserved
 * Desc:
 */
public class ImageButtonManager extends SimpleViewManager<Button> {
    //自定义事件名称
    private static final String EVENT_NAME_ONCLICK = "onSingleTap";
    @Override
    public String getName() {
        return "ImageButton";
    }

    @Override
    protected Button createViewInstance(ThemedReactContext reactContext) {
        Button imageButton = new Button(reactContext);
        //View view = View.inflate(reactContext,R.layout.activity_main,null);
        imageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.println("38---------------:android ImageButton .onClickListener");
                //创建携带回调的数据
                WritableMap eventData = Arguments.createMap();
                eventData.putString("showBottom","信息来自android");//key用于js中的nativeEvent
                //向js层发送回调
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        imageButton.getId(),//native和js两个视图会依据getId()而关联在一起
                        EVENT_NAME_ONCLICK,//事件名称
                        eventData   //携带回调的数据,可传入null
                );
            }
        });
        return imageButton;
    }

    /**
     * Anroid层向js层发送消息事件 需要重载此接口
     * @return
     */
    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                EVENT_NAME_ONCLICK, MapBuilder.of("registrationName", EVENT_NAME_ONCLICK));
    }

    /**
     * 声明一个对外输出的属性
     * @param view
     * @param imgUrl
     */
    @ReactProp(name = "imgUrl")
    public void setImgUrl(Button view, String imgUrl) {
        view.setText(imgUrl);
        System.out.println("50--------------android imgUrl:"+imgUrl);
    }
}
