import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../store/useAppStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { isDarkMode, soundEnabled, gamesPlayed, toggleDarkMode, toggleSound } = useAppStore();

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, isDarkMode && styles.darkText]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={[styles.section, isDarkMode && styles.darkSection]}>
          <View style={styles.settingRow}>
            <View>
              <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>Dark Mode</Text>
              <Text style={[styles.settingDescription, isDarkMode && styles.darkSubText]}>
                Enable dark theme
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
              thumbColor={isDarkMode ? '#4F46E5' : '#F3F4F6'}
            />
          </View>
        </View>

        <View style={[styles.section, isDarkMode && styles.darkSection]}>
          <View style={styles.settingRow}>
            <View>
              <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>Sound Effects</Text>
              <Text style={[styles.settingDescription, isDarkMode && styles.darkSubText]}>
                Enable game sounds
              </Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
              thumbColor={soundEnabled ? '#4F46E5' : '#F3F4F6'}
            />
          </View>
        </View>

        <View style={[styles.section, isDarkMode && styles.darkSection]}>
          <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>Statistics</Text>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, isDarkMode && styles.darkSubText]}>Total Games Played</Text>
            <Text style={[styles.statValue, isDarkMode && styles.darkText]}>{gamesPlayed}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={[styles.infoText, isDarkMode && styles.darkSubText]}>
            💡 Tip: Dark mode and sound settings are saved using Zustand global state
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  darkContainer: {
    backgroundColor: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  darkText: {
    color: '#F9FAFB',
  },
  darkSubText: {
    color: '#D1D5DB',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkSection: {
    backgroundColor: '#374151',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  info: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
  },
});
