import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReports } from '../../redux/slices/reportsSlice';
import { fetchResources } from '../../redux/slices/resourcesSlice';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import { COLORS } from '../../constants/colors';

const TeacherDashboard = ({ navigation }) => {
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

  const quickActions = [
    {
      title: 'View Students',
      icon: '👥',
      onPress: () => navigation.navigate('TeacherStudents'),
    },
    {
      title: 'Invitations',
      icon: '🎫',
      onPress: () => navigation.navigate('TeacherInvitations'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.name || user?.email || 'Teacher'}</Text>
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
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={action.onPress}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {reports?.slice(0, 3).map((report, index) => (
          <Card key={index}>
            <Text style={styles.itemTitle}>{report.title || 'Report'}</Text>
            <Text style={styles.itemDate}>
              {new Date(report.created_at).toLocaleDateString()}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
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

export default TeacherDashboard;
