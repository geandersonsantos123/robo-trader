# Contrato dos ExecPlans

Use um ExecPlan para mudanças que atravessem várias seções, integrações ou etapas de QA. O plano é um documento vivo e autocontido: alguém sem acesso à conversa deve conseguir retomar o trabalho apenas pelo repositório.

## Estrutura obrigatória

1. **Propósito e resultado observável** — o que o visitante ou mantenedor conseguirá verificar ao final.
2. **Contexto e fontes de verdade** — fatos confirmados, arquivos a ler e termos próprios do projeto.
3. **Escopo e limites** — o que será e não será alterado; pendências não podem virar suposições.
4. **Progresso** — checklist datado, atualizado a cada pausa significativa.
5. **Descobertas** — comportamento inesperado, evidência e consequência.
6. **Decisões** — escolha, data, motivo, alternativas e impacto.
7. **Arquivos afetados** — caminhos previstos e efetivos, com responsabilidades.
8. **Milestones** — incrementos que deixam um resultado observável e verificável.
9. **Validação** — comandos exatos, viewports, jornadas e resultado esperado.
10. **Critérios de aceite** — condições objetivas de conclusão.
11. **Recuperação e idempotência** — como repetir ou reverter com segurança.
12. **Resultados e pendências** — resumo final, limitações e próximos passos.

## Manutenção

- Marque cada item como `pendente`, `em andamento` ou `concluído`; inclua data quando o estado mudar.
- Registre falhas e mudanças de direção no plano, não apenas na conversa.
- Não declare uma validação executada sem guardar seu resultado resumido.
- Se uma decisão comercial estiver aberta, desenhe um fallback seguro (ocultar, desabilitar ou usar destino interno) e mantenha a pendência explícita.
- Ao concluir, compare o resultado com os critérios de aceite e atualize `docs/project/DECISIONS.md` quando uma recomendação se tornar decisão confirmada.
