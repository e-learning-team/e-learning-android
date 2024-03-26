import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Touchable,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    Alert,
    Pressable,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import { useRealm } from '../models/UserLoginData';
import { deleteUser, getAccessToken, getUser, saveUser } from '../storage/AsyncStorage';
import { COLORS, SIZES, FONTS, images, icons } from '../constants';
import { LineDivider, TextButton } from '../components';
import { apiProfileUpdate, apiProfileUpdateAddress, apiProfileUpdateFullName, apiProfileUpdatePassword, apiProfileUpdatePhoneNumber, apiUserDetail } from '../apis/user';
import Spinner from 'react-native-loading-spinner-overlay';
// import Overlay from 'react-native-modal-overlay';
const ProfileItem = ({ icon, lable, value, onPress, type, isChanged }: { icon?: any; lable?: string; value?: any; onPress?: any; type?: any; isChanged?: any }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [onChange, setOnChange] = React.useState(false);
    const modalRef = useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [form, setForm] = React.useState(value?.value)
    const [showPass, setShowPass] = React.useState(false);
    const [showNewPass, setShowNewPass] = React.useState(false);
    const [showConfirmPass, setShowConfirmPass] = React.useState(false);
    const [resetPasswordForm, setResetPasswordForm] = React.useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [errorMessage, setErrorMessage] = React.useState({ currentPasswordError: '', newPasswordError: '', confirmPasswordError: '' });
    const validatePassword = () => {
        let isValid = true;
        if (resetPasswordForm.currentPassword.length < 8) {
            isValid = false;
            setErrorMessage(prevState => ({
                ...prevState,
                currentPasswordError: 'Password must be at least 6 characters long'
            }));
        }
        if (resetPasswordForm.newPassword.length < 8) {
            isValid = false;
            setErrorMessage(prevState => ({
                ...prevState,
                newPasswordError: 'Password must be at least 6 characters long'
            }));
        }
        if (resetPasswordForm.newPassword !== resetPasswordForm.confirmPassword) {
            console.log('password not match');
            isValid = false;
            setErrorMessage(prevState => ({
                ...prevState,
                confirmPasswordError: 'Password does not match'
            }));
        } else if (resetPasswordForm.confirmPassword === '') {
            isValid = false;
            setErrorMessage(prevState => ({
                ...prevState,
                confirmPasswordError: 'Confirm password is required'
            }));
        }

        if (isValid) {
            setErrorMessage({
                currentPasswordError: '',
                newPasswordError: '',
                confirmPasswordError: ''
            });
        }
        return isValid;
    }
    const handlePasswordChange = async () => {
        if (validatePassword()) {
            console.log('resetPasswordForm', resetPasswordForm);
            try{
                const res = await apiProfileUpdatePassword(value?.id, resetPasswordForm);
                if (res?.status === 1) {
                    Alert.alert('Update password success');
                    setShowModal(false);
                } else {
                    Alert.alert('Update password failed ', res?.message);
                }
            }catch(e){
                console.log('error', e);
            }
        }
    }
    const handleChange = () => {
        isChanged && isChanged(true);
    }
    const handleShow = () => {
        setShowModal(false);
    }

    const saveData = async () => {
        if (!loading) {
            setLoading(true);
            try {
                let apiFunction;
                let logMessage;

                switch (type) {
                    case 'full_name':
                        apiFunction = apiProfileUpdateFullName;
                        logMessage = 'full_name';
                        break;
                    case 'phone_number':
                        apiFunction = apiProfileUpdatePhoneNumber;
                        logMessage = 'phone_number';
                        break;
                    case 'address':
                        apiFunction = apiProfileUpdateAddress;
                        logMessage = 'address';
                        break;
                    default:
                        // Handle other cases or raise an error if needed
                        break;
                }

                if (apiFunction) {
                    const res = await apiFunction(value?.id, form);
                    if (res?.status === 1) {
                        Alert.alert('Update success');
                        setShowModal(false);
                    } else {
                        Alert.alert('Update failed');
                    }
                }
            } catch (e) {
                console.log('error', e);
            }
            handleChange();
            setLoading(false);
        }
    };
    const handleSave = async () => {
        await saveData();
        // const res = await apiProfileUpdate(form);
        // if (res?.status == 1) {
        //     console.log('update success', res);
        //     Alert.alert('update success');
        //     setShowModal(false);
        // } else {
        //     Alert.alert('update failed');
        // }
    }
    return (
        <>
            <TouchableOpacity
                onPress={() => onPress && setShowModal(!showModal)}
                className="flex-row h-[80]  items-center">
                <View
                    className="w-[40] h-[40] items-center justify-center rounded-[20]"
                    style={{ backgroundColor: COLORS.additionalColor11 }}>
                    <Image
                        source={icon}
                        className="w-[25] h-[25]"
                        style={{ tintColor: COLORS.primary }}
                        resizeMode="contain"
                    />
                </View>

                <View className="flex-1" style={{ marginLeft: SIZES.radius }}>
                    {lable && (
                        <Text className="" style={{ ...FONTS.body3, color: COLORS.gray30 }}>
                            {lable}
                        </Text>
                    )}

                    {value && (
                        <Text className="text-black" style={{ ...FONTS.h3 }}>
                            {value?.value}
                        </Text>
                    )}
                </View>

                {onPress && (
                    <Image
                        source={icons.right_arrow}
                        className="w-[15] h-[15]"
                        style={{ tintColor: COLORS.gray30 }}
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
            {type != 'password' ? (
                <View className='' style={{}} >
                    <Modal
                        animationType='fade'
                        visible={showModal}
                        onDismiss={() => handleShow()}
                        transparent={true}
                        onRequestClose={() => {
                            handleShow()
                        }}>
                        <TouchableWithoutFeedback onPress={() => handleShow()}>
                            <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }} />
                        </TouchableWithoutFeedback>
                        <View style={{
                            position: 'absolute',
                            width: '100%',
                            right: '5%',
                            left: '5%',
                            top: '30%',
                        }}>
                            <View className={`w-[380] p-[20] justify-center items-center ${onChange && 'py-[80]'}`} style={{
                                backgroundColor: COLORS.additionalColor9, borderRadius: SIZES.radius,
                            }}>
                                <View className="flex-row h-[80]  items-center">
                                    <View
                                        className="w-[40] h-[40] items-center justify-center rounded-[20]"
                                        style={{ backgroundColor: COLORS.additionalColor11 }}>
                                        <Image
                                            source={icon}
                                            className="w-[25] h-[25]"
                                            style={{ tintColor: COLORS.primary }}
                                            resizeMode="contain"
                                        />
                                    </View>

                                    <View className="flex-1" style={{ marginLeft: SIZES.radius }}>
                                        <Text className="" style={{ ...FONTS.body3, color: COLORS.gray30 }}>
                                            {lable}
                                        </Text>

                                        {!onChange ? (
                                            <Text className="text-black" style={{ ...FONTS.h3 }} numberOfLines={1}>
                                                {value?.value}
                                            </Text>
                                        ) : (
                                            <TextInput
                                                placeholder={value?.value}
                                                placeholderTextColor={COLORS.gray30}
                                                onChangeText={(value) => setForm(value)}
                                                value={form}
                                                style={{
                                                    ...FONTS.h3,
                                                    color: COLORS.black,
                                                    borderBottomColor: COLORS.gray30,
                                                    borderBottomWidth: 1,
                                                    width: '90%',
                                                }}
                                            />
                                        )}

                                        {onChange && (
                                            <View className='flex-row justify-between items-center mt-[40]'>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setOnChange(!onChange);
                                                    }}
                                                    className="flex-row items-center bg-[#da4040] px-[20] justify-center h-[40] rounded-[20]"
                                                    style={{
                                                        borderRadius: SIZES.radius,
                                                        backgroundColor: '#da4040'
                                                    }}>
                                                    <Text className="text-white" style={{ ...FONTS.h3 }}>
                                                        Cancel
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => handleSave()}
                                                    className="flex-row items-center px-[20] justify-center h-[40] rounded-[20]"
                                                    style={{
                                                        backgroundColor: COLORS.primary,
                                                        borderRadius: SIZES.radius,
                                                    }}>
                                                    <Text className="text-white" style={{ ...FONTS.h3 }}>
                                                        Save
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>
                                        )}
                                    </View>
                                    {!onChange && (
                                        <TouchableOpacity
                                            onPress={() => setOnChange(!onChange)}
                                            className="w-[40] h-[40] items-center justify-center rounded-[20]"
                                            style={{}}>
                                            <Image
                                                source={icons.edit}
                                                className="w-[25] h-[25]"
                                                style={{ tintColor: COLORS.black }}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            ) : (
                <>
                    <View className='' style={{}} >
                        <Modal
                            animationType='fade'
                            visible={showModal}
                            onDismiss={() => handleShow()}
                            transparent={true}
                            onRequestClose={() => {
                                handleShow()
                            }}>
                            <TouchableWithoutFeedback onPress={() => handleShow()}>
                                <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }} />
                            </TouchableWithoutFeedback>
                            <View style={{
                                position: 'absolute',
                                width: '100%',
                                right: '5%',
                                left: '5%',
                                top: '30%',
                            }}>
                                <View className={`w-[90%] p-[20] justify-center items-center ${onChange && 'py-[80]'}`} style={{
                                    backgroundColor: COLORS.additionalColor9, borderRadius: SIZES.radius,
                                }}>
                                    <View className="flex w-full">
                                        <View>
                                            <Text className=''
                                                style={{
                                                    marginTop: SIZES.padding,
                                                    ...FONTS.body3,
                                                    fontSize: 18,
                                                    color: COLORS.black
                                                }}>Current Password</Text>
                                            <View className=''
                                                style={{
                                                    marginTop: SIZES.base,
                                                    borderRadius: SIZES.radius,
                                                    backgroundColor: COLORS.white,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.white
                                                }}>

                                                <TextInput
                                                    onChangeText={(value) => setResetPasswordForm((prev) => ({ ...prev, currentPassword: value }))}
                                                    className='text-black'
                                                    placeholder='Current Password'
                                                    placeholderTextColor={COLORS.gray30}
                                                    secureTextEntry={!showPass}
                                                    style={{
                                                        // backgroundColor: COLORS.gray20,
                                                        width: '80%',
                                                        paddingHorizontal: SIZES.radius,
                                                        height: 50,
                                                        fontSize: 18,
                                                    }}
                                                />

                                                <TouchableOpacity
                                                    className='absolute'
                                                    style={{
                                                        right: 22,
                                                        // transform: [{ translateY: 30 }]
                                                        top: 0,
                                                        bottom: 0,
                                                        justifyContent: 'center'
                                                    }}
                                                    onPress={() => { setShowPass(!showPass); }}>
                                                    {showPass ? (
                                                        <Image source={icons.eye} resizeMode='contain' style={{ width: 20, height: 20 }} />
                                                    ) :
                                                        <Image source={icons.eye_close} resizeMode='contain' style={{ width: 20, height: 20 }} />
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={{ color: 'red' }}>{errorMessage?.currentPasswordError}</Text>

                                        </View>

                                        <View>
                                            <Text className=''
                                                style={{
                                                    marginTop: SIZES.padding,
                                                    ...FONTS.body3,
                                                    fontSize: 18,
                                                    color: COLORS.black
                                                }}>New Password</Text>
                                            <View className=''
                                                style={{
                                                    marginTop: SIZES.base,
                                                    borderRadius: SIZES.radius,
                                                    backgroundColor: COLORS.white,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.white
                                                }}>

                                                <TextInput
                                                    onChangeText={(value) => setResetPasswordForm((prev) => ({ ...prev, newPassword: value }))}
                                                    className='text-black'
                                                    placeholder='Enter Your New Password'
                                                    placeholderTextColor={COLORS.gray30}
                                                    secureTextEntry={!showNewPass}
                                                    style={{
                                                        // backgroundColor: COLORS.gray20,
                                                        width: '80%',
                                                        paddingHorizontal: SIZES.radius,
                                                        height: 50,
                                                        fontSize: 18,
                                                    }}
                                                />

                                                <TouchableOpacity
                                                    className='absolute'
                                                    style={{
                                                        right: 22,
                                                        // transform: [{ translateY: 30 }]
                                                        top: 0,
                                                        bottom: 0,
                                                        justifyContent: 'center'
                                                    }}
                                                    onPress={() => { setShowNewPass(!showNewPass); }}>
                                                    {showNewPass ? (
                                                        <Image source={icons.eye} resizeMode='contain' style={{ width: 20, height: 20 }} />
                                                    ) :
                                                        <Image source={icons.eye_close} resizeMode='contain' style={{ width: 20, height: 20 }} />
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={{ color: 'red' }}>{errorMessage?.newPasswordError}</Text>

                                        </View>

                                        <View>
                                            <Text className=''
                                                style={{
                                                    marginTop: SIZES.padding,
                                                    ...FONTS.body3,
                                                    fontSize: 18,
                                                    color: COLORS.black
                                                }}>Confirm Password</Text>
                                            <View className=''
                                                style={{
                                                    marginTop: SIZES.base,
                                                    borderRadius: SIZES.radius,
                                                    backgroundColor: COLORS.white,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.white
                                                }}>

                                                <TextInput
                                                    onChangeText={(value) => setResetPasswordForm((prev) => ({ ...prev, confirmPassword: value }))}
                                                    className='text-black'
                                                    placeholder='Repeat your Password'
                                                    placeholderTextColor={COLORS.gray30}
                                                    secureTextEntry={!showConfirmPass}
                                                    style={{
                                                        // backgroundColor: COLORS.gray20,
                                                        width: '80%',
                                                        paddingHorizontal: SIZES.radius,
                                                        height: 50,
                                                        fontSize: 18,
                                                    }}
                                                />
                                                <TouchableOpacity
                                                    className='absolute'
                                                    style={{
                                                        right: 22,
                                                        // transform: [{ translateY: 30 }]
                                                        top: 0,
                                                        bottom: 0,
                                                        justifyContent: 'center'
                                                    }}
                                                    onPress={() => { setShowConfirmPass(!showConfirmPass); }}>
                                                    {showConfirmPass ? (
                                                        <Image source={icons.eye} resizeMode='contain' style={{ width: 20, height: 20 }} />
                                                    ) :
                                                        <Image source={icons.eye_close} resizeMode='contain' style={{ width: 20, height: 20 }} />
                                                    }
                                                </TouchableOpacity>

                                            </View>
                                            <Text style={{ color: 'red' }}>{errorMessage?.confirmPasswordError}</Text>
                                        </View>
                                    </View>
                                    <View className='flex-row gap-x-[200] justify-between items-center mt-[40] mb-[20]'>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowModal(false);
                                            }}
                                            className="flex-row items-center bg-[#da4040] px-[20] justify-center h-[40] rounded-[20]"
                                            style={{
                                                borderRadius: SIZES.radius,
                                                backgroundColor: '#da4040'
                                            }}>
                                            <Text className="text-white" style={{ ...FONTS.h3 }}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                handlePasswordChange()
                                            }}
                                            className="flex-row items-center px-[20] justify-center h-[40] rounded-[20]"
                                            style={{
                                                backgroundColor: COLORS.primary,
                                                borderRadius: SIZES.radius,
                                            }}>
                                            <Text className="text-white" style={{ ...FONTS.h3 }}>
                                                Save
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            </View>
                        </Modal>
                    </View>
                </>
            )}

            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }} />
        </>
    );
};
const Profile = ({ navigation }: { navigation: any }) => {
    const realm = useRealm();
    const [user, setUser] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [isChanged, setIsChanged] = React.useState(false);
    // async function loadUser() {
    //     setLoading(true);
    //     setUser(userData);
    //     setLoading(false);
    // }
    async function loaduserFromAPI() {
        if (!loading) {
            setLoading(true);
            const userData = await getUser();

            // console.log('user', userData);
            if (userData?.id) {
                const res = await apiUserDetail(userData?.id);
                if (res?.status === 1) {
                    setUser(res.data);
                    saveUser(res.data);
                }
            }
            setLoading(false);
        }
    }
    useEffect(() => {
        // const unsubscribe = navigation.addListener('focus', () => {
        // loadUser();
        loaduserFromAPI();
        return () => {
            setUser(null);
            setLoading(false);
            // unsubscribe;
        };
    }, []);
    useEffect(() => {
        if (isChanged) {
            loaduserFromAPI()
            setIsChanged(false);
        }
    }, [isChanged]);
    const deleteAllUserData = async () => {
        await realm.write(() => {
            realm.deleteAll();
        });
    };
    async function userLogout() {
        console.log('logout clicked - remove user from async storage');
        await deleteUser();
    }
    function renderHeader() {
        return (
            <View
                className="flex-row mt-[30] justify-between"
                style={{ paddingHorizontal: SIZES.padding }}>
                <Text className="text-black" style={{ ...FONTS.h1 }}>
                    Profile
                </Text>
            </View>
        );
    }
    function renderProfileCard() {
        return (
            <View
                className="flex-row "
                style={{
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 20,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary3,
                }}>
                <TouchableOpacity className="h-[80] w-[80]">
                    <Image
                        source={user?.avatar ? { uri: user?.avatar } : images.profile}
                        className="w-full h-full rounded-full border"
                        style={{ borderColor: COLORS.white }}
                    />

                    <View className="absolute w-full h-full items-center justify-end">
                        <View
                            className="w-[30] h-[30] mb-[-15] items-center justify-center  rounded-full"
                            style={{ backgroundColor: COLORS.primary }}>
                            <Image
                                source={icons.camera}
                                className="w-[17] h-[17]"
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                <View className="flex-1 items-start" style={{ marginLeft: SIZES.radius }}>
                    <Text className="text-white" style={{ ...FONTS.h2 }} numberOfLines={2}>
                        {user?.full_name}
                    </Text>
                    <Text
                        className="text-white mt-[10]"
                        style={{ ...FONTS.body4 }}
                        numberOfLines={1}>
                        {user?.email}
                    </Text>
                </View>
            </View>
        );
    }
    function renderProfileSection1() {
        return (
            <>
                {/* <TouchableOpacity onPress={() => setShowModal(!showModal)} className='' style={{ marginTop: SIZES.padding, alignItems: 'flex-end' }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.primary }}>Change</Text>
                </TouchableOpacity> */}
                <View style={styles.profileSectionContainer}>
                    <ProfileItem
                        icon={icons.profile}
                        lable="Full Name"
                        value={{ id: user?.id, value: user?.full_name }}
                        onPress={true}
                        type={'full_name'}
                        isChanged={setIsChanged}
                    />

                    <LineDivider />

                    <ProfileItem
                        icon={icons.email}
                        lable="Email"
                        value={{ id: user?.id, value: user?.email }}
                    />
                    <LineDivider />

                    <ProfileItem
                        icon={icons.mobile}
                        lable="Phone"
                        value={{ id: user?.id, value: user?.phone_number }}
                        onPress={true}
                        type={'phone_number'}
                        isChanged={setIsChanged}
                    />

                    <LineDivider />

                    <ProfileItem
                        icon={icons.home}
                        lable="Address"
                        value={{ id: user?.id, value: user?.address }}
                        onPress={true}
                        type={'address'}
                        isChanged={setIsChanged}
                    />

                    <LineDivider />

                    <ProfileItem
                        icon={icons.password}
                        lable="Password"
                        value={{ id: user?.id, value: 'Change Password' }}
                        onPress={() => {
                            console.log('PASSWORD');
                        }}
                        type={'password'}
                        isChanged={setIsChanged}
                    />
                </View>
            </>
        );
    }
    function renderProfileSection2() {
        return (
            <>
                <View className='flex-row justify-between' style={{ marginTop: SIZES.padding }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.primary }}>Lecturer Info</Text>
                    <TouchableOpacity className=''>
                        <Text style={{ ...FONTS.h3, color: COLORS.primary }}>Change</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.profileSectionContainer}>
                    <ProfileItem
                        icon={icons.profile}
                        lable="Name"
                        value={user?.full_name}
                    />

                    <LineDivider />

                    <ProfileItem icon={icons.email} lable="Email" value={user?.email} />

                    <LineDivider />

                    <ProfileItem
                        icon={icons.password}
                        lable="Password"
                        value="Change Password"
                        onPress={() => {
                            console.log('PASSWORD');
                        }}
                    />
                </View>
            </>
        );
    }

    return (
        user ? (
            <>
                <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }} />
                <View className="flex-1 " style={{ backgroundColor: COLORS.white }}>
                    {renderHeader()}
                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal: SIZES.padding,
                            paddingBottom: 150,
                        }}>
                        {renderProfileCard()}

                        {renderProfileSection1()}

                        {/* {renderProfileSection2()} */}

                        <View className="mt-[20]" style={{}}>
                            <TouchableOpacity
                                onPress={() => {
                                    userLogout();
                                    deleteAllUserData();
                                    navigation.navigate('Login');
                                }}
                                className="flex-row items-center justify-center h-[60] rounded-[15]"
                                style={{
                                    backgroundColor: COLORS.primary,
                                    borderRadius: SIZES.radius
                                }}>
                                <Text className="text-white" style={{ ...FONTS.h3 }}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </>

        ) : (
            <View className="flex-1 items-center justify-center">
                <Text className="text-black" style={{ ...FONTS.h1 }}>
                    <View className='flex-row items-center' style={{ flexDirection: 'row', }}>
                        <TextButton
                            label='Log In'
                            customContainerClassName=''
                            customContainerStyle={{
                                width: 100,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: COLORS.primary,
                                marginTop: SIZES.radius,
                                paddingHorizontal: 10
                            }}
                            customLabelStyle={{
                                ...FONTS.h3,
                                color: COLORS.white
                            }}
                            onPress={() => navigation.navigate('Login')}
                        />
                        <TextButton
                            label='Sign Up'
                            customContainerClassName=''
                            customContainerStyle={{
                                width: 100,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: COLORS.white,
                                borderColor: COLORS.primary,
                                borderWidth: 1,
                                marginTop: SIZES.radius,
                                paddingHorizontal: 10,
                                marginLeft: 10
                            }}
                            customLabelStyle={{
                                ...FONTS.h3,
                                color: COLORS.primary
                            }}
                            onPress={() => navigation.navigate('SignupStep01')}
                        />
                    </View>
                </Text>


            </View>
        )
    );
};
const styles = StyleSheet.create({
    profileSectionContainer: {
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray20,
    },
});

export default Profile;
