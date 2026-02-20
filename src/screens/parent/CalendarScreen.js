import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../../components/common/Card';
import { COLORS } from '../../constants/colors';

const CalendarScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Homework & Assignments</Text>
        <Text style={styles.subtitle}>Calendar view coming soon</Text>
      </View>

      <View style={styles.content}>
        <Card>
          <Text style={styles.sectionTitle}>Upcoming Assignments</Text>
          <Text style={styles.placeholder}>
            This feature will display a calendar view of homework and assignments.
          </Text>
          <Text style={styles.placeholder}>
            Integration with react-native-calendars is ready for future implementation.
          </Text>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.itemText}>• No recent activities</Text>
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
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textWhite,
    opacity: 0.8,
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
  placeholder: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  itemText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginVertical: 4,
  },
});

export default CalendarScreen;
