import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { SalesService, RepairService, ProductService } from '../services/dataService';

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const [todaySales, setTodaySales] = useState(0);
  const [pendingRepairs, setPendingRepairs] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const sales = await SalesService.getTodayTotal();
      setTodaySales(sales);

      const repairs = await RepairService.getAll();
      const pending = repairs.filter(r => r.status === 'pending' || r.status === 'in-progress');
      setPendingRepairs(pending.length);

      const lowStock = await ProductService.getLowStock();
      setLowStockCount(lowStock.length);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.salesCard]}>
          <Text style={styles.statLabel}>Today's Sales</Text>
          <Text style={styles.statValue}>${todaySales.toFixed(2)}</Text>
        </View>

        <View style={[styles.statCard, styles.repairsCard]}>
          <Text style={styles.statLabel}>Pending Repairs</Text>
          <Text style={styles.statValue}>{pendingRepairs}</Text>
        </View>

        <View style={[styles.statCard, styles.inventoryCard]}>
          <Text style={styles.statLabel}>Low Stock Items</Text>
          <Text style={styles.statValue}>{lowStockCount}</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🛒</Text>
            <Text style={styles.actionText}>New Sale</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔧</Text>
            <Text style={styles.actionText}>New Repair</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👤</Text>
            <Text style={styles.actionText}>Add Customer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📦</Text>
            <Text style={styles.actionText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  statsContainer: {
    padding: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  salesCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#34C759',
  },
  repairsCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  inventoryCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  quickActions: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});

export default HomeScreen;
