import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import { colors, fontsMapper } from "../constants";
import { IS_IPHONE_X } from "../utils/utils";

const formattedDate = (timeInMillis) => {
  return moment(timeInMillis).fromNow();
};
const NoteItem = (props) => {
  const { width, aspectRatio, isSmall, note, onNotePress } = props;
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onNotePress}>
      <View
        style={[
          styles.parent,
          { backgroundColor: note.color, width, height: width * aspectRatio },
        ]}
      >
        <Text
          numberOfLines={isSmall ? 2 : IS_IPHONE_X ? 4 : 3}
          style={{ ...styles.title, width: width }}
        >
          {note.title}
        </Text>
        {!isSmall && (
          <Text
            numberOfLines={IS_IPHONE_X ? 4 : 3}
            style={[styles.subText, { width: width }]}
          >
            {note.content}
          </Text>
        )}
        <Text style={[styles.date]}>{formattedDate(note.date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  parent: {
    marginVertical: 7,
    paddingVertical: 10,
    borderRadius: 11,
  },
  title: {
    justifyContent: "flex-start",
    color: colors.primary,
    fontSize: 20,
    paddingHorizontal: 20,
    fontFamily: fontsMapper.pro_sans_bold,
  },
  date: {
    width: 120,
    padding: 3,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: 10,
    borderRadius: 7,
    textAlign: "center",
    marginStart: 18,
    fontFamily: fontsMapper.pro_sans,
    fontWeight: "300",
    color: colors.primary,
  },
  subText: {
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    fontFamily: fontsMapper.pro_sans,
    fontWeight: "600",
    color: colors.primary,
    fontSize: 16.5,
  },
});
