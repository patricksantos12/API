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
  PageTitle3
} from './../components/styles';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

// colors
const { brand, darkLight, primary } = Colors;

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
        navigation.goBack();
      })
      .catch(error => console.error(error));
  };

  if (!vehicle) {
    return null;
  }

  return (
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
              <Text>Plate Number:</Text>
              <TextInput
                onChangeText={handleChange('plateNumber')}
                onBlur={handleBlur('plateNumber')}
                value={values.plateNumber}
              />
              <Text>Registration Status:</Text>
              <TextInput
                onChangeText={handleChange('carRegistrationStatus')}
                onBlur={handleBlur('carRegistrationStatus')}
                value={values.carRegistrationStatus}
              />
              <Text>Color:</Text>
              <TextInput
                onChangeText={handleChange('carColor')}
                onBlur={handleBlur('carColor')}
                value={values.carColor}
              />
              <Text>Maker:</Text>
              <TextInput
                onChangeText={handleChange('carMaker')}
                onBlur={handleBlur('carMaker')}
                value={values.carMaker}
              />
              <Text>Model:</Text>
              <TextInput
                onChangeText={handleChange('carModel')}
                onBlur={handleBlur('carModel')}
                value={values.carModel}
              />
              <Text>City Location:</Text>
              <TextInput
                onChangeText={handleChange('carCityLocation')}
                onBlur={handleBlur('carCityLocation')}
                value={values.carCityLocation}
              />
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={{ color: 'blue' }}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

export default EditVehicle;
