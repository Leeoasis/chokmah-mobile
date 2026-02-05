import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReports } from '../../redux/slices/reportsSlice';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import { COLORS } from '../../constants/colors';

const ReportsScreen = () => {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.reports);

  useEffect(() => {
    dispatch(fetchReports());
  }, []);

  const renderReport = ({ item }) => (
    <Card>
      <Text style={styles.title}>{item.title || 'Report'}</Text>
      <Text style={styles.description}>{item.description || 'No description'}</Text>
      <Text style={styles.date}>
        Date: {new Date(item.created_at).toLocaleDateString()}
      </Text>
      {item.teacher_name && (
        <Text style={styles.teacher}>By: {item.teacher_name}</Text>
      )}
    </Card>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {reports && reports.length > 0 ? (
        <FlatList
          data={reports}
          renderItem={renderReport}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No reports available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  list: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  teacher: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default ReportsScreen;
