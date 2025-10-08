import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';

import {
  View,
  FlatList,
  Text,
  RefreshControl,
  Alert,
  Linking,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useContacts} from '../../utils/ContactContext';
import ContactListItem from '../../components/common/ContactListItem';
import CustomInput from '../../components/common/CustomInput';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {searchContacts} from '../../data/contactsData';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

console.log('✅ [globalStyles] Fonts loaded =', Fonts);

const ContactListScreen = ({navigation}) => {
  const {contacts, loading, toggleFavorite, deleteContact, refreshContacts} =
    useContacts();

  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'company' | 'recent'

  // Memoized filtered and sorted contacts
  const displayContacts = useMemo(() => {
    const filtered = searchContacts(contacts, searchTerm);

    // Sort contacts
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB);
      } else if (sortBy === 'company') {
        const companyA = (a.company || '').toLowerCase();
        const companyB = (b.company || '').toLowerCase();
        return companyA.localeCompare(companyB);
      } else if (sortBy === 'recent') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    // Favorites first
    return filtered.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return 0;
    });
  }, [contacts, searchTerm, sortBy]);

  // Handle pull to refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshContacts();
    setRefreshing(false);
  }, [refreshContacts]);

  // Handle contact press
  const handleContactPress = useCallback(
    contact => {
      navigation.navigate('ContactDetails', {contactId: contact.id});
    },
    [navigation],
  );

  // Handle favorite toggle
  const handleFavoritePress = useCallback(
    async contactId => {
      await toggleFavorite(contactId);
    },
    [toggleFavorite],
  );

  // Handle phone call
  const handleCallPress = useCallback(phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    });
  }, []);

  // Handle SMS
  const handleMessagePress = useCallback(phoneNumber => {
    const url = `sms:${phoneNumber}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'SMS is not supported on this device');
      }
    });
  }, []);

  // Render contact item
  const renderContactItem = useCallback(
    ({item}) => (
      <ContactListItem
        contact={item}
        onPress={handleContactPress}
        onFavoritePress={handleFavoritePress}
        onCallPress={handleCallPress}
        onMessagePress={handleMessagePress}
      />
    ),
    [
      handleContactPress,
      handleFavoritePress,
      handleCallPress,
      handleMessagePress,
    ],
  );

  // Render empty state
  const renderEmptyState = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Icon name="contacts" size={80} color={Colors.text.secondary} />
        <Text style={styles.emptyTitle}>No Contacts Found</Text>
        <Text style={styles.emptyText}>
          {searchTerm
            ? `No contacts match "${searchTerm}"`
            : 'Add your first contact to get started'}
        </Text>
      </View>
    ),
    [searchTerm],
  );

  // Show loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchContainer}>
        <CustomInput
          label="Search contacts"
          value={searchTerm}
          onChangeText={setSearchTerm}
          leftIcon="search"
          rightIcon={searchTerm ? 'clear' : null}
          onRightIconPress={() => setSearchTerm('')}
          placeholder="Search by name, company, or email"
        />
      </View>

      {/* Contact Count */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {displayContacts.length} contact
          {displayContacts.length !== 1 ? 's' : ''}
          {searchTerm && ` for "${searchTerm}"`}
        </Text>
      </View>

      {/* Contacts List */}
      <FlatList
        data={displayContacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContainer,
          displayContacts.length === 0 && styles.emptyListContainer,
        ]}
        getItemLayout={(data, index) => ({
          length: 90, // Approximate item height
          offset: 90 * index,
          index,
        })}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddContact')}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Add new contact">
        <Icon name="add" size={24} color={Colors.text.light} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  emptyContainer: {
    ...GlobalStyles.centered,
    paddingHorizontal: Spacing.xl,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    color: Colors.text.secondary,
    fontSize: Fonts.medium,
    lineHeight: 22,
    textAlign: 'center',
  },
  emptyTitle: {
    color: Colors.text.primary,
    fontSize: Fonts.large,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  floatingButton: {
    backgroundColor: Colors.primary,
    borderRadius: 28,
    bottom: 20,
    height: 56,
    position: 'absolute',
    right: 20,
    width: 56,
    ...GlobalStyles.centered,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  listContainer: {
    paddingBottom: 80, // Space for floating button
  },
  searchContainer: {
    backgroundColor: Colors.surface,
    elevation: 2,
    paddingBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  statsText: {
    color: Colors.text.secondary,
    fontSize: Fonts.small,
  },
});

export default ContactListScreen;
