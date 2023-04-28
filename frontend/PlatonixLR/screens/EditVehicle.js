import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import {
  StyledContainer,
  InnerContainer,
  SubTitle,
  Colors,
  Line,
  PageTitle1,
  PageTitle2,
  PageTitle3,
  TEButton1,
  TEButton2,
  TESubTitle,
  StyledTextInput,
  TEStyledTextInput,
  StyledButtonBack,
  ButtonText,
  PicturesLogo
} from './../components/styles';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

// colors
const { brand, darkLight, primary } = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const EditVehicle = ({ route, navigation }) => {
  const { platonixID } = route.params;
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.100.212:3000/api/v1/platonix/vehicle/search/id/${platonixID}`)
      .then(response => response.json())
      .then(data => setVehicle(data))
      .catch(error => console.error(error));
  }, [platonixID]);

  const handleUpdate = (values) => {
    fetch(`http://192.168.100.212:3000/api/v1/platonix/vehicle/update/${platonixID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(() => {
        navigation.navigate('TEMenu'); // navigate to TEMenu screen
      })
      .catch(error => console.error(error));
};

  if (!vehicle) {
    return null;
  }

  return (
    <KeyboardAvoidingWrapper>
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle3>Edit Vehicle</PageTitle3>
        <Line />
        <Formik
          initialValues={{
            plateNumber: vehicle.plateNumber,
            carRegistrationStatus: vehicle.carRegistrationStatus,
            carColor: vehicle.carColor,
            carMaker: vehicle.carMaker,
            carModel: vehicle.carModel,
            carCityLocation: vehicle.carCityLocation
          }}
          onSubmit={handleUpdate}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TESubTitle>Plate Number:</TESubTitle>
              <TEStyledTextInput
                onChangeText={handleChange('plateNumber')}
                onBlur={handleBlur('plateNumber')}
                value={values.plateNumber}
              />
              <TESubTitle>Registration Status:</TESubTitle>
              <TEStyledTextInput
                onChangeText={handleChange('carRegistrationStatus')}
                onBlur={handleBlur('carRegistrationStatus')}
                value={values.carRegistrationStatus}
              />
              <TESubTitle>Color:</TESubTitle>
              <TEStyledTextInput
                onChangeText={handleChange('carColor')}
                onBlur={handleBlur('carColor')}
                value={values.carColor}
              />
              <TESubTitle>Maker:</TESubTitle>
              <TEStyledTextInput
                onChangeText={handleChange('carMaker')}
                onBlur={handleBlur('carMaker')}
                value={values.carMaker}
              />
              <TESubTitle>Model:</TESubTitle>
              <TEStyledTextInput
                onChangeText={handleChange('carModel')}
                onBlur={handleBlur('carModel')}
                value={values.carModel}
              />
              <TESubTitle>City Location:</TESubTitle>
              <TEStyledTextInput
                onChangeText={handleChange('carCityLocation')}
                onBlur={handleBlur('carCityLocation')}
                value={values.carCityLocation}
              />
              <TEButton2 onPress={handleSubmit}>
                <Text style={{ color: 'white' }}>Save Changes</Text>
              </TEButton2>
            </View>
          )}
        </Formik>
      </InnerContainer>
      <PicturesLogo resizeMode="contain" source={require('./../assets/img/changes.png')}/>
    </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default EditVehicle;
