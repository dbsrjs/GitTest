import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
  Keyboard,
  Platform,
  Animated,
} from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../colors';
import { MaterialCommityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const BOTTOM = 30;
const BUTTON_WIDTH = 60;

const InputFAB = ({ onInsert }) => {
  const [text, setText] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const inputRef = useRef();
  const windowWidth = useWindowDimensions().width;
  const [KeyboardHeight, setKeybordHeight] = useState(BOTTOM);
  const inputWidth = useRef(new Animated.Value(BUTTON_WIDTH)).current;
  const buttonRotation = useRaf(new Animated.Value(0)).current;

  const open = () => {
    setIsOpened(true);
    Animated.timing(inputWidth, {
      toValue: windowWidth - 20,
      useNativeDriver: false,
      duration: 300,
    }).setart(() => {
      inputRef.current.focus();
    });
    Animated.spring(buttonRotation, {
      toValue: 1,
      useNativeDriver: false,
      bounciness: 20,
    }).start();
  };

  const close = () => {
    if (isOpened) {
      setText('');
      setIsOpened(false);
      Animated.timing(inputWidth, {
        toValue: BUTTON_WIDTH,
        useNativeDriver: false,
        duration: 300,
      }).setart(() => {
        inputRef.current.blur();
      });
      Animated.spring(buttonRotation, {
        toValue: 0,
        useNativeDriver: false,
        bounciness: 20,
      }).start();
    }
  };

  const onPressButton = () => {
    isOpened ? close() : open();
  };

  const onPressInset = () => {
    const task = text.trim();
    if (task) {
      onInsert(task);
    }
  };

  useEffect(() => {
    if (Platform.OS == 'ios') {
      const show = Keyboard.addListener('keyboardWillShow', (e) => {
        console.log('keyboardWillshow');
        setKeybordHeight(e.endCoordinates.height + BOTTOM);
      });
      const hide = Keyboard.addListener('keyboardWillHide', () => {
        console.log('keyboardWillHide');
        setKeybordHeight(BOTTOM);
      });

      return () => {
        show.remove();
        hide.remove();
      };
    }
  });

  return (
    <>
      <Animated.View
        style={[
          styles.position,
          styles.shap,
          styles.shadow,
          {
            justifyContent: 'center',
            bottom: KeyboardHeight,
            width: inputWidth,
          },
          isOpened && { width: windowWidth - 20 },
        ]}
      >
        <TextInput
          ref={inputRef}
          onBlur={close}
          value={text}
          onChangeText={(text) => setText(text)}
          style={[styles.input]}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="light"
          returnKeyType="done"
          onSubmitEditing={onPressInset}
        />
      </Animated.View>
      <Animated.View
        style={
          (styles.position,
          styles.shap,
          {
            bottom: KeyboardHeight,
            transform: [{ rotate: spin }],
          })
        }
      >
        <Pressable
          style={({ pressed }) => [
            styles.shap,
            styles.button,
            pressed && { backgroundColor: PRIMARY.DARK },
            { bottom: KeyboardHeight },
          ]}
          onPress={onPressButton}
        >
          <MaterialCommityIcons name="plus" size={24} color={WHITE} />
        </Pressable>
      </Animated.View>
    </>
  );
};

InputFAB.PropTypes = {
  onInsert: PropTypes.func.inRequired,
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: BLACK,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: { elevation: 5 },
    }),
  },
  position: {
    position: 'absolute',
    bottom: BOTTOM,
    right: 10,
  },
  shap: {
    height: BUTTON_WIDTH,
    width: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: PRIMARY.DEFAULT,
  },
  input: {
    color: WHITE,
    paddingLeft: 20,
    paddingRight: BUTTON_WIDTH + 18,
  },
  button: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default InputFAB;
