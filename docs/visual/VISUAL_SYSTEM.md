# Sistema visual recomendado

Os valores são tokens de trabalho derivados da direção conceitual, não cores oficiais de marca. Substituir por assets/tokens oficiais quando fornecidos e validar contraste.

## Conceito

**Tecnologia global com controle humano.** A página deve parecer precisa, escura e premium, equilibrando alcance internacional com aprendizado e responsabilidade. Evitar estética de cassino, dashboard de ganhos ou template genérico de “AI neon”.

## Tokens provisórios

| Papel | Token | Valor de trabalho |
| --- | --- | --- |
| Fundo | `--color-bg` | `#020706` |
| Superfície | `--color-surface` | `#07110F` |
| Superfície elevada | `--color-surface-raised` | `#0B1815` |
| Texto | `--color-text` | `#F4F8F7` |
| Texto secundário | `--color-muted` | `#A8B5B1` |
| Marca/ação | `--color-brand` | `#00E6B0` |
| Marca escura | `--color-brand-strong` | `#00B98D` |
| Dor/risco | `--color-risk` | `#FF5A57` |
| Borda | `--color-border` | `rgba(74, 237, 196, .28)` |

Não usar verde vivo em parágrafos longos. Testar WCAG AA nos pares finais; o texto de botão sobre verde provavelmente exigirá tom quase preto.

## Tipografia

- Preferir uma família sans variável auto-hospedada somente com licença e arquivos fornecidos; fallback: `Inter, ui-sans-serif, system-ui, sans-serif`.
- Display: peso 700–800, `clamp(2.25rem, 8vw, 5rem)`, line-height 0,98–1,08 e tracking levemente negativo.
- Título de seção: `clamp(1.9rem, 6vw, 3.75rem)`; no máximo três linhas em 390 px.
- Corpo: 1rem–1,125rem, line-height 1,55–1,7; largura máxima 62ch.
- Eyebrow/roller: 0,75rem–0,875rem, caixa alta, tracking positivo; nunca a única portadora de informação.

## Espaçamento e largura

- Escala base: 4, 8, 12, 16, 24, 32, 48, 64, 96 e 128 px.
- Container: `min(100% - 2.5rem, 72rem)`; reduzir margem para 16 px apenas abaixo de 360 px.
- Seções: 72–104 px no mobile e 104–160 px no desktop, ajustados ao conteúdo.
- Uma ideia principal por viewport mobile; evitar altura fixa e `100vw` em containers.
- Raio: 12 px em tiles, 18–24 px em cards, 28–32 px em mídias/oferta; não arredondar toda seção como tela de telefone.

## Componentes visuais reutilizáveis

- **Section eyebrow/heading:** eyebrow opcional, headline e apoio com largura controlada.
- **CTA:** altura mínima 52 px, label verbal, ícone opcional, estados hover/focus/active/disabled; versão primária e outline.
- **Card:** superfície opaca o suficiente para contraste, uma borda, sem card aninhado.
- **Icon tile:** 40–56 px, SVG linear, stroke uniforme.
- **Media shell:** aspect ratio definido, poster responsivo, legenda/transcrição e play real.
- **Timeline step:** número semântico, verbo, descrição e ícone decorativo.
- **Accordion:** resumo conciso, detalhe sob demanda, foco e `aria-expanded`.
- **Risk notice:** ícone + texto legível, próximo da ação; não reduzido a rodapé cinza.
- **Roller:** duas cópias idênticas para loop, `aria-hidden` na repetição e alternativa estática para leitor de tela.
- **Sticky CTA:** safe-area iOS, surge após método e nunca cobre FAQ/rodapé.

## Glass, glow e textura

- Glass: usar somente em cards sobre textura, com `backdrop-filter` como aprimoramento; fornecer fundo opaco compatível com Safari e contraste sem blur.
- Glow: máximo de dois focos por viewport, preferencialmente CTA e acento de produto. Não usar box-shadow amplo em todos os cards.
- Mapa/grid: um SVG decorativo reutilizado com variações de posição; opacidade baixa e `pointer-events: none`.
- Gráficos/candles: textura abstrata sem valores, eixos, saldos ou tendência interpretável.
- Vermelho: reservado a problema, contraindicação e aviso; sempre acompanhado de ícone/texto.

## Responsividade

- Validar 390, 430, 768 e 1365 px; também zoom 200% e safe areas.
- Grids colapsam quando o texto perde largura, não por breakpoint arbitrário.
- Usar scroll-snap apenas para benefícios curtos e manter indicação de continuidade; não esconder conteúdo essencial em carrossel.
- Desktop amplia composição e espaço, não o volume de copy.
- Safari: evitar depender de `100vh`; preferir unidades dinâmicas com fallback, testar blur, sticky e autoplay.
