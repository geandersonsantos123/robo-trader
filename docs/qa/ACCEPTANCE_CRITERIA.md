# Critérios de aceite

## Visual e conteúdo

- A página é reconhecível como Robô Trader, escura, premium e tecnológica sem aparência de template ou cassino.
- Hierarquia, espaçamento, alternância de layouts, cards, rollers, glow e vermelho seguem os sistemas documentados.
- Nenhuma seção é uma imagem rasterizada da referência; textos continuam selecionáveis e acessíveis.
- Logo, fotos, produto e provas possuem fonte/licença/autorização.
- Não há três seções consecutivas com a mesma anatomia.

## Conversão e comercial

- Primeiro viewport explica o produto, para quem/problema em nível seguro, próximo passo e risco.
- Fluxo segue desejo → problema → método → demonstração → valor → prova → qualificação → oferta → risco → FAQ → decisão.
- Único preço exibido é **R$197**; nenhum parcelamento, preço anterior, desconto, garantia, urgência ou escassez foi inventado.
- CTAs têm destino real, rótulo coerente e origem rastreável; checkout e contato foram testados.
- Nenhuma promessa de lucro, renda, acerto, ausência de risco ou liberdade garantida.
- Provas, compatibilidades, credenciais, suporte e políticas são verificáveis.

## Responsivo e UX

- Validado visualmente em 390×844, 430×932, 768×1024 e 1365×768, incluindo conteúdo longo.
- Sem overflow horizontal; nenhum texto corta, nenhum botão estoura e nenhuma imagem deforma.
- Sticky CTA só surge após o método, respeita safe area, não cobre conteúdo e muda preço apenas depois da oferta.
- Menu, VSL, acordeões, links e CTAs funcionam por toque e teclado.
- Safari/iOS e navegador interno do Instagram foram testados quando disponíveis; limitações reais foram registradas.

## Acessibilidade

- HTML semântico, headings em ordem, landmarks e lista ordenada no método.
- Contraste WCAG AA para texto e controles; vermelho/verde nunca são o único sinal.
- Foco visível, ordem natural, alvo de toque ≥44×44 px e zoom 200% utilizável.
- Acordeões expõem estado; mídia tem legenda/transcrição quando necessária; `alt` descreve função ou fica vazio se decorativa.
- `prefers-reduced-motion` remove movimento contínuo e revela conteúdo imediatamente.

## Performance e técnica

- Orçamentos de `PERFORMANCE_BUDGET.md` medidos ou desvios justificados com evidência.
- VSL/iframe não baixam antes de interação; mídia abaixo da dobra usa lazy loading e dimensões reservadas.
- JavaScript falhando ou tracking bloqueado não impede leitura, FAQ básico e navegação essencial.
- Sem erros de console que quebrem jornada, links inválidos ou requests 404.
- Nenhuma biblioteca pesada/dependência foi adicionada sem decisão documentada.
- Metadados, idioma, favicon, Open Graph e URL canônica são coerentes no ambiente publicado.

## Tracking e privacidade

- Pixel ID é configurável por ambiente e scripts respeitam consentimento.
- Eventos de vídeo e oferta disparam uma vez; CTAs carregam `source_section`/`cta_id`.
- `InitiateCheckout` ocorre só no início real; `Purchase` somente após confirmação real.
- `value` é `197`, `currency` é `BRL`; nenhuma PII entra nos eventos.
- UTMs aprovadas sobrevivem até o destino sem aceitar parâmetros arbitrários.

## Documentação e entrega

- ExecPlan possui progresso, descobertas, decisões, arquivos, validações e resultados atualizados.
- `AGENTS.md`, `DECISIONS.md`, `OPEN_QUESTIONS.md` e documentos afetados refletem decisões novas.
- Entrega lista o que foi inspecionado, automatizado e testado visualmente, sem afirmar testes não executados.
