import React from 'react';
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
        <TextButton
          customContainerClassName=''
          customContainerStyle={{
            width: 80,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
            paddingVertical: 5
          }}
          label='View All'
          onPress={onPress}
        />
      </View>
      {children}
    </View>
  );
};

function Home() {

  function renderHeader() {
    return (
      <View className='flex flex-row items-center' style={{ marginTop: 40, marginBottom: 10, paddingHorizontal: SIZES.padding }}>

        <View className='' style={{ flex: 1 }}>
          <Text className='' style={{ ...FONTS.h2, color: COLORS.black }}>Hello! {`${`NPPPPPP`}`}</Text>
          <Text className='' style={{ ...FONTS.body3, color: COLORS.gray50 }}>Let's select your item</Text>
        </View>

        <IconButton
          icon={icons.notification}
          iconStyle={{
            tintColor: COLORS.black
          }} />
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
              width: 150,
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
          data={dummyData.categories}
          key={'categories'}
          keyExtractor={(item) => `categories-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius
          }}
          renderItem={({ item, index }) => (
            <CategoryCard
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : SIZES.base,
                marginRight: index === dummyData.categories.length - 1 ? SIZES.padding : 0
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
  function renderPopularCourse() {
    return (
      <Section
        title='Popular Courses'
        containerStyle={{
          marginTop: 30
        }}
      >
        <FlatList
          data={dummyData.courses_list_2}
          key={'popular_courses'}
          keyExtractor={(item) => `popular_courses-${item.id}`}
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
              }}/>
          )}
        />
      </Section>
    );
  }

  return (

    <View className='flex-1' style={{ backgroundColor: COLORS.white, }}>

      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 150
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderBanner()}

        {renderCourses()}

        <LineDivider
          LineClassName={'bg-gray-300'}
          lineStyle={{
            marginVertical: SIZES.padding
          }}
        />

        {/* category */}
        {renderCategory()}

        {renderPopularCourse()}
      </ScrollView>
    </View>
  );
}


export default Home;
