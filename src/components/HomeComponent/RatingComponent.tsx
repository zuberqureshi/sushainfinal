import {FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';

// local imports
import images from '../../assets/images';
import {moderateScale} from '../../common/constants';
import { Box } from '@gluestack-ui/themed';

export default function RatingComponent({star, style}: any) {
  const RenderItem = ({item, index}: any) => {
    return (
      <Image key={item}
        source={item < star + 1 ? images.startFilled : images.startUnfilled}
        style={[localStyles.starImageStyle, style]}
      />
    );
  };

  return (
    // <FlatList
    //   data={[1, 2, 3, 4, 5]}
    //   renderItem={renderItem}
    //   keyExtractor={(item, index) => index.toString()}
    //   horizontal
    //   showsHorizontalScrollIndicator={false}
    //   scrollEnabled={false}
    // />
    <Box flexDirection='row' gap={2} >

    {['1','2','3','4','5'].map((item,index)=>{
     return(
        <RenderItem key={index.toString()} item={item} />
     )
    })}
    </Box>
  );
}

const localStyles = StyleSheet.create({
  starImageStyle: {
    height: moderateScale(15),
    width: moderateScale(15),
    marginHorizontal: moderateScale(2),
  },
});
