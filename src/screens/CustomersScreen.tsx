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
import { Customer } from '../types';
import { CustomerService } from '../services/dataService';

const CustomersScreen = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const allCustomers = await CustomerService.getAll();
    setCustomers(allCustomers);
  };

  const handleAddCustomer = async () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Name and phone are required');
      return;
    }

    try {
      await CustomerService.create({
        name,
        email,
        phone,
        address,
      });

      Alert.alert('Success', 'Customer added successfully');
      resetForm();
      setShowAddModal(false);
      loadCustomers();
    } catch (error) {
      Alert.alert('Error', 'Failed to add customer');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>+ Add Customer</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={customers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.customerCard}>
            <View style={styles.customerHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{item.name}</Text>
                <Text style={styles.customerPhone}>📞 {item.phone}</Text>
                {item.email && (
                  <Text style={styles.customerEmail}>✉️ {item.email}</Text>
                )}
                {item.address && (
                  <Text style={styles.customerAddress}>📍 {item.address}</Text>
                )}
              </View>
            </View>
            <Text style={styles.customerDate}>
              Joined: {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No customers found</Text>
        }
      />

      <Modal
        visible={showAddModal}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Customer</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Name*</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter customer name"
            />

            <Text style={styles.label}>Phone*</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter address"
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddCustomer}
            >
              <Text style={styles.submitButtonText}>Add Customer</Text>
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
  customerCard: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  customerHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  customerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  customerPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  customerAddress: {
    fontSize: 14,
    color: '#666',
  },
  customerDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
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
    height: 80,
    textAlignVertical: 'top',
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

export default CustomersScreen;
