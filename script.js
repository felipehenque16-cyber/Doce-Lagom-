<script>
    const cart = {};
    let totalValue = 0;
    let totalItems = 0;

    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function changeQty(id, change) {
        const card = document.querySelector(`[data-id="${id}"]`);
        if (!card) return;

        const name = card.dataset.name;
        const price = Number(card.dataset.price);

        if (!cart[id]) {
            cart[id] = { name, qty: 0, price };
        }

        cart[id].qty += change;
        if (cart[id].qty < 0) cart[id].qty = 0;

        const qtyEl = document.getElementById(`qty-${id}`);
        if (qtyEl) qtyEl.textContent = cart[id].qty;

        updateCart();
    }

    // --- ESTA É A FUNÇÃO QUE APAGA TUDO ---
    function clearCart() {
        // 1. Limpa o objeto do carrinho
        for (const id in cart) {
            cart[id].qty = 0;
            
            // 2. Reseta o texto de quantidade que fica nos cards dos produtos
            const qtyEl = document.getElementById(`qty-${id}`);
            if (qtyEl) {
                qtyEl.textContent = "0";
            }
        }

        // 3. Atualiza a barra inferior (ela vai sumir pois o total será 0)
        updateCart();
    }

    function updateCart() {
        const cartFooter = document.getElementById('cart-footer');
        const itemsCount = document.getElementById('cart-items-count');
        const totalEl = document.getElementById('cart-total');

        totalValue = 0;
        totalItems = 0;
        let hasItems = false;

        Object.keys(cart).forEach((itemId) => {
            const item = cart[itemId];
            if (item.qty > 0) {
                hasItems = true;
                totalItems += item.qty;
                totalValue += item.qty * item.price;
            }
        });

        if (itemsCount) itemsCount.textContent = totalItems === 1 ? '1 item' : `${totalItems} itens`;
        if (totalEl) totalEl.textContent = formatCurrency(totalValue);

        if (hasItems) {
            cartFooter.classList.add('visible');
        } else {
            cartFooter.classList.remove('visible');
        }
    }

    function checkout() {
        if (totalValue === 0) {
            alert('O carrinho está vazio!');
            return;
        }

        let message = 'NOVO PEDIDO - DOCE LAGOM\n\n';
        Object.keys(cart).forEach((itemId) => {
            const item = cart[itemId];
            if (item.qty > 0) {
                message += `• ${item.qty}x ${item.name} (${formatCurrency(item.qty * item.price)})\n`;
            }
        });
        message += `\n*Total: ${formatCurrency(totalValue)}*`;

        // Substitua pelo seu número real do WhatsApp (apenas números)
        const phone = '558393889854'; 
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    }
</script>
