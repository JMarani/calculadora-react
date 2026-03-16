import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";

export default function Calculadora() {
  const [visor, setVisor] = useState("0");
  const [primeiroNumero, setPrimeiroNumero] = useState(null);
  const [operacao, setOperacao] = useState(null);
  const [esperandoSegundoNumero, setEsperandoSegundoNumero] = useState(false);

  function apertarNumero(num) {
    if (esperandoSegundoNumero) {
      setVisor(String(num));
      setEsperandoSegundoNumero(false);
    } else {
      if (visor === "0") {
        setVisor(String(num));
      } else {
        setVisor(visor + String(num));
      }
    }
  }

  function apertarOperacao(op) {
    setPrimeiroNumero(parseFloat(visor));
    setOperacao(op);
    setEsperandoSegundoNumero(true);
  }

  function calcular() {
    if (primeiroNumero === null || operacao === null) return;

    const segundoNumero = parseFloat(visor);
    let resultado = 0;

    if (operacao === "+") resultado = primeiroNumero + segundoNumero;
    if (operacao === "-") resultado = primeiroNumero - segundoNumero;
    if (operacao === "x") resultado = primeiroNumero * segundoNumero;
    if (operacao === "÷") {
      if (segundoNumero === 0) {
        setVisor("Erro");
        setPrimeiroNumero(null);
        setOperacao(null);
        return;
      }
      resultado = primeiroNumero / segundoNumero;
    }

    setVisor(String(resultado));
    setPrimeiroNumero(null);
    setOperacao(null);
  }

  function limpar() {
    setVisor("0");
    setPrimeiroNumero(null);
    setOperacao(null);
    setEsperandoSegundoNumero(false);
  }

  function apertarPonto() {
    if (!visor.includes(".")) {
      setVisor(visor + ".");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.visor}>
        <Text style={styles.visorTexto}>{visor}</Text>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={limpar}>
          <Text style={styles.texto}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarOperacao("÷")}>
          <Text style={styles.texto}>÷</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarOperacao("x")}>
          <Text style={styles.texto}>x</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarOperacao("-")}>
          <Text style={styles.texto}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => apertarNumero(7)}>
          <Text style={styles.texto}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarNumero(8)}>
          <Text style={styles.texto}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarNumero(9)}>
          <Text style={styles.texto}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarOperacao("+")}>
          <Text style={styles.texto}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => apertarNumero(4)}>
          <Text style={styles.texto}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarNumero(5)}>
          <Text style={styles.texto}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarNumero(6)}>
          <Text style={styles.texto}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, styles.botaoIgual]} onPress={calcular}>
          <Text style={[styles.texto, styles.textoIgual]}>=</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => apertarNumero(1)}>
          <Text style={styles.texto}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarNumero(2)}>
          <Text style={styles.texto}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarNumero(3)}>
          <Text style={styles.texto}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => apertarNumero(0)}>
          <Text style={styles.texto}>0</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={[styles.botao, { flex: 1 }]} onPress={apertarPonto}>
          <Text style={styles.texto}>.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  visor: {
    backgroundColor: "#eee",
    padding: 20,
    marginBottom: 10,
    alignItems: "flex-end",
  },
  visorTexto: {
    fontSize: 40,
  },
  linha: {
    flexDirection: "row",
    marginBottom: 5,
  },
  botao: {
    flex: 1,
    backgroundColor: "#ddd",
    padding: 20,
    margin: 3,
    alignItems: "center",
  },
  botaoIgual: {
    backgroundColor: "#4CAF50",
    rowSpan: 2,
  },
  texto: {
    fontSize: 22,
  },
  textoIgual: {
    color: "#fff",
  },
});
