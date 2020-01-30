package com.emateri;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCardViewPackage(),
            new RNFetchBlobPackage(),
            new DocumentPickerPackage(),
            new ReactNativeDialogsPackage(),
            new SplashScreenReactPackage(),
            new RNSensitiveInfoPackage(),
            new RNSpinkitPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
