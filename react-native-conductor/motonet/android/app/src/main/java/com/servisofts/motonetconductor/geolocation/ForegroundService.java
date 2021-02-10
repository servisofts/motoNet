package com.servisofts.motonetconductor.geolocation;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.provider.Settings;

import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;


import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.servisofts.motonetconductor.MainActivity;

import org.jetbrains.annotations.Nullable;
import org.json.JSONException;
import org.json.JSONObject;

public class ForegroundService extends Service {
    private int varian =1;
    private LocationListener listener;
    private LocationManager locationManager;

    public static final String CHANNEL_ID = "ForegroundServiceChannel.motonetconductor";
    @Override
    public void onCreate() {
        super.onCreate();


        if (ContextCompat.checkSelfPermission(
                getApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) ==
                PackageManager.PERMISSION_GRANTED) {

        }

        listener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {


                    double latfin = location.getLatitude();
                    double lngfin = location.getLongitude();
                WritableMap params = Arguments.createMap();
                JSONObject data = new JSONObject();
                try {
                    data.put("latitude",location.getLatitude());
                    data.put("longitude",location.getLongitude());
                    data.put("altitude",location.getAltitude());
                    data.put("accuracy",location.getAccuracy());
                    data.put("speed",location.getSpeed());
                    data.put("time",location.getTime());

                } catch (JSONException e) {

                    e.printStackTrace();
                }
                params.putString("data", data.toString());
                SingletonCallback.getSingletonInstance(null)
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("onLocationChange", params);
            }

            @Override
            public void onStatusChanged(String s, int i, Bundle bundle) {

            }

            @Override
            public void onProviderEnabled(String s) {

            }

            @Override
            public void onProviderDisabled(String s) {
                Intent i = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(i);
            }
        };


        locationManager = (LocationManager) getApplicationContext().getSystemService(Context.LOCATION_SERVICE);

        //noinspection MissingPermission
        if (ActivityCompat.checkSelfPermission(ForegroundService.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(ForegroundService.this,
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

          //

            return;
        }

        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1, varian, listener);
        locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 1, varian, listener);




    }



    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        varian = intent.getIntExtra("varian",1);
        createNotificationChannel();
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,
                0, notificationIntent, 0);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Moto Net")
                .setContentText("Su motonetconductor esta en camino")
                .setContentIntent(pendingIntent)
                .build();
        startForeground(1, notification);


        //ActivityCompat.requestPermissions( this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION},0);
        //do heavy work on a background thread
        //stopSelf();
        return START_NOT_STICKY;
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
    }
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }


    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    CHANNEL_ID,
                    "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }
    }
}
