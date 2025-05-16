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
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import {Icons} from '../../themes/Icons';
import showMessage from '../../utils/helper/showMessage';
import {addCardRequest} from '../../redux/reducer/CardReducer';
import {useAppDispatch, useAppSelector} from '../../redux/store/Store';

const colorCodes = [
  '#FF5733', // reddish orange
  '#33B5E5', // blue
  '#00C851', // green
  '#FFBB33', // yellow/orange
  '#AA66CC', // purple
  '#FF4444', // red
  '#0099CC', // sky blue
  '#2BBBAD', // teal
  '#4285F4', // Google blue
  '#5C6BC0', // indigo
  '#FFF',
  '#000',
];

const Index = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<TextInput>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'yellow'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Card Lists</Text>
      </View>

      {/* + Icon Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.touch}>
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

          {/* Horizontal FlatList */}

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
    </SafeAreaView>
  );
};

export default Index;
