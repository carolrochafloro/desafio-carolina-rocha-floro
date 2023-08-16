class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    //declaração de preços
    const precoCafe = 3,
      precoChantillyExtra = 1.5,
      precoSuco = 6.2,
      precoSanduiche = 6.5,
      precoQueijoExtra = 2,
      precoSalgado = 7.25,
      precoCombo1 = 9.5,
      precoCombo2 = 7.5,
      formaDePagamento = metodoDePagamento;

    let totalChantilly = 0,
      totalSuco = 0,
      totalSanduiche = 0,
      totalQueijoExtra = 0,
      totalSalgado = 0,
      totalCombo1 = 0,
      totalCombo2 = 0,
      totalCafe = 0;

    //declaração dos calculos de preço e total inicializados com 0 para efetuar os cálculos dentro das condicionais.
    let descontoDinheiro = 0,
      acrescimoCredito = 0,
      totalCompra = 0,
      totalFinal = 0,
      itemExtraNao = false,
      itemInvalido = false,
      formaPgtoInvalida = false;
    //declaração carrinho p/ verificar se existem itens e se a quantidade é zero
    let carrinho = 0;
    //declaração dos arrays que vão guardar os nomes dos itens e a quantidade (item[i] corresponde a qts[i])
    let itemArray = [],
      quantidadeArray = [];
    //separar vetor dos itens
    for (let itemQtd of itens) {
      let [itemNome, quantidade] = itemQtd.split(",");
      //convertendo a quantidade em número inteiro para calcular o preço
      quantidade = parseInt(quantidade);

      //.push para alocar as strings no final de cada array
      itemArray.push(itemNome);
      quantidadeArray.push(quantidade);
    }
    //somar itens no carrinho
    for (let i = 0; i < quantidadeArray.length; i++) {
      carrinho += quantidadeArray[i];
    }

    //verificar se tem extra sem principal com a negação de item.includes() para verificar o principal
    if (itemArray.includes("chantily") && !itemArray.includes("cafe")) {
      itemExtraNao = true;
    }
    if (itemArray.includes("queijo") && !itemArray.includes("sanduiche")) {
      itemExtraNao = true;
    }

    //somar os preços e verificar se o item é inválido

    for (let i = 0; i < itemArray.length; i++) {
      if (itemArray[i] === "cafe") {
        totalCafe = precoCafe * quantidadeArray[i];
      } else if (itemArray[i] === "chantily") {
        totalChantilly = precoChantillyExtra * quantidadeArray[i];
      } else if (itemArray[i] === "suco") {
        totalSuco = precoSuco * quantidadeArray[i];
      } else if (itemArray[i] === "sanduiche") {
        totalSanduiche = precoSanduiche * quantidadeArray[i];
      } else if (itemArray[i] === "queijo") {
        totalQueijoExtra = precoQueijoExtra * quantidadeArray[i];
      } else if (itemArray[i] === "salgado") {
        totalSalgado = precoSalgado * quantidadeArray[i];
      } else if (itemArray[i] === "combo1") {
        totalCombo1 = precoCombo1 * quantidadeArray[i];
      } else if (itemArray[i] === "combo2") {
        totalCombo2 = precoCombo2 * quantidadeArray[i];
      } else {
        itemInvalido = true;
      }
    }

    totalCompra =
      totalCafe +
      totalChantilly +
      totalSuco +
      totalSanduiche +
      totalQueijoExtra +
      totalSalgado +
      totalCombo1 +
      totalCombo2;

    //verificar formas de pagamento, tem que ficar no final pro valor da compra ser calculado antes
    if (metodoDePagamento === "dinheiro") {
      descontoDinheiro = totalCompra * 0.05;
      totalFinal = totalCompra - descontoDinheiro;
    } else if (metodoDePagamento === "credito") {
      acrescimoCredito = totalCompra * 0.03;
      totalFinal = totalCompra + acrescimoCredito;
    } else if (metodoDePagamento === "debito") {
      totalFinal = totalCompra;
    } else {
      formaPgtoInvalida = true;
    }
    //finalização: verificar se tem item inválido, carrinho vazio, item extra sem principal, pagamento inválido e por fim retornar o valor da compra

    if (itemArray.length === 0) {
      return "Não há itens no carrinho de compra!";
    } else if (formaPgtoInvalida === true) {
      return "Forma de pagamento inválida!";
    } else if (itemExtraNao === true) {
      return "Item extra não pode ser pedido sem o principal";
    } else if (itemInvalido === true) {
      return "Item inválido!";
    } else if (carrinho === 0) {
      return "Quantidade inválida!";
    } else {
      return `R$ ${totalFinal.toFixed(2).replace(".", ",")}`;
    }
    //precisei trocar o . por vírgula
  }
}

export { CaixaDaLanchonete };
