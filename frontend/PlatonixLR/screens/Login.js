import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';


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
    TextLinkContent

} from './../components/styles';

import {View} from 'react-native';

// colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Login = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper><StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/platonix.png')}/>
                <PageTitle>Device Log in</PageTitle>
                
                

                <Formik
                    initialValues={{serialnumber: '', password: '', enterName: ''}}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (values.serialnumber === 'ANP-766' && values.password === '123' && values.enterName === 'Private User') {
                            console.log(values);
                            navigation.navigate("Welcome");
                            resetForm();
                        } else {
                            alert('Invalid Device Serial Number, Password, or Name');
                            navigation.navigate("Login");
                        }
                        setSubmitting(false);
                    }}
                >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    <MyTextInput 
                        label="Device Serial Number"
                        icon="number"
                        placeholder="Enter the Serial Number"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('serialnumber')}
                        onBlur={handleBlur('serialnumber')}
                        value={values.serialnumber}
                        

                    />

                        <MyTextInput 
                        label=" Device Password"
                        icon="lock"
                        placeholder="* * * * * * * * * * * * * * *"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}

                    />
                    <MyTextInput 
                        label="Name"
                        icon="person"
                        placeholder="Enter your name"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('enterName')}
                        onBlur={handleBlur('enterName')}
                        value={values.enterName}
                        

                    />


                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>Access Device</ButtonText>
                    </StyledButton>
                    <Line />
                    <StyledButton help={true} onPress={() => {navigation.navigate('Help')}}>
                            <Fontisto name="mobile-alt" color={primary} size={25}/>
                        <ButtonText help={true}>Need Help?</ButtonText>
                    </StyledButton>
                    <ExtraView>
                        <ExtraText>Not Registered?</ExtraText>
                        <TextLink onPress={() => navigation.navigate('Register')}>
                            <TextLinkContent> Register Here</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>
                )}
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

export default Login;