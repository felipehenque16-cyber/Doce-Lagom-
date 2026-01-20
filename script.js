function clearCart() {
    if (confirm("Deseja realmente limpar todo o carrinho?")) {
        // Zera as quantidades no objeto do carrinho
        Object.keys(cart).forEach(id => {
            cart[id].qty = 0;
            // Atualiza o número que aparece na tela em cima de cada produto
            const qtyEl = document.getElementById(`qty-${id}`);
            if (qtyEl) qtyEl.textContent = "0";
        });

        // Atualiza a barra do carrinho (que vai acabar sumindo)
        updateCart();
    }
}
