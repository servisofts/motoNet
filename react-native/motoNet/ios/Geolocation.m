#import "Geolocation.h"
#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>
#import <CoreLocation/CoreLocation.h>

@implementation Geolocation
{
  CLLocationManager * locationManager;
   NSDictionary * lastLocationEvent;
}
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
 

//export the name of the native module as 'Device' since no explicit name is mentioned
RCT_EXPORT_MODULE(Geolocation);

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"onLocationChange"];
}

- (NSDictionary *)constantsToExport
{
  return @{ @"listOfPermissions": @[@"significantLocationChange"] };
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;  // only do this if your module exports constants or calls UIKit
}

//all methods currently async
RCT_EXPORT_METHOD(initialize:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  //RCTLogInfo(@"Pretending to do something natively: initialize");

  resolve(@(true));
}


RCT_EXPORT_METHOD(hasPermissions:(NSString *)permissionType
                 hasPermissionsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  //RCTLogInfo(@"Pretending to do something natively: hasPermissions %@", permissionType);
  
  BOOL locationAllowed = [CLLocationManager locationServicesEnabled];
  
  resolve(@(locationAllowed));
}

RCT_EXPORT_METHOD(stop:(NSString *)permissionType
                 requestPermissionsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSArray *arbitraryReturnVal = @[@"Stop Ubicacion..."];
    [locationManager stopUpdatingLocation];
    [locationManager stopMonitoringSignificantLocationChanges];
  resolve(arbitraryReturnVal);
}

RCT_EXPORT_METHOD(start:(NSInteger *)vearing
                 requestPermissionsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSArray *arbitraryReturnVal = @[@"Iniciando Ubicacion"];
  //RCTLogInfo(@"Pretending to do something natively: requestPermissions %@", permissionType);
  
  // location
  if (!locationManager) {
    //RCTLogInfo(@"init locationManager...");
    locationManager = [[CLLocationManager alloc] init];
  }
  
  locationManager.delegate = self;
  locationManager.allowsBackgroundLocationUpdates = true;
  locationManager.pausesLocationUpdatesAutomatically = false;
       
  if ([locationManager respondsToSelector:@selector(requestAlwaysAuthorization)]) {
    [locationManager requestAlwaysAuthorization];
  } else if ([locationManager respondsToSelector:@selector(requestWhenInUseAuthorization)]) {
    [locationManager requestWhenInUseAuthorization];
  }
  
  locationManager.desiredAccuracy = kCLLocationAccuracyBest;
  locationManager.distanceFilter = !vearing;
  
  [locationManager startUpdatingLocation];
  [locationManager startMonitoringSignificantLocationChanges];
 
  resolve(arbitraryReturnVal);
   
}


- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations {
    CLLocation* location = [locations lastObject];
    
    lastLocationEvent = @{
                                  @"latitude": @(location.coordinate.latitude),
                                  @"longitude": @(location.coordinate.longitude),
                                  @"altitude": @(location.altitude),
                                  @"accuracy": @(location.horizontalAccuracy),
                                  @"heading": @(location.course),
                                  @"speed": @(location.speed),
                                  @"time": @([location.timestamp timeIntervalSince1970] * 1000) // in ms
                        };
  
     
                          [self sendEventWithName:@"onLocationChange" body:@{@"data": lastLocationEvent}];
  
  
    //RCTLogInfo(@"significantLocationChange : %@", lastLocationEvent);
}



@end
