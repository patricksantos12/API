import styled from 'styled-components';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors ={
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937", // corrected here
    darkLight: "#9CA3AF",
    brand: "#6d28d9",
    green: "#10b981",
    red: "#EF4444",
};

const {primary, secondary, tertiary, darkLight, brand, green, red} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    height: 100%;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${primary};
`

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;


export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const PageLogo = styled.Image`
    width: 300px;
    height: 250px;
    align-self: center;
    resizeMode: contain;
    padding: 25px;
    
`;

export const PicturesLogo = styled.Image`
    width: 130px;
    height: 130px;
    margin: auto;

`;
export const HelpLogo = styled.Image`
    width: 200px;
    height: 200px;
    margin: auto;

`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-raidus: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px
`;

export const WelcomeImage = styled.Image`
    height: 50%;
    min-width: 100%;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding-bottom: 50px;
    padding-top: 0px;

    ${(props) => props.welcome && 'font-size 35px;'}

`;
export const PageTitle1 = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding-top: 50px;

    ${(props) => props.welcome && 'font-size 35px;'}

`;

export const PageTitle2 = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding-top: 50px;

    ${(props) => props.welcome && 'font-size 35px;'}

`;
export const PageTitle3 = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding-top: 0px;
    padding-bottom: 10px;

    ${(props) => props.welcome && 'font-size 35px;'}

`;


export const SubTitle = styled.Text`
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
;
    

    ${(props) => props.welcome && 'margin-bottom: 5px; font-weight:normal;'}
`;

export const SubTitle1 = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
    margin: auto;
    padding-top: 0px;
    padding-bottom: 20px;
    

    ${(props) => props.welcome && 'margin-bottom: 5px; font-weight:normal;'}
`;
export const SubTitle2 = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
    margin: auto;
    padding-top: 0px;
    padding-bottom: 20px;
    

    ${(props) => props.welcome && 'margin-bottom: 5px; font-weight:normal;'}
`;

export const SubTitle3 = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${brand};
    margin: auto;
    padding-top: 0px;
    padding-bottom: 20px;
    

    ${(props) => props.welcome && 'margin-bottom: 5px; font-weight:normal;'}
`;

export const TESubTitle = styled.Text`
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
    padding-top: 0px;
    ${(props) => props.welcome && 'margin-bottom: 5px; font-weight:normal;'}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color:${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const TEStyledTextInput = styled.TextInput`
    background-color:${secondary};
    padding: 15px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index:1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index:1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.help == true && `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
    `}
`;
export const StyledButtonBack = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
    width: 300px;
    margin-left: auto;
    margin-right: auto;

    ${(props) => props.help == true && `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
    `}
`;


export const TEButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${red};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 40px;
    width: 110px;
    
`;
export const TEButton1 = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${green};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 40px;
    width: 110px;
    
`;

export const TEButton2 = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${green};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
    width: 160px;
    
`;
export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;

    ${(props) => props.help == true && `
    padding: 6px;
    `}
`;

export const MsgBox = styled.Text`
    text-align:center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`;

