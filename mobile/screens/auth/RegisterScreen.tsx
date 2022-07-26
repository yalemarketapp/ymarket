import React, { FC, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { LoggedOutStackParamList } from '../../navigation/NavigationTypes';

const RegisterScreen: FC<StackScreenProps<LoggedOutStackParamList>> = ({ navigation }) => {
    const [firstName, setFirstName] = useState({ value: '', error: '' });
    const [lastName, setLastName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [passwordConfirm, setPasswordConfirm] = useState({ value: '', error: '' });

    // const onSignUpPressed = async () => {
    //     const firstNameError = nameValidator(firstName.value);
    //     const lastNameError = nameValidator(lastName.value);
    //     const emailError = emailValidator(email.value);
    //     const passwordError = passwordValidator(password.value);
    //     if (firstNameError || lastNameError || emailError || passwordError) {
    //         setEmail({ ...email, error: emailError });
    //         setPassword({ ...password, error: passwordError });
    //         return;
    //     }

    //     const email_val = email.value;
    //     const firstName_val = firstName.value;
    //     const lastName_val = lastName.value;
    //     const password_val = password.value;
    //     const passwordConfirm_val = passwordConfirm.value;

    //     const response = await API.post('api/users/register/', {
    //         email: email_val,
    //         first_name: firstName_val,
    //         last_name: lastName_val,
    //         password1: password_val,
    //         password2: passwordConfirm_val,
    //     })
    //         .then(function (response) {
    //             navigation.navigate('ConfirmationScreen');
    //         })
    //         .catch(function (error) {
    //             if (error.response) {
    //                 console.log(error.response);
    //                 setPassword({ ...password, error: error.response.data[Object.keys(error.response.data)[0]] });
    //             } else {
    //                 console.log(error.toJSON());
    //                 console.log('Error', error.message);
    //             }
    //         });
    // };

    return (
        <View style={styles.container}>
            {/* <BackButton goBack={navigation.goBack} /> */}
            {/* <View style={styles.separator} /> */}
            <Text style={styles.header}>Create Account</Text>
            {/* <TextInput
                label="First Name"
                returnKeyType="next"
                value={firstName.value}
                onChangeText={(text: any) => setFirstName({ value: text, error: '' })}
                error={!!firstName.error}
                errorText={firstName.error}
                description
            />
            <TextInput
                label="Last Name"
                returnKeyType="next"
                value={lastName.value}
                onChangeText={(text: any) => setLastName({ value: text, error: '' })}
                error={!!lastName.error}
                errorText={lastName.error}
                description
            />
            <TextInput
                label="Yale Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text: any) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text: any) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <TextInput
                label="Confirm Password"
                returnKeyType="done"
                value={passwordConfirm.value}
                onChangeText={(text: any) => setPasswordConfirm({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            /> */}
            {/* <TouchableOpacity style={styles.button} onPress={onSignUpPressed}>
                <Text style={styles.title}>Sign Up</Text>
            </TouchableOpacity> */}
            <View style={styles.separator} />
            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Arial',
    },
    separator: {
        marginVertical: 6,
        height: 3,
        width: '50%',
    },
    header: {
        fontSize: 21,
        color: '#0f4d92',
        fontWeight: 'bold',
        paddingVertical: 12,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0f4d92',
        padding: 10,
        marginTop: 20,
        width: 100,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
    },
});

export default RegisterScreen;