import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import * as Yup from 'yup';


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
    SubTitle1,
    PicturesLogo,
    StyledButtonBack

} from '../components/styles';

import {View} from 'react-native';

// colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';


const validationSchema = Yup.object().shape({
  plateNumber: Yup.string()
    .required('Plate Number is required'),
  carRegistrationStatus: Yup.string()
    .required('Registration Status is required'),
  carColor: Yup.string()
    .required('Color is required'),
  carMaker: Yup.string()
    .required('Brand is required'),
  carModel: Yup.string()
    .required('Model is required'),
  carCityLocation: Yup.string()
    .required('City Location is required')
});


const TEAdd = ({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);


    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
            <PicturesLogo resizeMode="contain" source={require('./../assets/img/addTE.png')}/>
                <PageTitle1>Text Entry Processing</PageTitle1>
                <Line />
                <SubTitle1>Enter Text here</SubTitle1>

                <Formik
  initialValues={{plateNumber: '', carRegistrationStatus: '', carColor: '', carMaker: '', carModel: '', carCityLocation: '' }}
  validationSchema={validationSchema}
  onSubmit={(values, { setSubmitting, resetForm }) =>  {
    axios.post('http://192.168.167.131:3000/api/v1/platonix/vehicle/addVehicle', {
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
        alert("Successfully added!"); // adding the alert message
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
{({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (<StyledFormArea>
  <MyTextInput 
    label="Plate Number"
    icon="number"
    placeholder="Enter Plate Number"
    placeholderTextColor={darkLight}
    onChangeText={handleChange('plateNumber')}
    onBlur={handleBlur('plateNumber')}
    value={values.plateNumber}
  />
  {errors.plateNumber && touched.plateNumber && <MsgBox>{errors.plateNumber}</MsgBox>}

  <MyTextInput 
    label="Registration Status"
    icon="verified"
    placeholder="Enter Status"
    placeholderTextColor={darkLight}
    onChangeText={handleChange('carRegistrationStatus')}
    onBlur={handleBlur('carRegistrationStatus')}
    value={values.carRegistrationStatus}
  />
  {errors.carRegistrationStatus && touched.carRegistrationStatus && <MsgBox>{errors.carRegistrationStatus}</MsgBox>}

  <MyTextInput 
    label="Color"
    icon="sun"
    placeholder="Enter Color"
    placeholderTextColor={darkLight}
    onChangeText={handleChange('carColor')}
    onBlur={handleBlur('carColor')}
    value={values.carColor}
  />
  {errors.carColor && touched.carColor && <MsgBox>{errors.carColor}</MsgBox>}

  <MyTextInput 
    label="Brand"
    icon="cross-reference"
    placeholder="Enter brand"
    placeholderTextColor={darkLight}
    onChangeText={handleChange('carMaker')}
    onBlur={handleBlur('carMaker')}
    value={values.carMaker}
  />
  {errors.carMaker && touched.carMaker && <MsgBox>{errors.carMaker}</MsgBox>}

  <MyTextInput 
    label="Model"
    icon="apps"
    placeholder="Enter Model"
    placeholderTextColor={darkLight}
    onChangeText={handleChange('carModel')}
    onBlur={handleBlur('carModel')}
    value={values.carModel}
  />
  {errors.carModel && touched.carModel && <MsgBox>{errors.carModel}</MsgBox>}

  <MyTextInput 
    label="City Location"
    icon="location"
    placeholder="Enter Location"
    placeholderTextColor={darkLight}
    onChangeText={handleChange('carCityLocation')}
    onBlur={handleBlur('carCityLocation')}
    value={values.carCityLocation}
  />
 {errors.carCityLocation && touched.carCityLocation && <MsgBox>{errors.carCityLocation}</MsgBox>}


                        
                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={handleSubmit}>

                        <ButtonText>Enter</ButtonText>
                    </StyledButton>
                    <Line />

                    <StyledButtonBack onPress={() => {navigation.navigate('TEDeleteUpdate')}}>
                        <ButtonText>Search, Edit, and Delete Text Entries</ButtonText>
                    </StyledButtonBack>
  
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