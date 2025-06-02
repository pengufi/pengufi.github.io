
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as bip39 from 'bip39';
import { ethers } from 'ethers';

export default function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    loadWallet();
  }, []);

  async function generateWallet() {
    const phrase = bip39.generateMnemonic();
    const newWallet = ethers.Wallet.fromMnemonic(phrase);
    await SecureStore.setItemAsync('mnemonic', phrase);
    setMnemonic(phrase);
    setWallet(newWallet);
    setAddress(newWallet.address);
    getBalance(newWallet.address);
  }

  async function loadWallet() {
    const savedMnemonic = await SecureStore.getItemAsync('mnemonic');
    if (savedMnemonic) {
      const savedWallet = ethers.Wallet.fromMnemonic(savedMnemonic);
      setMnemonic(savedMnemonic);
      setWallet(savedWallet);
      setAddress(savedWallet.address);
      getBalance(savedWallet.address);
    }
  }

  async function getBalance(addr) {
    try {
      const provider = new ethers.providers.InfuraProvider('mainnet');
      const bal = await provider.getBalance(addr);
      setBalance(ethers.utils.formatEther(bal));
    } catch (err) {
      console.error(err);
      Alert.alert('Error fetching balance');
    }
  }

  async function sendTransaction() {
    try {
      const provider = new ethers.providers.InfuraProvider('mainnet');
      const signer = wallet.connect(provider);
      const tx = await signer.sendTransaction({
        to: receiver,
        value: ethers.utils.parseEther(amount)
      });
      Alert.alert('Transaction Sent', tx.hash);
    } catch (err) {
      console.error(err);
      Alert.alert('Transaction Failed');
    }
  }

  return (
    <ScrollView style={{ padding: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Plus Wallet</Text>
      {wallet ? (
        <>
          <Text style={{ marginBottom: 10 }}>Address: {address}</Text>
          <Text style={{ marginBottom: 10 }}>Balance: {balance} ETH</Text>
          <TextInput placeholder="To Address" value={receiver} onChangeText={setReceiver} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
          <TextInput placeholder="Amount in ETH" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
          <Button title="Send ETH" onPress={sendTransaction} />
        </>
      ) : (
        <Button title="Create Wallet" onPress={generateWallet} />
      )}
      {mnemonic ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Recovery Phrase:</Text>
          <Text>{mnemonic}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
