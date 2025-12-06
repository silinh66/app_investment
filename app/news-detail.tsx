import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { Image } from 'expo-image';
import axiosClient from '../api/request';
import { NewsItem } from '../api/news';

export default function NewsDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [newsDetail, setNewsDetail] = useState<any>({});
  const [newsType, setNewsType] = useState<NewsItem[]>([]);

  const { width } = Dimensions.get('window');

  // Parse the news item from params using useMemo to prevent re-creation on every render
  const newsItem = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

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

  const getNewsDetail = useCallback(async () => {
    if (!newsItem) return;
    
    try {
      setIsLoading(true);
      const response = await axiosClient.post('/news-detail', {
        id: newsItem?.id,
        url: newsItem?.url,
      });
      
      if (response.data?.data) {
        setNewsDetail(response.data.data);
      } else {
        // Fallback to passed item data
        setNewsDetail(newsItem);
      }
    } catch (error) {
      console.error('Failed to fetch news detail:', error);
      // Fallback to passed item data
      setNewsDetail(newsItem);
    } finally {
      setIsLoading(false);
    }
  }, [newsItem]);

  const getRelatedNews = useCallback(async () => {
    if (!newsItem) return;
    
    try {
      const response = await axiosClient.get(`/news-type?type=${encodeURIComponent(newsItem?.type)}&limit=50`);
      const filteredNews = response.data.data.filter((item: NewsItem) => item.image);
      setNewsType(filteredNews);
    } catch (error) {
      console.error('Failed to fetch related news:', error);
      // Fallback to mock related news
      setNewsType(mockRelatedNews);
    }
  }, [newsItem]);

  // Mock related news as fallback
  const mockRelatedNews: NewsItem[] = [
    {
      id: '6',
      title: 'Thị trường chứng khoán châu Á tăng điểm',
      description: 'Các thị trường châu Á ghi nhận mức tăng tích cực trong phiên giao dịch hôm nay.',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400',
      type: 'Chứng khoán',
      time: '1 giờ trước'
    },
    {
      id: '7',
      title: 'Fed có thể điều chỉnh lãi suất trong tháng tới',
      description: 'Cục Dự trữ Liên bang Mỹ đang cân nhắc các bước điều chỉnh chính sách tiền tệ.',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400',
      type: 'Tài chính',
      time: '3 giờ trước'
    },
    {
      id: '8',
      title: 'Công nghệ blockchain trong tài chính',
      description: 'Ứng dụng blockchain đang thay đổi cách thức hoạt động của ngành tài chính.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
      type: 'Công nghệ',
      time: '5 giờ trước'
    }
  ];

  useEffect(() => {
    if (newsItem) {
      getNewsDetail();
      getRelatedNews();
    }
  }, [newsItem, getNewsDetail, getRelatedNews]); // Now using memoized functions

  const handleRelatedNewsPress = (item: NewsItem) => {
    router.push({
      pathname: '/news-detail',
      params: { item: JSON.stringify(item) }
    });
  };

  const renderHTMLContent = (content: string) => {
    // Simple HTML content rendering - in a real app, you might want to use a proper HTML renderer
    const cleanContent = content?.replace(/<[^>]*>/g, '') || '';
    return (
      <Text style={[styles.contentText, { color: theme.colors.text }]}>
        {cleanContent}
      </Text>
    );
  };

  if (!newsItem) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={[styles.backIcon, { color: theme.colors.text }]}>‹</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Tin tức</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            Không tìm thấy bài viết
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: theme.colors.text }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          {newsDetail?.type || newsItem?.type}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Content */}
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {newsDetail?.title || newsItem?.title}
        </Text>

        <Text style={[styles.date, { color: theme.colors.secondaryText }]}>
          {newsDetail?.date || newsItem?.time}
        </Text>

        {newsDetail?.introduction && (
          <Text style={[styles.introduction, { color: theme.colors.secondaryText }]}>
            {newsDetail.introduction}
          </Text>
        )}

        {/* Main Image */}
        {(newsDetail?.image || newsItem?.image) && (
          <Image
            source={{ uri: newsDetail?.image || newsItem?.image }}
            style={styles.mainImage}
            contentFit="cover"
          />
        )}

        {/* Content */}
        {newsDetail?.content ? (
          renderHTMLContent(newsDetail.content)
        ) : (
          <Text style={[styles.contentText, { color: theme.colors.text }]}>
            {newsDetail?.description || newsItem?.description}
          </Text>
        )}

        {/* Source */}
        {newsDetail?.follow && (
          <View style={styles.sourceContainer}>
            <Text style={[styles.sourceText, { color: theme.colors.secondaryText }]}>
              {newsDetail.follow}
            </Text>
          </View>
        )}

        {/* Related News Section */}
        <View style={[styles.relatedSection, { borderTopColor: theme.colors.border }]}>
          <View style={styles.relatedHeader}>
            <Text style={[styles.relatedTitle, { color: theme.colors.text }]}>
              Tin tức khác
            </Text>
            <TouchableOpacity style={styles.viewMoreContainer}>
              <Text style={[styles.viewMoreText, { color: theme.colors.secondaryText }]}>
                Xem thêm
              </Text>
              <Text style={[styles.nextIcon, { color: theme.colors.secondaryText }]}>›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.relatedScrollView}
          >
            {newsType?.slice(0, 6)?.map((item: NewsItem, index: number) => (
              <TouchableOpacity
                key={index}
                style={[styles.relatedItem, { backgroundColor: theme.colors.card }]}
                onPress={() => handleRelatedNewsPress(item)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.relatedImage}
                  contentFit="cover"
                />
                <Text style={[styles.relatedItemTitle, { color: theme.colors.text }]} numberOfLines={2}>
                  {item.title.length > 45 ? `${item.title.slice(0, 45)}...` : item.title}
                </Text>
                <Text style={[styles.relatedItemDescription, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                  {item.description.length > 50 ? `${item.description.slice(0, 50)}...` : item.description}
                </Text>
                <View style={styles.relatedItemFooter}>
                  <Text style={[styles.relatedItemTime, { color: theme.colors.secondaryText }]}>
                    {item.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 26,
  },
  date: {
    fontSize: 12,
    marginBottom: 16,
  },
  introduction: {
    fontSize: 14,
    marginBottom: 16,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  sourceText: {
    fontSize: 13,
  },
  relatedSection: {
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  relatedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 6,
  },
  nextIcon: {
    fontSize: 16,
  },
  relatedScrollView: {
    paddingHorizontal: 10,
  },
  relatedItem: {
    width: 180,
    marginRight: 16,
    borderRadius: 8,
    padding: 8,
  },
  relatedImage: {
    width: '100%',
    height: 120,
    borderRadius: 6,
    marginBottom: 8,
  },
  relatedItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  relatedItemDescription: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
  },
  relatedItemFooter: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  relatedItemTime: {
    fontSize: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },
});