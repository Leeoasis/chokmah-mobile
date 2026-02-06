import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SalesService, RepairService, ProductService } from '../services/dataService';
import { Sale } from '../types';

const ReportsScreen = () => {
  const [todaySales, setTodaySales] = useState(0);
  const [weekSales, setWeekSales] = useState(0);
  const [monthSales, setMonthSales] = useState(0);
  const [totalRepairs, setTotalRepairs] = useState(0);
  const [completedRepairs, setCompletedRepairs] = useState(0);
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = async () => {
    // Sales data
    const today = await SalesService.getTodayTotal();
    setTodaySales(today);

    const allSales = await SalesService.getAll();
    setRecentSales(allSales.slice(-5).reverse());

    // Calculate week sales
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekSalesData = await SalesService.getByDateRange(weekAgo, new Date());
    const weekTotal = weekSalesData.reduce((sum, s) => sum + s.total, 0);
    setWeekSales(weekTotal);

    // Calculate month sales
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const monthSalesData = await SalesService.getByDateRange(monthAgo, new Date());
    const monthTotal = monthSalesData.reduce((sum, s) => sum + s.total, 0);
    setMonthSales(monthTotal);

    // Repairs data
    const repairs = await RepairService.getAll();
    setTotalRepairs(repairs.length);
    setCompletedRepairs(repairs.filter(r => r.status === 'completed' || r.status === 'delivered').length);

    // Inventory data
    const lowStock = await ProductService.getLowStock();
    setLowStockCount(lowStock.length);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports & Analytics</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadReportData}
        >
          <Text style={styles.refreshText}>🔄 Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Sales Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sales Summary</Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statBox, styles.todayBox]}>
            <Text style={styles.statLabel}>Today</Text>
            <Text style={styles.statValue}>${todaySales.toFixed(2)}</Text>
          </View>
          <View style={[styles.statBox, styles.weekBox]}>
            <Text style={styles.statLabel}>This Week</Text>
            <Text style={styles.statValue}>${weekSales.toFixed(2)}</Text>
          </View>
          <View style={[styles.statBox, styles.monthBox]}>
            <Text style={styles.statLabel}>This Month</Text>
            <Text style={styles.statValue}>${monthSales.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Repairs Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Repairs Summary</Text>
        <View style={styles.repairStats}>
          <View style={styles.repairStatItem}>
            <Text style={styles.repairStatValue}>{totalRepairs}</Text>
            <Text style={styles.repairStatLabel}>Total Repairs</Text>
          </View>
          <View style={styles.repairStatItem}>
            <Text style={[styles.repairStatValue, { color: '#34C759' }]}>
              {completedRepairs}
            </Text>
            <Text style={styles.repairStatLabel}>Completed</Text>
          </View>
          <View style={styles.repairStatItem}>
            <Text style={[styles.repairStatValue, { color: '#FF9500' }]}>
              {totalRepairs - completedRepairs}
            </Text>
            <Text style={styles.repairStatLabel}>Pending</Text>
          </View>
        </View>
        {totalRepairs > 0 && (
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(completedRepairs / totalRepairs) * 100}%` },
              ]}
            />
          </View>
        )}
      </View>

      {/* Inventory Alert */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inventory Status</Text>
        {lowStockCount > 0 ? (
          <View style={styles.alertBox}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Low Stock Alert</Text>
              <Text style={styles.alertText}>
                {lowStockCount} item{lowStockCount > 1 ? 's' : ''} running low on stock
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.successBox}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successText}>All items are well stocked</Text>
          </View>
        )}
      </View>

      {/* Recent Sales */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Sales</Text>
        {recentSales.length > 0 ? (
          recentSales.map(sale => (
            <View key={sale.id} style={styles.saleItem}>
              <View style={styles.saleHeader}>
                <Text style={styles.saleId}>#{sale.id.slice(-6)}</Text>
                <Text style={styles.saleTotal}>${sale.total.toFixed(2)}</Text>
              </View>
              <View style={styles.saleDetails}>
                <Text style={styles.saleItems}>
                  {sale.items.length} item{sale.items.length > 1 ? 's' : ''}
                </Text>
                <Text style={styles.salePayment}>
                  {sale.paymentMethod.charAt(0).toUpperCase() + sale.paymentMethod.slice(1)}
                </Text>
                <Text style={styles.saleDate}>
                  {new Date(sale.createdAt).toLocaleString()}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No sales yet</Text>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  refreshButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  refreshText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    margin: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  todayBox: {
    backgroundColor: '#E8F5E9',
  },
  weekBox: {
    backgroundColor: '#E3F2FD',
  },
  monthBox: {
    backgroundColor: '#FFF3E0',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  repairStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  repairStatItem: {
    alignItems: 'center',
  },
  repairStatValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  repairStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  alertIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9500',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#666',
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 8,
  },
  successIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  successText: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '600',
  },
  saleItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  saleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  saleId: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  saleTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
  },
  saleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saleItems: {
    fontSize: 12,
    color: '#666',
  },
  salePayment: {
    fontSize: 12,
    color: '#666',
  },
  saleDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
  },
});

export default ReportsScreen;
