import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, Text, ToastAndroid, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
const logo = require('../assets/images/logo.png');
// import {} from ';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS, icons, images } from '../constants';
import {
    IconButton,
    IconLabel,
    LineDivider,
    TextButton
} from '../components';
import { UserLoginData, useQuery, useRealm } from '../models/UserLoginData';
import { BSON } from 'realm';
import { apiLogin } from '../apis/user';
import Spinner from 'react-native-loading-spinner-overlay';
import { deleteAll, saveToken, saveUser } from '../storage/AsyncStorage';
import { formatTimeStampTo_DDMMYYY } from '../utils/helper';
import { Rating } from 'react-native-ratings';
import { apiGetCourse } from '../apis/course';
import { Avatar, Icon, ListItem } from '@rneui/themed';

function CustomUpDownIcon({ open }: { open: boolean }) {
    return (
        <Image
            source={open ? icons.chevron_up : icons.chevron_down}
            // resizeMode='contain'
            style={{
                width: 20,
                height: 20,
                tintColor: COLORS.gray30,
                transform: [{ rotate: open ? '180deg' : '0deg' }]
            }} />
    );
}
const CourseAccordion = ({ course, children }: { course?: any; children: any }) => {
    const [expanded, setExpanded] = useState(false);
    // const list2 = [
    //     {
    //         name: 'Amy Farha',
    //         avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //         subtitle: 'Vice President'
    //     },
    //     {
    //         name: 'Chris Jackson',
    //         avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //         subtitle: 'Vice Chairman'
    //     },
    // ];
    return (
        <View style={{
            borderWidth: 1,
            borderColor: COLORS.gray30,
            marginTop: 10,
        }}>
            <ListItem.Accordion
                content={
                    <>
                        {/* <Icon name="place" size={30} /> */}
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: '600' }}>
                                <Text className='font-semibold'>
                                    {course?.name}
                                </Text>
                            </ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                icon={
                    <View className='items-center'>
                        <Text>{children?.length} {children?.length > 1 ? 'lessons' : 'lesson'}</Text>
                        <CustomUpDownIcon open={expanded} />
                    </View>
                }
                // noRotation
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }} >
                {children?.map((l: any, i: any) => (
                    <ListItem key={i} topDivider bottomDivider>
                        {/* <Avatar title={l.name[0]} source={{ uri: l.avatar_url }} /> */}
                        <ListItem.Content style={{ marginLeft: 10 }}>
                            <Text className='font-medium'>
                                {l?.name}
                            </Text>
                            {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
                        </ListItem.Content>
                        {/* <ListItem.Chevron /> */}
                    </ListItem>
                ))}
            </ListItem.Accordion>
            {/* <LineDivider
                lineStyle={{
                    width: '100%',
                    height: 1,
                    backgroundColor: COLORS.gray30
                }} /> */}
        </View>
    )
};

export default CourseAccordion;