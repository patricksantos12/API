import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

// icons
import { Octicons, Ionicons, Fontisto, Zocial } from '@expo/vector-icons';


import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    PageTitle1,
    SubTitle1

} from './../components/styles';

import {View} from 'react-native';

// colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';


const TextEntry = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
           
                <PageTitle1>Text Entry Processing</PageTitle1>
                <Line />
                <SubTitle1>Enter Text here</SubTitle1>

                <Formik
                    initialValues={{ownername: '', serialnumber: '', password: '', confirmPassword: '' }}
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.navigate('Welcome')
                    }}
                >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    <MyTextInput 
                        label="Plate Number"
                        icon="number"
                        placeholder="Enter Plate Number"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('serialnumber')}
                        onBlur={handleBlur('serialnumber')}
                        value={values.serialnumber}
                    />

                        <MyTextInput 
                        label="Registration Status"
                        icon="verified"
                        placeholder="Enter Status"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('ownername')}
                        onBlur={handleBlur('ownername')}
                        value={values.ownername}
                    />
                    <MyTextInput 
                        label="Car Color"
                        icon="sun"
                        placeholder="Enter Color"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('ownername')}
                        onBlur={handleBlur('ownername')}
                        value={values.ownername}
                    />
                    <MyTextInput 
                        label="Car Maker"
                        icon="cross-reference"
                        placeholder="Enter Maker"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('ownername')}
                        onBlur={handleBlur('ownername')}
                        value={values.ownername}
                    />
                    <MyTextInput 
                        label="Car Model"
                        icon="apps"
                        placeholder="Enter Model"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('ownername')}
                        onBlur={handleBlur('ownername')}
                        value={values.ownername}
                    />
                    <MyTextInput 
                        label="Car City Location"
                        icon="location"
                        placeholder="Enter Location"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('ownername')}
                        onBlur={handleBlur('ownername')}
                        value={values.ownername}
                    />

                        
                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>Enter</ButtonText>
                    </StyledButton>
                    <Line />

                        
                </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} colors={darkLight}/>
                </RightIcon>
            )}
        </View>
    )

}

export default TextEntry;