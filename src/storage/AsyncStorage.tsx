import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (user: any) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('Save user to async success.');
    } catch (error) {
        console.log('Save user to async success failed:', error);
    }
}
export const deleteUser = async () => {
    try {
        await AsyncStorage.removeItem('user');
        console.log('Delete user from async success.');
    } catch (error) {
        console.log('Delete user from async success failed:', error);
    }
}
export const deleteAll = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Delete all from async success.');
    } catch (error) {
        console.log('Delete all from async success failed:', error);
    }
}
export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('user');
        if (user != null) {
            console.log('Get user from async success:', user ? true : false);
            return JSON.parse(user);
        }
        console.log('Get user from async success:', user);
        return null;
    } catch (error) {
        console.log('Get user from async success failed:', error);
        return null;
    }
}
export const saveToken = async (accessToken: string, refreshToken: string, roles: any) => {
    try {
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        if (roles != null)
            await AsyncStorage.setItem('roles', roles.toString());
        console.log('Save to async success.');
    } catch (error) {
        console.log('Save to async success failed:', error);
    }
}
export const getAccessToken = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        // console.log('Get from async success:', accessToken ? true : false);
        return accessToken;
    } catch (error) {
        // console.log('Get from async success failed:', error);
        return null;
    }
}
export const getRefreshToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        // console.log('Get from async success:', refreshToken ? true : false);
        return refreshToken;
    } catch (error) {
        // console.log('Get from async success failed:', error);
        return null;
    }
}
export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('roles');
        console.log('Delete from async success.');
    } catch (error) {
        console.log('Delete from async success failed:', error);
    }
}
