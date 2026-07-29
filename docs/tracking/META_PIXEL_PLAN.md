# Plano de Meta Pixel e atribuição

**Estado após a Etapa 2:** helper implementado e inativo. Nenhum Pixel ID foi configurado e nenhum script da Meta é carregado com a configuração atual.

## Configuração

- Expor o ID por variável de ambiente/deploy, recomendada `PUBLIC_META_PIXEL_ID`; não fixar ID no código.
- Um helper centralizado encapsula carregamento, consentimento, fila, parâmetros e deduplicação.
- Marketing só carrega conforme política de consentimento aprovada. A página continua funcional se o script for recusado/bloqueado.
- Validar a especificação vigente da Meta e a política jurídica antes da publicação; nomes abaixo são o contrato desejado do produto.

### Implementação atual

- `assets/js/runtime-config.js` mantém `metaPixelId`, checkout, WhatsApp e VSL vazios; `price: 197` e `currency: BRL` são os únicos dados comerciais preenchidos.
- `assets/js/tracking.js` centraliza consentimento, deduplicação em memória, UTMs permitidas, eventos locais e carregamento condicional do Pixel.
- `CTAInteraction` é o evento local para todos os CTAs, com `cta_id`, seção, destino e tipo de ação.
- `ViewOffer` ocorre uma vez após visibilidade mínima do card; eventos de vídeo só são ligados quando existe mídia real e a reprodução começa.
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
| `ViewOffer` | ≥50% do card de oferta visível por ~1 s | `content_name`, `value: 197`, `currency: BRL` | Uma vez. |
| `InitiateCheckout` | Clique válido que abre checkout real | `value: 197`, `currency: BRL`, `source_section`, `cta_id` | Não disparar em CTA de rolagem. |
| `Contact` | Clique em canal oficial de contato | `source_section`, `cta_id`, `contact_type` | Sem telefone, texto livre ou PII. |
| `Purchase` | Confirmação real e confiável do pagamento | `value: 197`, `currency: BRL`, `order_id/event_id` | Nunca na landing ou mero retorno de URL. |

Eventos de navegação interna usam o evento local `CTAInteraction`; não precisam ser enviados como eventos-padrão Meta se não houver objetivo claro.

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
4. Confirmar `197` e `BRL` em `ViewOffer`, `InitiateCheckout` e `Purchase` real.
5. Validar UTMs com caracteres especiais e ausência de PII.
6. Usar ferramentas oficiais vigentes da Meta no ambiente de teste; registrar evidência sem expor IDs/credenciais.
