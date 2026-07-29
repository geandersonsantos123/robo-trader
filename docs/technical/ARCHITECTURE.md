# Arquitetura técnica

## Estado encontrado em 2026-07-20

| Área | Estado inicial |
| --- | --- |
| Git | O executável padrão não estava no PATH; com o runtime local, `git status` confirmou que a pasta não é um repositório Git e não há `.git` em ancestrais. |
| Stack/linguagens | Nenhuma stack. Inventário encontrou somente seis PNGs. |
| Gerenciador/dependências | Nenhum `package.json`, lockfile ou gerenciador associado. |
| Rotas/componentes/estilos | Inexistentes. |
| Assets | Seis referências conceituais em PNG, agora organizadas em `references/visual/mobile-sections/`. |
| Scripts | Nenhum build, lint, teste ou typecheck do projeto. |
| Integrações | Nenhum analytics, Meta Pixel, checkout ou backend detectado. |

## Recomendação

Construir a Etapa 2 como landing estática com **HTML semântico, CSS organizado por camadas e JavaScript ES modules mínimo**, sem framework ou dependências de runtime.

Motivos:

- uma única rota e conteúdo majoritariamente estático;
- FAQ, reveals, menu, VSL sob intenção, sticky CTA e tracking não justificam React;
- menor download e execução no navegador interno do Instagram;
- ausência de hidratação, build obrigatório e manutenção de dependências;
- implementação e QA completos cabem melhor em uma única tarefa.

Reavaliar apenas se surgirem múltiplas rotas, CMS, personalização, autenticação, renderização dinâmica ou integração de checkout que exija servidor. Não introduzir Next.js, Vite ou banco por antecipação.

## Estado implementado na Etapa 2

A recomendação foi confirmada e implementada. A landing funciona em servidor estático, sem build, framework ou dependência de runtime. O Git foi inicializado localmente, mas não houve commit porque `user.name` e `user.email` não estão configurados.

O conteúdo e os destinos internos existem no HTML. JavaScript aprimora menu, acordeões, reveals, timeline, sticky CTA, diálogo, consentimento, VSL e tracking; se o módulo falhar, a classe `no-js` mantém conteúdo, acordeões e navegação principal utilizáveis.

Em 2026-07-20, o responsável autorizou a publicação do código-fonte em `pedroh99p-bot/robotrader`, usando `main` como branch de destino. Esse controle de versão não representa deploy de produção nem altera o estado inativo das integrações.

## Estrutura implementada

```text
index.html                 # conteúdo semântico, metadados e 12 seções
assets/
  css/                     # 8 camadas: tokens, reset, base, layout, componentes, seções, motion e responsividade
  js/app.js                # composição e fallbacks de integração
  js/navigation.js         # menu mobile e teclado
  js/faq.js                # acordeões de entrega e FAQ
  js/reveal.js             # reveals progressivos
  js/timeline.js           # estado da timeline
  js/sticky-cta.js         # CTA móvel contextual
  js/video.js              # VSL sob intenção
  js/tracking.js           # consentimento, eventos, UTMs e deduplicação
  js/runtime-config.js     # configuração pública, sem segredos
  images/                  # quatro SVGs leves do protótipo
references/                # conceitos; nunca servidos como seções da página
docs/qa/screenshots/       # evidências visuais em 390, 768 e 1440 px
docs/                      # contrato, QA e planos vivos
```

O CSS e o JavaScript foram divididos por responsabilidade e carregados diretamente, sem imports CSS encadeados. A carga própria não comprimida permaneceu pequena o suficiente para dispensar bundler nesta etapa.

## Padrões reutilizáveis

Não criar um componente por elemento decorativo. Reutilizar padrões semânticos e classes para:

- container e heading de seção;
- CTA primário/secundário e grupo de CTA;
- card de benefício/dor e icon tile;
- timeline step;
- media shell/VSL;
- accordion;
- proof item/checklist;
- offer card/price lockup;
- risk notice;
- roller;
- sticky CTA.

Dados repetidos podem ficar em HTML explícito na primeira versão. Renderização por JavaScript só é adequada quando reduz inconsistência sem prejudicar conteúdo básico.

## Interações e limites client-side

- Menu e FAQ com progressive enhancement e controles nativos sempre que possível.
- Um `IntersectionObserver` compartilhado para reveals, `ViewOffer` e ativação de sticky CTA.
- CSS para rollers, glow e transições; respeitar `prefers-reduced-motion`.
- VSL: botão acessível, poster e aspect ratio; criar player/iframe somente após play ou intenção clara.
- Não usar listener de scroll contínuo para efeitos; usar observer e eventos passivos quando necessários.
- Guardar estado mínimo no cliente. UTMs e consentimento são exceções documentadas.

## Integrações futuras

- **Meta Pixel:** ID público proveniente de variável de ambiente/deploy, carregado após consentimento conforme `META_PIXEL_PLAN.md`; nenhum valor fixo no código-fonte.
- **Checkout:** URL validada por allowlist/configuração; preservar apenas UTMs permitidas. Nunca inferir sucesso pelo retorno de clique.
- **Purchase:** preferir confirmação de checkout/servidor ou página de sucesso não reutilizável; deduplicar browser/servidor se CAPI existir.
- **Contato:** link oficial normalizado e testado; não enviar mensagem ou dado pessoal ao analytics.

## Segurança e resiliência

- Nenhum segredo no browser. Pixel ID não é segredo, mas deve ser configurável por ambiente.
- Links externos com protocolo e host validados; `noopener` quando abrir nova aba.
- Política de privacidade/consentimento antes de marketing.
- A página permanece navegável se tracking, vídeo ou checkout falharem; exibir erro/alternativa de contato somente se canal real estiver disponível.
- Não incorporar scripts de terceiros sem necessidade, responsável e impacto medido.
