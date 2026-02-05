import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReports } from '../../redux/slices/reportsSlice';
import { fetchResources } from '../../redux/slices/resourcesSlice';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import { COLORS } from '../../constants/colors';

const ParentDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reports, loading: reportsLoading } = useSelector((state) => state.reports);
  const { resources, loading: resourcesLoading } = useSelector((state) => state.resources);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    dispatch(fetchReports());
    dispatch(fetchResources());
  };

  if (reportsLoading || resourcesLoading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.parent_name || 'Parent'}</Text>
        <Text style={styles.childInfo}>
          Child: {user?.child_name} - {user?.child_grade}
        </Text>
      </View>

      <View style={styles.quickStats}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{reports?.length || 0}</Text>
          <Text style={styles.statLabel}>Reports</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{resources?.length || 0}</Text>
          <Text style={styles.statLabel}>Resources</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ParentReports')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {reports?.slice(0, 3).map((report, index) => (
          <Card key={index}>
            <Text style={styles.itemTitle}>{report.title || 'Report'}</Text>
            <Text style={styles.itemDate}>
              {new Date(report.created_at).toLocaleDateString()}
            </Text>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Resources</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ParentResources')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {resources?.slice(0, 3).map((resource, index) => (
          <Card key={index}>
            <Text style={styles.itemTitle}>{resource.title || 'Resource'}</Text>
            <Text style={styles.itemDate}>
              {new Date(resource.created_at).toLocaleDateString()}
            </Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.textWhite,
    opacity: 0.9,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginTop: 4,
  },
  childInfo: {
    fontSize: 14,
    color: COLORS.textWhite,
    opacity: 0.8,
    marginTop: 8,
  },
  quickStats: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default ParentDashboard;
