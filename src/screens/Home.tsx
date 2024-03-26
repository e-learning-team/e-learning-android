import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
const logo = require('../assets/images/logo.png');
// import {} from ';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS, SIZES, FONTS, constants, icons, images, dummyData } from '../constants';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  LineDivider,
  CategoryCard,
  HorizontalCourseCard
} from '../components';
import { UserLoginData, useQuery } from '../models/UserLoginData';
import { User } from 'realm';
import { apiCategory } from '../apis/category';
import { apiGetCourse } from '../apis/course';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../storage/AsyncStorage';
import Spinner from 'react-native-loading-spinner-overlay';

const Section = ({ containerStyle, title, onPress, children }: any) => {
  return (
    <View
      style={{
        ...containerStyle
      }}
    >
      <View
        className='flex-row items-center justify-between'
        style={{
          paddingHorizontal: SIZES.padding
        }}
      >
        <Text
          className=''
          style={{
            flex: 1,
            ...FONTS.h2
          }}
        >
          {title}
        </Text>
        {/* <TextButton
          customContainerClassName=''
          customContainerStyle={{
            width: 80,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
            paddingVertical: 5
          }}
          label='View All'
          onPress={onPress}
        /> */}
      </View>
      {children}
    </View>
  );
};

function Home({ navigation }: { navigation: any; }) {
  // const userData = useQuery(UserLoginData);

  const [user, setUser] = React.useState<any>();
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingUser, setLoadingUser] = React.useState(false);
  const [loadingRating, setLoadingRating] = useState(true);
  const [loadingSub, setLoadingSub] = useState(true);
  const [highestRatingCourses, setHighestRatingCourses] = useState({data:[]});
  const [highestSubCourses, setHighestSubCourses] = useState({data:[]});

  const buildCouses = async () => {


    try {
      const params = {
        search_type: "OFFICIAL",
        sort_by: "HIGHEST_SUB",
        max_result: "5",
        is_deleted: false
      };
      const response = await apiGetCourse(params);
      if (response.data && response.data.data && response.data.data?.length > 0) {
        setHighestSubCourses(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
    }

    try {
      const params = {
        search_type: "OFFICIAL",
        sort_by: "HIGHEST_RATING",
        max_result: "5",
        is_deleted: false
      };
      const response = await apiGetCourse(params);
      if (response.data && response.data.data && response.data.data?.length > 0) {
        setHighestRatingCourses(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
    }
  };

  async function loadCategoryList() {
    setLoading(true);
    try {
      const categoryData = await apiCategory({ build_type: 'LIST' });
      // console.log('categoryData:', JSON.stringify(categoryData, null, 2));
      setCategories(categoryData.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setLoading(false);
  }
  async function loadUser() {
    setLoadingUser(true);
    const userData = await getUser();
    console.log('userData: ', userData ? true : false);
    setUser(userData);
    setLoadingUser(false);

  }
  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
      loadUser();
      loadCategoryList();
      buildCouses();
      console.log('Home screen is focused')
    // });


    return () => {
      setUser(null);
      setLoading(false);
      setCategories([]);
      setHighestRatingCourses({data:[]});
      setHighestSubCourses({data:[]});
      // unsubscribe;
    };
  }, []);
  function renderHeader() {
    return (
      <View className='flex flex-row items-center' style={{ marginTop: 40, marginBottom: 10, paddingHorizontal: SIZES.padding }}>
        {user?.full_name ? (
          <View className='' style={{ flex: 1 }}>
            <Text className='' style={{ ...FONTS.h2, color: COLORS.black }}>Hello! {`${user?.full_name}`}</Text>
            <Text className='' style={{ ...FONTS.body3, color: COLORS.gray50 }}>Let's select your item</Text>
          </View>
        ) : (
          <View className='' style={{ flex: 1 }}>
            <Text className='' style={{ ...FONTS.h2, color: COLORS.black }}>Hello! Guest</Text>
            <Text className='' style={{ ...FONTS.body3, color: COLORS.gray50 }}>
              Sign in to enjoy the best e-learning platform
            </Text>
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
          </View>
        )}

        {/* <IconButton
          icon={icons.notification}
          iconStyle={{
            tintColor: COLORS.black
          }} /> */}
      </View>
    );
  }

  function renderBanner() {
    return (
      <ImageBackground
        className='items-start'
        source={images.featured_bg_image}
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15,
        }}
        imageStyle={{
          borderRadius: SIZES.radius
        }}>
        <View>
          <Text
            className={``}
            style={{
              color: COLORS.white,
              ...FONTS.body2
            }}>
            HOW TO
          </Text>
          <Text
            className='text-[#fff] '
            style={{
              ...FONTS.h2
            }}>
            Learn this and learn that and gain 1000 IQ
          </Text>
          <Text
            className='text-white'
            style={{
              marginTop: SIZES.radius,
              ...FONTS.body4
            }}>
            By DeluluMeeeee
          </Text>

          <Image
            className='ju'
            source={images.start_learning}
            style={{
              height: 100,
              marginTop: SIZES.padding,

            }} />

          <TextButton
            label='Start Learning'
            customLabelClassName={''}
            customContainerClassName={'justify-start'}
            customContainerStyle={{
              height: 40,
              // width: 150,
              paddingHorizontal: SIZES.padding,
              borderRadius: 20,
              backgroundColor: COLORS.white
            }}
            customLabelStyle={{
              color: COLORS.black,
            }}
          >

          </TextButton>
        </View>

      </ImageBackground>
    );
  }

  function renderCourses() {
    return (
      <FlatList
        horizontal
        data={dummyData.courses_list_1}
        key={'courses'}
        keyExtractor={(item) => `course-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.padding
        }}
        renderItem={({ item, index }) => (
          <VerticalCourseCard
            containerStyle={{
              marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
              marginRight: index === dummyData.courses_list_1.length - 1 ? SIZES.padding : 0
            }}
            course={item}
          />
        )}
      />
    );
  }

  function renderCategory() {
    return (
      <Section
        title='Categories'
      >
        <FlatList
          horizontal
          // data={dummyData.categories}
          data={categories}
          key={'categories'}
          keyExtractor={(item: any) => `categories-${item?.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius
          }}
          ListFooterComponent={() => { return <></> }}
          renderItem={({ item, index }) => (
            <CategoryCard
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : SIZES.base,
                marginRight: index === categories.length - 1 ? SIZES.padding : 0
              }}
              category={item}
              onPress={() => console.log('CategoryCard')}
            />
          )}
        >

        </FlatList>
      </Section>
    );
  }
  function renderHighestSubCourse() {
    return (
      <Section
        title='Most Subscribed'
        containerStyle={{
          marginTop: 30
        }}
      >
        <FlatList
          // data={dummyData.courses_list_2}
          data={highestSubCourses.data}
          key={'popular_courses'}
          keyExtractor={(item: any) => `popular_courses-${item.id}`}
          scrollEnabled={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding
          }}
          renderItem={({ item, index }) => (
            <HorizontalCourseCard
              containerStyle={{
                marginTop: index === 0 ? SIZES.radius : SIZES.padding,
                marginVertical: SIZES.padding,
              }}
              course={item}
            />

          )}

          ItemSeparatorComponent={() => (
            <LineDivider
              lineStyle={{
                backgroundColor: COLORS.gray10
              }} />
          )}
        />
      </Section>
    );
  }
  function renderHighestRatingCourse() {
    return (
      <Section
        title='Highest Rating'
        containerStyle={{
          marginTop: 30
        }}
      >
        <FlatList
          data={highestRatingCourses.data}
          // data={dummyData.courses_list_2}
          key={'popular_courses'}
          keyExtractor={(item: any) => `popular_courses-${item.id}`}
          scrollEnabled={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding
          }}
          renderItem={({ item, index }) => (
            <HorizontalCourseCard
              containerStyle={{
                marginTop: index === 0 ? SIZES.radius : SIZES.padding,
                marginVertical: SIZES.padding,
              }}
              course={item}
            />

          )}
          ItemSeparatorComponent={() => (
            <LineDivider
              lineStyle={{
                backgroundColor: COLORS.gray10
              }} />
          )}
        />
      </Section>
    );
  }
  return (

    <View className='flex-1' style={{ backgroundColor: COLORS.white, }}>
      <Spinner
        visible={loadingUser}
        textContent={'Loading...'}
        overlayColor='rgba(0, 0, 0, 0.5)'
        textStyle={{ color: COLORS.white }} />
      {renderHeader()}
      <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false} >

        {/* {renderBanner()} */}

        {/* {renderCourses()} */}

        <LineDivider LineClassName={'bg-gray-300'} lineStyle={{ marginVertical: SIZES.padding }} />

        {/* category */}
        {renderCategory()}

        {renderHighestSubCourse()}

        {renderHighestRatingCourse()}
      </ScrollView>


    </View>
  );
}


export default Home;
