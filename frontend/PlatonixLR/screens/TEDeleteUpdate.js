import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { Alert } from 'react-native';
import {
  StyledContainer,
  InnerContainer,
  SubTitle,
  Colors,
  Line,
  HelpLogo,
  PageTitle1,
  PageTitle2,
  PageTitle3,
  Input,
  TEButton,
  TEButton1,
  TESubTitle,
  StyledButton,
  ButtonText,
  StyledButtonBack,
  PicturesLogo
} from './../components/styles';
import { View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';

const { brand, darkLight, primary } = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const TEDeleteUpdate = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://192.168.167.131:3000/api/v1/platonix/vehicle/search/all')
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (platonixID) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            fetch(`http://192.168.167.131:3000/api/v1/platonix/vehicle/remove/${platonixID}`, {
              method: 'DELETE',
            })
              .then((response) => response.json())
              .then(() => {
                const newVehicles = vehicles.filter((vehicle) => vehicle.platonixID !== platonixID);
                setVehicles(newVehicles);
              })
              .catch((error) => console.error(error));
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleUpdate = (platonixID) => {
    navigation.navigate('EditVehicle', { platonixID });
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchTermLower = searchQuery.toLowerCase();
    const plateNumberLower = vehicle.plateNumber.toLowerCase();
    const carRegistrationStatusLower = vehicle.carRegistrationStatus.toLowerCase();
    const carColorLower = vehicle.carColor.toLowerCase();
    const carMakerLower = vehicle.carMaker.toLowerCase();
    const carModelLower = vehicle.carModel.toLowerCase();
    const carCityLocationLower = vehicle.carCityLocation.toLowerCase();
  
    if (searchTermLower === "registered") {
      return carRegistrationStatusLower === "registered";
    } else if (searchTermLower === "unregistered") {
      return carRegistrationStatusLower === "unregistered";
    }
  
    return (
      plateNumberLower.includes(searchTermLower) ||
      carRegistrationStatusLower.includes(searchTermLower) ||
      carColorLower.includes(searchTermLower) ||
      carMakerLower.includes(searchTermLower) ||
      carModelLower.includes(searchTermLower) ||
      carCityLocationLower.includes(searchTermLower)
    );
  });
  

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
      <PicturesLogo resizeMode="contain" source={require('./../assets/img/editdelTE.png')}/>
        <PageTitle3>Edit or Delete </PageTitle3>
        <Line />
        <SubTitle>Text Entries</SubTitle>
        <Line />
        <TextInput
            style={{
                height: 50,
                width: 300,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: 'purple',
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 18,
                backgroundColor: '#fff',
                marginBottom: 20
            }}
            placeholder="Search Here"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
/>
                <FlatList
          data={filteredVehicles} // <-- Use filteredVehicles instead of vehicles
          renderItem={({ item }) => (
            <View>
            <TESubTitle>Plate Number: {item.plateNumber}</TESubTitle>
            <TESubTitle>Registration Status: {item.carRegistrationStatus}</TESubTitle>
            <TESubTitle>Color: {item.carColor}</TESubTitle>
            <TESubTitle>Maker: {item.carMaker}</TESubTitle>
            <TESubTitle>Model: {item.carModel}</TESubTitle>
            <TESubTitle>City Location: {item.carCityLocation}</TESubTitle>
            <View style={{flexDirection: 'row'}}>
              <TEButton1 onPress={() => handleUpdate(item.platonixID)} style={{marginRight: 10}}>
                <Text style={{color: 'white'}}>Edit</Text>
              </TEButton1>
              <TEButton onPress={() => handleDelete(item.platonixID)}>
                <Text style={{color: 'white'}}>Delete</Text>
              </TEButton>
            </View>
            <Line />
          </View>
                
                    )}
                    keyExtractor={item => item.platonixID.toString()}
                />
            </InnerContainer>
        </StyledContainer>
    );
};

export default TEDeleteUpdate;
