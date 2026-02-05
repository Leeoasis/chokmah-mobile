import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReports } from '../../redux/slices/reportsSlice';
import { fetchResources } from '../../redux/slices/resourcesSlice';
import Card from '../../components/common/Card';
import { COLORS } from '../../constants/colors';

const AdminDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reports } = useSelector((state) => state.reports);
  const { resources } = useSelector((state) => state.resources);

  useEffect(() => {
    dispatch(fetchReports());
    dispatch(fetchResources());
  }, []);

  const stats = [
    { label: 'Total Parents', value: '0', icon: '👨‍👩‍👧‍👦' },
    { label: 'Total Teachers', value: '0', icon: '👨‍🏫' },
    { label: 'Total Reports', value: reports?.length || '0', icon: '📄' },
    { label: 'Total Resources', value: resources?.length || '0', icon: '📁' },
  ];

  const quickActions = [
    {
      title: 'Upload Resource',
      icon: '📁',
      onPress: () => navigation.navigate('AdminUploadResource'),
    },
    {
      title: 'Upload Report',
      icon: '📄',
      onPress: () => navigation.navigate('AdminUploadReport'),
    },
    {
      title: 'User Management',
      icon: '👥',
      onPress: () => {}, // Placeholder
    },
    {
      title: 'Analytics',
      icon: '📊',
      onPress: () => {}, // Placeholder
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Admin Dashboard</Text>
        <Text style={styles.userName}>{user?.email || 'Administrator'}</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Card>
        ))}
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

      <View style={styles.content}>
        <Card>
          <Text style={styles.sectionTitle}>System Overview</Text>
          <Text style={styles.infoText}>
            Admin features for managing the system:
          </Text>
          <Text style={styles.bulletPoint}>• Upload and manage reports & resources</Text>
          <Text style={styles.bulletPoint}>• User management (parents & teachers)</Text>
          <Text style={styles.bulletPoint}>• System-wide analytics</Text>
          <Text style={styles.bulletPoint}>• Administrative controls</Text>
        </Card>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
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
  content: {
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  bulletPoint: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginVertical: 4,
    lineHeight: 20,
  },
});

export default AdminDashboard;
