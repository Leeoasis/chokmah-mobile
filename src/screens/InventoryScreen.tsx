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
import { Product } from '../types';
import { ProductService } from '../services/dataService';

const InventoryScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const allProducts = await ProductService.getAll();
    setProducts(allProducts);
  };

  const handleAddProduct = async () => {
    if (!name || !sku || !category || !price || !stock || !minStock) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      await ProductService.create({
        name,
        description,
        sku,
        category,
        price: parseFloat(price),
        cost: cost ? parseFloat(cost) : undefined,
        stock: parseInt(stock),
        minStock: parseInt(minStock),
      });

      Alert.alert('Success', 'Product added successfully');
      resetForm();
      setShowAddModal(false);
      loadProducts();
    } catch (error) {
      Alert.alert('Error', 'Failed to add product');
    }
  };

  const resetForm = () => {
    setName('');
    setSku('');
    setCategory('');
    setPrice('');
    setCost('');
    setStock('');
    setMinStock('');
    setDescription('');
  };

  const isLowStock = (product: Product) => {
    return product.stock <= product.minStock;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inventory</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.productCard,
              isLowStock(item) && styles.lowStockCard,
            ]}
          >
            <View style={styles.productHeader}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productSku}>SKU: {item.sku}</Text>
                <Text style={styles.productCategory}>{item.category}</Text>
              </View>
              <View style={styles.productPricing}>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                {item.cost && (
                  <Text style={styles.productCost}>Cost: ${item.cost.toFixed(2)}</Text>
                )}
              </View>
            </View>

            {item.description && (
              <Text style={styles.productDescription}>{item.description}</Text>
            )}

            <View style={styles.stockInfo}>
              <View style={styles.stockBadge}>
                <Text style={styles.stockLabel}>Stock:</Text>
                <Text
                  style={[
                    styles.stockValue,
                    isLowStock(item) && styles.lowStockValue,
                  ]}
                >
                  {item.stock}
                </Text>
              </View>
              <Text style={styles.minStock}>Min: {item.minStock}</Text>
              {isLowStock(item) && (
                <View style={styles.lowStockBadge}>
                  <Text style={styles.lowStockText}>⚠️ Low Stock</Text>
                </View>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
      />

      <Modal
        visible={showAddModal}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Product</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Product Name*</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter product name"
            />

            <Text style={styles.label}>SKU*</Text>
            <TextInput
              style={styles.input}
              value={sku}
              onChangeText={setSku}
              placeholder="Enter SKU"
              autoCapitalize="characters"
            />

            <Text style={styles.label}>Category*</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholder="e.g., Parts, Accessories"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Product description"
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Selling Price*</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Cost Price</Text>
            <TextInput
              style={styles.input}
              value={cost}
              onChangeText={setCost}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Initial Stock*</Text>
            <TextInput
              style={styles.input}
              value={stock}
              onChangeText={setStock}
              placeholder="0"
              keyboardType="number-pad"
            />

            <Text style={styles.label}>Minimum Stock Level*</Text>
            <TextInput
              style={styles.input}
              value={minStock}
              onChangeText={setMinStock}
              placeholder="0"
              keyboardType="number-pad"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddProduct}
            >
              <Text style={styles.submitButtonText}>Add Product</Text>
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
  productCard: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  lowStockCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productSku: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  productPricing: {
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  productCost: {
    fontSize: 12,
    color: '#666',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  stockLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  stockValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lowStockValue: {
    color: '#FF3B30',
  },
  minStock: {
    fontSize: 12,
    color: '#999',
  },
  lowStockBadge: {
    marginLeft: 'auto',
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lowStockText: {
    color: '#fff',
    fontSize: 12,
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

export default InventoryScreen;
