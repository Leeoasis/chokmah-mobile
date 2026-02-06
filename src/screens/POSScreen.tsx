import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Product, CartItem } from '../types';
import { ProductService, SalesService } from '../services/dataService';
import { useAuth } from '../contexts/AuthContext';

const POSScreen = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const allProducts = await ProductService.getAll();
    setProducts(allProducts);
  };

  const filteredProducts = products.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      Alert.alert('Out of Stock', 'This item is currently out of stock');
      return;
    }

    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        Alert.alert('Stock Limit', 'Cannot add more than available stock');
        return;
      }
      setCart(
        cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    if (item && item.quantity > 1) {
      setCart(
        cart.map(i =>
          i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    } else {
      setCart(cart.filter(i => i.product.id !== productId));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + calculateTax(subtotal);
  };

  const handleCheckout = async (paymentMethod: 'cash' | 'card' | 'mobile') => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart before checkout');
      return;
    }

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const total = calculateTotal();

    try {
      await SalesService.create({
        items: cart,
        subtotal,
        tax,
        total,
        paymentMethod,
        createdBy: user?.id || '1',
      });

      Alert.alert('Success', 'Sale completed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            setShowCheckout(false);
            loadProducts(); // Reload to update stock
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to complete sale. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Point of Sale</Text>
      </View>

      <View style={styles.content}>
        {/* Product List */}
        <View style={styles.productsSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productItem}
                onPress={() => addToCart(item)}
              >
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productSku}>SKU: {item.sku}</Text>
                  <Text style={styles.productStock}>Stock: {item.stock}</Text>
                </View>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No products found</Text>
            }
          />
        </View>

        {/* Cart */}
        <View style={styles.cartSection}>
          <Text style={styles.cartTitle}>Cart ({cart.length})</Text>

          <FlatList
            data={cart}
            keyExtractor={item => item.product.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.product.name}</Text>
                  <Text style={styles.cartItemPrice}>
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </Text>
                </View>
                <View style={styles.cartItemActions}>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => removeFromCart(item.product.id)}
                  >
                    <Text style={styles.cartButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.cartQuantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => addToCart(item.product)}
                  >
                    <Text style={styles.cartButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.cartItemTotal}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyCartText}>Cart is empty</Text>
            }
          />

          <View style={styles.cartSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>
                ${calculateSubtotal().toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (10%):</Text>
              <Text style={styles.summaryValue}>
                ${calculateTax(calculateSubtotal()).toFixed(2)}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.cartActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.clearButton]}
              onPress={clearCart}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.checkoutButton]}
              onPress={() => setShowCheckout(true)}
              disabled={cart.length === 0}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Checkout Modal */}
      <Modal
        visible={showCheckout}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCheckout(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>

            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => handleCheckout('cash')}
            >
              <Text style={styles.paymentButtonText}>💵 Cash</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => handleCheckout('card')}
            >
              <Text style={styles.paymentButtonText}>💳 Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => handleCheckout('mobile')}
            >
              <Text style={styles.paymentButtonText}>📱 Mobile Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowCheckout(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  productsSection: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productSku: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  productStock: {
    fontSize: 12,
    color: '#999',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  cartSection: {
    width: 350,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    padding: 15,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 12,
    color: '#666',
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  cartButton: {
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartQuantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 80,
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  emptyCartText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  cartSummary: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#ddd',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  cartActions: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#34C759',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default POSScreen;
