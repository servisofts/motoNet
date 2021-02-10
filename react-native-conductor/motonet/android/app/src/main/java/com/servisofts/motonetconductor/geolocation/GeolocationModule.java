package com.servisofts.motonetconductor.geolocation;
import android.content.Intent;

import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class GeolocationModule extends ReactContextBaseJavaModule {


    public GeolocationModule(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    //Mandatory function getName that specifies the module name
    @Override
    public String getName() {
        return "BackgroundGeolocation";
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
    public void start(int varin, Promise cb) {
        try{
            SingletonCallback.getSingletonInstance( getReactApplicationContext());
            Intent serviceIntent = new Intent(getReactApplicationContext(), ForegroundService.class);
            ContextCompat.startForegroundService(getReactApplicationContext(), serviceIntent);
            serviceIntent.putExtra("varian",varin);
            cb.resolve( "Iniciando Carrera");

        }catch (Exception e){
            cb.resolve("error inicio carrera");
        }
    }

    @ReactMethod
    public void stop(String nombre,Promise cb) {
        try{
            Intent serviceIntent = new Intent(getReactApplicationContext(), ForegroundService.class);
            getCurrentActivity().stopService(serviceIntent);
            cb.resolve( "parrar  Carrera");
        }catch (Exception e){
            cb.resolve( "error repuesta");
        }
    }



}
