# Robô Trader — instruções do repositório

Este repositório prepara e implementará uma landing page mobile-first do **ROBÔ TRADER**, uma oferta de tecnologia, formação, testes, configuração, onboarding, materiais e suporte para uso responsável de automação em mercados compatíveis.

## Fontes de verdade

- Preço total oficial: **R$197**. Parcelamento, checkout, garantia e demais condições estão pendentes.
- Leia primeiro [docs/INDEX.md](docs/INDEX.md), [docs/project/PRODUCT_BRIEF.md](docs/project/PRODUCT_BRIEF.md), [docs/project/DECISIONS.md](docs/project/DECISIONS.md) e [docs/project/OPEN_QUESTIONS.md](docs/project/OPEN_QUESTIONS.md).
- A composição autorizada da oferta está em [docs/offer/OFFER_R197.md](docs/offer/OFFER_R197.md).
- Regras de alegações estão em [docs/copy/CLAIMS_AND_GUARDRAILS.md](docs/copy/CLAIMS_AND_GUARDRAILS.md).
- As imagens em `references/visual/mobile-sections/` são referências conceituais; textos, números, preços e resultados nelas não são fontes comerciais.

## Regras duráveis

- Não inventar lucros, garantias, taxas de acerto, saldos, depoimentos, autoridade, urgência, escassez, compatibilidade, parcelamento ou resultados.
- Tratar liberdade financeira/geográfica como aspiração, nunca como resultado prometido.
- Preservar mobile-first, HTML semântico, acessibilidade, carregamento progressivo e compatibilidade com Safari/iOS e navegador interno do Instagram.
- Preferir HTML/CSS/JavaScript estáticos enquanto requisitos confirmados não justificarem framework ou backend; manter JavaScript apenas para interações e medição.
- Carregar vídeo somente após intenção/interação, reservar dimensões de mídia, otimizar imagens e respeitar `prefers-reduced-motion`.
- Não ativar Pixel, checkout, `Purchase` ou scripts de marketing sem identificadores, destino, consentimento e confirmação real.
- Usar um ExecPlan conforme [.agent/PLANS.md](.agent/PLANS.md) para qualquer etapa de implementação ou QA abrangente; atualizar progresso, decisões e descobertas durante o trabalho.
- Quando produto, oferta, stack ou tracking mudarem, atualizar no mesmo trabalho os documentos afetados e registrar a decisão em `docs/project/DECISIONS.md`.

## Validação

O protótipo é estático, sem `package.json`, build ou dependências de runtime. Para validar:

```powershell
node --check assets/js/app.js
node --check assets/js/tracking.js
python -m http.server 4173
```

Depois, abrir `http://localhost:4173/` e executar a matriz de navegador descrita em [docs/plans/STAGE_2_EXECPLAN.md](docs/plans/STAGE_2_EXECPLAN.md). Validar pelo menos os viewports 320, 360, 375, 390, 430, 768, 1024 e 1440 px, além de teclado, consentimento, fallbacks de VSL/checkout, reduced motion e modo sem JavaScript. As capturas de referência da Etapa 2 ficam em `docs/qa/screenshots/`.
