import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResources } from '../../redux/slices/resourcesSlice';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import { COLORS } from '../../constants/colors';

const ResourcesScreen = () => {
  const dispatch = useDispatch();
  const { resources, loading } = useSelector((state) => state.resources);

  useEffect(() => {
    dispatch(fetchResources());
  }, []);

  const renderResource = ({ item }) => (
    <Card>
      <Text style={styles.title}>{item.title || 'Resource'}</Text>
      <Text style={styles.description}>{item.description || 'No description'}</Text>
      <Text style={styles.date}>
        Date: {new Date(item.created_at).toLocaleDateString()}
      </Text>
      {item.file_type && (
        <Text style={styles.fileType}>Type: {item.file_type}</Text>
      )}
    </Card>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {resources && resources.length > 0 ? (
        <FlatList
          data={resources}
          renderItem={renderResource}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No resources available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  list: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  fileType: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default ResourcesScreen;
