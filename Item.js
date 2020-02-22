import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';

function Item({ id, title, complete }) {
  async function toggleComplete() {
    await firestore()
      .collection('items')
      .doc(id)
      .update({
        complete: !complete
      });
  }

  return (
    <List.Item
      title={title}
      onPress={() => toggleComplete()}
      left={props => (
        <List.Icon {...props} icon={complete ? 'check' : 'circle'} />
      )}
    />
  );
}

export default React.memo(Item);
