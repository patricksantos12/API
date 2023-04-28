import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyledContainer,
  InnerContainer,
  PageTitle3,
  SubTitle,
  Line,
  StyledButton,
  ButtonText,
  SubTitle1,
  TESubTitle,
  TESubTitle2,
  SubTitle3,
  PageLogo
} from '../components/styles';
import { View, TextInput, ScrollView } from 'react-native';

const DALocation = () => {
  const [carData, setCarData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://192.168.100.212:3000/api/v1/platonix/vehicle/search/all')
      .then((response) => response.json())
      .then((data) => setCarData(data));
  }, []);

  const locationCounts = carData.reduce((groups, car) => {
    const { carCityLocation, carRegistrationStatus } = car;
    if (!groups[carCityLocation]) {
      groups[carCityLocation] = { registered: 0, unregistered: 0 };
    }
    if (carRegistrationStatus === 'Registered') {
      groups[carCityLocation].registered += 1;
    } else {
      groups[carCityLocation].unregistered += 1;
    }
    return groups;
  }, {});

  const styles = {
    searchInput: {
      borderWidth: 1,
      borderColor: 'purple',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
      <PageLogo resizeMode="cover" source={require('./../assets/img/Location.png')}/>
        <PageTitle3>Data Analytics 2023</PageTitle3>
        <Line />
        <SubTitle>Gathered Data By Location</SubTitle>
        <Line />
        <ScrollView>
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search location"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {Object.entries(locationCounts)
              .filter(([location]) => location.includes(searchQuery))
              .map(([location, counts]) => (
                <View key={location}>
                  <SubTitle3>{location}</SubTitle3>
                  <TESubTitle2>Total Registered: {counts.registered}</TESubTitle2>
                  <TESubTitle2>Total Unregistered: {counts.unregistered}</TESubTitle2>
                  <Line />
                </View>
              ))}
          </View>
        </ScrollView>
      </InnerContainer>
    </StyledContainer>
  );
};

export default DALocation;
