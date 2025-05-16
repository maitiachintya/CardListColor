import {StyleSheet} from 'react-native';
import {Fonts} from '../../themes/Fonts';

export const styles = StyleSheet.create({
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
    tintColor: 'white'
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
  },
  sheetText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
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
  cardItem: {
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  select: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    padding: 1.5,
  },
  inputContainer: {
    // padding: 16,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // padding: 20,
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  button: {
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 10,
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  cardListContainer: {
    padding: 16,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    elevation: 2,
  },

  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  cardContainer: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardColorIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  plusButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 10,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  cardList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
});
