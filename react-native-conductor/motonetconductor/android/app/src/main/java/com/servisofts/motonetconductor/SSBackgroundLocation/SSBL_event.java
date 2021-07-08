package com.servisofts.motonetconductor.SSBackgroundLocation;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class SSBL_event extends HeadlessJsTaskService {

    @Nullable
    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        return new HeadlessJsTaskConfig(
                "SSBackgroundLocation",
                extras != null ? Arguments.fromBundle(extras) : null,
                5000,
                true);
    }
}
