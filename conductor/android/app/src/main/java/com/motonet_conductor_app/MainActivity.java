package com.motonet_conductor_app;

import android.util.Log;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "motonet_conductor_app";
  }

//Esto lo agrege por que el backgroun location tiraba cuando lo cerraba
  public static int cant = 0;

  @Override
  protected void onResume() {
    super.onResume();
    if(cant>1){
      cant=0;
    }else{
      if(cant>0){
        this.recreate();
      }
    }

  }

  @Override
  protected void onStop() {
    super.onStop();
  }

  @Override
  protected void onDestroy() {
    cant+=1;
    super.onDestroy();
  }
}
