import { View, Text } from "react-native";
import Login from "./../components/Login"
import {auth} from './../configs/FirebaseConfig'
import { Redirect } from "expo-router";

export default function Index() {

    const user = auth.currentUser;

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Redirect href={'/mytrip'} />

            {/* no internet to login
            {user? 
                <Redirect href={'/mytrip'} /> :
                <Login />
            } */}
        </View>
    )
}