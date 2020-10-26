package com.motonet;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the
   *
   *
   *
   * name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "motoNet";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    checkPermission(Manifest.permission.ACCESS_FINE_LOCATION,110);

  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);

    if(grantResults.length>0){

    }
  }
  public void checkPermission(String permission, int requestCode)
  {

    // Checking if permission is not granted
    if (ContextCompat.checkSelfPermission(
            MainActivity.this,
            permission)
            == PackageManager.PERMISSION_DENIED) {
      ActivityCompat
              .requestPermissions(
                      MainActivity.this,
                      new String[] { permission },
                      requestCode);
    }
  }
}
