import React, {useState, useEffect} from 'react';
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

import {View, FlatList, Text, TouchableOpacity} from 'react-native';

// colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const TEDeleteUpdate = ({navigation}) => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch('http://192.168.100.212:3000/api/v1/platonix/vehicle/search/all')
            .then(response => response.json())
            .then(data => setVehicles(data))
            .catch(error => console.error(error))
    }, []);

    const handleDelete = (platonixID) => {
        fetch(`http://192.168.100.212:3000/api/v1/platonix/vehicle/remove/${platonixID}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(() => {
            const newVehicles = vehicles.filter(vehicle => vehicle.platonixID !== platonixID);
            setVehicles(newVehicles);
          })
          .catch(error => console.error(error));
      }
      

    return (
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle3>Edit or Delete</PageTitle3>
                    <Line />
                    <SubTitle>Text Entries</SubTitle>
                    <Line />
                    <FlatList
                        data={vehicles}
                        renderItem={({item}) => (
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
                            </View>
                        )}
                        keyExtractor={item => item.platonixID.toString()}
                    />
                </InnerContainer>
            </StyledContainer>
    );
};

export default TEDeleteUpdate;
