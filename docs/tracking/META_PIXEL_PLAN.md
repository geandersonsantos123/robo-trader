# Plano de Meta Pixel e atribuição

**Estado publicado:** Meta Pixel oficial configurado e carregado com prioridade no `<head>`. O helper centralizado continua responsável por eventos, parâmetros, deduplicação e UTMs.

## Configuração

- Pixel ID oficial publicado: `927197533517588`.
- Um helper centralizado encapsula carregamento, consentimento, fila, parâmetros e deduplicação.
- O script da Meta usa `preconnect`, `dns-prefetch`, `preload` e bootstrap antecipado no `<head>`. A página continua funcional se o script for recusado/bloqueado.
- Validar a especificação vigente da Meta e a política jurídica antes da publicação; nomes abaixo são o contrato desejado do produto.

### Implementação atual

- `assets/js/runtime-config.js` mantém `metaPixelId`, checkout, preço, parcelas e demais dados públicos da landing.
- `assets/js/tracking.js` centraliza deduplicação em memória, UTMs permitidas, eventos locais e envio para o Pixel.
- `CTAInteraction` é o evento local para todos os CTAs, com `cta_id`, seção, destino e tipo de ação.
- `ViewOffer` ocorre uma vez após visibilidade mínima do card; `SectionView`, `ScrollDepth` e `FAQOpen` ampliam a medição de navegação e intenção.
- Eventos de vídeo só são ligados quando existe mídia real e a reprodução começa.
- `InitiateCheckout` só dispara se uma URL de checkout válida existir. Com a URL vazia, o CTA abre um diálogo e registra apenas a interação local.
- Não existe chamada de interface para `Purchase`.

## Eventos

| Evento | Gatilho único | Parâmetros mínimos | Observação |
| --- | --- | --- | --- |
| `PageView` | Pixel carregado em uma visita consentida | URL sem dados sensíveis | Uma vez por carregamento real. |
| `ViewContent` | Hero/conteúdo principal disponível | `content_name: Robo Trader`, `content_type: product` | Não duplicar no reveal. |
| `VideoStart` | Reprodução realmente inicia | `video_id`, `source_section` | Clique no poster sem reprodução não conta. |
| `VideoProgress25` | Primeiro cruzamento de 25% | `video_id`, `progress: 25` | Uma vez por sessão de página. |
| `VideoProgress50` | Primeiro cruzamento de 50% | `progress: 50` | Idem. |
| `VideoProgress75` | Primeiro cruzamento de 75% | `progress: 75` | Idem. |
| `VideoComplete` | Player confirma término | `progress: 100` | Não inferir por tempo aproximado. |
| `ViewOffer` | ≥50% do card de oferta visível por ~1 s | `content_name`, `value: 247`, `currency: BRL` | Uma vez. |
| `SectionView` | Primeira visualização relevante de cada seção | `section_id`, `section_label` | Evento customizado. |
| `ScrollDepth` | 25%, 50%, 75% e 90% de profundidade | `depth` | Evento customizado. |
| `FAQOpen` | Abertura real de pergunta no FAQ | `question`, `accordion_id` | Evento customizado sem PII. |
| `CTAInteraction` | Clique em CTA interno ou de mídia | `cta_id`, `section`, `destination`, `action_type` | Evento customizado. |
| `InitiateCheckout` | Clique válido que abre checkout real | `value: 247`, `currency: BRL`, `source_section`, `cta_id` | Não disparar em CTA de rolagem. |
| `Contact` | Clique em canal oficial de contato | `source_section`, `cta_id`, `contact_type` | Sem telefone, texto livre ou PII. |
| `Purchase` | Confirmação real e confiável do pagamento | `value: 247`, `currency: BRL`, `order_id/event_id` | Nunca na landing ou mero retorno de URL. |

Eventos de navegação interna usam `CTAInteraction` como evento customizado, sem transformar rolagem ou curiosidade em evento de compra.

## Deduplicação

- Manter um `Set` em memória para eventos únicos na página e, quando apropriado, chave em `sessionStorage` com versão da campanha.
- Chave sugerida: `event_name:content_id:threshold:page_instance`.
- Remover observers/handlers após o primeiro disparo.
- Para CAPI futura, gerar `event_id` compartilhado entre browser e servidor e usar o mesmo evento/valor; não implementar CAPI sem endpoint e responsabilidade definidos.
- Não suprimir dois cliques reais de checkout de sessões diferentes; deduplicar disparo técnico, não intenção legítima.

## UTMs e origem

- Capturar allowlist: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, além de identificadores aprovados da plataforma.
- O protótipo preserva a última combinação de UTMs permitidas em `sessionStorage` durante a sessão da aba. A Etapa 3 deve decidir, documentar e testar se publicação exige primeiro toque, último toque, ambos e qual expiração.
- Anexar ao checkout apenas parâmetros aceitos e codificados, sem sobrescrever valores próprios do destino.
- Todo CTA envia `source_section` e `cta_id` estáveis conforme `CTA_MAP.md`.
- Não coletar mensagem de WhatsApp, telefone, e-mail ou parâmetros desconhecidos.

## Consentimento

- Separar armazenamento essencial de scripts de marketing.
- Antes de consentimento, não criar Pixel/iframe invisível nem enviar eventos retroativos sem base/política aprovada.
- Oferecer aceitar, recusar e revisar preferências com o mesmo nível de acesso; guardar versão/data da escolha.
- Linkar política de privacidade e explicar finalidade de medição/remarketing em linguagem clara.

## Validação na Etapa 3

1. Testar consentido, recusado, bloqueador de conteúdo e ausência de ID.
2. Inspecionar rede/helper para eventos únicos, ordem e parâmetros.
3. Testar todos os pontos de vídeo, oferta, CTAs e retorno do checkout.
4. Confirmar `247` e `BRL` em `ViewOffer`, `InitiateCheckout` e `Purchase` real.
5. Validar UTMs com caracteres especiais e ausência de PII.
6. Usar ferramentas oficiais vigentes da Meta no ambiente de teste; registrar evidência sem expor IDs/credenciais.
