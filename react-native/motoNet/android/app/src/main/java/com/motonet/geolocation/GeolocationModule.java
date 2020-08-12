package com.motonet.geolocation;
import android.content.Intent;
import android.hardware.usb.UsbEndpoint;

import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class GeolocationModule extends ReactContextBaseJavaModule {


    public GeolocationModule(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    //Mandatory function getName that specifies the module name
    @Override
    public String getName() {
        return "Geolocation";
    }
    //Custom function that we are going to export to JS
    @ReactMethod
    public void getDeviceName(Callback cb) {
        try{

            cb.invoke(null, "repuesta");

        }catch (Exception e){
            cb.invoke(e.toString(), "error repuesta");
        }
    }

    @ReactMethod
    public void start(Callback cb) {
        try{
            SingletonCallback.getSingletonInstance( getReactApplicationContext());
            Intent serviceIntent = new Intent(getReactApplicationContext(), ForegroundService.class);
            ContextCompat.startForegroundService(getReactApplicationContext(), serviceIntent);

            cb.invoke( "Iniciando Carrera");

        }catch (Exception e){
            cb.invoke(e.toString(), "error inicio carrera");
        }
    }

    @ReactMethod
    public void stop(Callback cb) {
        try{
            Intent serviceIntent = new Intent(getReactApplicationContext(), ForegroundService.class);
            getCurrentActivity().stopService(serviceIntent);
            cb.invoke( "parrar  Carrera");
        }catch (Exception e){
            cb.invoke(e.toString(), "error repuesta");
        }
    }



}
