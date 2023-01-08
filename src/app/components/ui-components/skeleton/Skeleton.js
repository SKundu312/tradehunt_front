import React, {useEffect, useRef} from 'react';
import {View, Dimensions, Animated, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from './../../../constants/colors';
const screenWidth = Dimensions.get('screen').width;

const SkeletonComponent = ({width, height, round, style}) => {
  const borderRadius = round ? screenWidth / 2 : 0;
  const translateX = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: screenWidth,
        useNativeDriver: true,
        duration: 1000,
      }),
    ).start();
  }, []);

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: AppColors.roseGray,
        overflow: 'hidden',
        borderRadius,
        ...style,
      }}>
      <Animated.View
        style={{width: '100%', height: '100%', transform: [{translateX}]}}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.1)', 'transparent']}
          style={{width: '100%', height: '100%'}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      </Animated.View>
    </View>
  );
};

export default SkeletonComponent;
