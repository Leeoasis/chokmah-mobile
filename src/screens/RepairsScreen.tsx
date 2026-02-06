import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { RepairJob, Customer } from '../types';
import { RepairService, CustomerService, DeviceService } from '../services/dataService';

const RepairsScreen = () => {
  const [repairs, setRepairs] = useState<RepairJob[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [deviceBrand, setDeviceBrand] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');

  useEffect(() => {
    loadRepairs();
    loadCustomers();
  }, []);

  const loadRepairs = async () => {
    const allRepairs = await RepairService.getAll();
    setRepairs(allRepairs.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const loadCustomers = async () => {
    const allCustomers = await CustomerService.getAll();
    setCustomers(allCustomers);
  };

  const handleAddRepair = async () => {
    if (!selectedCustomer || !deviceType || !description || !estimatedCost) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      // Create device
      const device = await DeviceService.create({
        customerId: selectedCustomer,
        type: deviceType,
        brand: deviceBrand,
        model: deviceModel,
      });

      // Create repair job
      await RepairService.create({
        customerId: selectedCustomer,
        deviceId: device.id,
        description,
        status: 'pending',
        estimatedCost: parseFloat(estimatedCost),
      });

      Alert.alert('Success', 'Repair job created successfully');
      resetForm();
      setShowAddModal(false);
      loadRepairs();
    } catch (error) {
      Alert.alert('Error', 'Failed to create repair job');
    }
  };

  const resetForm = () => {
    setSelectedCustomer('');
    setDeviceType('');
    setDeviceBrand('');
    setDeviceModel('');
    setDescription('');
    setEstimatedCost('');
  };

  const updateStatus = async (repairId: string, newStatus: RepairJob['status']) => {
    try {
      await RepairService.update(repairId, { status: newStatus });
      loadRepairs();
    } catch (error) {
      Alert.alert('Error', 'Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FF9500';
      case 'in-progress':
        return '#007AFF';
      case 'completed':
        return '#34C759';
      case 'delivered':
        return '#5856D6';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#999';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Repairs</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>+ New Repair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={repairs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.repairCard}>
            <View style={styles.repairHeader}>
              <Text style={styles.repairId}>#{item.id.slice(-6)}</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) },
                ]}
              >
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.repairDescription}>{item.description}</Text>
            <Text style={styles.repairCost}>
              Estimated: ${item.estimatedCost.toFixed(2)}
            </Text>
            <Text style={styles.repairDate}>
              Created: {new Date(item.createdAt).toLocaleDateString()}
            </Text>

            <View style={styles.statusButtons}>
              {item.status === 'pending' && (
                <TouchableOpacity
                  style={[styles.statusButton, { backgroundColor: '#007AFF' }]}
                  onPress={() => updateStatus(item.id, 'in-progress')}
                >
                  <Text style={styles.statusButtonText}>Start</Text>
                </TouchableOpacity>
              )}
              {item.status === 'in-progress' && (
                <TouchableOpacity
                  style={[styles.statusButton, { backgroundColor: '#34C759' }]}
                  onPress={() => updateStatus(item.id, 'completed')}
                >
                  <Text style={styles.statusButtonText}>Complete</Text>
                </TouchableOpacity>
              )}
              {item.status === 'completed' && (
                <TouchableOpacity
                  style={[styles.statusButton, { backgroundColor: '#5856D6' }]}
                  onPress={() => updateStatus(item.id, 'delivered')}
                >
                  <Text style={styles.statusButtonText}>Deliver</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No repair jobs found</Text>
        }
      />

      <Modal
        visible={showAddModal}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Repair Job</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Customer</Text>
            <View style={styles.pickerContainer}>
              <FlatList
                data={customers}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.customerOption,
                      selectedCustomer === item.id && styles.selectedCustomer,
                    ]}
                    onPress={() => setSelectedCustomer(item.id)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <Text style={styles.label}>Device Type*</Text>
            <TextInput
              style={styles.input}
              value={deviceType}
              onChangeText={setDeviceType}
              placeholder="e.g., Smartphone, Laptop"
            />

            <Text style={styles.label}>Brand</Text>
            <TextInput
              style={styles.input}
              value={deviceBrand}
              onChangeText={setDeviceBrand}
              placeholder="e.g., Apple, Samsung"
            />

            <Text style={styles.label}>Model</Text>
            <TextInput
              style={styles.input}
              value={deviceModel}
              onChangeText={setDeviceModel}
              placeholder="e.g., iPhone 12, Galaxy S21"
            />

            <Text style={styles.label}>Problem Description*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe the issue..."
              multiline
              numberOfLines={4}
            />

            <Text style={styles.label}>Estimated Cost*</Text>
            <TextInput
              style={styles.input}
              value={estimatedCost}
              onChangeText={setEstimatedCost}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddRepair}
            >
              <Text style={styles.submitButtonText}>Create Repair Job</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  addButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  repairCard: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  repairHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  repairId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  repairDescription: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  repairCost: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  repairDate: {
    fontSize: 12,
    color: '#666',
  },
  statusButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  statusButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  statusButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    maxHeight: 150,
  },
  customerOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedCustomer: {
    backgroundColor: '#007AFF',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RepairsScreen;
