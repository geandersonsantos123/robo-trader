---
name: landing-page-robo-trader
description: Implementar, refinar ou auditar as Etapas 2 e 3 da landing page Robô Trader a partir da fundação documental deste repositório. Usar para construir o protótipo funcional, preservar a direção visual mobile-first, validar CRO e copy regulada, otimizar performance, preparar Meta Pixel e checkout, executar QA ou publicação sem inventar condições comerciais, provas ou resultados.
---

# Landing Page Robô Trader

## Preparar o contexto

1. Ler `AGENTS.md` e seguir a ordem de `docs/INDEX.md`.
2. Ler integralmente `docs/project/OPEN_QUESTIONS.md`; nunca resolver uma pendência por suposição.
3. Para a Etapa 2, manter `docs/plans/STAGE_2_EXECPLAN.md` atualizado conforme `.agent/PLANS.md`. Para a Etapa 3, usar `docs/plans/STAGE_3_QA_PLAN.md`.
4. Inspecionar o estado atual antes de editar. Preservar mudanças existentes e a stack, quando houver.
5. Tratar `references/visual/mobile-sections/` como conceito visual. Consultar o manifesto e `docs/visual/REFERENCE_ANALYSIS.md`; não copiar preço, texto, prova, métrica ou promessa das imagens.

## Implementar por milestones

- Construir primeiro a estrutura semântica e a copy confirmada; validar leitura em 390 px antes de efeitos.
- Aplicar tokens e padrões de `docs/visual/VISUAL_SYSTEM.md`; reutilizar CTA, card, heading de seção, roller, aviso de risco, FAQ e shell de mídia.
- Adicionar interações progressivas com JavaScript mínimo. Usar CSS para rollers e transições simples e `IntersectionObserver` para reveals.
- Carregar VSL somente após intenção. Se mídia, prova, checkout ou compatibilidade não estiverem confirmados, usar o fallback documental (ocultar, rotular como demonstração pendente ou manter navegação interna), nunca conteúdo fictício.
- Só preparar tracking conforme `docs/tracking/META_PIXEL_PLAN.md`. Não disparar `Purchase` sem confirmação real.
- Encerrar cada milestone com um resultado navegável, revisão dos critérios e atualização do ExecPlan.

## Validar antes de concluir

- **UX mobile:** testar 390×844 e 430×932; depois 768×1024 e 1365×768. Verificar hierarquia, toque, sticky CTA, teclado, foco, zoom, Safari/iOS e ausência de overflow.
- **Copy:** confrontar toda alegação com `CLAIMS_AND_GUARDRAILS.md`; confirmar que o preço total é sempre R$197 e que não existe parcelamento, garantia, resultado ou escassez inventada.
- **Performance:** cumprir `PERFORMANCE_BUDGET.md`; reservar dimensões, otimizar formatos, evitar bibliotecas pesadas e impedir download de vídeo antes de interação.
- **Tracking:** validar consentimento, UTMs, origem do CTA, evento único por ação e valores `197`/`BRL`; separar clique, checkout e compra real.
- **Entrega:** registrar comandos, resultados, limitações, arquivos afetados e decisões novas. Atualizar a documentação no mesmo trabalho.

## Proibições

Nunca inventar mercados/plataformas compatíveis, taxa de acerto, lucro, renda, saldo, depoimento, quantidade de clientes, credencial, bônus, acesso imediato, prazo, suporte, parcelamento, desconto, garantia, reembolso, checkout, urgência ou escassez. Tratar liberdade financeira e geográfica somente como aspiração condicionada a conhecimento, testes, configuração, acompanhamento e risco financeiro.
