import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Card from '../../components/common/Card';
import { COLORS } from '../../constants/colors';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    { label: 'Total Parents', value: '0', icon: '👨‍👩‍👧‍👦' },
    { label: 'Total Teachers', value: '0', icon: '👨‍🏫' },
    { label: 'Total Reports', value: '0', icon: '📄' },
    { label: 'Total Resources', value: '0', icon: '📁' },
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

      <View style={styles.content}>
        <Card>
          <Text style={styles.sectionTitle}>System Overview</Text>
          <Text style={styles.infoText}>
            Admin features are under development. This dashboard will provide:
          </Text>
          <Text style={styles.bulletPoint}>• User management (parents & teachers)</Text>
          <Text style={styles.bulletPoint}>• System-wide analytics</Text>
          <Text style={styles.bulletPoint}>• Resource management</Text>
          <Text style={styles.bulletPoint}>• Report generation</Text>
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
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
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
