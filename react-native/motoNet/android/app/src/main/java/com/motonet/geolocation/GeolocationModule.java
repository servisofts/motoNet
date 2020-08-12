package com.motonet.geolocation;
import com.facebook.react.bridge.Callback;
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
        return "Geolocation";
    }

    //Custom function that we are going to export to JS
    @ReactMethod
    public void getDeviceName(Callback cb) {
        try {
            cb.invoke(null, android.os.Build.MODEL);
        } catch (Exception e) {
            cb.invoke(e.toString(), null);
        }
    }
}
