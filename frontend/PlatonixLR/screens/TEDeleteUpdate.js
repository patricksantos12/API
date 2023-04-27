import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
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
} from './../components/styles';
import { View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';

const { brand, darkLight, primary } = Colors;

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const TEDeleteUpdate = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://192.168.100.212:3000/api/v1/platonix/vehicle/search/all')
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (platonixID) => {
    fetch(`http://192.168.100.212:3000/api/v1/platonix/vehicle/remove/${platonixID}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        const newVehicles = vehicles.filter((vehicle) => vehicle.platonixID !== platonixID);
        setVehicles(newVehicles);
      })
      .catch((error) => console.error(error));
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
        <PageTitle3>Edit or Delete Text Entries</PageTitle3>
        <Line />
        <SubTitle>Search Here</SubTitle>
        <Line />
        <TextInput
            style={{
                height: 50,
                width: 300,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: 'black',
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 18,
                backgroundColor: '#fff',
                marginBottom: 20
            }}
            placeholder="Search"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
/>
                <FlatList
          data={filteredVehicles} // <-- Use filteredVehicles instead of vehicles
          renderItem={({ item }) => (
            <View>
                            <Text>Plate Number: {item.plateNumber}</Text>
                            <Text>Registration Status: {item.carRegistrationStatus}</Text>
                            <Text>Color: {item.carColor}</Text>
                            <Text>Maker: {item.carMaker}</Text>
                            <Text>Model: {item.carModel}</Text>
                            <Text>City Location: {item.carCityLocation}</Text>
                            <TouchableOpacity onPress={() => handleDelete(item.platonixID)}>
                                <Text style={{color: 'red'}}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleUpdate(item.platonixID)}>
                                <Text style={{color: 'blue'}}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.platonixID.toString()}
                />
            </InnerContainer>
        </StyledContainer>
    );
};

export default TEDeleteUpdate;
