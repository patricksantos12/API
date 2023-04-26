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

const TEMenu = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);

    return (

        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle3>Text Entry Processing</PageTitle3>
                    <Line />
                    <SubTitle>Pick from the options below</SubTitle>
                    <Line />

                    <Formik
                        initialValues={{serialnumber: '', password: '', enterName: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <StyledFormArea>
                                

                                <StyledButton onPress={() => {navigation.navigate('TEAdd')}}>
                                    <ButtonText>Add Text Entry</ButtonText>
                                </StyledButton>

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Edit/Update Text Entry</ButtonText>
                                </StyledButton>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Delete Text Entry</ButtonText>
                                </StyledButton>
                            </StyledFormArea>

                            

                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

export default TEMenu;
