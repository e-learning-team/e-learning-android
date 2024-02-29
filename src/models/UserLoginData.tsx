import Realm, { BSON, ObjectSchema } from 'realm';

// Define your object model
export class UserLoginData extends Realm.Object<UserLoginData> {
    _id!: BSON.ObjectId;
    fullName!: string;
    email!: string;
    password!: string;
    refreshToken!: string;
    accessToken!: string;

    static schema: ObjectSchema = {
        name: 'UserLoginData',
        properties: {
            _id: 'objectId',
            fullName: { type: 'string', indexed: 'full-text' },
            email: { type: 'string', indexed: 'full-text' },
            password: { type: 'string', indexed: 'full-text' },
            refreshToken: { type: 'string', indexed: 'full-text' },
            accessToken: { type: 'string', indexed: 'full-text' },
        },
        primaryKey: '_id',
    };

    // static schema: ObjectSchema = {
    //     name: 'Profile',
    //     properties: {
    //         _id: 'objectId',
    //         name: { type: 'string', indexed: 'full-text' },
    //     },
    //     primaryKey: '_id',
    // };
}