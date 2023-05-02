import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

import {
    StyledContainer,
    InnerContainer,
    PageTitle3,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    SubTitle3,
    TESubTitle,
    PageLogo,
    PicturesLogo
} from './../components/styles';

import {View, Text} from 'react-native';

// API endpoint
const API_ENDPOINT = 'http://192.168.167.131:3000/api/v1/platonix/vehicle/search/all';

const DARegStatus = () => {

    const [vehicleData, setVehicleData] = useState([]);
    const [registeredCount, setRegisteredCount] = useState(0);
    const [unregisteredCount, setUnregisteredCount] = useState(0);

    // fetch data from API
    useEffect(() => {
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(data => setVehicleData(data))
            .catch(error => console.log(error));
    }, []);

    // count registered and unregistered vehicles
    useEffect(() => {
        const registeredVehicles = vehicleData.filter(vehicle => vehicle.carRegistrationStatus === 'Registered');
        const unregisteredVehicles = vehicleData.filter(vehicle => vehicle.carRegistrationStatus === 'Unregistered');
        setRegisteredCount(registeredVehicles.length);
        setUnregisteredCount(unregisteredVehicles.length);
    }, [vehicleData]);

    return (

        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
            <PageLogo resizeMode="cover" source={require('./../assets/img/Registration.png')}/>
                <PageTitle3>Data Analytics 2023</PageTitle3>
                <Line />
                
                <SubTitle>Gathered Data By Registration Status</SubTitle>
                <Line />
                <Formik
                    initialValues={{serialnumber: '', password: '', enterName: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
                          
                        </StyledFormArea>
                    )}
                </Formik>

                <View>
                <PicturesLogo resizeMode="contain" source={require('./../assets/img/registered.png')}/>
                <SubTitle3>
                    <SubTitle3>Overall Registered Vehicles: </SubTitle3>
                    <SubTitle>{registeredCount}</SubTitle>
                </SubTitle3>
                <PicturesLogo resizeMode="contain" source={require('./../assets/img/unregistered.png')}/>
                <SubTitle3>
                <SubTitle3>Overall Unregistered Vehicles: </SubTitle3>
                    <SubTitle>{unregisteredCount}</SubTitle>
                </SubTitle3>
                </View>


            </InnerContainer>
        </StyledContainer>
    );
};

export default DARegStatus;
