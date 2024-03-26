import { createRealmContext } from '@realm/react';
import Realm, { BSON, ObjectSchema } from 'realm';
import 'react-native-get-random-values';
import {WebView} from 'react-native-webview';
import { v4 as uuidv4 } from "uuid";
// Define your object model
export class UserLoginData extends Realm.Object<UserLoginData> {
    _id!: string;
    fullName!: string;
    email!: string;
    password!: string;
    // refreshToken!: string;
    // accessToken!: string;

    static schema: ObjectSchema = {
        name: 'UserData',
        properties: {
            _id: {type: 'string', default: uuidv4()},
            fullName: { type: 'string', indexed: 'full-text' },
            email: { type: 'string', indexed: 'full-text' },
            password: { type: 'string', indexed: 'full-text' },
            // refreshToken: { type: 'string', indexed: 'full-text' },
            // accessToken: { type: 'string', indexed: 'full-text' },
        },
        primaryKey: '_id',
    };

}

export const configRealm = {
    schema: [UserLoginData],
    // increment the 'schemaVersion', since 'age' has been added to the schema
    schemaVersion: 3,
    deleteRealmIfMigrationNeeded: true // use this for development only to delete the database when a schema mismatch requires a migration
}

export const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(configRealm);