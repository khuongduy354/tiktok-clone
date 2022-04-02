import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class Input extends Component {
  state = {
    text: undefined,
  };

  onChangeText = (text: string) => this.setState({ text });

  //@ts-ignore
  onSubmitEditing = ({ nativeEvent: { text } }) =>
    this.setState({ text }, this.submit);

  submit = () => {
    const { text } = this.state;
    if (text) {
      console.log('hi');
      //@ts-ignore
      this.setState({ text: undefined }, () => this.props.onSubmit(text));
    } else {
      alert('Please enter your comment first');
    }
  };

  render() {
    return (
      // This moves children view with input field and submit button
      // up above the keyboard when it's active
      <KeyboardAvoidingView behavior="position">
        <View style={styles.container}>
          {/* Comment input field */}
          <TextInput
            placeholder="Add a comment..."
            keyboardType="twitter" // keyboard with no return button
            style={styles.input}
            value={this.state.text}
            onChangeText={this.onChangeText} // handle input changes
            onSubmitEditing={this.onSubmitEditing} // handle submit event
          />
          {/* Post button */}
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            {/* Apply inactive style if no input */}
            <Text
              style={[styles.text, !this.state.text ? styles.inactive : []]}
            >
              Post
            </Text>
          </TouchableOpacity>
          {/* {//@ts-ignore  */}
          <TouchableOpacity
            style={styles.quitButton}
            //@ts-ignore
            onPress={this.props.onExit}
          >
            {/* Apply inactive style if no input */}
            <Text style={[styles.text, styles.inactive]}>Quit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    backgroundColor: '#3A3845',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quitButton: {
    backgroundColor: '#FD5D5D',
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});
