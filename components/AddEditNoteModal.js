import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Modal from "react-native-modal";

const { height } = Dimensions.get("window");

const AddEditNoteModal = ({ showModal, onSwipeComplete }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        isVisible={showModal}
        coverScreen
        collapsable
        swipeDirection="down"
        onSwipeComplete={onSwipeComplete}
        style = {{margin:0}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddEditNoteModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#333333",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
