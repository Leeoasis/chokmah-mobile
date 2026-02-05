import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { uploadReport } from '../../redux/slices/reportsSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { COLORS } from '../../constants/colors';

const UploadReportScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, uploadProgress } = useSelector((state) => state.reports);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    student_name: '',
    file: null,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFormData({ ...formData, file: result.assets[0] });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleUpload = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (!formData.student_name.trim()) {
      Alert.alert('Error', 'Please enter student name');
      return;
    }

    if (!formData.file) {
      Alert.alert('Error', 'Please select a PDF file');
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append('report[title]', formData.title);
    uploadFormData.append('report[description]', formData.description);
    uploadFormData.append('report[student_name]', formData.student_name);
    uploadFormData.append('report[file]', {
      uri: formData.file.uri,
      type: formData.file.mimeType || 'application/pdf',
      name: formData.file.name,
    });

    try {
      await dispatch(uploadReport(uploadFormData)).unwrap();
      Alert.alert('Success', 'Report uploaded successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error || 'Failed to upload report');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Upload Report</Text>

        <Input
          label="Report Title"
          value={formData.title}
          onChangeText={(value) => handleChange('title', value)}
          placeholder="Enter report title"
        />

        <Input
          label="Student Name"
          value={formData.student_name}
          onChangeText={(value) => handleChange('student_name', value)}
          placeholder="Enter student name"
        />

        <Input
          label="Description"
          value={formData.description}
          onChangeText={(value) => handleChange('description', value)}
          placeholder="Enter report description"
          multiline
          numberOfLines={4}
        />

        <View style={styles.fileSection}>
          <Text style={styles.label}>Select PDF File</Text>
          <TouchableOpacity style={styles.filePicker} onPress={pickDocument}>
            <Text style={styles.filePickerText}>
              {formData.file ? formData.file.name : 'Choose PDF File'}
            </Text>
            <Text style={styles.filePickerIcon}>📄</Text>
          </TouchableOpacity>
          {formData.file && (
            <Text style={styles.fileInfo}>
              Selected: {formData.file.name}
            </Text>
          )}
        </View>

        <Button
          title="Upload Report"
          onPress={handleUpload}
          loading={loading}
          style={styles.uploadButton}
        />

        {uploadProgress > 0 && uploadProgress < 100 && (
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${uploadProgress}%` }]} />
          </View>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  card: {
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  fileSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  filePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    borderStyle: 'dashed',
  },
  filePickerText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  filePickerIcon: {
    fontSize: 24,
  },
  fileInfo: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  uploadButton: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 2,
    marginTop: 16,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
});

export default UploadReportScreen;
