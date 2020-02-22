import React, { useState, useEffect } from "react";
import { FlatList, Text, SafeAreaView } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Appbar, TextInput, Button } from "react-native-paper";
import Item from './Item';

function Todos() {
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const ref = firestore().collection('items');

  async function addItem() {
    await ref.add({
      title: item,
      complete: false
    });
    setItem('');
  }

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete
        });
      });

      setItems(list);

      if (loading) {
        setLoading(false);
        return null;
      }
    });
  }, [loading, ref]);

  return (
    <>
      <SafeAreaView>
        <Appbar>
          <Appbar.Content title={"TODOs List"} />
        </Appbar>
      </SafeAreaView>
      <FlatList
        style={{ flex: 1 }}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Item {...item} />}
      />
      <TextInput label={'New Todo'} value={item} onChangeText={setItem} />
      <Button onPress={() => addItem()}>Add Item</Button>
    </>
  );
}
export default Todos;
