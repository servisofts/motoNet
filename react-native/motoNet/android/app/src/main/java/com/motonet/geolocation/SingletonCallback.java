package com.motonet.geolocation;
/**
 * Singleton class.
 *
 *
 */import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;

public class SingletonCallback {

        private static ReactContext reactContexts;


        public static ReactContext getSingletonInstance(ReactContext reactContext) {
                if (reactContext!=null){
                    reactContexts = reactContext;
                }
            return reactContexts;
        }


}