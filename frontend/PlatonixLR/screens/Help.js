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
    HelpLogo,
    PageTitle1,
    PageTitle2,
    PageTitle3,

} from './../components/styles';

import {View} from 'react-native';

// colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Help = () => {

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper><StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
            <PicturesLogo resizeMode="cover" source={require('./../assets/img/Help.png')}/>
                <PageTitle3>Need Help?</PageTitle3>
                <Line />
                <SubTitle>Contact our Develpers</SubTitle>
                <Line />

                <Formik
                    initialValues={{serialnumber: '', password: '', enterName: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    
                    <HelpLogo resizeMode="cover" source={require('./../assets/img/nicole.jpg')}/>
                    <PageTitle3>Nicole Mercado</PageTitle3>
                    <SubTitle>email:</SubTitle>
                    <SubTitle>nicole@gmail.com</SubTitle>
                    <SubTitle>contact number:</SubTitle>
                    <SubTitle>09545454</SubTitle>
                    <Line />
                    <HelpLogo resizeMode="cover" source={require('./../assets/img/albert.jpg')}/>
                    <PageTitle3>Albert Tongol</PageTitle3>
                    <SubTitle>email:</SubTitle>
                    <SubTitle>albert@gmail.com</SubTitle>
                    <SubTitle>contact number:</SubTitle>
                    <SubTitle>0959595959</SubTitle>
                    <Line />
                    <HelpLogo resizeMode="cover" source={require('./../assets/img/pat.jpg')}/>
                    <PageTitle3>Patrick Santos</PageTitle3>
                    <SubTitle>email:</SubTitle>
                    <SubTitle>patricksantos2627@gmail.com</SubTitle>
                    <SubTitle>contact number:</SubTitle>
                    <SubTitle>09519898644</SubTitle>
                
                    <Line />
                    <PageTitle3>or</PageTitle3>
                   
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>Play a Demo Video</ButtonText>
                    </StyledButton>

                </StyledFormArea>
                )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
       
    );
};

export default Help;