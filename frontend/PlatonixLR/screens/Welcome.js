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
    PicturesLogo,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    PageTitle3

} from './../components/styles';

import {View} from 'react-native';

// colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Menu = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper><StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/platonix.png')}/>
                <Line />
                <PageTitle3>Menu Page</PageTitle3>
                <Line />
                
                

                <Formik
                    initialValues={{serialnumber: '', password: '', enterName: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    
                    

                    <PicturesLogo resizeMode="contain" source={require('./../assets/img/DataAnalytics.png')}/>
                    <StyledButton onPress={() => {navigation.navigate('DAMenu')}}>
                        <ButtonText>Data Analytics</ButtonText>
                    </StyledButton>

                    <PicturesLogo resizeMode="contain" source={require('./../assets/img/TextEntry.png')}/>
                    <StyledButton onPress={() => {navigation.navigate('TEMenu')}}>
                        <ButtonText>Text-Entry Processing</ButtonText>
                    </StyledButton>
                    <Line />
                    <StyledButton onPress={() => {navigation.navigate('Login')}}>
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>
                   
                    
                </StyledFormArea>
                )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
       
    );
};


export default Menu;