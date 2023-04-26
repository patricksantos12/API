import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

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

} from '../components/styles';

import {View} from 'react-native';

// colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';


const TEAdd = ({navigation}) => {

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
  initialValues={{plateNumber: '', carRegistrationStatus: '', carColor: '', carMaker: '', carModel: '', carCityLocation: '' }}
  onSubmit={(values, { setSubmitting, resetForm }) => {
    axios.post('http://192.168.100.212:3000/api/v1/platonix/addVehicle', {
      plateNumber: values.plateNumber,
      carRegistrationStatus: values.carRegistrationStatus,
      carColor: values.carColor,
      carMaker: values.carMaker,
      carModel: values.carModel,
      carCityLocation: values.carCityLocation
    })
      .then(response => {
        console.log(response.data);
        // handle success, e.g. show success message to the user
        resetForm();
      })
      .catch(error => {
        console.error(error);
        // handle error, e.g. show error message to the user
      })
      .finally(() => {
        setSubmitting(false);
      });
  }}
>
                {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    <MyTextInput 
                        label="Plate Number"
                        icon="number"
                        placeholder="Enter Plate Number"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('plateNumber')}
                        onBlur={handleBlur('plateNumber')}
                        value={values.plateNumber}
                    />

                        <MyTextInput 
                        label="Registration Status"
                        icon="verified"
                        placeholder="Enter Status"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('carRegistrationStatus')}
                        onBlur={handleBlur('carRegistrationStatus')}
                        value={values.carRegistrationStatus}
                    />
                    <MyTextInput 
                        label="Car Color"
                        icon="sun"
                        placeholder="Enter Color"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('carColor')}
                        onBlur={handleBlur('carColor')}
                        value={values.carColor}
                    />
                    <MyTextInput 
                        label="Car Brand"
                        icon="cross-reference"
                        placeholder="Enter brand"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('carMaker')}
                        onBlur={handleBlur('carMaker')}
                        value={values.carMaker}
                    />
                    <MyTextInput 
                        label="Car Model"
                        icon="apps"
                        placeholder="Enter Model"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('carModel')}
                        onBlur={handleBlur('carModel')}
                        value={values.carModel}
                    />
                    <MyTextInput 
                        label="Car City Location"
                        icon="location"
                        placeholder="Enter Location"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('carCityLocation')}
                        onBlur={handleBlur('carCityLocation')}
                        value={values.carCityLocation}
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

export default TEAdd;