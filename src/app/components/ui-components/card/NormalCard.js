import React from 'react'
import { StyleSheet, View } from "react-native";
import { Layouts } from '../../../constants/theme';
import { AppColors } from "./../../../constants/colors";

const Card = ({  children, style }) => {
    return(
    <View
        style={[
            styles.card,
            style
        ]}
    >
        {children}
    </View>
)};

const styles = StyleSheet.create({
    card: {
        width: '95%',
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        backgroundColor: AppColors.white,
        padding: Layouts.medium,
        borderRadius: Layouts.medium,
        margin: Layouts.regular
    }
})
export default Card;