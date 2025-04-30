import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, Button, TouchableOpacity,
  SafeAreaView, ScrollView
} from 'react-native';

const emojis = ['😢', '😞', '😐', '😊', '😁'];

export default function App() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [memo, setMemo] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (selectedEmotion === null) return alert('감정을 선택하세요');

    const res = await fetch('https://your-server.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userMessage: `오늘 기분은 ${emojis[selectedEmotion]} 이고, 메모는 ${memo}야.`,
      }),
    });
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>오늘 기분은 어때요?</Text>
        <View style={styles.emojiRow}>
          {emojis.map((emoji, idx) => (
            <TouchableOpacity key={idx} onPress={() => setSelectedEmotion(idx)}>
              <Text style={[styles.emoji, selectedEmotion === idx && styles.selected]}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="무슨 일이 있었나요?"
          value={memo}
          onChangeText={setMemo}
          multiline
        />
        <Button title="AI에게 물어보기" onPress={handleSubmit} />
        {response && (
          <View style={styles.responseBox}>
            <Text>🤖 GPT 코칭:</Text>
            <Text>{response}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  emojiRow: { flexDirection: 'row', marginBottom: 20 },
  emoji: { fontSize: 40, marginHorizontal: 5, opacity: 0.5 },
  selected: { opacity: 1 },
  input: {
    height: 100, borderColor: '#ccc', borderWidth: 1,
    padding: 10, marginBottom: 20, textAlignVertical: 'top'
  },
  responseBox: {
    marginTop: 30, backgroundColor: '#f0f0f0',
    padding: 15, borderRadius: 10
  },
});

