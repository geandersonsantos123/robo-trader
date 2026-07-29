# Mapa de CTAs e eventos

## Regras globais

- Um CTA principal por seção. CTAs de rolagem não disparam eventos Meta de checkout.
- Todo clique registra internamente `cta_click` com `cta_id`, `cta_label`, `source_section`, `destination_type` e UTMs permitidas. Não enviar texto livre ou dados pessoais.
- `InitiateCheckout` só é válido quando o destino real de checkout estiver configurado; `Contact` só é válido para canal oficial de contato.
- A sticky CTA nasce após `#metodo`; antes de `#oferta` não exibe preço, depois pode exibir “R$197”.

| ID | Seção/origem | Rótulo recomendado | Destino | Evento de negócio |
| --- | --- | --- | --- | --- |
| `hero-understand` | Hero | Entender como funciona | `#metodo` | `cta_click` interno |
| `hero-video-play` | Hero/VSL | Assistir à apresentação | Player VSL | `VideoStart` no início real |
| `possibility-proposal` | Possibilidade | Conhecer a proposta | `#metodo` | `cta_click` interno |
| `pain-method` | Desafio | Ver uma forma mais organizada | `#metodo` | `cta_click` interno |
| `method-demo` | Método | Ver o Robô na prática | `#demonstracao` | `cta_click` interno |
| `demo-delivery` | Demonstração | Conhecer a estrutura completa | `#entrega` | `cta_click` interno |
| `delivery-fit` | Entrega | Ver para quem é | `#compatibilidade` | `cta_click` interno |
| `proof-fit` | Provas | Ver se é compatível comigo | `#compatibilidade` | `cta_click` interno |
| `fit-offer` | Compatibilidade | Ver a oferta de R$197 | `#oferta` | `cta_click` interno |
| `offer-primary` | Oferta | Acessar o Robô Trader | `[CHECKOUT_URL]` pendente | `InitiateCheckout`, uma vez por ação |
| `offer-contact` | Oferta | Tirar dúvidas | `[CONTACT_URL]` pendente | `Contact` |
| `risk-faq` | Segurança | Revisar dúvidas frequentes | `#faq` | `cta_click` interno |
| `faq-offer` | FAQ | Voltar à oferta | `#oferta` | `cta_click` interno |
| `final-primary` | Fechamento | Começar com a estrutura | Mesmo checkout confirmado | `InitiateCheckout`, origem `final` |
| `sticky-primary` | Sticky dinâmica | Entender como funciona / Acessar por R$197 | Interno antes da oferta; checkout depois | Interno ou `InitiateCheckout` conforme destino |

## Comportamento pendente

Enquanto checkout e contato não forem confirmados, CTAs transacionais devem permanecer desativados no protótipo, apontar para navegação interna claramente não transacional ou ser omitidos. Nunca usar `#` com aparência de compra concluível.
