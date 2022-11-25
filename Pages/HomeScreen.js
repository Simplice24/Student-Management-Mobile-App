import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton.js';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';
let db = SQLite.openDatabase('UserDatabase.db');

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="School of ICT Students Management" />
          <Mybutton
            title="New Student"
            customClick={() => navigation.navigate('NewContact')}
          />
          <Mybutton
            title="Update student"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="search student"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="All students"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Remove student"
            customClick={() => navigation.navigate('Delete')}
          />
        </View>
       <Text style={{ fontSize: 16, textAlign: 'center', color: 'black', fontWeight:'bold' }}>
         Adrien & Simplice
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;