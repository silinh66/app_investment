import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { newsApi, NewsItem } from '../../api/news';

export default function TinTucTab() {
  const { theme } = useTheme();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [curTabNews, setCurTabNews] = useState('tinTucChinh');
  const [loading, setLoading] = useState(false);

  // Type news color mapping
  const typeNewsColorMap: { [key: string]: string } = {
    'Chứng khoán': '#FF6B6B',
    'Bất động sản': '#4ECDC4',
    'Tài chính': '#45B7D1',
    'Ngân hàng': '#96CEB4',
    'Kinh tế việt nam': '#FECA57',
    'Vĩ mô': '#FF9FF3',
    'Xã hội': '#54A0FF',
    'Công nghệ': '#5F27CD',
    'Khởi nghiệp': '#00D2D3',
    'Kinh tế quốc tế': '#FF9F43'
  };

  // Get news data
  const getNews = async () => {
    try {
      setLoading(true);
      const response = await newsApi.getAllNews();
      if (response.data) {
        setNews(response.data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // Fallback to mock data
      setNews(mockNewsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // Mock news data as fallback
  const mockNewsData: NewsItem[] = [
    {
      id: '1',
      title: 'Thị trường chứng khoán Việt Nam tăng trưởng mạnh trong quý 3',
      description: 'VN-Index đã tăng 5.2% trong tháng qua, cho thấy sự phục hồi mạnh mẽ của thị trường chứng khoán Việt Nam.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
      type: 'Chứng khoán',
      time: '2 giờ trước'
    },
    {
      id: '2',
      title: 'Ngân hàng Nhà nước điều chính lãi suất cơ bản',
      description: 'NHNN quyết định giữ nguyên lãi suất cơ bản ở mức 4.5% để hỗ trợ nền kinh tế phục hồi.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      type: 'Ngân hàng',
      time: '4 giờ trước'
    },
    {
      id: '3',
      title: 'Bất động sản TP.HCM có dấu hiệu khởi sắc',
      description: 'Thị trường bất động sản TP.HCM ghi nhận mức tăng 3.8% về giá trung bình trong tháng 9.',
      image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400',
      type: 'Bất động sản',
      time: '6 giờ trước'
    },
    {
      id: '4',
      title: 'Startup Việt huy động được 50 triệu USD',
      description: 'Một startup công nghệ tài chính Việt Nam vừa hoàn tất vòng gọi vốn Series B.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
      type: 'Khởi nghiệp',
      time: '8 giờ trước'
    },
    {
      id: '5',
      title: 'GDP Việt Nam tăng trưởng 6.8% trong 9 tháng đầu năm',
      description: 'Tổng cục Thống kê công bố số liệu tăng trưởng kinh tế khả quan trong 9 tháng đầu năm 2024.',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400',
      type: 'Kinh tế việt nam',
      time: '10 giờ trước'
    }
  ];

  // Filter news by type
  const chungKhoan = news.filter(
    (item) =>
      item.type === 'Chứng khoán' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const batDongSan = news.filter(
    (item) =>
      item.type === 'Bất động sản' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const taiChinh = news.filter(
    (item) =>
      item.type === 'Tài chính' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const nganHang = news.filter(
    (item) =>
      item.type === 'Ngân hàng' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const kinhTeVietNam = news.filter(
    (item) =>
      item.type === 'Kinh tế việt nam' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const viMo = news.filter(
    (item) =>
      item.type === 'Vĩ mô' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const xaHoi = news.filter(
    (item) =>
      item.type === 'Xã hội' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const congNghe = news.filter(
    (item) =>
      item.type === 'Công nghệ' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const khoiNghiep = news.filter(
    (item) =>
      item.type === 'Khởi nghiệp' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );
  const kinhTeQuocTe = news.filter(
    (item) =>
      item.type === 'Kinh tế quốc tế' &&
      !!item.description &&
      !!item?.image &&
      !!item.type
  );

  // News Type Section Component
  const NewsTypeSection = ({ type, listTypeNews }: { type: string; listTypeNews: NewsItem[] }) => {
    return (
      <View style={styles.newsTypeSection}>
        <View style={styles.newsTypeSectionHeader}>
          <Text style={[styles.newsTypeTitle, { color: theme.colors.text }]}>
            {type}
          </Text>
          <View style={styles.viewMoreContainer}>
            <Text style={[styles.viewMoreText, { color: theme.colors.secondaryText }]}>
              Xem thêm
            </Text>
            <Text style={[styles.nextIcon, { color: theme.colors.secondaryText }]}>›</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {listTypeNews?.length > 0 &&
            listTypeNews?.map((item: NewsItem, index: number) => {
              return <NewsItemSmall key={index} item={item} />;
            })}
        </ScrollView>
      </View>
    );
  };

  // News Item Component
  const NewsItem = ({ item }: { item: NewsItem }) => {
    const handlePress = () => {
      router.push({
        pathname: '/news-detail',
        params: { item: JSON.stringify(item) }
      });
    };

    return (
      <TouchableOpacity 
        style={[styles.newsItem, { backgroundColor: theme.colors.background }]}
        onPress={handlePress}
      >
        <View style={styles.newsItemRow}>
          <Image
            style={styles.newsImageRow}
            source={{ uri: item.image }}
          />
          <View style={styles.newsItemContent}>
            <Text style={[styles.newsTitle, { color: theme.colors.text }]}>
              {item?.title?.length > 58
                ? `${item?.title?.slice(0, 58)}...`
                : item?.title}
            </Text>
            <Text style={[styles.newsDescription, { color: theme.colors.secondaryText }]}>
              {item?.description?.length > 66
                ? `${item?.description?.slice(0, 66)}...`
                : item?.description}
            </Text>
            <View style={styles.newsFooter}>
              <View
                style={[styles.newsTypeTag, { backgroundColor: typeNewsColorMap[item.type] || '#8E8E93' }]}
              >
                <Text style={styles.newsTypeText}>
                  {item.type}
                </Text>
              </View>
              <Text style={[styles.newsTime, { color: theme.colors.secondaryText }]}>
                {item.time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Small News Item for horizontal scroll
  const NewsItemSmall = ({ item }: { item: NewsItem }) => {
    const handlePress = () => {
      router.push({
        pathname: '/news-detail',
        params: { item: JSON.stringify(item) }
      });
    };

    return (
      <TouchableOpacity 
        style={[styles.newsItemSmall, { backgroundColor: theme.colors.card }]}
        onPress={handlePress}
      >
        <Image
          style={styles.newsImageSmall}
          source={{ uri: item.image }}
        />
        <Text style={[styles.newsTitleSmall, { color: theme.colors.text }]}>
          {item.title.length > 60 ? `${item.title.slice(0, 60)}...` : item.title}
        </Text>
        <Text style={[styles.newsTimeSmall, { color: theme.colors.secondaryText }]}>
          {item.time}
        </Text>
      </TouchableOpacity>
    );
  };

  // Tab navigation items
  const tabItems = [
    { key: 'tinTucChinh', label: 'Tin tức chính' },
    { key: 'chungKhoan', label: 'Chứng khoán' },
    { key: 'batDongSan', label: 'Bất động sản' },
    { key: 'taiChinh', label: 'Tài chính' },
    { key: 'nganHang', label: 'Ngân hàng' },
    { key: 'kinhTeVietNam', label: 'Kinh tế Việt Nam' },
    { key: 'viMo', label: 'Vĩ mô' },
    { key: 'xaHoi', label: 'Xã hội' },
    { key: 'congNghe', label: 'Công nghệ' },
    { key: 'khoiNghiep', label: 'Khởi nghiệp' },
    { key: 'kinhTeQuocTe', label: 'Kinh tế quốc tế' }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.mainScrollView}>
        {/* Tab Navigation */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScrollView}>
          {tabItems.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setCurTabNews(tab.key)}
              style={[
                styles.tabItem,
                {
                  borderBottomColor: theme.colors.primary,
                  borderBottomWidth: curTabNews === tab.key ? 2 : 0,
                }
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: curTabNews === tab.key
                      ? theme.colors.primary
                      : theme.colors.text
                  }
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content based on selected tab */}
        {curTabNews === 'tinTucChinh' && (
          <View style={styles.contentContainer}>
            {/* Featured News */}
            {news[0] && (
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(news[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: news[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {news[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {news[0]?.description?.length > 100
                    ? `${news[0]?.description?.slice(0, 110)}...`
                    : news[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[news[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {news[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {news[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* Sample news from each category */}
            {chungKhoan?.slice(0, 1)?.map((item: NewsItem, index: number) => (
              <NewsItem key={index} item={item} />
            ))}
            {nganHang?.slice(0, 1)?.map((item: NewsItem, index: number) => (
              <NewsItem key={index} item={item} />
            ))}
            {xaHoi?.slice(0, 1)?.map((item: NewsItem, index: number) => (
              <NewsItem key={index} item={item} />
            ))}
            {viMo?.slice(0, 1)?.map((item: NewsItem, index: number) => (
              <NewsItem key={index} item={item} />
            ))}

            {/* News Type Sections */}
            <NewsTypeSection type="Chứng khoán" listTypeNews={chungKhoan} />
            <NewsTypeSection type="Ngân hàng" listTypeNews={nganHang} />
            <NewsTypeSection type="Kinh tế Việt Nam" listTypeNews={kinhTeVietNam} />
            <NewsTypeSection type="Xã hội" listTypeNews={xaHoi} />
            <NewsTypeSection type="Khởi nghiệp" listTypeNews={khoiNghiep} />
            <NewsTypeSection type="Kinh tế quốc tế" listTypeNews={kinhTeQuocTe} />
          </View>
        )}

        {/* Category-specific content */}
        {curTabNews === 'chungKhoan' && chungKhoan[0] && (
          <View style={styles.contentContainer}>
            <View style={styles.categoryContent}>
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(chungKhoan[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: chungKhoan[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {chungKhoan[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {chungKhoan[0]?.description?.length > 100
                    ? `${chungKhoan[0]?.description?.slice(0, 110)}...`
                    : chungKhoan[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[chungKhoan[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {chungKhoan[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {chungKhoan[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {chungKhoan?.slice(1, 100)?.map((item: NewsItem, index: number) => (
                <NewsItem key={index} item={item} />
              ))}
            </View>
          </View>
        )}

        {curTabNews === 'batDongSan' && batDongSan[0] && (
          <View style={styles.contentContainer}>
            <View style={styles.categoryContent}>
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(batDongSan[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: batDongSan[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {batDongSan[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {batDongSan[0]?.description?.length > 100
                    ? `${batDongSan[0]?.description?.slice(0, 110)}...`
                    : batDongSan[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[batDongSan[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {batDongSan[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {batDongSan[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {batDongSan?.slice(1, 100)?.map((item: NewsItem, index: number) => (
                <NewsItem key={index} item={item} />
              ))}
            </View>
          </View>
        )}

        {curTabNews === 'taiChinh' && taiChinh[0] && (
          <View style={styles.contentContainer}>
            <View style={styles.categoryContent}>
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(taiChinh[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: taiChinh[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {taiChinh[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {taiChinh[0]?.description?.length > 100
                    ? `${taiChinh[0]?.description?.slice(0, 110)}...`
                    : taiChinh[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[taiChinh[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {taiChinh[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {taiChinh[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {taiChinh?.slice(1, 100)?.map((item: NewsItem, index: number) => (
                <NewsItem key={index} item={item} />
              ))}
            </View>
          </View>
        )}

        {curTabNews === 'nganHang' && nganHang[0] && (
          <View style={styles.contentContainer}>
            <View style={styles.categoryContent}>
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(nganHang[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: nganHang[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {nganHang[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {nganHang[0]?.description?.length > 100
                    ? `${nganHang[0]?.description?.slice(0, 110)}...`
                    : nganHang[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[nganHang[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {nganHang[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {nganHang[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {nganHang?.slice(1, 100)?.map((item: NewsItem, index: number) => (
                <NewsItem key={index} item={item} />
              ))}
            </View>
          </View>
        )}

        {curTabNews === 'kinhTeVietNam' && kinhTeVietNam[0] && (
          <View style={styles.contentContainer}>
            <View style={styles.categoryContent}>
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(kinhTeVietNam[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: kinhTeVietNam[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {kinhTeVietNam[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {kinhTeVietNam[0]?.description?.length > 100
                    ? `${kinhTeVietNam[0]?.description?.slice(0, 110)}...`
                    : kinhTeVietNam[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[kinhTeVietNam[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {kinhTeVietNam[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {kinhTeVietNam[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {kinhTeVietNam?.slice(1, 100)?.map((item: NewsItem, index: number) => (
                <NewsItem key={index} item={item} />
              ))}
            </View>
          </View>
        )}

        {curTabNews === 'viMo' && viMo[0] && (
          <View style={styles.contentContainer}>
            <View style={styles.categoryContent}>
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(viMo[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: viMo[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {viMo[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {viMo[0]?.description?.length > 100
                    ? `${viMo[0]?.description?.slice(0, 110)}...`
                    : viMo[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[viMo[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {viMo[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {viMo[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {viMo?.slice(1, 100)?.map((item: NewsItem, index: number) => (
                <NewsItem key={index} item={item} />
              ))}
            </View>
          </View>
        )}

        {curTabNews === 'xaHoi' && xaHoi[0] && (
          <View style={styles.contentContainer}>
            <View style={styles.categoryContent}>
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(xaHoi[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: xaHoi[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {xaHoi[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {xaHoi[0]?.description?.length > 100
                    ? `${xaHoi[0]?.description?.slice(0, 110)}...`
                    : xaHoi[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[xaHoi[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {xaHoi[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {xaHoi[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {xaHoi?.slice(1, 100)?.map((item: NewsItem, index: number) => (
                <NewsItem key={index} item={item} />
              ))}
            </View>
          </View>
        )}

        {curTabNews === 'congNghe' && congNghe[0] && (
          <View style={styles.contentContainer}>
            <View style={styles.categoryContent}>
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(congNghe[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: congNghe[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {congNghe[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {congNghe[0]?.description?.length > 100
                    ? `${congNghe[0]?.description?.slice(0, 110)}...`
                    : congNghe[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[congNghe[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {congNghe[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {congNghe[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {congNghe?.slice(1, 100)?.map((item: NewsItem, index: number) => (
                <NewsItem key={index} item={item} />
              ))}
            </View>
          </View>
        )}

        {curTabNews === 'khoiNghiep' && khoiNghiep[0] && (
          <View style={styles.contentContainer}>
            <View style={styles.categoryContent}>
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(khoiNghiep[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: khoiNghiep[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {khoiNghiep[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {khoiNghiep[0]?.description?.length > 100
                    ? `${khoiNghiep[0]?.description?.slice(0, 110)}...`
                    : khoiNghiep[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[khoiNghiep[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {khoiNghiep[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {khoiNghiep[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {khoiNghiep?.slice(1, 100)?.map((item: NewsItem, index: number) => (
                <NewsItem key={index} item={item} />
              ))}
            </View>
          </View>
        )}

        {curTabNews === 'kinhTeQuocTe' && kinhTeQuocTe[0] && (
          <View style={styles.contentContainer}>
            <View style={styles.categoryContent}>
              <TouchableOpacity 
                style={styles.featuredNews}
                onPress={() => router.push({
                  pathname: '/news-detail',
                  params: { item: JSON.stringify(kinhTeQuocTe[0]) }
                })}
              >
                <Image
                  style={styles.featuredImage}
                  source={{ uri: kinhTeQuocTe[0]?.image }}
                />
                <Text style={[styles.featuredTitle, { color: theme.colors.text }]}>
                  {kinhTeQuocTe[0]?.title}
                </Text>
                <Text style={[styles.featuredDescription, { color: theme.colors.secondaryText }]}>
                  {kinhTeQuocTe[0]?.description?.length > 100
                    ? `${kinhTeQuocTe[0]?.description?.slice(0, 110)}...`
                    : kinhTeQuocTe[0]?.description}
                </Text>
                <View style={styles.featuredFooter}>
                  <View
                    style={[
                      styles.featuredTypeTag,
                      { backgroundColor: typeNewsColorMap[kinhTeQuocTe[0]?.type] || '#8E8E93' }
                    ]}
                  >
                    <Text style={styles.featuredTypeText}>
                      {kinhTeQuocTe[0]?.type}
                    </Text>
                  </View>
                  <Text style={[styles.featuredTime, { color: theme.colors.secondaryText }]}>
                    {kinhTeQuocTe[0]?.time}
                  </Text>
                </View>
              </TouchableOpacity>
              {kinhTeQuocTe?.slice(1, 100)?.map((item: NewsItem, index: number) => (
                <NewsItem key={index} item={item} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainScrollView: {
    flex: 1,
  },
  tabScrollView: {
    marginTop: 16,
  },
  tabItem: {
    padding: 13,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  contentContainer: {
    marginTop: 24,
    marginLeft: 16,
    paddingRight: 16,
  },
  featuredNews: {
    marginBottom: 16,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  featuredTitle: {
    fontWeight: '900',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  featuredDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  featuredTypeTag: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 100,
  },
  featuredTypeText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  featuredTime: {
    fontSize: 12,
  },
  newsTypeSection: {
    marginTop: 16,
  },
  newsTypeSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6,
  },
  nextIcon: {
    fontSize: 16,
  },
  horizontalScroll: {
    marginTop: 16,
  },
  newsItem: {
    marginBottom: 16,
  },
  newsItemRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsImageRow: {
    width: 108,
    height: 108,
    borderRadius: 12,
    marginRight: 12,
  },
  newsItemContent: {
    width: 240,
  },
  newsImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 12,
  },
  newsDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  newsTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  newsTypeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  newsTime: {
    fontSize: 12,
  },
  newsItemSmall: {
    width: 200,
    marginRight: 12,
    padding: 12,
    borderRadius: 8,
  },
  newsImageSmall: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  newsTitleSmall: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  newsTimeSmall: {
    fontSize: 12,
  },
  categoryContent: {
    flex: 1,
  },
});