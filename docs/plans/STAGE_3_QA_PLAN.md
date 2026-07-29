# Plano preliminar — Etapa 3: auditoria, refinamento e publicação

**Status:** preparado a partir do protótipo real da Etapa 2; executar somente com autorização para a Etapa 3.

## Registro de publicação do código-fonte — 2026-07-20

**Status:** concluído. O responsável autorizou o envio do protótipo para `https://github.com/pedroh99p-bot/robotrader`, cuja branch padrão é `main` e estava vazia antes do primeiro push.

### Escopo autorizado

- publicar no GitHub o código-fonte, a documentação, os assets próprios e as referências conceituais existentes no workspace;
- preservar `runtime-config.js` sem Pixel ID, checkout, WhatsApp ou VSL real;
- não realizar deploy de produção, ativação de marketing, configuração comercial ou preenchimento de pendências por suposição;
- usar no commit a identidade pública verificável do proprietário do repositório, com endereço `users.noreply.github.com`, somente na configuração local deste projeto.

### Progresso

- [x] 2026-07-20 — autorização e destino remoto confirmados.
- [x] 2026-07-20 — repositório remoto público verificado como vazio, com `main` como branch padrão.
- [x] 2026-07-20 — 11 módulos JavaScript aprovados em `node --check`.
- [x] 2026-07-20 — alegações proibidas, preços divergentes, integrações ativas e hashes das seis referências revisados sem divergências.
- [x] 2026-07-20 — QA Chromium repetido em 320, 360, 375, 390, 430, 768, 1024 e 1440 px, sem overflow, imagem quebrada, alvo interno ausente ou erro de console.
- [x] 2026-07-20 — menu mobile, acordeão, VSL pendente, checkout pendente, consentimento e CTA fixa contextual testados.
- [x] 2026-07-20 — commit inicial `fdf3320` e push verificado em `origin/main`.

### Resultado

O commit inicial foi publicado com 61 arquivos e `origin/main` passou a apontar para `fdf3320525ecaedae34c4413f32de7582d2a5947`. A árvore local permaneceu sem alterações após o push inicial. Este registro final será enviado em um commit documental subsequente, sem modificar a landing ou ativar integrações.

### Limites preservados

A publicação deste registro é de controle de versão. Permanecem pendentes todos os gates de produção listados abaixo, inclusive conteúdo comercial/jurídico, assets oficiais, compatibilidades, checkout, Pixel, Safari/iOS, navegador interno do Instagram, staging, Core Web Vitals e deploy.

## Resultado esperado

Transformar o protótipo aprovado da Etapa 2 em uma versão pronta para publicação, com conteúdo comercial confirmado, assets finais, compatibilidade mobile/Safari, performance medida, tracking validado, checkout testado e documentação atualizada. Deploy só ocorre com autorização e ambiente definidos.

## Linha de base recebida da Etapa 2

- landing estática em `index.html`, com 12 seções, 8 folhas CSS e 11 módulos JavaScript;
- configuração pública em `assets/js/runtime-config.js`, com preço `197`, moeda `BRL` e integrações vazias;
- VSL, checkout e Meta Pixel protegidos por fallbacks explícitos, sem chamadas externas;
- peso inicial próprio aproximado de 99.131 bytes não comprimidos;
- QA Chromium executado nos viewports 320, 360, 375, 390, 430, 768, 1024 e 1440 px, sem overflow ou erros de console;
- evidências visuais em `docs/qa/screenshots/`;
- Git local sem commits porque a identidade do autor não está configurada.

Preservar essa linha de base antes de integrar terceiros. Toda regressão deve ser comparada com os mesmos viewports e comportamentos.

## Gate de entrada

- Etapa 2 concluída e seu ExecPlan atualizado — atendido em 2026-07-20.
- VSL/poster, logo, produto, prova e licenças definidos ou omissões aprovadas.
- Checkout/contato, pagamento, licença, suporte, compatibilidade e política confirmados.
- Pixel ID, consentimento, privacidade e responsável por `Purchase` definidos.
- Domínio, hospedagem, ambiente de teste/produção e autorização de deploy definidos.

Se um gate material continuar aberto, auditar o restante, registrar o bloqueio e não publicar a suposição.

## Frentes de auditoria

1. **Conteúdo/compliance:** confrontar cada alegação com evidência; revisar preço R$197, risco, condições, provas e FAQ.
2. **CRO:** verificar clareza acima da dobra, continuidade do Instagram, progressão, densidade, CTAs, qualificação e redução de risco.
3. **Visual:** comparar padrões, não pixels; revisar tipografia, contraste, cards, rollers, glow, fundos e consistência de assets.
4. **Responsivo:** repetir 320×800, 360×800, 375×812, 390×844, 430×932, 768×1024, 1024×768 e 1440×900; acrescentar zoom 200%, orientação e safe areas.
5. **Acessibilidade:** teclado, foco, landmarks, headings, acordeões, alt, legenda, reduced motion e contraste.
6. **Funcional:** menu, VSL, FAQ, sticky, links, checkout, contato, consentimento, falhas de terceiros e retorno.
7. **Performance:** cache frio/quente, LCP/INP/CLS, peso, poster, fontes, third parties e download sob intenção.
8. **Tracking:** evento por gatilho, UTMs, deduplicação, consentimento, `197`/`BRL`, ausência de PII e `Purchase` real.
9. **SEO/social:** título, descrição, canonical, idioma, OG 1200×630, favicon, robots/sitemap quando aplicável.
10. **Publicação:** build/arquivos servidos, variáveis por ambiente, URL real, refresh, HTTPS, cache e rollback.

## Substituições e integrações planejadas

1. Trocar `favicon.svg`, `og-preview.svg` e `vsl-placeholder.svg` somente por arquivos oficiais, licenciados e otimizados; manter aspect ratio e alt/transcrição.
2. Preencher `runtime-config.js` por processo controlado de ambiente ou hospedagem. Nenhum segredo pode entrar no navegador.
3. Validar URL de checkout real, política de redirecionamento e preservação da allowlist de UTMs antes de permitir `InitiateCheckout`.
4. Configurar `metaPixelId` apenas depois de política/consentimento aprovados; inspecionar rede para garantir zero marketing antes da escolha.
5. Definir responsável por `Purchase`. A landing não deve passar a dispará-lo; usar confirmação confiável do checkout/servidor ou uma página de sucesso não reutilizável.
6. Confirmar WhatsApp, suporte, empresa, compatibilidades, termos, privacidade, reembolso e requisitos antes de exibi-los.

## Casos de regressão obrigatórios

- configuração externa completa, parcialmente preenchida, vazia e inválida;
- JavaScript desabilitado, módulo principal bloqueado e falha de script terceiro;
- consentimento não definido, recusado, aceito e reaberto pelo rodapé;
- VSL antes do clique, reprodução, 25/50/75/100%, erro e legenda/transcrição;
- CTA interno, CTA fixa antes/depois da oferta, CTA real de checkout e retorno/cancelamento;
- nenhuma ocorrência de preço diferente de R$197 e nenhum `Purchase` por visita, refresh ou clique;
- reduced motion real, teclado completo, foco visível, Escape, leitor de tela e zoom 200%;
- Safari/WebKit, iOS real e navegador interno do Instagram, além do Chromium já coberto;
- 404, CSP, bloqueador de conteúdo, rede lenta/offline e indisponibilidade de checkout/Pixel.

## Sequência

- Registrar linha de base antes de refinamentos.
- Criar staging protegido e documentar URL/ambiente sem publicar produção.
- Corrigir primeiro bloqueadores de compra, segurança e conteúdo.
- Corrigir clareza/CTA/mobile/acessibilidade.
- Otimizar assets/scripts e repetir as mesmas medições.
- Validar staging com ferramentas oficiais vigentes da Meta e checkout em modo de teste.
- Obter aprovação comercial/jurídica dos textos materiais.
- Publicar somente após autorização; testar URL real e registrar evidências.
- Atualizar `DECISIONS.md`, `OPEN_QUESTIONS.md`, `AGENTS.md`, critérios e relatório final.

## Evidências de saída

Registrar no ExecPlan da Etapa 3: matriz de viewports/navegadores, screenshots comparáveis, resultados de teclado/reduced motion/zoom, métricas de performance com ambiente, requests de terceiros, eventos e parâmetros, prova do checkout em modo de teste, aprovações comerciais/jurídicas, URL publicada quando autorizada e plano de rollback.

## Critérios de saída

- Todos os itens aplicáveis de `ACCEPTANCE_CRITERIA.md` aprovados ou exceção aceita e documentada.
- Nenhuma divergência comercial entre página, checkout e tracking.
- Métricas dentro do orçamento ou regressões aceitas com responsável.
- Purchase não pode ser reproduzido por simples visita/refresh.
- Plano de rollback e responsável de publicação registrados.
- Git diff/status revisados quando houver repositório; nenhum segredo ou artefato de teste incluído.
