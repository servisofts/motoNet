package com.servisofts.motonetconductor.SSBackgroundLocation;

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

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;

import com.facebook.react.HeadlessJsTaskService;
import com.servisofts.motonetconductor.MainActivity;
import com.servisofts.motonetconductor.R;

import org.json.JSONException;
import org.json.JSONObject;

public class SSBL_Service extends Service implements LocationListener {
    public static final String CHANNEL_ID = "SSBackgroundService.servisofts";
    public static final int SERVICE_NOTIFICATION_ID = 1;
    private LocationManager locationManager;

    @Override
    public void onCreate() {
        super.onCreate();
        if (ActivityCompat.checkSelfPermission(SSBL_Service.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(SSBL_Service.this,
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {return;}

        locationManager = (LocationManager) getApplicationContext().getSystemService(Context.LOCATION_SERVICE);
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000, 1, this);
        locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 5000, 1, this);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        createNotificationChannel();
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Motonet")
                .setContentText("Utilizando tu ubicacion...")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(contentIntent)
                .setOngoing(true)
                .build();
        startForeground(SERVICE_NOTIFICATION_ID, notification);
        return START_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onLocationChanged(Location location) {
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
        Context context = getApplicationContext();
        Intent myIntent = new Intent(context, SSBL_event.class);
        myIntent.putExtra("data",data.toString());
        context.startService(myIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {
        Intent i = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(i);

    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        locationManager.removeUpdates(this);
        stopForeground(true);
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
