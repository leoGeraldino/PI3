import { useState, useEffect } from "react";
import { View, FlatList, Alert, Platform } from "react-native";
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Calendar() {
  const [alerts, setAlerts] = useState([]);
  const [title, setTitle] = useState("");
  // const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadAlerts();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para notificações foi negada!");
      }
    }
  };

  const loadAlerts = async () => {
    const json = await AsyncStorage.getItem("alerts");
    if (json) setAlerts(JSON.parse(json));
  };

  const saveAlerts = async (data) => {
    await AsyncStorage.setItem("alerts", JSON.stringify(data));
  };

  const scheduleNotification = async (alert) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: alert.title,
        body: `Lembrete para ${alert.title}`,
      },
      trigger: alert.date,
    });
  };

  const handleSave = async () => {
    if (!title.trim()) return Alert.alert("Erro", "Informe um título");
    const newAlert = { id: editingId || Date.now().toString(), title, date };

    let updated;
    if (editingId) {
      updated = alerts.map((a) => (a.id === editingId ? newAlert : a));
      setEditingId(null);
    } else {
      updated = [...alerts, newAlert];
      await scheduleNotification(newAlert);
    }

    setAlerts(updated);
    await saveAlerts(updated);
    setTitle("");
    setDate(new Date());
  };

  const handleEdit = (alert) => {
    setTitle(alert.title);
    setDate(new Date(alert.date));
    setEditingId(alert.id);
  };

  const handleDelete = async (id) => {
    const updated = alerts.filter((a) => a.id !== id);
    setAlerts(updated);
    await saveAlerts(updated);
  };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      const newDate = new Date(date);
      if (mode === "date") {
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setDate(selectedDate.getDate());
      } else {
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
      }
      setDate(newDate);
    }
  };

  const showDatepicker = (value) => {
    setMode(value);
    setShow(true);
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 70 }}>
      <TextInput
        label="Título do Alerta"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 10 }}
      />

      <Button onPress={() => showDatepicker("date")} mode="outlined">
        Escolher Data
      </Button>

      <Button onPress={() => showDatepicker("time")} mode="outlined">
        Escolher Hora
      </Button>

      <Paragraph style={{ marginTop: 5, marginBottom: 10 }}>
        {format(date, "dd/MM/yyyy HH:mm", { locale: ptBR })}
      </Paragraph>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
      <Button mode="contained" onPress={handleSave}>
        {editingId ? "Atualizar Alerta" : "Salvar Alerta"}
      </Button>

      <FlatList
        style={{ marginTop: 20 }}
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>
                {format(new Date(item.date), "dd/MM/yyyy HH:mm", {
                  locale: ptBR,
                })}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <IconButton icon="pencil" onPress={() => handleEdit(item)} />
              <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
