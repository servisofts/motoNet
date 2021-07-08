package com.servisofts.motonetconductor.SSBackgroundLocation;

import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SSBL_Module extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "SSBackgroundLocation";
    private ReactApplicationContext reactContext;

    public SSBL_Module(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void start(int varin, Promise cb) {
        try{
            Intent serviceIntent = new Intent(this.reactContext, SSBL_Service.class);
            ContextCompat.startForegroundService(this.reactContext, serviceIntent);
            serviceIntent.putExtra("varian",varin);
            cb.resolve( "Iniciando Carrera");
        }catch (Exception e){
            cb.resolve("error inicio carrera");
        }
    }

    @ReactMethod
    public void stop(String nombre, Promise cb) {
        try{
            Intent serviceIntent = new Intent(this.reactContext, SSBL_Service.class);
            getCurrentActivity().stopService(serviceIntent);
            cb.resolve( "parrar  Carrera");
        }catch (Exception e){
            cb.resolve( "error repuesta");
        }
    }
}
