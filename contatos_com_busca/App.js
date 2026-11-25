// App.js
// Aplicativo de contatos com busca em tempo real.

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';

export default function App() {
  // Guarda a lista completa de usuários recebida da API.
  const [contatos, setContatos] = useState([]);

  // Guarda o texto digitado no campo de pesquisa.
  const [busca, setBusca] = useState('');

  // Controla a exibição do indicador de carregamento.
  const [carregando, setCarregando] = useState(true);

  // Busca os usuários na API.
  const buscarContatos = async () => {
    try {
      const resposta = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!resposta.ok) {
        throw new Error('Não foi possível carregar os contatos.');
      }

      const dados = await resposta.json();
      setContatos(dados);
    } catch (erro) {
      console.log('Erro ao buscar contatos:', erro);
    } finally {
      setCarregando(false);
    }
  };

  // Executa a busca uma vez quando o aplicativo abre.
  useEffect(() => {
    buscarContatos();
  }, []);

  // Filtra os contatos conforme o usuário digita.
  // A comparação não diferencia letras maiúsculas e minúsculas.
  const contatosFiltrados = contatos.filter((item) =>
    item.name.toLowerCase().includes(busca.toLowerCase())
  );

  // Mostra cada contato na lista.
  const renderizarContato = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.telefone}>{item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Contatos</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar contato..."
        placeholderTextColor="#777"
        value={busca}
        onChangeText={setBusca}
      />

      {carregando ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={contatosFiltrados}
          renderItem={renderizarContato}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.mensagemVazia}>
              Nenhum contato encontrado.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
  },
  email: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 4,
  },
  telefone: {
    fontSize: 14,
    color: '#34495e',
  },
  mensagemVazia: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 25,
  },
});
