import React from 'react';

import { View } from 'react-native';

// import { Container } from './styles';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Prueba = () => {




    return (

        <SkeletonPlaceholder>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 60, height: 60, borderRadius: 50 , }} />
          <View style={{ marginLeft: 20 }}>
              
            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    )
}

export default Prueba;
