# ExecPlan — Etapa 2: protótipo funcional completo

**Status:** concluída em 2026-07-20.

Este documento é vivo e deve seguir `.agent/PLANS.md`. Atualize-o durante a implementação para que a retomada não dependa da conversa.

## Propósito e resultado observável

Entregar uma landing page navegável e mobile-first do Robô Trader que explique produto, método, demonstração, entrega, qualificação, risco e oferta de **R$197**. O protótipo deve funcionar sem framework, ser compreensível sem animações/tracking e estar pronto para receber VSL, Pixel e checkout quando os dados oficiais forem fornecidos.

Ao final, abrir `index.html` por servidor local permite percorrer as 12 seções, usar menu, VSL/fallback, acordeões e sticky CTA. O layout foi validado em 320, 360, 375, 390, 430, 768, 1024 e 1440 px. Ausências comerciais permanecem vazias ou usam fallback explícito, sem conteúdo fictício.

## Contexto obrigatório

Antes de editar, ler na ordem:

1. `AGENTS.md` e `docs/INDEX.md`.
2. `docs/project/PRODUCT_BRIEF.md`, `DECISIONS.md` e `OPEN_QUESTIONS.md`.
3. `docs/copy/CLAIMS_AND_GUARDRAILS.md`, `COPY_MAP.md` e `docs/offer/OFFER_R197.md`.
4. `docs/ux/CONVERSION_FLOW.md`, `SECTION_BLUEPRINT.md` e `CTA_MAP.md`.
5. `docs/visual/REFERENCE_ANALYSIS.md`, `VISUAL_SYSTEM.md` e `MOTION_SYSTEM.md`.
6. `docs/technical/ARCHITECTURE.md`, `ASSET_STRATEGY.md`, `PERFORMANCE_BUDGET.md` e `docs/tracking/META_PIXEL_PLAN.md`.
7. `docs/qa/ACCEPTANCE_CRITERIA.md`.

Fatos imutáveis até nova decisão registrada: produto configurável; controle do usuário; risco financeiro; preço total R$197; nenhum parcelamento, garantia, resultado, compatibilidade, prova ou urgência presumidos.

## Escopo

### Incluído

- uma rota estática e semântica;
- 12 seções na ordem documentada;
- sistema visual, responsividade, menu, FAQ, reveals, rollers e sticky CTA;
- shell de VSL com carregamento após intenção e fallback acessível;
- copy baseada somente em fatos confirmados;
- preparação inativa/configurável de tracking e destinos;
- performance, acessibilidade e QA visual proporcional ao protótipo;
- atualização da documentação e deste plano.

### Excluído sem confirmação

- ativar Pixel real, checkout, `Purchase`, CAPI, deploy ou scripts de marketing;
- inventar VSL, screenshots, depoimentos, credenciais, compatibilidades, garantia ou condições;
- instalar dependências ou framework sem nova decisão justificada;
- publicar assets de referência como a página final.

## Fallbacks para ativos e dados ausentes

- **Logo:** usar wordmark textual acessível “ROBÔ TRADER” no protótipo; substituir somente com SVG oficial.
- **VSL:** usar media shell com poster abstrato leve, botão “Apresentação em preparação” não transacional e área para transcrição; não baixar player inexistente.
- **Produto:** usar diagrama rotulado “Fluxo ilustrativo”, baseado no método, nunca mockup apresentado como interface real.
- **Fotografia:** preferir mapa/grid SVG/CSS abstrato; não buscar imagem genérica como prova de liberdade.
- **Prova:** mostrar processo/documentação apenas se comprovados; caso contrário, manter a seção curta com título honesto e comentário de implementação, sem depoimento público falso.
- **Compatibilidade:** omitir nomes de mercados/plataformas; apresentar a necessidade de confirmar requisitos antes da compra e deixar TODO documental.
- **Checkout/contato:** CTA transacional desativado com estado e texto claros no protótipo, ou navegar para FAQ; nunca usar link vazio que pareça compra funcional.
- **Garantia:** não criar selo/bloco. Reduzir risco por conta demo, processo e aviso, limitados ao que estiver confirmado.

## Arquivos previstos

| Caminho | Responsabilidade |
| --- | --- |
| `index.html` | conteúdo, landmarks, metadados e 12 seções |
| `assets/css/*.css` | oito camadas de tokens, reset, base, layout, componentes, seções, motion e responsividade |
| `assets/js/app.js` | composição, diálogo e fallbacks de integração |
| `assets/js/navigation.js`, `faq.js`, `reveal.js`, `timeline.js`, `sticky-cta.js`, `video.js` | interações progressivas por responsabilidade |
| `assets/js/tracking.js` | helper inativo/configurável, UTMs, consentimento e deduplicação |
| `assets/js/runtime-config.js` | contrato público de configuração sem segredos |
| `assets/images/*` | quatro SVGs leves e provisórios do protótipo |
| `docs/qa/screenshots/*` | capturas verificadas em 390, 768 e 1440 px |
| `docs/plans/STAGE_2_EXECPLAN.md` | progresso, descobertas, decisões e resultados |
| documentos afetados | qualquer decisão nova confirmada durante a etapa |

Não criar `package.json` por conveniência. Se requisito novo exigir ferramenta, registrar decisão antes de instalar.

## Progresso

- [x] 2026-07-20 — Fundação, referências, arquitetura, copy, tracking e QA planejados.
- [x] 2026-07-20 — Auditoria inicial da Etapa 2 e confirmação do estado do workspace.
- [x] 2026-07-20 — Milestone 1: estrutura semântica e copy segura.
- [x] 2026-07-20 — Milestone 2: sistema visual e responsividade base.
- [x] 2026-07-20 — Milestone 3: seções de narrativa e padrões reutilizáveis.
- [x] 2026-07-20 — Milestone 4: mídia, interações e movimento progressivo.
- [x] 2026-07-20 — Milestone 5: oferta, fallbacks e preparação de tracking.
- [x] 2026-07-20 — Milestone 6: QA, performance, documentação e handoff.

## Descobertas registradas

- Em 2026-07-20, a pasta não era repositório Git e não possuía stack, scripts ou integrações.
- As referências são PNGs verticais de alta densidade; implementá-las como imagens causaria problemas de peso, acessibilidade e legibilidade.
- A referência de oferta contém informações comerciais não autorizadas; apenas R$197 é fonte de verdade.
- Em 2026-07-20, o Git continuava ausente e foi inicializado. Não havia `user.name` nem `user.email`, portanto o commit inicial da fundação não pôde ser criado sem inventar identidade.
- O primeiro QA em 320 px encontrou overflow causado por `min-width: 20rem` somado à barra vertical do navegador. O valor foi removido e todos os oito viewports passaram sem overflow horizontal.
- O `<dialog>` nativo não respondeu a Escape no navegador embutido; um handler explícito foi adicionado e o foco volta ao acionador após o fechamento.
- A degradação sem JavaScript já preservava o conteúdo, mas deixava o botão do menu móvel inerte. A classe inicial `no-js` agora expõe uma navegação estática se o módulo não carregar ou falhar.
- O navegador embutido disponível cobriu Chromium desktop/mobile e teclado. Safari/WebKit, emulação real de reduced motion, zoom 200% e métricas Core Web Vitals ficaram como auditorias da Etapa 3.

Adicionar aqui novas descobertas com evidência e consequência.

## Decisões de execução

- Base confirmada para a Etapa 2: HTML/CSS/JavaScript estáticos. Motivo e gatilhos de reavaliação estão em `ARCHITECTURE.md`.
- Conteúdo permanece no HTML; JavaScript é aprimoramento progressivo.
- Demonstração e benefícios são uma seção única.
- Sticky CTA surge após o método e só passa a mostrar preço após a oferta.
- O protótipo pode ficar completo visualmente com fallbacks, mas não fingirá integrações ou ativos finais.

Registrar aqui decisões novas, alternativas e impactos antes de alterar o contrato.

## Milestones

### Milestone 0 — linha de base e inputs

1. Executar status/inventário com as ferramentas disponíveis; preservar mudanças preexistentes.
2. Revisar `OPEN_QUESTIONS.md` e marcar respostas confirmadas.
3. Inventariar assets novos com origem/licença e decidir fallbacks restantes.
4. Atualizar `DECISIONS.md` se stack/destinos passarem a confirmados.

**Resultado observável:** plano e fontes de verdade refletem o estado real antes do código.

### Milestone 1 — HTML e copy

1. Criar landmarks, skip link, header único, `main`, 12 seções e footer.
2. Aplicar headings lógicos, listas/`ol`, botões/links corretos e IDs do CTA Map.
3. Inserir copy segura do `COPY_MAP.md`, encurtando sem mudar alegações.
4. Criar avisos de risco junto da VSL e oferta.
5. Manter itens pendentes fora do conteúdo público ou rotulados apenas no ambiente de protótipo.

**Resultado observável:** página linear, legível e navegável sem CSS/JS.

### Milestone 2 — sistema visual mobile-first

1. Implementar tokens, tipografia, container, espaçamento, cores e foco.
2. Construir CTA, cards, icon tiles, media shell, timeline, acordeão, roller, offer card e risk notice.
3. Aplicar primeiro a 390 px e depois 430/768/1365.
4. Usar mapa/grid leve e glass/glow controlados; garantir fallback sem `backdrop-filter`.

**Resultado observável:** identidade consistente e sem overflow em 390 px, ainda sem depender de efeitos.

### Milestone 3 — narrativa e variação

1. Montar seções na ordem do blueprint.
2. Alternar mídia, trio, grade, timeline, split, acordeão, editorial, checklist e oferta.
3. Implementar rollers como transições compartilhadas e evitar repetição de header/scroll hint.
4. Conferir uma ideia principal por viewport e retirar copy/card redundante.

**Resultado observável:** percurso completo com ritmo distinto e preço R$197 apresentado uma vez de forma dominante.

### Milestone 4 — mídia, interações e motion

1. Implementar menu/FAQ acessíveis e progressive enhancement.
2. Criar um `IntersectionObserver` compartilhado para reveals/sticky/offer.
3. Atender `prefers-reduced-motion` e liberar conteúdo se JS falhar.
4. Implementar VSL sob intenção e eventos do player somente se houver player real.
5. Garantir que sticky respeite safe area e desapareça no rodapé/modal.

**Resultado observável:** interações funcionam por teclado/toque e nenhuma mídia pesada baixa antes da intenção.

### Milestone 5 — oferta e tracking preparado

1. Implementar preço total R$197, itens confirmados e aviso; sem parcela/garantia/urgência.
2. Configurar destinos somente com valores oficiais. Se ausentes, manter fallback explícito.
3. Criar helper de eventos sem ID real, com consentimento, deduplicação, UTMs e origem.
4. Garantir que `InitiateCheckout`/`Contact` dependam de ações reais e `Purchase` permaneça impossível na landing.

**Resultado observável:** a oferta é clara e o código está pronto para configuração, mas nada envia marketing por padrão.

### Milestone 6 — QA e entrega

1. Executar comandos e QA visual/funcional abaixo.
2. Corrigir overflow, contraste, foco, CLS, peso e erros de console.
3. Revisar copy pública contra guardrails e perguntas abertas.
4. Atualizar progresso, descobertas, decisões, resultados, `AGENTS.md` e documentos afetados.

**Resultado observável:** protótipo verificável, limitações explícitas e handoff autocontido para Etapa 3.

## Comandos de validação previstos

Adaptar caminhos ao runtime disponível e registrar saída resumida:

```powershell
Get-ChildItem assets/js/*.js | ForEach-Object { node --check $_.FullName }
python -m http.server 4173
rg -n -i 'lucro garantido|renda garantida|retorno garantido|sem risco|risco zero' index.html assets
git diff --check
git status --short
```

Os dois comandos Git só se aplicam se o diretório tiver sido inicializado como repositório. Além disso, validar HTML/links com ferramenta disponível e executar QA real no navegador; lint não substitui inspeção visual.

## Matriz de validação

- **320×800, 360×800, 375×812, 390×844 e 430×932:** hierarquia, cards, sticky, safe area, VSL, FAQ e ausência de overflow.
- **768×1024 e 1024×768:** transição de grids e legibilidade de timeline/acordeões.
- **1440×900:** container, linhas de texto, mídia, menu e ausência de espaços vazios artificiais.
- **Teclado:** menu por Escape, diálogo por Escape com retorno de foco, acordeões e CTAs verificados. Zoom 200% permanece para a Etapa 3.
- **Reduced motion:** regras CSS e branches JavaScript verificados; emulação visual real permanece para a Etapa 3.
- **Rede:** VSL ausente antes do play; imagens responsivas; sem 404.
- **Tracking:** consentido/recusado/sem ID, um evento por limiar e nenhum PII.
- **Copy:** preço, risco, compatibilidade, prova e destinos conforme fontes de verdade.

## Critérios de aceite

Cumprir integralmente `docs/qa/ACCEPTANCE_CRITERIA.md`, com estas condições adicionais:

- todos os 12 IDs/estados previstos existem ou uma omissão segura está registrada;
- nenhum conteúdo autoritativo foi retirado dos PNGs;
- carga inicial atende orçamento ou desvio possui justificativa mensurável;
- protótipo é útil sem Pixel, checkout, vídeo e JavaScript;
- pendências remanescentes aparecem no plano e em `OPEN_QUESTIONS.md`.

## Idempotência e recuperação

- Criar arquivos apenas se ausentes e editar incrementalmente; não sobrescrever assets do usuário.
- Antes de conversão/compressão, preservar fonte e registrar hash/licença.
- Falha de player/tracking não deve exigir rollback da página: integrações são isoladas e opcionais.
- Repetir validações após qualquer mudança de asset, fonte, CTA ou script.
- Se houver Git na Etapa 2, usar diff para separar alterações da tarefa; não executar reset destrutivo.

## Resultados e pendências

- **Execução:** `python -m http.server 4173` na raiz e acesso por `http://localhost:4173/`.
- **Entrega:** uma rota, 12 seções, 8 arquivos CSS, 11 módulos JavaScript, 4 SVGs e 3 screenshots de QA; sem framework, build ou terceiros.
- **Peso próprio inicial:** 99.131 bytes não comprimidos, excluindo referências e screenshots de QA.
- **QA automatizado:** 11/11 módulos com sintaxe válida; auditoria estática sem erros; nenhum termo comercial proibido; nenhum asset de referência carregado; um `h1`, 12 rollers animados, links internos válidos, alvos ARIA existentes e console sem erros.
- **QA funcional:** menu, Escape e retorno de foco, acordeões, timeline, VSL sem URL, CTA de oferta sem checkout, sticky contextual, consentimento recusado/aceito e ausência de recursos externos verificados no navegador.
- **Fatos preservados:** preço somente R$197, moeda BRL, nenhum parcelamento, garantia, resultado, depoimento, compatibilidade ou canal inventado.
- **Integrações inativas:** Meta Pixel, checkout, WhatsApp, vídeo oficial, prova opcional e publicação.
- **Pendências:** assets oficiais, conteúdo comercial/jurídico, compatibilidades, staging, WebKit/Safari, navegador interno do Instagram, reduced motion emulado, zoom 200%, Core Web Vitals e integrações reais conforme `STAGE_3_QA_PLAN.md`.
- **Git:** repositório local inicializado, sem commits; identidade Git ausente e nenhuma identidade fictícia foi criada.
