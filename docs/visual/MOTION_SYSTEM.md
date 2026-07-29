# Sistema de movimento

## Princípios

Movimento deve revelar hierarquia, explicar progressão ou confirmar interação. Nunca deve simular atividade de mercado, lucro ou urgência. A página precisa permanecer completa e compreensível sem animação.

## Tokens

- Rápido: 120–180 ms para hover, foco visual e chevron.
- Padrão: 280–420 ms para reveal.
- Stagger: 50–90 ms, máximo cinco itens.
- Deslocamento: 12–24 px; animar apenas `opacity` e `transform` sempre que possível.
- Easing: saída suave (`cubic-bezier(.2,.7,.2,1)` como ponto de partida).

## Padrões

- **Reveal:** classe inicial aplicada somente quando JavaScript confirma suporte; observar uma vez com `IntersectionObserver` e liberar o elemento ao entrar 15–25% na viewport.
- **Timeline:** ativar passos sequencialmente conforme aparecem; a ordem e a linha continuam visíveis sem JS.
- **Stagger:** usar em cards curtos; não atrasar CTA ou mídia crítica.
- **Roller:** CSS linear, velocidade lenta (aprox. 25–40 s por ciclo), conteúdo duplicado apenas para loop visual e pausa em hover/foco quando interativo.
- **Parallax:** evitar no mobile. Se usado em desktop, limitar a uma textura decorativa, pequeno deslocamento e nenhum listener pesado de scroll.
- **VSL:** poster estático; play inicia carregamento. Progresso visual deve refletir o player, não animação cenográfica.
- **Sticky CTA:** transição curta de translate/opacity após o método; esconder no rodapé e ao abrir modais/consentimento.

## Reduced motion

Sob `prefers-reduced-motion: reduce`:

- exibir todos os reveals imediatamente;
- tornar roller estático ou permitir rolagem manual;
- remover parallax, glow pulsante e transições de timeline;
- manter feedback de foco e estado sem animação longa.

## Limites de performance e segurança

- Não usar biblioteca de animação para estes padrões.
- Não animar blur, box-shadow grande, background-position de imagens pesadas ou propriedades de layout durante scroll.
- Não criar timers contínuos além do roller CSS.
- Testar bateria/fluidez no navegador interno do Instagram e Safari iOS; reduzir efeitos se a leitura ou INP piorar.
