import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Comment from './comment';
import Input from './input';
export default class List extends Component {
  state = {
    comments: [],
  };

  render() {
    // Pull comments out of state
    //@ts-ignore
    const { comments } = this.props;
    return (
      <View style={styles.container}>
        {/* Scrollable list */}
        <ScrollView
          ref={scrollView => {
            //@ts-ignore
            this._scrollView = scrollView;
          }}
        >
          {/* Render each comment with Comment component */}
          {comments.map((comment: any, index: number) => (
            //@ts-ignore
            <Comment comment={comment} key={index} />
          ))}
        </ScrollView>
        {/* Comment input box */}
        {/* @ts-ignore */}
        <Input onExit={this.props.onExit} onSubmit={this.props.onSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
});