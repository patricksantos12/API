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
    StyledButtonBack

} from './../components/styles';

import {View} from 'react-native';

// colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const DAMenu = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);

    return (

        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/platonix.png')}/>
                    <PageTitle3>Data Analytics 2023</PageTitle3>
                    <Line />
                    <SubTitle>Pick from the options</SubTitle>
                    <Line />

                    <Formik
                        initialValues={{serialnumber: '', password: '', enterName: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <StyledFormArea>
                                
                            <PicturesLogo resizeMode="contain" source={require('./../assets/img/Location.png')}/>
                            <StyledButton onPress={() => {navigation.navigate('DALocation')}}>
                                <ButtonText>By Agency Location</ButtonText>
                            </StyledButton>

                            <PicturesLogo resizeMode="contain" source={require('./../assets/img/Registration.png')}/>
                            <StyledButton onPress={() => {navigation.navigate('DARegStatus')}}>
                                <ButtonText>By Registration Status</ButtonText>
                            </StyledButton>
                        </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
                <View>
              <Line />
            <StyledButtonBack onPress={() => {navigation.navigate('Welcome')}}>
                        <ButtonText>Back</ButtonText>
                    </StyledButtonBack>
            </View>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

export default DAMenu;
