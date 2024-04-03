import React, { useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { COLORS, SIZES, FONTS, constants, icons, images, dummyData } from '../constants';
import { apiCategory } from '../apis/category';
import { HorizontalCourseCard, LineDivider } from '../components';
import Spinner from 'react-native-loading-spinner-overlay';
import { apiGetCourse } from '../apis/course';
import { MenuView } from '@react-native-menu/menu';


const Search = ({ navigation, route }: { navigation: any; route: any; }) => {
    const [openSearchFilter, setOpenSearchFilter] = React.useState(true);
    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<any>(null);
    const [page, setPage] = React.useState(1);
    const [totalResult, setTotalResult] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [courseList, setCourseList] = React.useState<any>([])
    const [searchText, setSearchText] = React.useState('');
    const [sort, setSort] = React.useState('');
    const [navigateCategory, setNavigateCategory] = React.useState<any>(route.params?.category);
    async function loadCategoryList() {
        setLoading(true);
        try {
            const categoryData = await apiCategory({ build_type: 'TREE' });
            setCategories(categoryData.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        setLoading(false);
    }
    async function loadCourseList() {
        // if (!loading) {
        setLoading(true);
        setOpenSearchFilter(false);
        try {
            const params = {
                search_type: "OFFICIAL",
                // sort_by: "HIGHEST_SUB",
                current_page: page,
                max_result: "5",
                is_deleted: false,
                categories_ids: selectedCategory?.id,
                multi_value: searchText?.length > 0 ? searchText : '',
                sort_by: sort,
            };
            // if (searchText?.length > 0) {
            //     params.multi_value = searchText;
            // } else {
            //     delete params.multi_value;
            // }
            const response = await apiGetCourse(params);
            if (response.data && response.data.data && response.data.data?.length > 0) {
                if (page === 1)
                    setCourseList(response.data.data);
                else
                    setCourseList((prev: any) => [...prev, ...response.data.data]);
                setTotalPages(response.data.total_page);
                setTotalResult(response.data.total);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
        setLoading(false);
        // }
    }
    async function handleClearResult(resetAll?: boolean) {
        if (resetAll) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Search' }],
            })
        } else {
            await setCourseList({ data: [] });
            await setPage(1);
            await setTotalPages(0);
            await setSearchText('');
            await setTotalResult(0);
            await setSelectedCategory(null);
            await setOpenSearchFilter(true);
            await setSort('');
            await setNavigateCategory(null);
            () => {
                navigation.setParams({ backRoute: null, routeImGoingNext: null })
            }
        }
    }
    async function handleClearCourseData() {
        await setCourseList({ data: [] });
        await setPage(1);
        await setTotalPages(0);
        await setTotalResult(0);
    }
    async function handleSearch() {
        if (searchText.length > 0) {
            await setCourseList({ data: [] });
            await setPage(1);
            await setTotalPages(0);
            await setOpenSearchFilter(false);
            await loadCourseList();
        }
    }
    useEffect(() => {
        loadCategoryList();
    }, []);
    useEffect(() => {
        if (navigateCategory) {
            setSelectedCategory(navigateCategory);
        }
    }, [navigateCategory]);
    useEffect(() => {
        if (selectedCategory) {
            console.log('selectedCategory:', selectedCategory);
            setOpenSearchFilter(false);
            loadCourseList();
        } else {
            setOpenSearchFilter(true);
        }
    }, [selectedCategory]);
    const handleLoad = () => {
        if (!loading) {
            if (page < totalPages)
                setPage(page + 1);
        }
    };
    useEffect(() => {
        if (sort) {
            handleClearCourseData();
            loadCourseList();
        }
    }, [sort])
    useEffect(() => {
        if (page > 1) {
            loadCourseList();
        }
    }, [page]);
    const renderHeader = () => {
        return (
            <View className='flex-row mt-[30]' style={{ paddingHorizontal: SIZES.padding }}>
                <Text className='text-black' style={{ ...FONTS.h1 }}>Search</Text>
                <TextInput
                    className='justify-center'
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        height: 40,
                        borderWidth: 1,
                        borderColor: COLORS.gray30,
                        borderRadius: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                        ...FONTS.body3
                    }}
                    placeholder="Search"
                    placeholderTextColor={COLORS.gray30}
                    value={searchText}
                    onChangeText={(text) => {
                        // Handle search text change
                        // console.log('searchText:', text);
                        setSearchText(text);
                    }}
                    // onFocus={() => setOpenSearchFilter(true)}
                    onBlur={() => handleSearch()}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={true}

                />
            </View>
        )
    }
    const renderSearchFilter = () => {
        const handleCategorySelection = (category: any) => {
            setSelectedCategory(category);
        }
        const renderCategories = (categories?: any) => {
            return (

                categories.map((category: any, index: any) => {
                    return (
                        <View key={index} style={{
                            paddingVertical: 8,
                            paddingHorizontal: SIZES.padding,

                        }}>
                            <TouchableOpacity onPress={() => handleCategorySelection(category)}>
                                <Text className={`${category?.level == 1 ? `font-bold ` : ` ${category?.level == 2 && 'font-medium'}`}  text-black text-[18px]`} style={{ paddingVertical: 8, paddingHorizontal: 4 }}>
                                    {category.title}
                                </Text>
                            </TouchableOpacity>
                            <LineDivider
                                lineStyle={{
                                    backgroundColor: COLORS.gray10
                                }} />
                            {category?.children.length > 0 && (
                                renderCategories(category?.children)
                            )}
                        </View>
                    )
                })
            )
        }
        return (
            <View className='mt-[20]'>
                <ScrollView>
                    <View className='flex-row justify-between items-center' style={{ paddingHorizontal: SIZES.padding }}>
                        <Text className='text-black' style={{ ...FONTS.h2 }}>Browse Categories</Text>
                        <TouchableOpacity onPress={async () => {
                            await handleClearResult(false)
                            await loadCourseList();
                        }}>
                            <Text className='text-green-600 underline font-medium'>View All Course</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView className='mt-[10] mb-[100]'>
                        {renderCategories(categories)}
                    </ScrollView>
                </ScrollView>
            </View>
        )
    }

    const renderSearchResults = () => {
        return (
            <>
                <View className='flex-row justify-between items-center mt-[30]' style={{ paddingHorizontal: SIZES.padding }}>
                    <Text className='text-black' style={{ ...FONTS.h2 }}>
                        Result:
                        <Text className='underline'>
                            {' '}{totalResult}{' '}on {totalPages} Pages
                        </Text>
                    </Text>
                    {selectedCategory || searchText?.length > 0 || courseList?.length > 0 ? (
                        <>
                            <TouchableOpacity onPress={() => handleClearResult(true)}><Text className='text-red-400' style={{ ...FONTS.body3 }}>Clear All</Text></TouchableOpacity>
                        </>
                    ) : null}
                </View>

                <View className='flex-row justify-between items-center mt-[20] mb-[10]' style={{ paddingHorizontal: SIZES.padding }}>
                    <Text className='text-black' style={{ ...FONTS.h2 }}>
                        Filter by: {sort ? sort === 'HIGHEST_RATING' ? 'Highest Rating' : 'Highest Subscribers' : 'Normal'}
                    </Text>
                    <MenuView
                        onPressAction={({ nativeEvent }) => {
                            setSort(nativeEvent.event);
                        }}
                        title='Sort by'
                        actions={[

                            {
                                id: 'HIGHEST_RATING',
                                title: "Highest Rating",
                                titleColor: '#2367A2',
                            },
                            {
                                id: 'HIGHEST_SUB',
                                title: "Highest Subscribers",
                                titleColor: '#2367A2',
                            },
                        ]}>
                        <View className='flex-row'>
                            <Text className='font-semibold text-[16px] text-[#0077BA]'>Sort by</Text>
                            {/* <IconMaterialIcons name='arrow-drop-down' size={20} color={'#0077BA'} /> */}
                        </View>
                    </MenuView>
                </View>
                <View className='mb-[10]'>
                    {selectedCategory ? (
                        <View className='flex-row justify-between items-center mt-[10]' style={{ paddingHorizontal: SIZES.padding }}>
                            <Text className='text-black' style={{ ...FONTS.body2 }}>Selected Category: {selectedCategory.title}</Text>
                        </View>
                    ) : null}
                    {searchText ? (
                        <View className='flex-row justify-between items-center mt-[10]' style={{ paddingHorizontal: SIZES.padding }}>
                            <Text className='text-black' style={{ ...FONTS.body2 }}>Search for: {searchText}</Text>
                        </View>
                    ) : null}
                    <LineDivider
                        lineStyle={{
                            backgroundColor: COLORS.gray10
                        }} />
                </View>

                <FlatList
                    // data={dummyData.courses_list_2}
                    data={courseList}
                    key={'courses'}
                    keyExtractor={(item: any) => `courses-${item.id}`}
                    contentContainerStyle={{
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding
                    }}
                    onEndReached={handleLoad}
                    onEndReachedThreshold={0}
                    renderItem={({ item, index }) => (
                        <HorizontalCourseCard
                            navigation={navigation}
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
            </>
        )
    }
    return (
        <View className='flex-1 ' style={{}}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }} />
            {renderHeader()}
            {openSearchFilter && renderSearchFilter()}
            {courseList && renderSearchResults()}
        </View>
    )
}

export default Search;