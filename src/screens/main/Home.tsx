import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import showMessage from '../../utils/helper/showMessage';
import {
  addCardRequest,
  deleteCard,
  updateCard,
} from '../../redux/reducer/CardReducer';
import {useAppDispatch, useAppSelector} from '../../redux/store/Store';
import {Fonts} from '../../themes/Fonts';
import {Icons} from '../../themes/Icons';
import {Colors} from '../../themes/Colors';
import { colorCodes } from '../../utils/constant';

const Home = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<TextInput>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editSelectedIndex, setEditSelectedIndex] = useState<number | null>(
    null,
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDeleteIndex, setCardToDeleteIndex] = useState<number | null>(
    null,
  );

  // You can access cards from redux if needed
  const cards = useAppSelector(state => state.card.cards);

  function isValid() {
    if (selectedIndex === null) {
      showMessage('Please select a color');
    } else if (title.trim() === '') {
      showMessage('Title is required');
    } else if (title.length < 5 || title.length > 20) {
      showMessage('Title must be 5-20 characters');
    } else if (description.trim() === '') {
      showMessage('Description is required');
    } else if (description.length < 10) {
      showMessage('Description must be at least 10 characters');
    } else if (/[^a-zA-Z0-9 ]/.test(title)) {
      showMessage('Title should not contain special characters');
    } else {
      dispatch(
        addCardRequest({
          title,
          description,
          color: colorCodes[selectedIndex],
        }),
      );
      setModalVisible(false);
      showMessage('Card added successfully!');
      setTitle('');
      setDescription('');
      setSelectedIndex(null);
    }
  }

  const openEditModal = (index: number) => {
    const card = cards[index];
    setEditIndex(index);
    setEditTitle(card.title);
    setEditDescription(card.description);
    // Find color index from colorCodes array, fallback to null if not found
    const colorIndex = colorCodes.findIndex(c => c === card.color);
    setEditSelectedIndex(colorIndex !== -1 ? colorIndex : null);
    setEditModalVisible(true);
  };

  const handleUpdateCard = () => {
    if (editSelectedIndex === null) {
      showMessage('Please select a color');
    } else if (editTitle.trim() === '') {
      showMessage('Title is required');
    } else if (editTitle.length < 5 || editTitle.length > 20) {
      showMessage('Title must be 5-20 characters');
    } else if (editDescription.trim() === '') {
      showMessage('Description is required');
    } else if (editDescription.length < 10) {
      showMessage('Description must be at least 10 characters');
    } else if (/[^a-zA-Z0-9 ]/.test(editTitle)) {
      showMessage('Title should not contain special characters');
    } else if (editIndex === null) {
      showMessage('Invalid card selection');
    } else {
      dispatch(
        updateCard({
          title: editTitle,
          description: editDescription,
          color: colorCodes[editSelectedIndex],
          index: editIndex,
        }),
      );
      setEditModalVisible(false);
      showMessage('Card updated successfully!');
      setEditTitle('');
      setEditDescription('');
      setEditSelectedIndex(null);
      setEditIndex(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'yellow'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Card Lists</Text>
      </View>

      <FlatList
        data={cards}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={styles.cardListContainer}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => openEditModal(index)}
            style={[styles.card, {backgroundColor: item.color}]}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            {/* Long press delete button */}
            <TouchableOpacity
              onLongPress={() => {
                setShowDeleteModal(true);
                setCardToDeleteIndex(index);
              }}>
              <Image source={Icons.delete} style={styles.deleteIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* + Icon Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.touch}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png',
          }}
          style={styles.plusIcon}
        />
      </TouchableOpacity>

      {/* Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        />

        <View style={styles.bottomSheet}>
          <Text style={styles.sheetText}>Choose a Color</Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.centeredView}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                <View>
                  <FlatList
                    data={colorCodes}
                    horizontal
                    keyExtractor={(item, index) => `h-${index}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingVertical: 10,
                      paddingEnd: 10,
                    }}
                    renderItem={({item, index}) => {
                      const isSelected = selectedIndex === index;
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            setSelectedIndex(
                              index === selectedIndex ? null : index,
                            )
                          }
                          style={styles.touchableWrapper}
                          activeOpacity={0.7}>
                          <View
                            style={[
                              styles.select,
                              isSelected && {
                                borderColor: item,
                              },
                            ]}>
                            <View
                              style={[
                                styles.colorCircle,
                                {
                                  backgroundColor: item,
                                },
                              ]}
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  placeholder="Enter title"
                  value={title}
                  onChangeText={setTitle}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, {height: 80}]}
                  placeholder="Enter description"
                  multiline
                  value={description}
                  onChangeText={setDescription}
                />

                <TouchableOpacity style={styles.submitButton} onPress={isValid}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </Modal>

      {/* Modal Update display */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setEditModalVisible(false)}
        />

        <View style={styles.bottomSheet}>
          <TouchableOpacity
            onPress={() => setEditModalVisible(false)}
            style={styles.touchClose}>
            <Image source={Icons.close} style={styles.closeIcon} />
          </TouchableOpacity>

          <Text style={styles.sheetText}>Update Card</Text>

          {/* Horizontal FlatList of colors */}
          <FlatList
            data={colorCodes}
            horizontal
            keyExtractor={(item, index) => `edit-${index}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingEnd: 10,
            }}
            renderItem={({item, index}) => {
              const isSelected = editSelectedIndex === index;
              return (
                <TouchableOpacity
                  onPress={() =>
                    setEditSelectedIndex(
                      index === editSelectedIndex ? null : index,
                    )
                  }
                  style={styles.touchableWrapper}
                  activeOpacity={0.7}>
                  <View
                    style={[
                      styles.select,
                      isSelected && {
                        borderColor: item,
                      },
                    ]}>
                    <View
                      style={[
                        styles.colorCircle,
                        {
                          backgroundColor: item,
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={editTitle}
            onChangeText={setEditTitle}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, {height: 80}]}
            placeholder="Enter description"
            multiline
            value={editDescription}
            onChangeText={setEditDescription}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleUpdateCard}>
            <Text style={styles.submitText}>Update</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Delete Modal Display */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.deleteOverlay}>
          <View style={styles.deleteModal}>
            <Text style={styles.textAction}>
              Are you sure that you want to delete this card?
            </Text>
            <View style={styles.action}>
              <TouchableOpacity
                onPress={() => {
                  if (cardToDeleteIndex !== null) {
                    dispatch(deleteCard(cardToDeleteIndex));
                  }
                  setShowDeleteModal(false);
                  setCardToDeleteIndex(null);
                }}
                style={styles.yesAction}>
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowDeleteModal(false);
                  setCardToDeleteIndex(null);
                }}
                style={styles.noAction}>
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'yellow',
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  touch: {
    width: 60,
    height: 60,
    backgroundColor: 'rgb(31, 89, 198)',
    borderRadius: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
  plusIcon: {
    width: 22,
    height: 22,
    tintColor: 'white',
  },
  colorIconSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    height: '50%',
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
  },
  sheetText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Fonts.Poppins_SemiBold,
    marginBottom: 10,
  },
  touchableWrapper: {
    marginRight: 15,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonWrapper: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 100,
    elevation: 10,
  },
  select: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    padding: 1.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  scrollContainer: {
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.grey,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.whiteSmoke,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: Colors.blue,
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  submitText: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: Fonts.Poppins_Medium,
  },
  cardListContainer: {
    paddingTop: 16,
    marginHorizontal: 5,
  },
  card: {
    flex: 0.48,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.Poppins_SemiBold,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 15,
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.whiteGrey,
    textAlign: 'center',
    marginBottom: 10,
  },
  touchClose: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeIcon: {
    resizeMode: 'contain',
    width: 15,
    height: 15,
    tintColor: 'red',
  },
  deleteIcon: {
    resizeMode: 'contain',
    width: 14,
    height: 14,
    tintColor: Colors.black,
  },
  deleteOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModal: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  textAction: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: Fonts.Poppins_SemiBold,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  yesAction: {
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  yesText: {
    color: Colors.white,
    fontFamily: Fonts.Poppins_Medium,
  },
  noAction: {
    backgroundColor: Colors.grey,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  noText: {
    color: Colors.white,
    fontFamily: Fonts.Poppins_Medium,
  },
});
